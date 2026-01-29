import { useState, useEffect } from 'react';
import { Star, Phone, Navigation, MapPin, Clock, Shield, Building, Ambulance, Users, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getNearbyLocations, isPlacesAPIConfigured } from '../services/placesService';

const typeConfig = {
    police: {
        label: 'Police Station',
        icon: Shield,
        color: 'bg-blue-500',
        lightColor: 'bg-blue-100 text-blue-600'
    },
    womenCenter: {
        label: 'Women Help Center',
        icon: Users,
        color: 'bg-purple-500',
        lightColor: 'bg-purple-100 text-purple-600'
    },
    hospital: {
        label: 'Hospital',
        icon: Building,
        color: 'bg-red-500',
        lightColor: 'bg-red-100 text-red-600'
    }
};

const facilityIcons = {
    womenCell: Users,
    open24x7: Clock,
    cctv: Shield,
    emergency247: Clock,
    ambulance: Ambulance,
    trauma: Building,
    counseling: Users,
    legal: Shield,
    womenCare: Users
};

const facilityLabels = {
    womenCell: 'Women Cell',
    open24x7: '24/7',
    cctv: 'CCTV',
    emergency247: '24/7 ER',
    ambulance: 'Ambulance',
    trauma: 'Trauma',
    counseling: 'Counseling',
    legal: 'Legal Aid',
    womenCare: 'Women Care'
};

const SafetyLocations = () => {
    const { t, location, setSelectedLocation, selectedLocation } = useApp();
    const [activeFilter, setActiveFilter] = useState('all');
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [apiConfigured, setApiConfigured] = useState(false);

    const filters = [
        { id: 'all', label: 'All', icon: MapPin },
        { id: 'police', label: 'Police', icon: Shield },
        { id: 'womenCenter', label: 'Women Centers', icon: Users },
        { id: 'hospital', label: 'Hospitals', icon: Building }
    ];

    // Check if API is configured
    useEffect(() => {
        setApiConfigured(isPlacesAPIConfigured());
    }, []);

    // Fetch locations when user's location or filter changes
    useEffect(() => {
        if (location && apiConfigured) {
            fetchLocations();
        }
    }, [location, activeFilter, apiConfigured]);

    const fetchLocations = async () => {
        if (!location) {
            setError('Location not available');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const nearbyLocations = await getNearbyLocations(location, activeFilter);
            setLocations(nearbyLocations);

            if (nearbyLocations.length === 0) {
                setError('No locations found nearby. Try increasing search radius.');
            }
        } catch (err) {
            console.error('Error fetching locations:', err);
            setError(err.message || 'Failed to fetch locations. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const openDirections = (location) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`;
        window.open(url, '_blank');
    };

    // Show location permission prompt if location is not available
    if (!location) {
        return (
            <section id="locations" className="py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full gradient-purple flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">{t('nearbySafetyLocations')}</h2>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
                        <MapPin className="w-16 h-16 text-amber-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Enable Location Access</h3>
                        <p className="text-gray-600 mb-4">
                            Please enable location access to see nearby hospitals, police stations, and women help centers.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 rounded-xl gradient-purple text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
                        >
                            Enable Location
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    // Show API configuration message if not configured
    if (!apiConfigured) {
        return (
            <section id="locations" className="py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full gradient-purple flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">{t('nearbySafetyLocations')}</h2>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8">
                        <AlertCircle className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">API Key Required</h3>
                        <p className="text-gray-600 mb-4 text-center">
                            Google Places API key is not configured. Add your API key to the <code className="bg-gray-200 px-2 py-1 rounded">.env</code> file.
                        </p>
                        <div className="bg-white rounded-xl p-4 text-left">
                            <p className="text-sm text-gray-600 mb-2">Steps to configure:</p>
                            <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
                                <li>Get API key from Google Cloud Console</li>
                                <li>Create/edit <code className="bg-gray-200 px-1 rounded">.env</code> file</li>
                                <li>Add: <code className="bg-gray-200 px-1 rounded">VITE_GOOGLE_PLACES_API_KEY=your_key</code></li>
                                <li>Restart the dev server</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="locations" className="py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full gradient-purple flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">{t('nearbySafetyLocations')}</h2>
                    </div>

                    {/* Refresh Button */}
                    <button
                        onClick={fetchLocations}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-100 text-purple-600 hover:bg-purple-200 transition-colors disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
                    {filters.map((filter) => {
                        const Icon = filter.icon;
                        return (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${activeFilter === filter.id
                                        ? 'gradient-violet text-white shadow-lg'
                                        : 'bg-white text-gray-600 hover:bg-gray-50 shadow-soft'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {filter.label}
                            </button>
                        );
                    })}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
                        <p className="text-gray-500">Finding nearby safety locations...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                        <p className="text-red-600 font-medium">{error}</p>
                        <button
                            onClick={fetchLocations}
                            className="mt-4 px-6 py-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Locations Grid */}
                {!loading && !error && locations.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {locations.map((location, index) => {
                            const config = typeConfig[location.type];
                            const TypeIcon = config.icon;

                            return (
                                <div
                                    key={location.id}
                                    className={`bg-white rounded-2xl shadow-soft overflow-hidden hover:shadow-lg transition-all duration-300 animate-slide-up ${selectedLocation?.id === location.id ? 'ring-2 ring-purple-400' : ''
                                        }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                    onClick={() => setSelectedLocation(location)}
                                >
                                    {/* Location Image */}
                                    <div className="relative h-40 bg-gradient-to-br from-purple-100 to-sky-100">
                                        <img
                                            src={location.image}
                                            alt={location.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                        <div className="absolute top-3 left-3">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${config.lightColor} text-xs font-medium`}>
                                                <TypeIcon className="w-3 h-3" />
                                                {config.label}
                                            </span>
                                        </div>
                                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm flex items-center gap-1">
                                            <Star className="w-4 h-4 text-amber-400" fill="#fbbf24" />
                                            <span className="text-sm font-semibold text-gray-700">{location.rating}</span>
                                        </div>
                                        <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-purple-500 text-white text-sm font-medium">
                                            {location.distance} km
                                        </div>
                                    </div>

                                    {/* Location Info */}
                                    <div className="p-4">
                                        <h3 className="font-bold text-gray-800 text-lg mb-1">{location.name}</h3>
                                        <p className="text-gray-500 text-sm mb-3 line-clamp-1">{location.address}</p>

                                        {/* Facilities */}
                                        {location.facilities && location.facilities.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {location.facilities.slice(0, 3).map((facility) => {
                                                    const Icon = facilityIcons[facility] || Shield;
                                                    return (
                                                        <span
                                                            key={facility}
                                                            className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-violet-50 text-violet-600 text-xs font-medium"
                                                        >
                                                            <Icon className="w-3 h-3" />
                                                            {facilityLabels[facility]}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex gap-2">
                                            {location.phone && location.phone !== 'N/A' && (
                                                <a
                                                    href={`tel:${location.phone}`}
                                                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
                                                >
                                                    <Phone className="w-4 h-4" />
                                                    {t('call')}
                                                </a>
                                            )}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openDirections(location);
                                                }}
                                                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl gradient-purple text-white font-medium hover:opacity-90 transition-opacity"
                                            >
                                                <Navigation className="w-4 h-4" />
                                                {t('getDirections')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default SafetyLocations;
