import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import CalendarView from '../components/CalendarView';
import TimeSlotGrid from '../components/TimeSlotGrid';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const { selectedTime, confirmBooking } = useBooking();
    const navigate = useNavigate();

    const handleBook = async () => {
        if (!selectedTime) return;
        await confirmBooking();
        navigate('/confirmation');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-white shadow z-10 sticky top-0">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Book Appointment</h1>
                        <p className="text-sm text-gray-500">Welcome, {user.name}</p>
                    </div>
                    <button
                        onClick={logout}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
                        title="Sign out"
                    >
                        <LogOut className="h-5 w-5" />
                    </button>
                </div>
            </header>

            <main className="flex-1 max-w-7xl w-full mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Calendar */}
                    <div className="lg:col-span-5 space-y-6">
                        <CalendarView />
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-sm text-blue-800">
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
                                    onClick={handleBook}
                                    className="bg-gray-900 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-black transform hover:-translate-y-1 transition-all"
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
