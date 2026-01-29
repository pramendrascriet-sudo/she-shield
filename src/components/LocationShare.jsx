import { useState } from 'react';
import { MapPin, Share2, MessageCircle, Copy, Check, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LocationShare = () => {
    const { t, location, getShareableLocation, shareLocation, emergencyContacts } = useApp();
    const [copied, setCopied] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleCopy = () => {
        shareLocation('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const locationUrl = getShareableLocation();

    return (
        <>
            {/* Location Share Card */}
            <div className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl gradient-safe flex items-center justify-center shadow-glow-green">
                        <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-lg">{t('locationShare')}</h3>
                        <p className="text-gray-500 text-sm">{t('locationShareDesc')}</p>
                    </div>
                </div>

                {location ? (
                    <div className="space-y-3">
                        <div className="bg-emerald-50 rounded-xl p-3 flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-emerald-600" />
                            <span className="text-emerald-700 text-sm font-medium">
                                {location.lat.toFixed(4)}°N, {location.lng.toFixed(4)}°E
                            </span>
                        </div>

                        <button
                            onClick={() => setShowModal(true)}
                            className="w-full py-3 rounded-xl gradient-safe text-white font-semibold hover:opacity-90 transition-opacity shadow-lg flex items-center justify-center gap-2"
                        >
                            <Share2 className="w-5 h-5" />
                            {t('shareNow')}
                        </button>
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-gray-500">{t('detectingLocation')}</p>
                    </div>
                )}
            </div>

            {/* Share Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 modal-overlay flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-scale-in overflow-hidden">
                        <div className="gradient-safe p-6 text-center">
                            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
                                <MapPin className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-xl font-bold text-white">{t('locationShare')}</h2>
                            <p className="text-white/80 text-sm mt-1">Share your location with trusted contacts</p>
                        </div>

                        <div className="p-5 space-y-3">
                            {/* Share Options */}
                            <button
                                onClick={() => shareLocation('whatsapp')}
                                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-green-500 text-white hover:bg-green-600 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                    <MessageCircle className="w-6 h-6" />
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="font-semibold">{t('shareViaWhatsApp')}</p>
                                    <p className="text-white/80 text-sm">Open WhatsApp to share</p>
                                </div>
                                <ExternalLink className="w-5 h-5" />
                            </button>

                            <button
                                onClick={() => shareLocation('sms')}
                                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                    <MessageCircle className="w-6 h-6" />
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="font-semibold">{t('shareViaSMS')}</p>
                                    <p className="text-white/80 text-sm">Send via SMS</p>
                                </div>
                                <ExternalLink className="w-5 h-5" />
                            </button>

                            <button
                                onClick={handleCopy}
                                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                    {copied ? <Check className="w-6 h-6 text-green-600" /> : <Copy className="w-6 h-6" />}
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="font-semibold">{t('copyLink')}</p>
                                    <p className="text-gray-500 text-sm truncate">{locationUrl}</p>
                                </div>
                            </button>

                            {/* Emergency Contacts Quick Share */}
                            {emergencyContacts.length > 0 && (
                                <div className="pt-3 border-t border-gray-100">
                                    <p className="text-sm text-gray-500 mb-2">Quick share with contacts:</p>
                                    <div className="flex gap-2 overflow-x-auto pb-2">
                                        {emergencyContacts.map((contact) => (
                                            <a
                                                key={contact.id}
                                                href={`sms:${contact.phone}?body=${encodeURIComponent(`🆘 SheShield Alert! Check my location: ${locationUrl}`)}`}
                                                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
                                            >
                                                <span className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold">
                                                    {contact.name.charAt(0)}
                                                </span>
                                                {contact.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="px-5 pb-5">
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-full py-3 rounded-xl bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors"
                            >
                                {t('close')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LocationShare;
