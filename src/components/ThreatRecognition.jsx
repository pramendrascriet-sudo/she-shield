import { AlertTriangle, AlertCircle, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { threatIndicators } from '../data/mockData';

const severityStyles = {
    high: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        icon: 'text-red-500',
        badge: 'bg-red-100 text-red-600'
    },
    medium: {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        icon: 'text-amber-500',
        badge: 'bg-amber-100 text-amber-600'
    }
};

const ThreatRecognition = () => {
    const { t, setShowSOSModal } = useApp();
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section id="emergency" className="py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full gradient-emergency flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{t('threatRecognition')}</h2>
                </div>
                <p className="text-gray-500 mb-6 ml-13">{t('recognizeDanger')}</p>

                <div className="grid gap-3 md:grid-cols-2">
                    {threatIndicators.map((item, index) => {
                        const styles = severityStyles[item.severity];
                        const isExpanded = expandedId === item.id;

                        return (
                            <div
                                key={item.id}
                                className={`${styles.bg} ${styles.border} border rounded-xl overflow-hidden animate-slide-up hover:shadow-md transition-shadow`}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <button
                                    onClick={() => toggleExpand(item.id)}
                                    className="w-full p-4 flex items-start gap-3 text-left"
                                >
                                    <AlertCircle className={`w-5 h-5 ${styles.icon} flex-shrink-0 mt-0.5`} />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800">{item.situation}</p>
                                        <p className="text-sm text-gray-500 mt-1">{item.action}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`${styles.badge} px-2 py-0.5 rounded-full text-xs font-medium`}>
                                            {item.severity === 'high' ? 'Urgent' : 'Important'}
                                        </span>
                                        {isExpanded ? (
                                            <ChevronUp className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                </button>

                                {isExpanded && item.tips && (
                                    <div className="px-4 pb-4 border-t border-gray-200/50">
                                        <p className="text-sm font-medium text-gray-700 mt-3 mb-2">What to do:</p>
                                        <ul className="space-y-1">
                                            {item.tips.map((tip, i) => (
                                                <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                                                    <span className="text-purple-500 font-bold">•</span>
                                                    {tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Emergency CTA */}
                <div className="mt-6 bg-gradient-to-r from-red-500 to-rose-500 rounded-2xl p-6 text-center">
                    <p className="text-white/90 mb-4">If you're in immediate danger, don't wait!</p>
                    <button
                        onClick={() => setShowSOSModal(true)}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-white text-red-500 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        <Phone className="w-5 h-5" />
                        Call Emergency Now
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ThreatRecognition;
