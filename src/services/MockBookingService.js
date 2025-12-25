import { format } from 'date-fns';

// Helper to get bookings from storage
const getBookings = () => {
    try {
        const stored = localStorage.getItem('datefind_bookings');
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.error("Failed to parse bookings", e);
    }
    return [];
};

export const MockBookingService = {
    // Get all bookings for a tenant (Admin View)
    getTenantBookings: async (tenantId) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const allBookings = getBookings();
                const tenantBookings = allBookings.filter(b => b.tenantId === tenantId);
                resolve(tenantBookings);
            }, 400);
        });
    },

    getAvailableSlots: (tenantId, date) => {
        const bookings = getBookings();
        const dateStr = format(date, 'yyyy-MM-dd');

        // Find bookings for this tenant on this date
        const takenTimes = bookings
            .filter(b => b.tenantId === tenantId && b.date === dateStr)
            .map(b => b.time);

        const slots = [];
        const startHour = 10;
        const endHour = 22;

        const seedStr = tenantId + dateStr;
        const hash = seedStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

        for (let hour = startHour; hour <= endHour; hour++) {
            const time = `${hour.toString().padStart(2, '0')}:00`;

            // Availability Logic (Deterministic Random)
            const divisor = tenantId.length % 2 === 0 ? 3 : 5;
            const isRandomlyAvailable = (hash + hour) % divisor !== 0;

            // Check if slot is already booked
            if (isRandomlyAvailable && !takenTimes.includes(time)) {
                slots.push(time);
            }
        }
        return slots;
    },

    createBooking: async (tenantId, bookingDetails) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newBooking = {
                    id: Math.random().toString(36).substr(2, 9),
                    tenantId,
                    ...bookingDetails,
                    status: 'Confirmed',
                    createdAt: new Date().toISOString()
                };

                const bookings = getBookings();
                bookings.push(newBooking);
                localStorage.setItem('datefind_bookings', JSON.stringify(bookings));

                console.log(`[MockBookingService] Created booking for ${tenantId}:`, newBooking);

                resolve(newBooking);
            }, 800);
        });
    }
};
