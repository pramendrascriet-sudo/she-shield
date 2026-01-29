import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const AppContext = createContext();

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
};

export const AppProvider = ({ children }) => {
    // Language state
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('sheshield_language') || 'en';
    });

    // Location state
    const [location, setLocation] = useState(null);
    const [locationLoading, setLocationLoading] = useState(true);
    const [locationError, setLocationError] = useState(null);

    // Emergency contacts
    const [emergencyContacts, setEmergencyContacts] = useState(() => {
        const saved = localStorage.getItem('sheshield_contacts');
        return saved ? JSON.parse(saved) : [];
    });

    // Medical profile
    const [medicalProfile, setMedicalProfile] = useState(() => {
        const saved = localStorage.getItem('sheshield_medical');
        return saved ? JSON.parse(saved) : {
            bloodGroup: '',
            allergies: [],
            reports: []
        };
    });

    // Safety Timer state
    const [safetyTimer, setSafetyTimer] = useState({
        active: false,
        endTime: null,
        duration: 0
    });

    // Fake Call state
    const [fakeCall, setFakeCall] = useState({
        scheduled: false,
        triggerTime: null,
        callerName: 'Mom',
        active: false
    });

    // Location Sharing state
    const [locationSharing, setLocationSharing] = useState({
        active: false,
        sharedWith: []
    });

    // Selected location for navigation
    const [selectedLocation, setSelectedLocation] = useState(null);

    // SOS modal state
    const [showSOSModal, setShowSOSModal] = useState(false);

    // Get translation
    const t = (key) => {
        return translations[language]?.[key] || translations.en[key] || key;
    };

    // Toggle language
    const toggleLanguage = () => {
        const newLang = language === 'en' ? 'hi' : 'en';
        setLanguage(newLang);
        localStorage.setItem('sheshield_language', newLang);
    };

    // Get user location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                    setLocationLoading(false);
                },
                (error) => {
                    setLocationError(error.message);
                    setLocationLoading(false);
                    // Set default location (Delhi)
                    setLocation({ lat: 28.6139, lng: 77.2090 });
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        } else {
            setLocationError('Geolocation not supported');
            setLocationLoading(false);
            setLocation({ lat: 28.6139, lng: 77.2090 });
        }
    }, []);

    // Save emergency contacts
    const saveEmergencyContact = (contact) => {
        const updated = [...emergencyContacts, { ...contact, id: Date.now() }];
        if (updated.length <= 5) {
            setEmergencyContacts(updated);
            localStorage.setItem('sheshield_contacts', JSON.stringify(updated));
        }
    };

    const deleteEmergencyContact = (id) => {
        const updated = emergencyContacts.filter(c => c.id !== id);
        setEmergencyContacts(updated);
        localStorage.setItem('sheshield_contacts', JSON.stringify(updated));
    };

    // Update medical profile
    const updateMedicalProfile = (updates) => {
        const updated = { ...medicalProfile, ...updates };
        setMedicalProfile(updated);
        localStorage.setItem('sheshield_medical', JSON.stringify(updated));
    };

    // Add report
    const addReport = (report) => {
        const updated = {
            ...medicalProfile,
            reports: [...medicalProfile.reports, { ...report, id: Date.now(), date: new Date().toISOString() }]
        };
        setMedicalProfile(updated);
        localStorage.setItem('sheshield_medical', JSON.stringify(updated));
    };

    // Safety Timer functions
    const startSafetyTimer = (durationMinutes) => {
        const endTime = Date.now() + durationMinutes * 60 * 1000;
        setSafetyTimer({
            active: true,
            endTime,
            duration: durationMinutes
        });
    };

    const cancelSafetyTimer = () => {
        setSafetyTimer({
            active: false,
            endTime: null,
            duration: 0
        });
    };

    // Fake Call functions
    const scheduleFakeCall = (delaySeconds, callerName = 'Mom') => {
        const triggerTime = Date.now() + delaySeconds * 1000;
        setFakeCall({
            scheduled: true,
            triggerTime,
            callerName,
            active: false
        });
    };

    const triggerFakeCall = () => {
        setFakeCall(prev => ({
            ...prev,
            scheduled: false,
            active: true
        }));
    };

    const endFakeCall = () => {
        setFakeCall({
            scheduled: false,
            triggerTime: null,
            callerName: 'Mom',
            active: false
        });
    };

    // Location Sharing functions
    const getShareableLocation = () => {
        if (location) {
            return `https://www.google.com/maps?q=${location.lat},${location.lng}`;
        }
        return null;
    };

    const shareLocation = (method) => {
        const url = getShareableLocation();
        if (!url) return;

        const message = `🆘 SheShield Safety Alert! I'm sharing my location with you. Please check on me. ${url}`;

        if (method === 'whatsapp') {
            window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
        } else if (method === 'sms') {
            window.open(`sms:?body=${encodeURIComponent(message)}`, '_blank');
        } else if (method === 'copy') {
            navigator.clipboard.writeText(message);
        }

        setLocationSharing({ active: true, sharedWith: [...locationSharing.sharedWith, method] });
    };

    const value = {
        // Language
        language,
        toggleLanguage,
        t,

        // Location
        location,
        locationLoading,
        locationError,

        // Emergency contacts
        emergencyContacts,
        saveEmergencyContact,
        deleteEmergencyContact,

        // Medical profile
        medicalProfile,
        updateMedicalProfile,
        addReport,

        // Safety Timer
        safetyTimer,
        startSafetyTimer,
        cancelSafetyTimer,

        // Fake Call
        fakeCall,
        scheduleFakeCall,
        triggerFakeCall,
        endFakeCall,

        // Location Sharing
        locationSharing,
        getShareableLocation,
        shareLocation,

        // Location selection
        selectedLocation,
        setSelectedLocation,

        // SOS modal
        showSOSModal,
        setShowSOSModal
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};
