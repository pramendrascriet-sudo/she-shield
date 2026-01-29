import { MapPin, Navigation, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LocationBanner = () => {
    const { t, location, locationLoading, locationError } = useApp();

    return (
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-purple-100">
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center gap-3">
                    {locationLoading ? (
                        <>
                            <Loader2 className="w-5 h-5 text-purple-500 animate-spin" />
                            <span className="text-gray-600 text-sm">{t('detectingLocation')}</span>
                        </>
                    ) : locationError ? (
                        <>
                            <MapPin className="w-5 h-5 text-amber-500" />
                            <span className="text-amber-600 text-sm">{t('locationError')}</span>
                        </>
                    ) : (
                        <>
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <Navigation className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                                <span className="text-green-600 text-sm font-medium">{t('locationEnabled')}</span>
                                <p className="text-xs text-gray-500">
                                    {location?.lat.toFixed(4)}°N, {location?.lng.toFixed(4)}°E
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LocationBanner;
