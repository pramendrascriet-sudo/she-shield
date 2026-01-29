/**
 * Mock Database for Pregnancy Safety Platform
 * Contains realistic sample data for hospitals, users, emergency contacts,
 * pregnancy tips, and SOS event logs.
 */

// =====================================
// HOSPITALS DATABASE
// =====================================
const hospitals = [
    {
        id: "hosp_001",
        name: "City Maternity Hospital",
        address: "123 Healthcare Drive, Downtown",
        phone: "+91-9876543210",
        emergencyPhone: "+91-9876543211",
        latitude: 28.6139,
        longitude: 77.2090,
        rating: 4.8,
        totalRatings: 1256,
        specialties: ["Obstetrics", "Gynecology", "Neonatal Care", "High-Risk Pregnancy"],
        facilities: ["24/7 Emergency", "ICU", "NICU", "Blood Bank", "Pharmacy", "Ambulance"],
        availableBeds: 45,
        isEmergencyAvailable: true,
        openHours: "24/7",
        imageUrl: "/images/hospitals/city-maternity.jpg"
    },
    {
        id: "hosp_002",
        name: "Women & Child Care Center",
        address: "456 Mother's Lane, Sector 15",
        phone: "+91-9876543220",
        emergencyPhone: "+91-9876543221",
        latitude: 28.6200,
        longitude: 77.2150,
        rating: 4.6,
        totalRatings: 892,
        specialties: ["Obstetrics", "Pediatrics", "Fertility Treatments", "Prenatal Care"],
        facilities: ["Emergency Care", "Labor Rooms", "Operation Theater", "Ultrasound"],
        availableBeds: 30,
        isEmergencyAvailable: true,
        openHours: "24/7",
        imageUrl: "/images/hospitals/women-child.jpg"
    },
    {
        id: "hosp_003",
        name: "Apollo Women's Hospital",
        address: "789 Wellness Road, Central District",
        phone: "+91-9876543230",
        emergencyPhone: "+91-9876543231",
        latitude: 28.6280,
        longitude: 77.2200,
        rating: 4.9,
        totalRatings: 2340,
        specialties: ["High-Risk Pregnancy", "IVF", "Obstetrics", "Gynecological Surgery"],
        facilities: ["24/7 Emergency", "ICU", "NICU", "Blood Bank", "Pharmacy", "Ambulance", "Cafeteria"],
        availableBeds: 120,
        isEmergencyAvailable: true,
        openHours: "24/7",
        imageUrl: "/images/hospitals/apollo-women.jpg"
    },
    {
        id: "hosp_004",
        name: "Sunrise Maternity Clinic",
        address: "321 Care Street, East Side",
        phone: "+91-9876543240",
        emergencyPhone: "+91-9876543241",
        latitude: 28.6050,
        longitude: 77.2300,
        rating: 4.3,
        totalRatings: 456,
        specialties: ["Normal Delivery", "Prenatal Checkups", "Postnatal Care"],
        facilities: ["Ultrasound", "Labor Rooms", "Pharmacy"],
        availableBeds: 15,
        isEmergencyAvailable: false,
        openHours: "8:00 AM - 10:00 PM",
        imageUrl: "/images/hospitals/sunrise-maternity.jpg"
    },
    {
        id: "hosp_005",
        name: "Max Super Specialty Hospital",
        address: "555 Medical Hub, South Extension",
        phone: "+91-9876543250",
        emergencyPhone: "+91-9876543251",
        latitude: 28.5900,
        longitude: 77.2100,
        rating: 4.7,
        totalRatings: 3120,
        specialties: ["Obstetrics", "Neonatology", "Fetal Medicine", "Maternal Care"],
        facilities: ["24/7 Emergency", "ICU", "NICU", "Blood Bank", "Pharmacy", "Ambulance", "Helicopter Pad"],
        availableBeds: 200,
        isEmergencyAvailable: true,
        openHours: "24/7",
        imageUrl: "/images/hospitals/max-hospital.jpg"
    },
    {
        id: "hosp_006",
        name: "Fortis Mother & Baby Hospital",
        address: "888 Healthcare Avenue, North Block",
        phone: "+91-9876543260",
        emergencyPhone: "+91-9876543261",
        latitude: 28.6350,
        longitude: 77.1950,
        rating: 4.5,
        totalRatings: 1890,
        specialties: ["Obstetrics", "Gynecology", "Pediatrics", "Lactation Support"],
        facilities: ["24/7 Emergency", "ICU", "NICU", "Pharmacy", "Ambulance"],
        availableBeds: 80,
        isEmergencyAvailable: true,
        openHours: "24/7",
        imageUrl: "/images/hospitals/fortis-baby.jpg"
    }
];

// =====================================
// USERS DATABASE
// =====================================
const users = [
    {
        id: "user_001",
        name: "Priya Sharma",
        email: "priya.sharma@email.com",
        phone: "+91-9898989898",
        dueDate: "2026-04-15",
        trimester: 2,
        bloodGroup: "O+",
        allergies: ["Penicillin"],
        medicalConditions: ["Gestational Diabetes"],
        doctorName: "Dr. Anjali Mehta",
        doctorPhone: "+91-9876543100",
        createdAt: "2025-10-01T10:00:00Z"
    },
    {
        id: "user_002",
        name: "Ananya Reddy",
        email: "ananya.r@email.com",
        phone: "+91-9797979797",
        dueDate: "2026-02-28",
        trimester: 3,
        bloodGroup: "A+",
        allergies: [],
        medicalConditions: [],
        doctorName: "Dr. Suresh Kumar",
        doctorPhone: "+91-9876543200",
        createdAt: "2025-08-15T14:30:00Z"
    }
];

// =====================================
// EMERGENCY CONTACTS DATABASE
// =====================================
const emergencyContacts = [
    {
        id: "contact_001",
        userId: "user_001",
        contacts: [
            {
                name: "Rahul Sharma",
                relationship: "Husband",
                phone: "+91-9888888801",
                isPrimary: true
            },
            {
                name: "Sunita Sharma",
                relationship: "Mother-in-law",
                phone: "+91-9888888802",
                isPrimary: false
            },
            {
                name: "Dr. Anjali Mehta",
                relationship: "Doctor",
                phone: "+91-9876543100",
                isPrimary: false
            }
        ],
        updatedAt: "2025-12-01T09:00:00Z"
    },
    {
        id: "contact_002",
        userId: "user_002",
        contacts: [
            {
                name: "Vikram Reddy",
                relationship: "Husband",
                phone: "+91-9777777701",
                isPrimary: true
            },
            {
                name: "Lakshmi Reddy",
                relationship: "Mother",
                phone: "+91-9777777702",
                isPrimary: false
            }
        ],
        updatedAt: "2025-11-20T16:45:00Z"
    }
];

// =====================================
// PREGNANCY TIPS DATABASE
// =====================================
const pregnancyTips = {
    // First Trimester (Weeks 1-12)
    1: [
        {
            id: "tip_1_001",
            title: "Take Prenatal Vitamins",
            content: "Start taking prenatal vitamins with folic acid (400-800 mcg) to support your baby's neural tube development. This is crucial in the first 12 weeks.",
            category: "Nutrition",
            priority: "high"
        },
        {
            id: "tip_1_002",
            title: "Stay Hydrated",
            content: "Drink at least 8-10 glasses of water daily. Proper hydration helps prevent constipation and supports increased blood volume.",
            category: "Wellness",
            priority: "medium"
        },
        {
            id: "tip_1_003",
            title: "Manage Morning Sickness",
            content: "Eat small, frequent meals throughout the day. Keep crackers by your bedside and try ginger tea to ease nausea.",
            category: "Health",
            priority: "high"
        },
        {
            id: "tip_1_004",
            title: "Get Adequate Rest",
            content: "Your body is working hard to support your growing baby. Aim for 8-9 hours of sleep and take naps when needed.",
            category: "Wellness",
            priority: "medium"
        },
        {
            id: "tip_1_005",
            title: "Avoid Harmful Substances",
            content: "Completely avoid alcohol, smoking, and limit caffeine to 200mg per day. These can affect your baby's development.",
            category: "Safety",
            priority: "high"
        },
        {
            id: "tip_1_006",
            title: "Schedule Your First Prenatal Visit",
            content: "Book your first prenatal appointment between weeks 6-8. Your doctor will confirm your pregnancy and estimate your due date.",
            category: "Medical",
            priority: "high"
        },
        {
            id: "tip_1_007",
            title: "Listen to Your Body",
            content: "It's normal to feel tired and emotional. Communicate with your partner about your needs and don't hesitate to ask for help.",
            category: "Emotional",
            priority: "medium"
        },
        {
            id: "tip_1_008",
            title: "Safe Exercise",
            content: "Light exercises like walking and swimming are beneficial. Avoid high-impact activities and always consult your doctor first.",
            category: "Fitness",
            priority: "medium"
        }
    ],

    // Second Trimester (Weeks 13-26)
    2: [
        {
            id: "tip_2_001",
            title: "Increase Protein Intake",
            content: "Your baby is growing rapidly. Include lean meats, eggs, legumes, and dairy in your diet for adequate protein.",
            category: "Nutrition",
            priority: "high"
        },
        {
            id: "tip_2_002",
            title: "Iron-Rich Foods",
            content: "Include iron-rich foods like spinach, lentils, and fortified cereals to prevent anemia. Pair with vitamin C for better absorption.",
            category: "Nutrition",
            priority: "high"
        },
        {
            id: "tip_2_003",
            title: "Prenatal Yoga",
            content: "Second trimester is great for prenatal yoga. It helps with flexibility, reduces stress, and prepares your body for labor.",
            category: "Fitness",
            priority: "medium"
        },
        {
            id: "tip_2_004",
            title: "Sleep on Your Side",
            content: "Start sleeping on your left side with a pillow between your knees. This improves blood flow to your baby.",
            category: "Wellness",
            priority: "medium"
        },
        {
            id: "tip_2_005",
            title: "Dental Check-up",
            content: "Pregnancy hormones can affect your gums. Schedule a dental cleaning and inform your dentist about your pregnancy.",
            category: "Medical",
            priority: "medium"
        },
        {
            id: "tip_2_006",
            title: "Anatomy Scan",
            content: "Around week 18-22, you'll have your anatomy scan. This detailed ultrasound checks your baby's development and you may learn the gender.",
            category: "Medical",
            priority: "high"
        },
        {
            id: "tip_2_007",
            title: "Moisturize Your Skin",
            content: "Use stretch mark creams or natural oils like coconut oil on your belly, breasts, and thighs to keep skin supple.",
            category: "Self-Care",
            priority: "low"
        },
        {
            id: "tip_2_008",
            title: "Start Kegel Exercises",
            content: "Strengthen your pelvic floor muscles with Kegel exercises. This helps with bladder control and recovery after delivery.",
            category: "Fitness",
            priority: "medium"
        },
        {
            id: "tip_2_009",
            title: "Talk to Your Baby",
            content: "Around week 18, your baby can hear. Talking, singing, or playing music helps with bonding and brain development.",
            category: "Bonding",
            priority: "low"
        }
    ],

    // Third Trimester (Weeks 27-40)
    3: [
        {
            id: "tip_3_001",
            title: "Pack Your Hospital Bag",
            content: "By week 35, have your hospital bag ready with essentials for you and baby including documents, comfortable clothes, and toiletries.",
            category: "Preparation",
            priority: "high"
        },
        {
            id: "tip_3_002",
            title: "Monitor Baby's Movements",
            content: "Track your baby's kicks daily. You should feel at least 10 movements within 2 hours. Contact your doctor if movements decrease.",
            category: "Safety",
            priority: "high"
        },
        {
            id: "tip_3_003",
            title: "Practice Breathing Exercises",
            content: "Learn and practice deep breathing and relaxation techniques. These will help manage pain during labor.",
            category: "Preparation",
            priority: "medium"
        },
        {
            id: "tip_3_004",
            title: "Attend Childbirth Classes",
            content: "Enroll in childbirth preparation classes with your partner. Learn about labor stages, pain management, and newborn care.",
            category: "Education",
            priority: "medium"
        },
        {
            id: "tip_3_005",
            title: "Rest Frequently",
            content: "Your body is working hard carrying extra weight. Take frequent breaks, elevate your feet, and don't stand for long periods.",
            category: "Wellness",
            priority: "medium"
        },
        {
            id: "tip_3_006",
            title: "Know the Signs of Labor",
            content: "Learn to recognize labor signs: regular contractions, water breaking, bloody show. Know when to go to the hospital.",
            category: "Safety",
            priority: "high"
        },
        {
            id: "tip_3_007",
            title: "Prepare for Breastfeeding",
            content: "Attend a breastfeeding class and stock up on nursing supplies. Consider meeting with a lactation consultant.",
            category: "Preparation",
            priority: "medium"
        },
        {
            id: "tip_3_008",
            title: "Finalize Baby's Nursery",
            content: "Complete the nursery setup including crib, changing station, and baby supplies. Install the car seat properly.",
            category: "Preparation",
            priority: "medium"
        },
        {
            id: "tip_3_009",
            title: "Stay Active",
            content: "Continue light exercises like walking and stretching. This can help with easier labor and faster recovery.",
            category: "Fitness",
            priority: "medium"
        },
        {
            id: "tip_3_010",
            title: "Final Medical Checkups",
            content: "From week 36, you'll have weekly checkups. Your doctor will monitor baby's position and check for signs of labor.",
            category: "Medical",
            priority: "high"
        }
    ]
};

// =====================================
// SOS EVENTS LOG DATABASE
// =====================================
const sosEvents = [
    {
        id: "sos_001",
        userId: "user_001",
        timestamp: "2025-12-15T14:30:00Z",
        location: {
            latitude: 28.6139,
            longitude: 77.2090,
            address: "Near City Maternity Hospital"
        },
        type: "medical_emergency",
        status: "resolved",
        contactsNotified: ["+91-9888888801", "+91-9888888802"],
        responseTime: 180, // seconds
        notes: "False alarm - resolved by user"
    },
    {
        id: "sos_002",
        userId: "user_002",
        timestamp: "2025-12-20T22:15:00Z",
        location: {
            latitude: 28.6200,
            longitude: 77.2150,
            address: "Sector 15, Near Metro Station"
        },
        type: "labor_emergency",
        status: "resolved",
        contactsNotified: ["+91-9777777701", "+91-9777777702"],
        responseTime: 120,
        notes: "Patient transported to hospital successfully"
    }
];

// =====================================
// EMERGENCY ALERTS LOG DATABASE
// =====================================
const emergencyAlerts = [];

// =====================================
// DATABASE EXPORT
// =====================================
module.exports = {
    hospitals,
    users,
    emergencyContacts,
    pregnancyTips,
    sosEvents,
    emergencyAlerts
};
