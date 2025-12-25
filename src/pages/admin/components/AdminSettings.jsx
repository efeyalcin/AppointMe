import { useState, useEffect } from 'react';
import { Save, Loader2 } from 'lucide-react';
import { MockTenantService } from '../../../services/MockTenantService';

export default function AdminSettings({ tenant, onUpdate }) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        primaryColor: 'blue' // Default
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (tenant) {
            setFormData({
                name: tenant.name || '',
                phone: tenant.contact?.phone || '',
                address: tenant.contact?.address || '',
                primaryColor: tenant.theme?.primaryColor || 'blue'
            });
        }
    }, [tenant]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleColorSelect = (color) => {
        setFormData(prev => ({ ...prev, primaryColor: color }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const updates = {
                name: formData.name,
                contact: {
                    phone: formData.phone,
                    address: formData.address
                },
                theme: {
                    ...tenant.theme,
                    primaryColor: formData.primaryColor
                }
            };
            await MockTenantService.updateTenant(tenant.id, updates);
            onUpdate(updates); // Refresh parent
            alert("Settings saved!");
        } catch (err) {
            alert("Failed to save settings.");
        }
        setSaving(false);
    };

    const colors = ['blue', 'teal', 'rose', 'violet', 'amber', 'emerald'];

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Business Settings</h3>
                <p className="text-sm text-gray-500">Manage your public profile and appearance</p>
            </div>

            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Business Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 px-4 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Brand Theme Color</label>
                    <div className="flex flex-wrap gap-3">
                        {colors.map(color => (
                            <button
                                key={color}
                                type="button"
                                onClick={() => handleColorSelect(color)}
                                className={`
                                    w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center
                                    ${formData.primaryColor === color ? 'border-gray-900 dark:border-white scale-110' : 'border-transparent hover:scale-105'}
                                `}
                                style={{ backgroundColor: `var(--color-${color}-500, ${color})` }}
                            // Fallback inline styles if vars aren't available here, BUT we know ThemeApplicator sets vars on root.
                            // However, ThemeApplicator sets PRIMARY vars. It doesn't set 'rose' vars globally if rose isn't selected.
                            // So we need hardcoded colors for the picker OR map them.
                            >
                                {formData.primaryColor === color && <div className="w-2 h-2 bg-white rounded-full" />}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">This color will apply to your buttons, icons, and highlights.</p>
                </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-sm transition-all disabled:opacity-50"
                >
                    {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                    Save Changes
                </button>
            </div>
        </form>
    );
}
