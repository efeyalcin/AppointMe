import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { useTheme } from '../context/ThemeContext';
import { useTenant } from '../context/TenantContext';
import CalendarView from '../components/CalendarView';
import TimeSlotGrid from '../components/TimeSlotGrid';
import OTPVerificationModal from '../components/OTPVerificationModal';
import { LogOut, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const { selectedTime, confirmBooking } = useBooking();
    const { theme, toggleTheme } = useTheme();
    const { tenant } = useTenant();
    const navigate = useNavigate();
    const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);

    const handleBookClick = () => {
        if (!selectedTime) return;
        setIsOTPModalOpen(true);
    };

    const handleVerifiedBooking = async () => {
        setIsOTPModalOpen(false);
        await confirmBooking();
        navigate(`/b/${tenant?.id}/confirmation`);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-200">
            <OTPVerificationModal
                isOpen={isOTPModalOpen}
                onClose={() => setIsOTPModalOpen(false)}
                onVerify={handleVerifiedBooking}
                phoneNumber={user?.phone || '123-456-7890'}
            />
            <header className="bg-white dark:bg-gray-800 shadow z-10 sticky top-0 transition-colors duration-200">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{tenant?.name || "Book Appointment"}</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Welcome, {user.name}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                            title="Toggle Theme"
                        >
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        <button
                            onClick={logout}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50 dark:hover:bg-red-900/30"
                            title="Sign out"
                        >
                            <LogOut className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl w-full mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Calendar */}
                    <div className="lg:col-span-5 space-y-6">
                        <CalendarView />
                        <div className="bg-blue-50 dark:bg-blue-900/40 p-4 rounded-xl border border-blue-100 dark:border-blue-800 text-sm text-blue-800 dark:text-blue-200">
                            <p>Select a date to see available time slots.</p>
                        </div>
                    </div>

                    {/* Right Column: Time Slots */}
                    <div className="lg:col-span-7">
                        <TimeSlotGrid />

                        {/* Floating Action / Confirm Button area */}
                        {selectedTime && (
                            <div className="mt-8 flex justify-end">
                                <button
                                    onClick={handleBookClick}
                                    className="bg-gray-900 dark:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-black dark:hover:bg-blue-700 transform hover:-translate-y-1 transition-all"
                                >
                                    Confirm Booking
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
