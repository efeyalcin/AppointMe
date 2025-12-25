import { useState } from 'react';
import {
    format,
    startOfWeek,
    addDays,
    startOfMonth,
    endOfMonth,
    endOfWeek,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    isBefore,
    startOfToday
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function CalendarView() {
    const { selectedDate, setSelectedDate } = useBooking();
    const [currentMonth, setCurrentMonth] = useState(startOfToday());

    const renderHeader = () => {
        return (
            <div className="flex items-center justify-between py-2 mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    {format(currentMonth, 'MMMM yyyy')}
                </h2>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                        className="p-1 hover:bg-gray-100 rounded-full"
                        type="button"
                    >
                        <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                        className="p-1 hover:bg-gray-100 rounded-full"
                        type="button"
                    >
                        <ChevronRight className="h-5 w-5 text-gray-600" />
                    </button>
                </div>
            </div>
        );
    };

    const renderDays = () => {
        const days = [];
        const dateFormat = "EEEE";
        const startDate = startOfWeek(currentMonth);

        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="text-center text-xs font-medium text-gray-500 uppercase" key={i}>
                    {format(addDays(startDate, i), dateFormat).substring(0, 3)}
                </div>
            );
        }

        return <div className="grid grid-cols-7 mb-2">{days}</div>;
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = "d";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;

                const isSelected = isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, monthStart);
                const isPast = isBefore(day, startOfToday());

                days.push(
                    <div
                        className={`
              relative aspect-square p-1 m-0.5 cursor-pointer rounded-lg flex items-center justify-center text-sm
              ${!isCurrentMonth ? "text-gray-300 pointer-events-none" : ""}
              ${isPast ? "text-gray-300 pointer-events-none" : ""}
              ${isSelected ? "bg-blue-600 text-white font-semibold shadow-md" : "hover:bg-blue-50 text-gray-700"}
              ${!isSelected && !isPast && isCurrentMonth ? "bg-white border border-gray-100" : ""}
            `}
                        key={day}
                        onClick={() => !isPast && isCurrentMonth ? setSelectedDate(cloneDay) : null}
                    >
                        <span>{formattedDate}</span>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="grid grid-cols-7" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="space-y-1">{rows}</div>;
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
        </div>
    );
}
