import React, { createContext, useContext, useState } from 'react';
import { format, startOfToday } from 'date-fns';
import { useTenant } from './TenantContext';
import { useAuth } from './AuthContext';
import { MockBookingService } from '../services/MockBookingService';

const BookingContext = createContext();

export const useBooking = () => {
    return useContext(BookingContext);
};

export const BookingProvider = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(startOfToday());
    const [selectedTime, setSelectedTime] = useState(null);
    const [bookingDetails, setBookingDetails] = useState(null);
    const { tenant } = useTenant();
    const { user } = useAuth();

    // Validates slots against Mock DB
    const getAvailableSlots = (date) => {
        if (!tenant) return []; // Or default behavior
        // If tenant is missing (e.g. root landing), maybe return empty or generic
        return MockBookingService.getAvailableSlots(tenant?.id || 'default', date);
    };

    const confirmBooking = async () => {
        return new Promise((resolve) => {
            // Check essential data
            if (!tenant || !selectedTime) {
                console.error("Missing tenant or time");
                resolve(null);
                return;
            }

            // Prepare payload
            const bookingPayload = {
                date: format(selectedDate, 'yyyy-MM-dd'),
                time: selectedTime,
                customerName: user?.name || 'Guest',
                customerPhone: user?.phone || 'N/A'
            };

            // Call Service
            MockBookingService.createBooking(tenant.id, bookingPayload).then(savedBooking => {
                const details = {
                    ...savedBooking,
                    // Format for UI display on Confirmation Page
                    date: format(selectedDate, 'MMMM do, yyyy'),
                    displayDate: format(selectedDate, 'MMMM do, yyyy')
                };
                setBookingDetails(details);

                // Mock SMS
                console.log(`[Mock SMS] Sent to user: "Your appointment is confirmed for ${details.date} at ${details.time}."`);

                resolve(details);
            });
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
