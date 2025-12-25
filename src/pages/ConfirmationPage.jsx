import { useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { useTenant } from '../context/TenantContext'; // Added
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, Home } from 'lucide-react';

export default function ConfirmationPage() {
    const { bookingDetails, resetBooking } = useBooking();
    const { tenant } = useTenant(); // Added hook
    const navigate = useNavigate();

    useEffect(() => {
        if (!bookingDetails) {
            navigate(tenant ? `/b/${tenant.id}/` : '/');
        }
    }, [bookingDetails, navigate, tenant]);

    if (!bookingDetails) return null;

    const handleReturnHome = () => {
        resetBooking(); // Clears state
        navigate(tenant ? `/b/${tenant.id}/` : '/');
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-200">
            <div className="w-full max-w-md text-center space-y-8">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 animate-bounce-slow">
                    <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>

                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">Booking Confirmed!</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Your appointment has been successfully scheduled.</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-left space-y-4 border border-gray-100 dark:border-gray-700 transition-colors">
                    <div className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <Calendar className="h-6 w-6 text-blue-500 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">{bookingDetails.date}</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <Clock className="h-6 w-6 text-blue-500 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">{bookingDetails.time}</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-xs text-center text-gray-400 dark:text-gray-500 font-mono">ID: {bookingDetails.id}</p>
                    </div>
                </div>

                <button
                    onClick={handleReturnHome}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 shadow-lg transition-all hover:-translate-y-1 w-full"
                >
                    <Home className="mr-2 h-5 w-5" />
                    Return to Dashboard
                </button>
            </div>
        </div>
    );
}
