import { useBooking } from '../context/BookingContext';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';

export default function TimeSlotGrid() {
    const { selectedDate, selectedTime, setSelectedTime, getAvailableSlots } = useBooking();

    const slots = getAvailableSlots(selectedDate);

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col h-full transition-colors duration-200">
            <div className="flex items-center space-x-2 mb-6">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Available times for {format(selectedDate, 'MMM do')}
                </h2>
            </div>

            {slots.length > 0 ? (
                <div className="grid grid-cols-3 gap-3">
                    {slots.map((time) => (
                        <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`
                  py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200 border
                  ${selectedTime === time
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105'
                                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-600'
                                }
                `}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    No slots available for this date.
                </div>
            )}

            {selectedTime && (
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Selected appointment:</p>
                    <div className="flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                        <div>
                            <span className="block text-sm font-semibold text-blue-900 dark:text-blue-100">
                                {format(selectedDate, 'MMMM do, yyyy')}
                            </span>
                            <span className="text-blue-700 dark:text-blue-300 text-sm">
                                at {selectedTime}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
