import { useState } from 'react';
import { User, Droplets, AlertCircle, FileText, Edit2, Save, X, Upload, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const MedicalProfile = () => {
    const { t, medicalProfile, updateMedicalProfile, addReport } = useApp();
    const [editing, setEditing] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [formData, setFormData] = useState({
        bloodGroup: medicalProfile.bloodGroup,
        allergies: medicalProfile.allergies.join(', ')
    });
    const [newAllergy, setNewAllergy] = useState('');
    const [reportName, setReportName] = useState('');

    const handleSave = () => {
        updateMedicalProfile({
            bloodGroup: formData.bloodGroup,
            allergies: formData.allergies.split(',').map(a => a.trim()).filter(Boolean)
        });
        setEditing(false);
    };

    const handleUpload = () => {
        if (reportName.trim()) {
            addReport({ name: reportName, type: 'document' });
            setReportName('');
            setShowUpload(false);
        }
    };

    const addAllergyTag = () => {
        if (newAllergy.trim()) {
            const current = formData.allergies ? formData.allergies.split(',').map(a => a.trim()) : [];
            current.push(newAllergy.trim());
            setFormData({ ...formData, allergies: current.join(', ') });
            setNewAllergy('');
        }
    };

    return (
        <section id="profile" className="py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full gradient-violet flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">{t('medicalRecords')}</h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Blood Group & Allergies Card */}
                    <div className="bg-white rounded-2xl shadow-soft p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-semibold text-gray-700">{t('medicalRecords')}</h3>
                            {!editing ? (
                                <button
                                    onClick={() => setEditing(true)}
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-100 text-violet-600 text-sm font-medium hover:bg-violet-200 transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    {t('edit')}
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setEditing(false)}
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                        {t('cancel')}
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-100 text-green-600 text-sm font-medium hover:bg-green-200 transition-colors"
                                    >
                                        <Save className="w-4 h-4" />
                                        {t('save')}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Blood Group */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Droplets className="w-5 h-5 text-red-400" />
                                <span className="text-sm font-medium text-gray-600">{t('bloodGroup')}</span>
                            </div>
                            {editing ? (
                                <div className="flex flex-wrap gap-2">
                                    {bloodGroups.map((bg) => (
                                        <button
                                            key={bg}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, bloodGroup: bg })}
                                            className={`w-12 h-12 rounded-xl font-bold transition-all ${formData.bloodGroup === bg
                                                    ? 'bg-red-500 text-white shadow-lg scale-105'
                                                    : 'bg-red-50 text-red-400 hover:bg-red-100'
                                                }`}
                                        >
                                            {bg}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-400 to-red-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                                    {medicalProfile.bloodGroup || '?'}
                                </div>
                            )}
                        </div>

                        {/* Allergies */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <AlertCircle className="w-5 h-5 text-amber-400" />
                                <span className="text-sm font-medium text-gray-600">{t('allergies')}</span>
                            </div>
                            {editing ? (
                                <div>
                                    <div className="flex gap-2 mb-3">
                                        <input
                                            type="text"
                                            value={newAllergy}
                                            onChange={(e) => setNewAllergy(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && addAllergyTag()}
                                            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
                                            placeholder="Add allergy..."
                                        />
                                        <button
                                            type="button"
                                            onClick={addAllergyTag}
                                            className="px-4 py-2 rounded-xl bg-amber-100 text-amber-600 font-medium hover:bg-amber-200 transition-colors"
                                        >
                                            <Plus className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.allergies.split(',').filter(a => a.trim()).map((allergy, i) => (
                                            <span
                                                key={i}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm"
                                            >
                                                {allergy.trim()}
                                                <button
                                                    onClick={() => {
                                                        const current = formData.allergies.split(',').map(a => a.trim());
                                                        current.splice(i, 1);
                                                        setFormData({ ...formData, allergies: current.join(', ') });
                                                    }}
                                                    className="w-4 h-4 rounded-full hover:bg-amber-200 flex items-center justify-center"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {medicalProfile.allergies.length > 0 ? (
                                        medicalProfile.allergies.map((allergy, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm font-medium"
                                            >
                                                {allergy}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-400 text-sm">No allergies added</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Reports Card */}
                    <div className="bg-white rounded-2xl shadow-soft p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-violet-500" />
                                <h3 className="font-semibold text-gray-700">{t('viewReports')}</h3>
                            </div>
                            <button
                                onClick={() => setShowUpload(true)}
                                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-violet-100 text-violet-600 text-sm font-medium hover:bg-violet-200 transition-colors"
                            >
                                <Upload className="w-4 h-4" />
                                {t('uploadReport')}
                            </button>
                        </div>

                        {medicalProfile.reports.length === 0 ? (
                            <div className="text-center py-8">
                                <FileText className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                                <p className="text-gray-400">{t('noReports')}</p>
                            </div>
                        ) : (
                            <div className="space-y-3 max-h-64 overflow-y-auto">
                                {medicalProfile.reports.map((report) => (
                                    <div
                                        key={report.id}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-violet-500" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">{report.name}</p>
                                            <p className="text-xs text-gray-400">
                                                {new Date(report.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Upload Modal */}
                {showUpload && (
                    <div className="fixed inset-0 z-50 modal-overlay flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-scale-in">
                            <div className="flex items-center justify-between p-5 border-b border-gray-100">
                                <h3 className="text-lg font-semibold text-gray-800">{t('uploadReport')}</h3>
                                <button
                                    onClick={() => setShowUpload(false)}
                                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                            <div className="p-5 space-y-4">
                                <input
                                    type="text"
                                    value={reportName}
                                    onChange={(e) => setReportName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-violet-400 focus:ring-2 focus:ring-violet-100 outline-none transition-all"
                                    placeholder="Document name (e.g., ID Card, Prescription)"
                                />
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-violet-400 transition-colors cursor-pointer">
                                    <Upload className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                    <p className="text-gray-500 text-sm">Click to upload or drag and drop</p>
                                    <p className="text-gray-400 text-xs mt-1">PDF, JPG, PNG up to 10MB</p>
                                </div>
                                <button
                                    onClick={handleUpload}
                                    className="w-full py-3 rounded-xl gradient-violet text-white font-medium hover:opacity-90 transition-opacity"
                                >
                                    {t('uploadReport')}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MedicalProfile;
