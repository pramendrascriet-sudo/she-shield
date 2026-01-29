import { useState, useEffect } from 'react';
import { Phone, X, User, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

const FakeCall = () => {
    const { t, fakeCall, scheduleFakeCall, triggerFakeCall, endFakeCall } = useApp();
    const [showScheduler, setShowScheduler] = useState(false);
    const [delay, setDelay] = useState(30);
    const [callerName, setCallerName] = useState('Mom');
    const [countdown, setCountdown] = useState(0);

    // Handle countdown for scheduled call
    useEffect(() => {
        if (fakeCall.scheduled && fakeCall.triggerTime) {
            const interval = setInterval(() => {
                const remaining = Math.max(0, Math.ceil((fakeCall.triggerTime - Date.now()) / 1000));
                setCountdown(remaining);

                if (remaining === 0) {
                    triggerFakeCall();
                    clearInterval(interval);
                }
            }, 100);

            return () => clearInterval(interval);
        }
    }, [fakeCall.scheduled, fakeCall.triggerTime, triggerFakeCall]);

    const handleSchedule = () => {
        scheduleFakeCall(delay, callerName);
        setShowScheduler(false);
    };

    const delayOptions = [
        { value: 10, label: '10 sec' },
        { value: 30, label: '30 sec' },
        { value: 60, label: '1 min' },
        { value: 120, label: '2 min' },
        { value: 300, label: '5 min' }
    ];

    return (
        <>
            {/* Fake Call Card */}
            <div className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl gradient-purple flex items-center justify-center shadow-glow-purple">
                        <Phone className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg">{t('fakeCall')}</h3>
                        <p className="text-gray-500 text-sm">{t('fakeCallDesc')}</p>
                    </div>
                </div>

                {fakeCall.scheduled ? (
                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                        <p className="text-purple-600 font-medium mb-2">{t('callIn')}</p>
                        <div className="text-4xl font-bold text-purple-700 mb-3">{countdown}s</div>
                        <button
                            onClick={endFakeCall}
                            className="px-6 py-2 rounded-xl bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-colors"
                        >
                            {t('cancel')}
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setShowScheduler(true)}
                        className="w-full py-3 rounded-xl gradient-purple text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
                    >
                        {t('scheduleCall')}
                    </button>
                )}
            </div>

            {/* Scheduler Modal */}
            {showScheduler && (
                <div className="fixed inset-0 z-50 modal-overlay flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-scale-in">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800">{t('scheduleCall')}</h3>
                            <button
                                onClick={() => setShowScheduler(false)}
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-5 space-y-5">
                            {/* Caller Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <User className="w-4 h-4 inline mr-1" />
                                    {t('callerName')}
                                </label>
                                <input
                                    type="text"
                                    value={callerName}
                                    onChange={(e) => setCallerName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none"
                                    placeholder="Mom, Dad, Boss..."
                                />
                            </div>

                            {/* Delay Options */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    <Clock className="w-4 h-4 inline mr-1" />
                                    {t('callIn')}
                                </label>
                                <div className="grid grid-cols-5 gap-2">
                                    {delayOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            type="button"
                                            onClick={() => setDelay(option.value)}
                                            className={`py-2 px-3 rounded-xl text-sm font-medium transition-all ${delay === option.value
                                                    ? 'bg-purple-500 text-white shadow-lg'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleSchedule}
                                className="w-full py-3 rounded-xl gradient-purple text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
                            >
                                {t('scheduleCall')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Incoming Call Screen */}
            {fakeCall.active && (
                <div className="fixed inset-0 z-[100] bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-between py-16 px-8">
                    <div className="text-center">
                        <p className="text-gray-400 text-lg mb-2">{t('incomingCall')}</p>
                        <h2 className="text-white text-4xl font-bold mb-8">{fakeCall.callerName}</h2>
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center mx-auto animate-incoming-call">
                            <span className="text-white text-5xl font-bold">
                                {fakeCall.callerName.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-16">
                        <button
                            onClick={endFakeCall}
                            className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                        >
                            <Phone className="w-8 h-8 text-white rotate-[135deg]" />
                        </button>
                        <button
                            onClick={endFakeCall}
                            className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors animate-bounce-slow"
                        >
                            <Phone className="w-8 h-8 text-white" />
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-gray-500 text-sm">Tap any button to end</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default FakeCall;
