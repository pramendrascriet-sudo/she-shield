import { useState } from 'react';
import { Shield, MapPin, Moon, Lock, Train, ChevronRight, Eye, Sun, Battery, MessageCircle, Key, AlertTriangle, Users, Car, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { safetyTipsData } from '../data/mockData';

const tipIcons = {
    MapPin: MapPin,
    Car: Car,
    Eye: Eye,
    Sun: Sun,
    Battery: Battery,
    MessageCircle: MessageCircle,
    Lock: Lock,
    Key: Key,
    AlertTriangle: AlertTriangle,
    Train: Train,
    AlertCircle: AlertCircle,
    Users: Users
};

const SafetyTips = () => {
    const { t } = useApp();
    const [activeCategory, setActiveCategory] = useState('travel');

    const categories = [
        { id: 'travel', label: t('travelSafety'), icon: MapPin, color: 'from-purple-400 to-purple-500' },
        { id: 'night', label: t('nightSafety'), icon: Moon, color: 'from-indigo-400 to-indigo-500' },
        { id: 'digital', label: t('digitalSafety'), icon: Lock, color: 'from-sky-400 to-sky-500' },
        { id: 'publicTransport', label: t('publicTransport'), icon: Train, color: 'from-violet-400 to-violet-500' }
    ];

    const currentCategory = categories.find(c => c.id === activeCategory);
    const tips = safetyTipsData[activeCategory] || [];

    return (
        <section id="tips" className="py-8 px-4 bg-gradient-to-br from-purple-50/50 to-sky-50/50">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full gradient-violet flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{t('safetyTips')}</h2>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${activeCategory === category.id
                                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                                        : 'bg-white text-gray-600 hover:bg-gray-50 shadow-soft'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {category.label}
                            </button>
                        );
                    })}
                </div>

                {/* Tips Grid */}
                <div className="grid gap-4 md:grid-cols-3">
                    {tips.map((tip, index) => {
                        const Icon = tipIcons[tip.icon] || Shield;
                        return (
                            <div
                                key={tip.id}
                                className="bg-white rounded-2xl p-5 shadow-soft hover:shadow-lg transition-all duration-300 animate-slide-up group"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentCategory?.color || 'from-purple-100 to-violet-100'} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">{tip.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{tip.description}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Quick Safety Reminder */}
                <div className="mt-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl p-6">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl font-bold text-white mb-1">Stay Alert, Stay Safe</h3>
                            <p className="text-white/80">Trust your instincts. If something feels wrong, it probably is. Don't hesitate to seek help.</p>
                        </div>
                        <a
                            href="#emergency"
                            className="flex items-center gap-2 px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg"
                        >
                            Emergency Help
                            <ChevronRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SafetyTips;
