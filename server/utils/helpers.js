/**
 * Utility Helper Functions
 * Common functions used across the API
 */

// =====================================
// DISTANCE CALCULATION (Haversine Formula)
// =====================================
/**
 * Calculates the distance between two geographical coordinates
 * using the Haversine formula
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return Math.round(distance * 100) / 100; // Round to 2 decimal places
};

/**
 * Converts degrees to radians
 * @param {number} degrees - Angle in degrees
 * @returns {number} Angle in radians
 */
const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
};

// =====================================
// SMS/NOTIFICATION SIMULATOR
// =====================================
/**
 * Simulates sending SMS notifications to emergency contacts
 * In production, this would integrate with an SMS gateway (Twilio, etc.)
 * @param {Array} phoneNumbers - Array of phone numbers
 * @param {string} message - Message to send
 * @returns {Object} Notification result
 */
const sendSMSNotification = async (phoneNumbers, message) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log('📱 SMS Notification Simulation:');
    console.log(`   Recipients: ${phoneNumbers.join(', ')}`);
    console.log(`   Message: ${message}`);

    // Simulate success/failure (90% success rate for demo)
    const results = phoneNumbers.map(phone => ({
        phone,
        status: Math.random() > 0.1 ? 'sent' : 'failed',
        timestamp: new Date().toISOString()
    }));

    return {
        success: true,
        message: 'Notifications processed',
        results
    };
};

// =====================================
// RESPONSE FORMATTERS
// =====================================
/**
 * Standard success response format
 * @param {Object} data - Response data
 * @param {string} message - Success message
 * @returns {Object} Formatted success response
 */
const successResponse = (data, message = 'Success') => {
    return {
        success: true,
        message,
        data,
        timestamp: new Date().toISOString()
    };
};

/**
 * Standard paginated response format
 * @param {Array} items - Array of items
 * @param {number} page - Current page number
 * @param {number} limit - Items per page
 * @param {number} total - Total number of items
 * @returns {Object} Formatted paginated response
 */
const paginatedResponse = (items, page, limit, total) => {
    const totalPages = Math.ceil(total / limit);

    return {
        success: true,
        data: items,
        pagination: {
            currentPage: page,
            totalPages,
            totalItems: total,
            itemsPerPage: limit,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        },
        timestamp: new Date().toISOString()
    };
};

// =====================================
// ID GENERATOR
// =====================================
/**
 * Generates a unique ID with a prefix
 * @param {string} prefix - Prefix for the ID (e.g., 'sos', 'contact')
 * @returns {string} Unique ID
 */
const generateId = (prefix = 'id') => {
    const { v4: uuidv4 } = require('uuid');
    return `${prefix}_${uuidv4().slice(0, 8)}`;
};

// =====================================
// DATE/TIME UTILITIES
// =====================================
/**
 * Gets current timestamp in ISO format
 * @returns {string} ISO formatted timestamp
 */
const getCurrentTimestamp = () => {
    return new Date().toISOString();
};

/**
 * Formats a date for display
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

module.exports = {
    calculateDistance,
    toRadians,
    sendSMSNotification,
    successResponse,
    paginatedResponse,
    generateId,
    getCurrentTimestamp,
    formatDate
};
