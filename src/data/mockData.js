export const safetyLocations = [
    {
        id: 1,
        name: "Central Police Station",
        type: "police",
        address: "123 Main Road, Central District",
        phone: "100",
        distance: 0.8,
        rating: 4.5,
        facilities: ["womenCell", "open24x7", "cctv"],
        coordinates: { lat: 28.6139, lng: 77.2090 },
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400"
    },
    {
        id: 2,
        name: "Women's Safety Cell",
        type: "womenCenter",
        address: "456 Safety Avenue, Women's District",
        phone: "181",
        distance: 1.2,
        rating: 4.8,
        facilities: ["womenCell", "open24x7", "counseling"],
        coordinates: { lat: 28.6129, lng: 77.2295 },
        image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400"
    },
    {
        id: 3,
        name: "City Hospital - Emergency",
        type: "hospital",
        address: "789 Healthcare Road, Medical Zone",
        phone: "108",
        distance: 1.5,
        rating: 4.7,
        facilities: ["emergency247", "ambulance", "trauma"],
        coordinates: { lat: 28.6449, lng: 77.2165 },
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400"
    },
    {
        id: 4,
        name: "Sector 5 Police Chowki",
        type: "police",
        address: "Sector 5, Near Market",
        phone: "100",
        distance: 2.1,
        rating: 4.3,
        facilities: ["open24x7", "cctv"],
        coordinates: { lat: 28.6329, lng: 77.2190 },
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400"
    },
    {
        id: 5,
        name: "Mahila Thana",
        type: "womenCenter",
        address: "654 Women's Safety Road",
        phone: "1091",
        distance: 2.8,
        rating: 4.6,
        facilities: ["womenCell", "open24x7", "legal"],
        coordinates: { lat: 28.5629, lng: 77.2290 },
        image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=400"
    },
    {
        id: 6,
        name: "Apollo Hospital",
        type: "hospital",
        address: "Apollo Street, South Zone",
        phone: "+91 1800 102 0288",
        distance: 3.2,
        rating: 4.9,
        facilities: ["emergency247", "ambulance", "trauma", "womenCare"],
        coordinates: { lat: 28.5829, lng: 77.2590 },
        image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400"
    }
];

export const ambulanceServices = [
    {
        id: 1,
        name: "108 Emergency Ambulance",
        phone: "108",
        type: "Government",
        eta: 8,
        available: true
    },
    {
        id: 2,
        name: "Apollo Ambulance",
        phone: "+91 1800 102 0288",
        type: "Private",
        eta: 12,
        available: true
    },
    {
        id: 3,
        name: "Medi Assist Ambulance",
        phone: "+91 9999999999",
        type: "Private",
        eta: 10,
        available: true
    },
    {
        id: 4,
        name: "Red Cross Ambulance",
        phone: "102",
        type: "Government",
        eta: 15,
        available: true
    }
];

export const helplineNumbers = [
    {
        id: 1,
        name: "Women Helpline",
        phone: "181",
        description: "24/7 Women Safety Helpline",
        icon: "Phone",
        color: "purple"
    },
    {
        id: 2,
        name: "Police Control Room",
        phone: "100",
        description: "Immediate Police Assistance",
        icon: "Shield",
        color: "blue"
    },
    {
        id: 3,
        name: "Women Police Helpline",
        phone: "1091",
        description: "Women-specific Police Help",
        icon: "Users",
        color: "violet"
    },
    {
        id: 4,
        name: "Domestic Violence",
        phone: "181",
        description: "Domestic Abuse Support",
        icon: "Heart",
        color: "pink"
    },
    {
        id: 5,
        name: "Child Helpline",
        phone: "1098",
        description: "Child Safety & Protection",
        icon: "Baby",
        color: "green"
    },
    {
        id: 6,
        name: "Emergency Ambulance",
        phone: "108",
        description: "Medical Emergency",
        icon: "Ambulance",
        color: "red"
    }
];

export const safetyTipsData = {
    travel: [
        {
            id: 1,
            title: "Share Your Journey",
            description: "Always share your live location with trusted contacts when traveling alone.",
            icon: "MapPin"
        },
        {
            id: 2,
            title: "Verify Cab Details",
            description: "Check driver photo, vehicle number and share trip details with family.",
            icon: "Car"
        },
        {
            id: 3,
            title: "Stay Alert",
            description: "Avoid using headphones in isolated areas. Stay aware of your surroundings.",
            icon: "Eye"
        }
    ],
    night: [
        {
            id: 4,
            title: "Well-Lit Routes",
            description: "Always choose well-lit and populated routes when walking at night.",
            icon: "Sun"
        },
        {
            id: 5,
            title: "Keep Phone Charged",
            description: "Ensure your phone is charged before heading out, keep a power bank.",
            icon: "Battery"
        },
        {
            id: 6,
            title: "Inform Someone",
            description: "Let someone know your expected arrival time and route.",
            icon: "MessageCircle"
        }
    ],
    digital: [
        {
            id: 7,
            title: "Privacy Settings",
            description: "Review social media privacy settings, limit location sharing publicly.",
            icon: "Lock"
        },
        {
            id: 8,
            title: "Strong Passwords",
            description: "Use unique, strong passwords for all accounts. Enable 2FA.",
            icon: "Key"
        },
        {
            id: 9,
            title: "Beware of Scams",
            description: "Don't share OTPs or personal info over calls or messages.",
            icon: "AlertTriangle"
        }
    ],
    publicTransport: [
        {
            id: 10,
            title: "Women's Compartment",
            description: "Use designated women's compartments in metros and trains.",
            icon: "Train"
        },
        {
            id: 11,
            title: "Emergency Buttons",
            description: "Know the location of emergency buttons in buses and metros.",
            icon: "AlertCircle"
        },
        {
            id: 12,
            title: "Crowded Spaces",
            description: "Be vigilant in crowded spaces. Report any inappropriate behavior.",
            icon: "Users"
        }
    ]
};

export const threatIndicators = [
    {
        id: 1,
        situation: "Someone is following you",
        severity: "high",
        action: "Enter a crowded place, call police or trusted contact immediately",
        tips: ["Change your route", "Enter a shop or public place", "Call for help loudly"]
    },
    {
        id: 2,
        situation: "Receiving threatening messages or calls",
        severity: "high",
        action: "Block the number, report to police, save evidence",
        tips: ["Don't respond", "Screenshot messages", "File a complaint"]
    },
    {
        id: 3,
        situation: "Someone is making you uncomfortable",
        severity: "medium",
        action: "Move away, use fake call feature, alert someone nearby",
        tips: ["Trust your instincts", "Create distance", "Seek help"]
    },
    {
        id: 4,
        situation: "Stranded in an unfamiliar area",
        severity: "medium",
        action: "Share location with family, find a safe public place",
        tips: ["Stay in well-lit areas", "Contact trusted people", "Use navigation apps"]
    },
    {
        id: 5,
        situation: "Cab driver taking wrong route",
        severity: "high",
        action: "Alert the driver, share live location, call emergency if needed",
        tips: ["Stay calm but alert", "Share trip details", "Call someone"]
    },
    {
        id: 6,
        situation: "Witnessing harassment of another woman",
        severity: "medium",
        action: "Record if safe, call for help, report to authorities",
        tips: ["Don't confront alone", "Gather witnesses", "Call police"]
    },
    {
        id: 7,
        situation: "Online stalking or cyber harassment",
        severity: "high",
        action: "Document everything, report to cyber cell, secure accounts",
        tips: ["Change passwords", "Enable 2FA", "File cyber complaint"]
    },
    {
        id: 8,
        situation: "Domestic violence or abuse",
        severity: "high",
        action: "Call Women Helpline 181, reach out to trusted person",
        tips: ["You are not alone", "Help is available", "Reach out to support groups"]
    }
];

// Legacy export for backward compatibility
export const hospitals = safetyLocations.filter(loc => loc.type === 'hospital');
export const emergencySymptoms = threatIndicators.map(t => ({
    id: t.id,
    symptom: t.situation,
    severity: t.severity,
    action: t.action
}));
