import { useEffect } from 'react';
import { useBooking } from '../context/BookingContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, Home } from 'lucide-react';

export default function ConfirmationPage() {
    const { bookingDetails, resetBooking } = useBooking();
    const navigate = useNavigate();

    useEffect(() => {
        if (!bookingDetails) {
            navigate('/');
        }
    }, [bookingDetails, navigate]);

    if (!bookingDetails) return null;

    const handleReturnHome = () => {
        resetBooking(); // Clears state
        navigate('/');
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md text-center space-y-8">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                </div>

                <div>
                    <h2 className="text-3xl font-extrabold text-gray-900">Booking Confirmed!</h2>
                    <p className="mt-2 text-gray-600">Your appointment has been successfully scheduled.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 text-left space-y-4 border border-gray-100">
                    <div className="flex items-start space-x-3">
                        <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-gray-500">Date</p>
                            <p className="text-lg font-semibold text-gray-900">{bookingDetails.date}</p>
                        </div>
                    </div>

                    <div className="flex items-start space-x-3">
                        <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-gray-500">Time</p>
                            <p className="text-lg font-semibold text-gray-900">{bookingDetails.time}</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <p className="text-xs text-center text-gray-400">ID: {bookingDetails.id}</p>
                    </div>
                </div>

                <button
                    onClick={handleReturnHome}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-lg transition-all hover:-translate-y-1"
                >
                    <Home className="mr-2 h-5 w-5" />
                    Return to Dashboard
                </button>
            </div>
        </div>
    );
}
