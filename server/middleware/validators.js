/**
 * Input Validation Middleware
 * Uses express-validator for request validation
 */

const { body, query, validationResult } = require('express-validator');

// =====================================
// VALIDATION ERROR HANDLER
// =====================================
/**
 * Middleware to check for validation errors
 * Returns 400 Bad Request if validation fails
 */
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                field: err.path,
                message: err.msg
            }))
        });
    }
    next();
};

// =====================================
// EMERGENCY ENDPOINT VALIDATORS
// =====================================
/**
 * Validates POST /api/emergency request body
 * Required: location (with latitude/longitude), userId, contactNumbers (array)
 */
const validateEmergencyRequest = [
    body('location')
        .notEmpty().withMessage('Location is required')
        .isObject().withMessage('Location must be an object'),
    body('location.latitude')
        .isFloat({ min: -90, max: 90 }).withMessage('Valid latitude is required (-90 to 90)'),
    body('location.longitude')
        .isFloat({ min: -180, max: 180 }).withMessage('Valid longitude is required (-180 to 180)'),
    body('userId')
        .notEmpty().withMessage('User ID is required')
        .isString().withMessage('User ID must be a string'),
    body('contactNumbers')
        .isArray({ min: 1 }).withMessage('At least one contact number is required'),
    body('contactNumbers.*')
        .matches(/^\+?[0-9]{10,15}$/).withMessage('Invalid phone number format'),
    body('message')
        .optional()
        .isString().withMessage('Message must be a string')
        .isLength({ max: 500 }).withMessage('Message cannot exceed 500 characters'),
    handleValidationErrors
];

// =====================================
// HOSPITALS ENDPOINT VALIDATORS
// =====================================
/**
 * Validates GET /api/hospitals query parameters
 * Required: latitude, longitude
 * Optional: radius (default 10km)
 */
const validateHospitalsQuery = [
    query('latitude')
        .notEmpty().withMessage('Latitude is required')
        .isFloat({ min: -90, max: 90 }).withMessage('Valid latitude is required (-90 to 90)'),
    query('longitude')
        .notEmpty().withMessage('Longitude is required')
        .isFloat({ min: -180, max: 180 }).withMessage('Valid longitude is required (-180 to 180)'),
    query('radius')
        .optional()
        .isFloat({ min: 0.1, max: 100 }).withMessage('Radius must be between 0.1 and 100 km'),
    handleValidationErrors
];

// =====================================
// USER CONTACTS ENDPOINT VALIDATORS
// =====================================
/**
 * Validates POST /api/user/contacts request body
 * Required: userId, contacts array with name, phone, relationship
 */
const validateContactsRequest = [
    body('userId')
        .notEmpty().withMessage('User ID is required')
        .isString().withMessage('User ID must be a string'),
    body('contacts')
        .isArray({ min: 1, max: 5 }).withMessage('Contacts array must have 1-5 contacts'),
    body('contacts.*.name')
        .notEmpty().withMessage('Contact name is required')
        .isString().withMessage('Contact name must be a string')
        .isLength({ min: 2, max: 100 }).withMessage('Name must be 2-100 characters'),
    body('contacts.*.phone')
        .notEmpty().withMessage('Contact phone is required')
        .matches(/^\+?[0-9]{10,15}$/).withMessage('Invalid phone number format'),
    body('contacts.*.relationship')
        .notEmpty().withMessage('Relationship is required')
        .isIn(['Husband', 'Wife', 'Mother', 'Father', 'Sister', 'Brother', 'Friend', 'Doctor', 'Other'])
        .withMessage('Invalid relationship type'),
    body('contacts.*.isPrimary')
        .optional()
        .isBoolean().withMessage('isPrimary must be a boolean'),
    handleValidationErrors
];

// =====================================
// TIPS ENDPOINT VALIDATORS
// =====================================
/**
 * Validates GET /api/tips query parameters
 * Optional: trimester (1, 2, or 3)
 */
const validateTipsQuery = [
    query('trimester')
        .optional()
        .isInt({ min: 1, max: 3 }).withMessage('Trimester must be 1, 2, or 3'),
    query('category')
        .optional()
        .isString().withMessage('Category must be a string'),
    handleValidationErrors
];

// =====================================
// SOS ENDPOINT VALIDATORS
// =====================================
/**
 * Validates POST /api/sos request body
 * Required: userId, location (with latitude/longitude)
 * Optional: type, notes
 */
const validateSOSRequest = [
    body('userId')
        .notEmpty().withMessage('User ID is required')
        .isString().withMessage('User ID must be a string'),
    body('location')
        .notEmpty().withMessage('Location is required')
        .isObject().withMessage('Location must be an object'),
    body('location.latitude')
        .isFloat({ min: -90, max: 90 }).withMessage('Valid latitude is required'),
    body('location.longitude')
        .isFloat({ min: -180, max: 180 }).withMessage('Valid longitude is required'),
    body('location.address')
        .optional()
        .isString().withMessage('Address must be a string'),
    body('type')
        .optional()
        .isIn(['medical_emergency', 'labor_emergency', 'accident', 'other'])
        .withMessage('Invalid SOS type'),
    body('notes')
        .optional()
        .isString().withMessage('Notes must be a string')
        .isLength({ max: 1000 }).withMessage('Notes cannot exceed 1000 characters'),
    handleValidationErrors
];

module.exports = {
    validateEmergencyRequest,
    validateHospitalsQuery,
    validateContactsRequest,
    validateTipsQuery,
    validateSOSRequest,
    handleValidationErrors
};
