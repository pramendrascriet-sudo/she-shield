# Pregnancy Safety Platform - Backend API

A Node.js Express backend API for the Pregnancy Safety Platform, providing emergency alerts, hospital finder, contacts management, pregnancy tips, and SOS logging capabilities.

## 🚀 Quick Start

### Installation

```bash
cd server
npm install
```

### Running the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3001`

## 📚 API Endpoints

### 1. POST /api/emergency
Send emergency alerts to contacts.

**Request Body:**
```json
{
  "location": {
    "latitude": 28.6139,
    "longitude": 77.2090
  },
  "userId": "user_001",
  "contactNumbers": ["+91-9888888801", "+91-9888888802"],
  "message": "Need immediate help!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Emergency alert sent successfully",
  "data": {
    "alertId": "alert_abc123",
    "notificationResults": [...],
    "nearestHospital": {...},
    "instructions": [...]
  }
}
```

---

### 2. GET /api/hospitals
Get nearby hospitals sorted by distance.

**Query Parameters:**
- `latitude` (required): User's latitude
- `longitude` (required): User's longitude
- `radius` (optional): Search radius in km (default: 10)

**Example:**
```
GET /api/hospitals?latitude=28.6139&longitude=77.2090&radius=15
```

**Response:**
```json
{
  "success": true,
  "data": {
    "count": 6,
    "searchRadius": "15 km",
    "hospitals": [
      {
        "id": "hosp_001",
        "name": "City Maternity Hospital",
        "distance": "0.5 km",
        "rating": 4.8,
        "isEmergencyAvailable": true,
        ...
      }
    ]
  }
}
```

---

### 3. POST /api/user/contacts
Save emergency contacts for a user.

**Request Body:**
```json
{
  "userId": "user_001",
  "contacts": [
    {
      "name": "Rahul Sharma",
      "phone": "+91-9888888801",
      "relationship": "Husband",
      "isPrimary": true
    },
    {
      "name": "Dr. Anjali Mehta",
      "phone": "+91-9876543100",
      "relationship": "Doctor"
    }
  ]
}
```

---

### 4. GET /api/tips
Get pregnancy tips by trimester.

**Query Parameters:**
- `trimester` (optional): 1, 2, or 3
- `category` (optional): Filter by category (Nutrition, Health, Wellness, etc.)

**Example:**
```
GET /api/tips?trimester=2&category=Nutrition
```

---

### 5. POST /api/sos
Log SOS events for analytics.

**Request Body:**
```json
{
  "userId": "user_001",
  "location": {
    "latitude": 28.6139,
    "longitude": 77.2090,
    "address": "Near City Center"
  },
  "type": "medical_emergency",
  "notes": "Experiencing severe pain"
}
```

**SOS Types:**
- `medical_emergency`
- `labor_emergency`
- `accident`
- `other`

---

### Bonus: GET /api/sos/history/:userId
Get SOS event history for a user.

---

### Health Check: GET /api/health
Returns server health status.

## 🔒 Input Validation

All endpoints include comprehensive input validation:
- Required field checks
- Data type validation
- Range validation (coordinates, phone numbers)
- Array length limits

## 🛠️ Error Handling

Consistent error response format:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Specific error message"
    }
  ]
}
```

## 📁 Project Structure

```
server/
├── server.js              # Main Express server
├── package.json           # Dependencies
├── data/
│   └── mockDatabase.js    # Mock data for development
├── middleware/
│   ├── validators.js      # Input validation rules
│   └── errorHandler.js    # Error handling middleware
├── routes/
│   └── api.js             # API route definitions
└── utils/
    └── helpers.js         # Utility functions
```

## 🏥 Mock Data

The API includes realistic mock data:
- 6 hospitals with full details
- 2 sample users
- Emergency contacts
- 27 pregnancy tips (9 per trimester)
- Sample SOS events

## 📝 Notes

- All timestamps are in ISO 8601 format
- Phone numbers should include country code (e.g., +91-9876543210)
- Coordinates use decimal degrees format
- CORS is configured for local development ports
