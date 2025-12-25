import React, { createContext, useContext, useState } from 'react';
import { addDays, format, startOfToday } from 'date-fns';

const BookingContext = createContext();

export const useBooking = () => {
    return useContext(BookingContext);
};

export const BookingProvider = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(startOfToday());
    const [selectedTime, setSelectedTime] = useState(null);
    const [bookingDetails, setBookingDetails] = useState(null);

    // Mock availability data
    const getAvailableSlots = (date) => {
        // Generate mock slots for demo purposes
        // In a real app, this would fetch from API
        const dateStr = format(date, 'yyyy-MM-dd');
        const slots = [
            '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
        ];
        // Randomly remove some slots to simulate unavailability
        // Use simple hash of date string to make it deterministic but "random"
        const hash = dateStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return slots.filter((_, i) => (hash + i) % 3 !== 0);
    };

    const confirmBooking = async () => {
        // Mock API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const details = {
                    id: Math.random().toString(36).substr(2, 9),
                    date: format(selectedDate, 'MMMM do, yyyy'),
                    time: selectedTime,
                    status: 'Confirmed'
                };
                setBookingDetails(details);
                resolve(details);
            }, 1000);
        });
    };

    const resetBooking = () => {
        setSelectedDate(startOfToday());
        setSelectedTime(null);
        setBookingDetails(null);
    };

    const value = {
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        getAvailableSlots,
        bookingDetails,
        confirmBooking,
        resetBooking
    };

    return (
        <BookingContext.Provider value={value}>
            {children}
        </BookingContext.Provider>
    );
};
