import { Phone, AlertTriangle, X, Shield, Ambulance, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';

const SOSButton = () => {
    const { t, showSOSModal, setShowSOSModal, emergencyContacts } = useApp();

    const emergencyNumbers = [
        { name: t('callWomenHelpline'), phone: '181', icon: Shield, color: 'bg-purple-500', description: 'Women Helpline' },
        { name: t('callPolice'), phone: '100', icon: Shield, color: 'bg-blue-500', description: 'Police Control Room' },
        { name: t('callAmbulance'), phone: '108', icon: Ambulance, color: 'bg-red-500', description: 'Emergency Ambulance' },
    ];

    return (
        <>
            {/* Floating SOS Button */}
            <button
                onClick={() => setShowSOSModal(true)}
                className="fixed bottom-6 right-6 z-40 w-20 h-20 rounded-full gradient-emergency shadow-glow-red flex items-center justify-center animate-pulse-slow hover:scale-110 transition-transform"
                aria-label="SOS Emergency"
            >
                <div className="text-center">
                    <AlertTriangle className="w-8 h-8 text-white mx-auto" />
                    <span className="text-white text-xs font-bold">SOS</span>
                </div>
            </button>

            {/* Emergency Modal */}
            {showSOSModal && (
                <div className="fixed inset-0 z-50 modal-overlay flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-scale-in overflow-hidden">
                        {/* Header */}
                        <div className="gradient-emergency p-6 text-center relative">
                            <button
                                onClick={() => setShowSOSModal(false)}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                            >
                                <X className="w-5 h-5 text-white" />
                            </button>
                            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 animate-pulse">
                                <AlertTriangle className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">{t('emergencyAlert')}</h2>
                            <p className="text-white/80 mt-1">{t('emergencyMessage')}</p>
                        </div>

                        {/* Emergency Contacts */}
                        <div className="p-6 space-y-3">
                            {/* Default Emergency Numbers */}
                            {emergencyNumbers.map((item, index) => (
                                <a
                                    key={index}
                                    href={`tel:${item.phone}`}
                                    className={`flex items-center gap-4 p-4 rounded-2xl ${item.color} text-white hover:opacity-90 transition-opacity shadow-lg`}
                                >
                                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-white/80 text-sm">{item.phone}</p>
                                    </div>
                                    <Phone className="w-6 h-6" />
                                </a>
                            ))}

                            {/* Women Police Helpline - Extra highlight */}
                            <a
                                href="tel:1091"
                                className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-500 text-white hover:opacity-90 transition-opacity shadow-lg"
                            >
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">Women Police Helpline</p>
                                    <p className="text-white/80 text-sm">1091</p>
                                </div>
                                <Phone className="w-6 h-6" />
                            </a>

                            {/* Personal Contacts */}
                            {emergencyContacts.length > 0 && (
                                <div className="pt-3 border-t border-gray-100">
                                    <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        {t('callFamily')}
                                    </p>
                                    {emergencyContacts.map((contact) => (
                                        <a
                                            key={contact.id}
                                            href={`tel:${contact.phone}`}
                                            className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500 text-white hover:opacity-90 transition-opacity shadow-lg mb-2"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                                <span className="text-lg font-bold">{contact.name.charAt(0)}</span>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold">{contact.name}</p>
                                                <p className="text-white/80 text-sm">{contact.relation}</p>
                                            </div>
                                            <Phone className="w-6 h-6" />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Close Button */}
                        <div className="px-6 pb-6">
                            <button
                                onClick={() => setShowSOSModal(false)}
                                className="w-full py-3 rounded-xl bg-gray-100 text-gray-600 font-medium hover:bg-gray-200 transition-colors"
                            >
                                {t('closeModal')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default SOSButton;
