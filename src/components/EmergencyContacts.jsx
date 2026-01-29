import { useState } from 'react';
import { Users, Plus, Phone, Trash2, X, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

const EmergencyContacts = () => {
    const { t, emergencyContacts, saveEmergencyContact, deleteEmergencyContact } = useApp();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', relation: '' });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name.trim() || !formData.phone.trim() || !formData.relation.trim()) {
            setError('All fields are required');
            return;
        }

        if (emergencyContacts.length >= 5) {
            setError('Maximum 5 contacts allowed');
            return;
        }

        saveEmergencyContact(formData);
        setFormData({ name: '', phone: '', relation: '' });
        setShowForm(false);
    };

    const relations = ['Spouse', 'Parent', 'Sibling', 'Friend', 'Colleague', 'Other'];

    return (
        <div className="bg-white rounded-2xl shadow-soft p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Users className="w-5 h-5 text-purple-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{t('emergencyContacts')}</h3>
                </div>
                {emergencyContacts.length < 5 && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-100 text-purple-600 text-sm font-medium hover:bg-purple-200 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                        {t('addContact')}
                    </button>
                )}
            </div>

            {/* Contact List */}
            {emergencyContacts.length === 0 ? (
                <p className="text-gray-400 text-center py-6">{t('noContacts')}</p>
            ) : (
                <div className="space-y-3">
                    {emergencyContacts.map((contact) => (
                        <div
                            key={contact.id}
                            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-violet-400 flex items-center justify-center text-white font-bold">
                                {contact.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-800">{contact.name}</p>
                                <p className="text-sm text-gray-500">{contact.relation} • {contact.phone}</p>
                            </div>
                            <a
                                href={`tel:${contact.phone}`}
                                className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 hover:bg-green-200 transition-colors"
                            >
                                <Phone className="w-5 h-5" />
                            </a>
                            <button
                                onClick={() => deleteEmergencyContact(contact.id)}
                                className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Add Contact Form Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 modal-overlay flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-scale-in">
                        <div className="flex items-center justify-between p-5 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800">{t('addContact')}</h3>
                            <button
                                onClick={() => setShowForm(false)}
                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-5 space-y-4">
                            {error && (
                                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('contactName')}
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                        placeholder="Enter name"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('contactPhone')}
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition-all"
                                        placeholder="+91 XXXXX XXXXX"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('contactRelation')}
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {relations.map((rel) => (
                                        <button
                                            key={rel}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, relation: rel })}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${formData.relation === rel
                                                    ? 'bg-purple-500 text-white'
                                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {rel}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-3 rounded-xl gradient-purple text-white font-medium hover:opacity-90 transition-opacity"
                            >
                                {t('saveContact')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmergencyContacts;
