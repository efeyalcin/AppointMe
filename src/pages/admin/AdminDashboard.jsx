import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Clock, Settings, LogOut, Save } from 'lucide-react';
import { MockTenantService } from '../../services/MockTenantService';

export default function AdminDashboard() {
    const navigate = useNavigate();
    // Mock managing 'barber-shop' for this demo admin
    const [tenant, setTenant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [brandingName, setBrandingName] = useState('');

    useEffect(() => {
        const isAdmin = localStorage.getItem('datefind_admin');
        if (!isAdmin) {
            navigate('/admin');
            return;
        }

        // Load Barber Shop data for demo
        MockTenantService.getTenantById('barber-shop').then(data => {
            setTenant(data);
            setBrandingName(data.name);
            setLoading(false);
        });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('datefind_admin');
        navigate('/admin');
    };

    const handleSave = async () => {
        if (tenant) {
            await MockTenantService.updateTenant(tenant.id, { name: brandingName });
            alert("Branding updated successfully!");
            // Reload local state to confirm
            const updated = await MockTenantService.getTenantById(tenant.id);
            setTenant(updated);
        }
    };

    if (loading) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading Admin...</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Admin Portal</h2>
                    <p className="text-xs text-gray-500 mt-1">Managing: {tenant?.id}</p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <a href="#" className="flex items-center px-4 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl font-medium">
                        <LayoutDashboard className="h-5 w-5 mr-3" />
                        Dashboard
                    </a>
                    <a href="#" className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl font-medium transition-colors">
                        <Clock className="h-5 w-5 mr-3" />
                        Schedule
                    </a>
                    <a href="#" className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl font-medium transition-colors">
                        <Users className="h-5 w-5 mr-3" />
                        Customers
                    </a>
                    <a href="#" className="flex items-center px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl font-medium transition-colors">
                        <Settings className="h-5 w-5 mr-3" />
                        Settings
                    </a>
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button onClick={handleLogout} className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Business Overview</h1>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Bookings</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">24</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Next Appointment</p>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">10:00 AM</p>
                        <p className="text-sm text-green-500 mt-1">Confirmed</p>
                    </div>
                </div>

                {/* Branding Editor */}
                <section className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Branding & Identity</h3>
                    </div>
                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Business Name
                            </label>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    value={brandingName}
                                    onChange={(e) => setBrandingName(e.target.value)}
                                    className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-4 py-2 text-gray-900 dark:text-white"
                                />
                                <button
                                    onClick={handleSave}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium flex items-center transition-colors"
                                >
                                    <Save className="h-4 w-4 mr-2" />
                                    Update Name
                                </button>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                This name is displayed on your booking page: <code className="bg-gray-100 dark:bg-gray-900 px-1 py-0.5 rounded">/b/{tenant?.id}</code>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
