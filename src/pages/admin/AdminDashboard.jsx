import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Clock, Settings, LogOut } from 'lucide-react';
import { MockTenantService } from '../../services/MockTenantService';
import AdminSchedule from './components/AdminSchedule';
import AdminSettings from './components/AdminSettings';

export default function AdminDashboard() {
    const navigate = useNavigate();
    // Mock managing 'barber-shop' for this demo admin
    const [tenant, setTenant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dashboard'); // dashboard | schedule | settings

    useEffect(() => {
        const isAdmin = localStorage.getItem('datefind_admin');
        if (!isAdmin) {
            navigate('/admin');
            return;
        }

        // Load Barber Shop data for demo
        MockTenantService.getTenantById('barber-shop').then(data => {
            setTenant(data);
            setLoading(false);
        });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('datefind_admin');
        navigate('/admin');
    };

    const refreshTenant = async () => {
        const updated = await MockTenantService.getTenantById(tenant.id);
        setTenant(updated);
    };

    if (loading) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading Admin...</div>;

    const renderContent = () => {
        switch (activeTab) {
            case 'schedule':
                return <AdminSchedule tenantId={tenant?.id} />;
            case 'settings':
                return <AdminSettings tenant={tenant} onUpdate={refreshTenant} />;
            case 'dashboard':
            default:
                return (
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
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex transition-colors duration-200">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col z-20">
                <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Admin Portal</h2>
                    <p className="text-xs text-gray-500 mt-1">Managing: {tenant?.name}</p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('dashboard')}
                        className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    >
                        <LayoutDashboard className="h-5 w-5 mr-3" />
                        Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('schedule')}
                        className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'schedule' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    >
                        <Clock className="h-5 w-5 mr-3" />
                        Schedule
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'settings' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    >
                        <Settings className="h-5 w-5 mr-3" />
                        Settings
                    </button>
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button onClick={handleLogout} className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                        {activeTab}
                    </h1>
                </header>

                {renderContent()}
            </main>
        </div>
    );
}
