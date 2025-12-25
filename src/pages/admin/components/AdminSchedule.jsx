import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MockBookingService } from '../../services/MockBookingService';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, parseISO, isSameMonth, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, User } from 'lucide-react';

export default function AdminSchedule({ tenantId }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [bookings, setBookings] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        if (tenantId) {
            MockBookingService.getTenantBookings(tenantId).then(setBookings);
        }
    }, [tenantId]);

    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth)
    });

    const getBookingsForDate = (date) => {
        return bookings.filter(b => isSameDay(parseISO(b.createdAt), date) || (b.date === format(date, 'yyyy-MM-dd')));
    };

    // For this mock, assume b.date holds the 'yyyy-MM-dd' of appointment
    const getAppointmentsForDate = (date) => {
        return bookings.filter(b => b.date === format(date, 'yyyy-MM-dd'));
    };

    const selectedDayAppointments = getAppointmentsForDate(selectedDate);

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Calendar Widget */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                            <CalendarIcon className="mr-2 h-5 w-5 text-blue-500" />
                            {format(currentMonth, 'MMMM yyyy')}
                        </h2>
                        <div className="flex space-x-2">
                            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
                                <ChevronLeft className="h-5 w-5" />
                            </button>
                            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 font-medium mb-2">
                        <div>SUN</div>
                        <div>MON</div>
                        <div>TUE</div>
                        <div>WED</div>
                        <div>THU</div>
                        <div>FRI</div>
                        <div>SAT</div>
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                        {daysInMonth.map((day) => {
                            const dayBookings = getAppointmentsForDate(day);
                            const hasBookings = dayBookings.length > 0;
                            const isSelected = isSameDay(day, selectedDate);

                            return (
                                <button
                                    key={day.toString()}
                                    onClick={() => setSelectedDate(day)}
                                    className={`
                                        h-10 w-10 mx-auto rounded-full flex flex-col items-center justify-center text-sm transition-all relative
                                        ${isSelected ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
                                        ${!isSameMonth(day, currentMonth) ? 'opacity-30' : ''}
                                    `}
                                >
                                    {format(day, 'd')}
                                    {hasBookings && (
                                        <div className={`h-1.5 w-1.5 rounded-full mt-0.5 ${isSelected ? 'bg-white' : 'bg-blue-500'}`} />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Daily Agenda */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        {format(selectedDate, 'EEEE, MMMM do')}
                    </h3>

                    {selectedDayAppointments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                            <Clock className="h-12 w-12 mb-2 opacity-50" />
                            <p>No appointments scheduled</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {selectedDayAppointments
                                .sort((a, b) => a.time.localeCompare(b.time))
                                .map((apt) => (
                                    <div key={apt.id} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between border border-gray-100 dark:border-gray-600">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-blue-600 dark:text-blue-300">
                                                <Clock className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 dark:text-white">{apt.time}</p>
                                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                    <User className="h-3 w-3 mr-1" />
                                                    {apt.customerName || 'Customer'} - {apt.customerPhone || 'N/A'}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full font-medium">
                                            {apt.status}
                                        </span>
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
