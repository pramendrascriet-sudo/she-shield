/**
 * Google Places API Service
 * Fetches real nearby safety locations based on user's location
 * Now uses backend proxy to avoid CORS issues
 */

const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
const PLACES_API_BASE = 'https://maps.googleapis.com/maps/api/place';

// Location type configurations
const LOCATION_TYPES = {
    police: {
        types: ['police'],
        keywords: ['police station', 'police chowki', 'police thana'],
        icon: 'Shield',
        color: 'bg-blue-500',
        lightColor: 'bg-blue-100 text-blue-600'
    },
    womenCenter: {
        types: ['establishment'],
        keywords: ['women helpline', 'mahila thana', 'women police station', 'women help center', 'women safety center'],
        icon: 'Users',
        color: 'bg-purple-500',
        lightColor: 'bg-purple-100 text-purple-600'
    },
    hospital: {
        types: ['hospital', 'health'],
        keywords: ['hospital', 'emergency', 'clinic'],
        icon: 'Building',
        color: 'bg-red-500',
        lightColor: 'bg-red-100 text-red-600'
    }
};

/**
 * Calculate distance between two coordinates (Haversine formula)
 * @param {number} lat1 - Latitude of point 1
 * @param {number} lon1 - Longitude of point 1
 * @param {number} lat2 - Latitude of point 2
 * @param {number} lon2 - Longitude of point 2
 * @returns {number} Distance in kilometers
 */
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**
 * Fetch nearby places using backend proxy (avoids CORS issues)
 * @param {Object} location - User's location { lat, lng }
 * @param {string} type - Type of place to search for
 * @param {number} radius - Search radius in meters (default 5000m = 5km)
 * @returns {Promise<Array>} Array of places
 */
async function fetchNearbyPlaces(location, type, radius = 5000) {
    const config = LOCATION_TYPES[type];
    if (!config) {
        console.error(`Unknown location type: ${type}`);
        return [];
    }

    try {
        const results = [];

        // Search by type using backend proxy
        for (const placeType of config.types) {
            const url = `${API_BASE_URL}/api/locations?` +
                `lat=${location.lat}&lng=${location.lng}` +
                `&radius=${radius}` +
                `&type=${placeType}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.status === 'OK' && data.results) {
                results.push(...data.results);
            } else if (data.status === 'ZERO_RESULTS') {
                console.log(`No results found for type: ${placeType}`);
            } else if (data.status === 'REQUEST_DENIED') {
                console.error('Google Places API request denied. Check your API key and billing.');
                throw new Error('API request denied. Please check your API configuration.');
            } else if (data.error) {
                console.error('Backend error:', data.error);
                throw new Error(data.error.message || 'Backend error');
            } else {
                console.warn(`Places API returned status: ${data.status}`);
            }
        }

        // Search by keyword for more specific results (for women centers)
        if (type === 'womenCenter') {
            for (const keyword of config.keywords) {
                const url = `${API_BASE_URL}/api/locations?` +
                    `lat=${location.lat}&lng=${location.lng}` +
                    `&radius=${radius}` +
                    `&keyword=${encodeURIComponent(keyword)}`;

                const response = await fetch(url);
                const data = await response.json();

                if (data.status === 'OK' && data.results) {
                    results.push(...data.results);
                }
            }
        }

        // Remove duplicates by place_id
        const uniquePlaces = Array.from(
            new Map(results.map(place => [place.place_id, place])).values()
        );

        return uniquePlaces;
    } catch (error) {
        console.error(`Error fetching ${type} places:`, error);
        throw error;
    }
}

/**
 * Transform Google Places result to our app's location format
 * @param {Object} place - Google Place object
 * @param {Object} userLocation - User's location for distance calculation
 * @param {string} type - Location type (police, womenCenter, hospital)
 * @returns {Object} Transformed location object
 */
function transformPlace(place, userLocation, type) {
    const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        place.geometry.location.lat,
        place.geometry.location.lng
    );

    const config = LOCATION_TYPES[type];

    return {
        id: place.place_id,
        name: place.name,
        type: type,
        address: place.vicinity || place.formatted_address || 'Address not available',
        phone: place.formatted_phone_number || 'N/A',
        distance: parseFloat(distance.toFixed(1)),
        rating: place.rating || 4.0,
        facilities: extractFacilities(place, type),
        coordinates: {
            lat: place.geometry.location.lat,
            lng: place.geometry.location.lng
        },
        image: place.photos && place.photos.length > 0
            ? `${PLACES_API_BASE}/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${API_KEY}`
            : getDefaultImage(type),
        isOpen: place.opening_hours?.open_now ?? null
    };
}

/**
 * Extract facilities based on place details
 * @param {Object} place - Google Place object
 * @param {string} type - Location type
 * @returns {Array<string>} Array of facility codes
 */
function extractFacilities(place, type) {
    const facilities = [];

    if (place.opening_hours?.open_now) {
        facilities.push('open24x7');
    }

    if (type === 'police') {
        facilities.push('cctv', 'womenCell');
    } else if (type === 'hospital') {
        facilities.push('emergency247', 'ambulance');
        if (place.types?.includes('hospital')) {
            facilities.push('trauma');
        }
    } else if (type === 'womenCenter') {
        facilities.push('womenCell', 'counseling', 'legal');
    }

    return facilities;
}

/**
 * Get default image for location type
 * @param {string} type - Location type
 * @returns {string} Default image URL
 */
function getDefaultImage(type) {
    const defaults = {
        police: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400',
        womenCenter: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400',
        hospital: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400'
    };
    return defaults[type] || defaults.hospital;
}

/**
 * Get all nearby safety locations
 * @param {Object} location - User's location { lat, lng }
 * @param {string} filter - Optional filter ('all', 'police', 'womenCenter', 'hospital')
 * @param {number} radius - Search radius in meters
 * @returns {Promise<Array>} Array of safety locations
 */
export async function getNearbyLocations(location, filter = 'all', radius = 5000) {
    if (!location || !location.lat || !location.lng) {
        throw new Error('Valid location is required');
    }

    if (!API_KEY) {
        throw new Error('Google Places API key not configured. Please add VITE_GOOGLE_PLACES_API_KEY to your .env file');
    }

    try {
        const types = filter === 'all'
            ? ['police', 'womenCenter', 'hospital']
            : [filter];

        const promises = types.map(type =>
            fetchNearbyPlaces(location, type, radius)
                .then(places => places.map(place => transformPlace(place, location, type)))
        );

        const results = await Promise.all(promises);
        const allLocations = results.flat();

        // Sort by distance
        allLocations.sort((a, b) => a.distance - b.distance);

        // Limit to 20 locations to avoid overwhelming UI
        return allLocations.slice(0, 20);
    } catch (error) {
        console.error('Error getting nearby locations:', error);
        throw error;
    }
}

/**
 * Check if Google Places API is configured
 * @returns {boolean} True if API key is present
 */
export function isPlacesAPIConfigured() {
    return Boolean(API_KEY && API_KEY.length > 0 && API_KEY !== 'your_api_key_here');
}

export default {
    getNearbyLocations,
    isPlacesAPIConfigured
};
