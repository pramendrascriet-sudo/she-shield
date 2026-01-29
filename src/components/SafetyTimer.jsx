import { useState, useEffect } from 'react';
import { Timer, Play, X, AlertTriangle, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const SafetyTimer = () => {
    const { t, safetyTimer, startSafetyTimer, cancelSafetyTimer, shareLocation, emergencyContacts } = useApp();
    const [showSetup, setShowSetup] = useState(false);
    const [selectedMinutes, setSelectedMinutes] = useState(15);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [timerExpired, setTimerExpired] = useState(false);

    // Handle countdown
    useEffect(() => {
        if (safetyTimer.active && safetyTimer.endTime) {
            const interval = setInterval(() => {
                const remaining = Math.max(0, safetyTimer.endTime - Date.now());
                setTimeRemaining(remaining);

                if (remaining === 0 && !timerExpired) {
                    setTimerExpired(true);
                    // Trigger alerts
                    shareLocation('sms');
                    clearInterval(interval);
                }
            }, 100);

            return () => clearInterval(interval);
        }
    }, [safetyTimer.active, safetyTimer.endTime, timerExpired, shareLocation]);

    const handleStart = () => {
        startSafetyTimer(selectedMinutes);
        setShowSetup(false);
        setTimerExpired(false);
    };

    const handleCancel = () => {
        cancelSafetyTimer();
        setTimerExpired(false);
    };

    const formatTime = (ms) => {
        const totalSeconds = Math.ceil(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const timerOptions = [5, 10, 15, 30, 45, 60];

    return (
        <>
            {/* Safety Timer Card */}
            <div className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${safetyTimer.active ? 'gradient-emergency shadow-glow-red animate-pulse-slow' : 'gradient-blue'
                        }`}>
                        <Timer className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg">{t('safetyTimer')}</h3>
                        <p className="text-gray-500 text-sm">{t('safetyTimerDesc')}</p>
                    </div>
                </div>

                {safetyTimer.active ? (
                    <div className={`rounded-xl p-4 text-center ${timerExpired ? 'bg-red-50' : 'bg-amber-50'}`}>
                        {timerExpired ? (
                            <>
                                <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                                <p className="text-red-600 font-medium">{t('timerExpired')}</p>
                            </>
                        ) : (
                            <>
                                <p className="text-amber-600 font-medium mb-1">{t('timerActive')}</p>
                                <div className="text-5xl font-bold text-amber-700 mb-4 font-mono">
                                    {formatTime(timeRemaining)}
                                </div>
                                <button
                                    onClick={handleCancel}
                                    className="px-6 py-3 rounded-xl gradient-safe text-white font-semibold hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2 mx-auto"
                                >
                                    <CheckCircle className="w-5 h-5" />
                                    {t('cancelTimer')}
                                </button>
                            </>
                        )}
                    </div>
                ) : (
                    <button
                        onClick={() => setShowSetup(true)}
                        className="w-full py-3 rounded-xl gradient-blue text-white font-semibold hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2"
                    >
                        <Play className="w-5 h-5" />
                        {t('setTimer')}
                    </button>
                )}
            </div>

            {/* Timer Setup Modal */}
            {showSetup && (
                <div className="fixed inset-0 z-50 modal-overlay flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-scale-in">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800">{t('setTimer')}</h3>
                            <button
                                onClick={() => setShowSetup(false)}
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-5 space-y-5">
                            <div className="text-center py-4">
                                <div className="text-6xl font-bold text-purple-600 mb-2">{selectedMinutes}</div>
                                <p className="text-gray-500">{t('minutes')}</p>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                {timerOptions.map((min) => (
                                    <button
                                        key={min}
                                        type="button"
                                        onClick={() => setSelectedMinutes(min)}
                                        className={`py-3 px-4 rounded-xl font-medium transition-all ${selectedMinutes === min
                                                ? 'bg-purple-500 text-white shadow-lg scale-105'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {min} min
                                    </button>
                                ))}
                            </div>

                            <div className="bg-amber-50 rounded-xl p-4 flex gap-3">
                                <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-amber-700">
                                    <p className="font-medium mb-1">How it works:</p>
                                    <p>If you don't cancel the timer before it ends, emergency alerts with your location will be sent to your trusted contacts.</p>
                                </div>
                            </div>

                            {emergencyContacts.length === 0 && (
                                <div className="bg-red-50 rounded-xl p-4 text-center">
                                    <p className="text-red-600 text-sm">⚠️ Add trusted contacts first for alerts to work!</p>
                                </div>
                            )}

                            <button
                                onClick={handleStart}
                                disabled={emergencyContacts.length === 0}
                                className="w-full py-3 rounded-xl gradient-blue text-white font-semibold hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Play className="w-5 h-5" />
                                Start Timer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SafetyTimer;
