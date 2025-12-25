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
        // Generate slots from 10 AM to 10 PM (22:00)
        const slots = [];
        const startHour = 10;
        const endHour = 22;
        const dateStr = format(date, 'yyyy-MM-dd');

        // Deterministic random seed from date
        const hash = dateStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

        for (let hour = startHour; hour <= endHour; hour++) {
            // Format as HH:00
            const time = `${hour.toString().padStart(2, '0')}:00`;
            // Simulate randomness: if hash + hour is divisible by 5, slot is taken
            if ((hash + hour) % 5 !== 0) {
                slots.push(time);
            }
        }
        return slots;
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

                // MOCK SMS NOTIFICATION
                console.log(`[Mock SMS] Sent to user: "Your appointment is confirmed for ${details.date} at ${details.time}."`);
                // In browser environment we generally can't just alert without blocking, 
                // but since user requested "an SMS... is sent", we log it or show a toast. 
                // The ConfirmationPage handles visual feedback.

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
