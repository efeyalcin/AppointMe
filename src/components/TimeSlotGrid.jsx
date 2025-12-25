import { useBooking } from '../context/BookingContext';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';

export default function TimeSlotGrid() {
    const { selectedDate, selectedTime, setSelectedTime, getAvailableSlots } = useBooking();

    const slots = getAvailableSlots(selectedDate);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex items-center space-x-2 mb-6">
                <Clock className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">
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
                  py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 border
                  ${selectedTime === time
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105'
                                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                }
                `}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                    No slots available for this date.
                </div>
            )}

            {selectedTime && (
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-500 mb-2">Selected appointment:</p>
                    <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <div>
                            <span className="block text-sm font-semibold text-blue-900">
                                {format(selectedDate, 'MMMM do, yyyy')}
                            </span>
                            <span className="text-blue-700 text-sm">
                                at {selectedTime}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
