import { Phone, Ambulance, Clock, CheckCircle, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ambulanceServices, helplineNumbers } from '../data/mockData';

const AmbulanceFinder = () => {
    const { t } = useApp();

    // Icon mapping
    const iconMap = {
        Phone: Phone,
        Shield: Shield,
        Users: Shield,
        Heart: Shield,
        Baby: Shield,
        Ambulance: Ambulance
    };

    // Color mapping
    const colorMap = {
        purple: 'from-purple-400 to-purple-500',
        blue: 'from-blue-400 to-blue-500',
        violet: 'from-violet-400 to-violet-500',
        pink: 'from-pink-400 to-pink-500',
        green: 'from-emerald-400 to-emerald-500',
        red: 'from-red-400 to-red-500'
    };

    return (
        <section className="py-8 px-4 bg-gradient-to-br from-red-50/50 to-violet-50/50">
            <div className="max-w-7xl mx-auto">
                {/* Helpline Numbers Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full gradient-violet flex items-center justify-center">
                            <Phone className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">{t('helplineNumbers')}</h2>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                        {helplineNumbers.map((helpline, index) => {
                            const Icon = iconMap[helpline.icon] || Phone;
                            const gradient = colorMap[helpline.color] || colorMap.purple;

                            return (
                                <a
                                    key={helpline.id}
                                    href={`tel:${helpline.phone}`}
                                    className="bg-white rounded-2xl p-4 shadow-soft hover:shadow-lg transition-all duration-300 animate-slide-up flex items-center gap-4"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-800">{helpline.name}</h3>
                                        <p className="text-gray-500 text-sm">{helpline.description}</p>
                                    </div>
                                    <div className="text-2xl font-bold text-purple-600">{helpline.phone}</div>
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Ambulance Services Section */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full gradient-emergency flex items-center justify-center">
                        <Ambulance className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{t('ambulanceServices')}</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {ambulanceServices.map((service, index) => (
                        <div
                            key={service.id}
                            className="bg-white rounded-2xl p-5 shadow-soft hover:shadow-lg transition-all duration-300 animate-slide-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                                        <Ambulance className="w-6 h-6 text-red-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{service.name}</h3>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${service.type === 'Government' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                                            }`}>
                                            {service.type}
                                        </span>
                                    </div>
                                </div>
                                {service.available && (
                                    <span className="flex items-center gap-1 text-green-600 text-sm">
                                        <CheckCircle className="w-4 h-4" />
                                        Available
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm">{t('eta')}: {service.eta} {t('minutes')}</span>
                                </div>
                                <a
                                    href={`tel:${service.phone}`}
                                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl gradient-emergency text-white font-medium hover:opacity-90 transition-opacity shadow-lg"
                                >
                                    <Phone className="w-4 h-4" />
                                    {t('callNow')}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AmbulanceFinder;
