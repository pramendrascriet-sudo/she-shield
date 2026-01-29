/**
 * API Routes for Pregnancy Safety Platform
 * Defines all endpoint handlers with detailed comments
 */

const express = require('express');
const router = express.Router();

// Load environment variables
require('dotenv').config();

// Use node-fetch for Node.js < 18 compatibility
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Import middleware validators
const {
    validateEmergencyRequest,
    validateHospitalsQuery,
    validateContactsRequest,
    validateTipsQuery,
    validateSOSRequest
} = require('../middleware/validators');

// Import error handling utilities
const { APIError, asyncHandler } = require('../middleware/errorHandler');

// Import helper utilities
const {
    calculateDistance,
    sendSMSNotification,
    successResponse,
    generateId,
    getCurrentTimestamp
} = require('../utils/helpers');

// Import mock database
const db = require('../data/mockDatabase');

// =====================================
// Google Places API Configuration
// =====================================
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACES_API_BASE = 'https://maps.googleapis.com/maps/api/place';

// Log API key status on startup (masked for security)
console.log(`🔑 Google Places API Key: ${GOOGLE_PLACES_API_KEY ? 'Configured (' + GOOGLE_PLACES_API_KEY.slice(0, 8) + '...)' : 'NOT CONFIGURED'}`);

// =====================================
// GET /api/locations
// Proxy endpoint for Google Places API
// =====================================
/**
 * Nearby Safety Locations Endpoint
 * 
 * Purpose: Fetches nearby safety locations (police, hospitals, women centers)
 * using Google Places API. This endpoint acts as a proxy to avoid CORS issues.
 * 
 * Query Parameters:
 * - lat: number (required) - User's latitude
 * - lng: number (required) - User's longitude
 * - type: string (required) - Place type to search for
 * - radius: number (optional) - Search radius in meters (default: 5000)
 * - keyword: string (optional) - Additional search keyword
 * 
 * Response:
 * - Proxied Google Places API response
 */
router.get('/locations', asyncHandler(async (req, res) => {
    const { lat, lng, type, radius = 5000, keyword } = req.query;

    console.log(`📍 Location request: lat=${lat}, lng=${lng}, type=${type}, radius=${radius}`);

    if (!lat || !lng) {
        throw new APIError('Latitude and longitude are required', 400);
    }

    if (!GOOGLE_PLACES_API_KEY) {
        console.error('❌ GOOGLE_PLACES_API_KEY environment variable is not set!');
        throw new APIError('Google Places API key not configured on server. Please set GOOGLE_PLACES_API_KEY environment variable.', 500);
    }

    try {
        let url = `${PLACES_API_BASE}/nearbysearch/json?` +
            `location=${lat},${lng}` +
            `&radius=${radius}` +
            `&key=${GOOGLE_PLACES_API_KEY}`;

        if (type) {
            url += `&type=${type}`;
        }

        if (keyword) {
            url += `&keyword=${encodeURIComponent(keyword)}`;
        }

        console.log(`🌐 Fetching from Google Places API...`);
        const response = await fetch(url);
        const data = await response.json();

        console.log(`🗺️  Places API Response: status=${data.status}, results=${data.results?.length || 0}`);
        
        if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
            console.error(`⚠️  Places API Error: ${data.status} - ${data.error_message || 'No error message'}`);
        }

        res.json(data);
    } catch (error) {
        console.error('❌ Error fetching from Google Places API:', error.message);
        throw new APIError(`Failed to fetch locations: ${error.message}`, 500);
    }
}));

// =====================================
// POST /api/emergency
// Send emergency alerts to contacts
// =====================================
/**
 * Emergency Alert Endpoint
 * 
 * Purpose: Sends emergency alerts (SMS/notifications) to specified contacts
 * when a pregnant woman needs immediate assistance.
 * 
 * Request Body:
 * - location: { latitude, longitude, address? } - Current location
 * - userId: string - ID of the user sending the alert
 * - contactNumbers: string[] - Array of phone numbers to notify
 * - message?: string - Optional custom message
 * 
 * Response:
 * - success: boolean
 * - alertId: string - Unique identifier for this alert
 * - notificationResults: Object[] - Status of each notification sent
 * - nearestHospital: Object - Closest hospital to the user's location
 */
router.post('/emergency', validateEmergencyRequest, asyncHandler(async (req, res) => {
    const { location, userId, contactNumbers, message } = req.body;

    // Find the user in our database
    const user = db.users.find(u => u.id === userId);

    // Prepare emergency message
    const emergencyMessage = message ||
        `🚨 EMERGENCY ALERT! ${user?.name || 'A user'} needs immediate help! ` +
        `Location: Lat ${location.latitude}, Long ${location.longitude}. ` +
        `Please call immediately or send help.`;

    // Send SMS notifications to all contacts
    const notificationResult = await sendSMSNotification(contactNumbers, emergencyMessage);

    // Find nearest hospital for quick reference
    const hospitalsWithDistance = db.hospitals.map(hospital => ({
        ...hospital,
        distance: calculateDistance(
            location.latitude,
            location.longitude,
            hospital.latitude,
            hospital.longitude
        )
    })).filter(h => h.isEmergencyAvailable);

    hospitalsWithDistance.sort((a, b) => a.distance - b.distance);
    const nearestHospital = hospitalsWithDistance[0] || null;

    // Create alert record for logging
    const alertId = generateId('alert');
    const alertRecord = {
        id: alertId,
        userId,
        location,
        contactNumbers,
        message: emergencyMessage,
        nearestHospital: nearestHospital ? {
            id: nearestHospital.id,
            name: nearestHospital.name,
            phone: nearestHospital.emergencyPhone,
            distance: nearestHospital.distance
        } : null,
        timestamp: getCurrentTimestamp(),
        status: 'sent'
    };

    // Store in mock database
    db.emergencyAlerts.push(alertRecord);

    console.log('🚨 Emergency Alert Created:', alertId);

    res.status(201).json(successResponse({
        alertId,
        notificationResults: notificationResult.results,
        nearestHospital: alertRecord.nearestHospital,
        instructions: [
            'Stay calm and find a safe location',
            'Keep your phone nearby for callbacks',
            nearestHospital ? `Nearest hospital: ${nearestHospital.name} (${nearestHospital.distance} km)` : null,
            'Emergency services have been notified'
        ].filter(Boolean)
    }, 'Emergency alert sent successfully'));
}));

// =====================================
// GET /api/hospitals
// Get nearby hospitals sorted by distance
// =====================================
/**
 * Nearby Hospitals Endpoint
 * 
 * Purpose: Returns a list of hospitals near the user's location,
 * sorted by distance, with ratings and facility information.
 * 
 * Query Parameters:
 * - latitude: number (required) - User's latitude
 * - longitude: number (required) - User's longitude  
 * - radius: number (optional) - Search radius in km (default: 10)
 * 
 * Response:
 * - success: boolean
 * - count: number - Number of hospitals found
 * - hospitals: Object[] - Array of hospital objects with distance
 */
router.get('/hospitals', validateHospitalsQuery, asyncHandler(async (req, res) => {
    const { latitude, longitude, radius = 10 } = req.query;

    // Parse coordinates
    const userLat = parseFloat(latitude);
    const userLng = parseFloat(longitude);
    const searchRadius = parseFloat(radius);

    // Calculate distance for each hospital and filter by radius
    const hospitalsWithDistance = db.hospitals
        .map(hospital => ({
            ...hospital,
            distance: calculateDistance(userLat, userLng, hospital.latitude, hospital.longitude)
        }))
        .filter(hospital => hospital.distance <= searchRadius);

    // Sort by distance (nearest first)
    hospitalsWithDistance.sort((a, b) => a.distance - b.distance);

    // Format response data
    const formattedHospitals = hospitalsWithDistance.map(hospital => ({
        id: hospital.id,
        name: hospital.name,
        address: hospital.address,
        phone: hospital.phone,
        emergencyPhone: hospital.emergencyPhone,
        distance: `${hospital.distance} km`,
        distanceValue: hospital.distance,
        rating: hospital.rating,
        totalRatings: hospital.totalRatings,
        specialties: hospital.specialties,
        facilities: hospital.facilities,
        availableBeds: hospital.availableBeds,
        isEmergencyAvailable: hospital.isEmergencyAvailable,
        openHours: hospital.openHours,
        coordinates: {
            latitude: hospital.latitude,
            longitude: hospital.longitude
        }
    }));

    console.log(`🏥 Found ${formattedHospitals.length} hospitals within ${searchRadius}km`);

    res.json(successResponse({
        count: formattedHospitals.length,
        searchRadius: `${searchRadius} km`,
        userLocation: { latitude: userLat, longitude: userLng },
        hospitals: formattedHospitals
    }, `Found ${formattedHospitals.length} hospitals nearby`));
}));

// =====================================
// POST /api/user/contacts
// Save emergency contacts for a user
// =====================================
/**
 * Save Emergency Contacts Endpoint
 * 
 * Purpose: Saves or updates emergency contacts for a user.
 * These contacts will be notified during emergencies.
 * 
 * Request Body:
 * - userId: string - User's unique identifier
 * - contacts: Object[] - Array of contact objects with:
 *   - name: string - Contact's name
 *   - phone: string - Contact's phone number
 *   - relationship: string - Relationship to user
 *   - isPrimary?: boolean - Whether this is the primary contact
 * 
 * Response:
 * - success: boolean
 * - contactId: string - ID of the contact record
 * - contacts: Object[] - Saved contacts array
 */
router.post('/user/contacts', validateContactsRequest, asyncHandler(async (req, res) => {
    const { userId, contacts } = req.body;

    // Check if user exists
    const userExists = db.users.find(u => u.id === userId);
    if (!userExists) {
        throw new APIError('User not found', 404);
    }

    // Ensure only one contact is marked as primary
    let hasPrimary = false;
    const processedContacts = contacts.map(contact => {
        if (contact.isPrimary && !hasPrimary) {
            hasPrimary = true;
            return { ...contact, isPrimary: true };
        }
        return { ...contact, isPrimary: false };
    });

    // If no primary contact specified, make the first one primary
    if (!hasPrimary && processedContacts.length > 0) {
        processedContacts[0].isPrimary = true;
    }

    // Check if contacts already exist for this user
    const existingIndex = db.emergencyContacts.findIndex(c => c.userId === userId);

    const contactRecord = {
        id: existingIndex >= 0 ? db.emergencyContacts[existingIndex].id : generateId('contact'),
        userId,
        contacts: processedContacts,
        updatedAt: getCurrentTimestamp()
    };

    if (existingIndex >= 0) {
        // Update existing contacts
        db.emergencyContacts[existingIndex] = contactRecord;
        console.log(`📞 Updated contacts for user: ${userId}`);
    } else {
        // Create new contact record
        db.emergencyContacts.push(contactRecord);
        console.log(`📞 Created contacts for user: ${userId}`);
    }

    res.status(existingIndex >= 0 ? 200 : 201).json(successResponse({
        contactId: contactRecord.id,
        userId,
        contacts: processedContacts,
        updatedAt: contactRecord.updatedAt
    }, existingIndex >= 0 ? 'Contacts updated successfully' : 'Contacts saved successfully'));
}));

// =====================================
// GET /api/tips
// Get pregnancy tips by trimester
// =====================================
/**
 * Pregnancy Tips Endpoint
 * 
 * Purpose: Returns pregnancy tips filtered by trimester.
 * Tips include health, nutrition, wellness, and safety advice.
 * 
 * Query Parameters:
 * - trimester: number (optional) - 1, 2, or 3; returns all if not specified
 * - category: string (optional) - Filter by category (Nutrition, Health, etc.)
 * 
 * Response:
 * - success: boolean
 * - trimester: number | 'all' - Requested trimester
 * - count: number - Number of tips returned
 * - tips: Object[] - Array of tip objects
 */
router.get('/tips', validateTipsQuery, asyncHandler(async (req, res) => {
    const { trimester, category } = req.query;

    let tips = [];
    let trimesterLabel = 'all';

    if (trimester) {
        // Get tips for specific trimester
        const trimesterNum = parseInt(trimester);
        tips = db.pregnancyTips[trimesterNum] || [];
        trimesterLabel = trimesterNum;
    } else {
        // Get all tips from all trimesters
        tips = [
            ...db.pregnancyTips[1].map(t => ({ ...t, trimester: 1 })),
            ...db.pregnancyTips[2].map(t => ({ ...t, trimester: 2 })),
            ...db.pregnancyTips[3].map(t => ({ ...t, trimester: 3 }))
        ];
    }

    // Filter by category if specified
    if (category) {
        tips = tips.filter(tip =>
            tip.category.toLowerCase() === category.toLowerCase()
        );
    }

    // Sort tips by priority (high first)
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    tips.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    // Get list of all categories for reference
    const allCategories = [...new Set(
        Object.values(db.pregnancyTips)
            .flat()
            .map(tip => tip.category)
    )];

    console.log(`💡 Returning ${tips.length} tips for trimester: ${trimesterLabel}`);

    res.json(successResponse({
        trimester: trimesterLabel,
        count: tips.length,
        availableCategories: allCategories,
        tips: tips.map(tip => ({
            id: tip.id,
            title: tip.title,
            content: tip.content,
            category: tip.category,
            priority: tip.priority,
            trimester: tip.trimester || parseInt(trimester) || null
        }))
    }, `Retrieved ${tips.length} pregnancy tips`));
}));

// =====================================
// POST /api/sos
// Log SOS events for analytics
// =====================================
/**
 * SOS Event Logging Endpoint
 * 
 * Purpose: Logs SOS events for analytics and tracking purposes.
 * This helps in understanding emergency patterns and improving response times.
 * 
 * Request Body:
 * - userId: string - User's unique identifier
 * - location: { latitude, longitude, address? } - Event location
 * - type?: string - Type of emergency (medical_emergency, labor_emergency, etc.)
 * - notes?: string - Additional notes about the emergency
 * 
 * Response:
 * - success: boolean
 * - sosId: string - Unique identifier for this SOS event
 * - event: Object - Complete event record
 */
router.post('/sos', validateSOSRequest, asyncHandler(async (req, res) => {
    const { userId, location, type = 'medical_emergency', notes = '' } = req.body;

    // Check if user exists
    const user = db.users.find(u => u.id === userId);
    if (!user) {
        throw new APIError('User not found', 404);
    }

    // Get user's emergency contacts
    const userContacts = db.emergencyContacts.find(c => c.userId === userId);
    const contactNumbers = userContacts
        ? userContacts.contacts.map(c => c.phone)
        : [];

    // Create SOS event record
    const sosId = generateId('sos');
    const sosEvent = {
        id: sosId,
        userId,
        userName: user.name,
        timestamp: getCurrentTimestamp(),
        location: {
            latitude: location.latitude,
            longitude: location.longitude,
            address: location.address || 'Address not available'
        },
        type,
        status: 'active',
        contactsNotified: contactNumbers,
        responseTime: null, // Will be updated when resolved
        notes,
        userInfo: {
            phone: user.phone,
            bloodGroup: user.bloodGroup,
            allergies: user.allergies,
            medicalConditions: user.medicalConditions,
            doctorName: user.doctorName,
            doctorPhone: user.doctorPhone,
            trimester: user.trimester
        }
    };

    // Store in database
    db.sosEvents.push(sosEvent);

    // Auto-send notifications to emergency contacts if available
    let notificationResult = null;
    if (contactNumbers.length > 0) {
        const emergencyMessage =
            `🆘 SOS ALERT! ${user.name} has triggered an emergency alert. ` +
            `Type: ${type.replace('_', ' ')}. ` +
            `Location: ${location.address || `Lat ${location.latitude}, Long ${location.longitude}`}. ` +
            `Blood Group: ${user.bloodGroup}. ` +
            `Please respond immediately!`;

        notificationResult = await sendSMSNotification(contactNumbers, emergencyMessage);
    }

    console.log(`🆘 SOS Event Logged: ${sosId} - Type: ${type}`);

    res.status(201).json(successResponse({
        sosId,
        status: 'active',
        event: sosEvent,
        notificationsDispatched: notificationResult ? notificationResult.results : [],
        recommendations: [
            'Stay calm and try to find a safe location',
            'Keep your phone charged and nearby',
            'If possible, move to a well-lit, populated area',
            userContacts ? `${contactNumbers.length} emergency contacts have been notified` : 'No emergency contacts found - please add contacts',
            user.doctorPhone ? `You can also call your doctor: ${user.doctorPhone}` : null
        ].filter(Boolean)
    }, 'SOS event logged successfully'));
}));

// =====================================
// GET /api/sos/history/:userId
// Get SOS event history for a user (bonus endpoint)
// =====================================
/**
 * SOS History Endpoint (Bonus)
 * 
 * Purpose: Returns the SOS event history for a specific user.
 * Useful for analytics and reviewing past emergencies.
 */
router.get('/sos/history/:userId', asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // Validate user exists
    const user = db.users.find(u => u.id === userId);
    if (!user) {
        throw new APIError('User not found', 404);
    }

    // Get user's SOS events
    const userEvents = db.sosEvents.filter(event => event.userId === userId);

    // Sort by timestamp (most recent first)
    userEvents.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json(successResponse({
        userId,
        count: userEvents.length,
        events: userEvents
    }, `Found ${userEvents.length} SOS events for user`));
}));

// =====================================
// GET /api/health
// Health check endpoint
// =====================================
router.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'Pregnancy Safety API',
        version: '1.0.0',
        timestamp: getCurrentTimestamp()
    });
});

module.exports = router;
