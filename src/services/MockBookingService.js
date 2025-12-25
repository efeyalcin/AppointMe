import { format } from 'date-fns';

export const MockBookingService = {
    getAvailableSlots: (tenantId, date) => {
        // Generate slots from 10 AM to 10 PM (22:00)
        const slots = [];
        const startHour = 10;
        const endHour = 22;
        const dateStr = format(date, 'yyyy-MM-dd');

        // Create a unique seed based on tenantId AND date for varied availability
        const seedStr = tenantId + dateStr;
        const hash = seedStr.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

        for (let hour = startHour; hour <= endHour; hour++) {
            const time = `${hour.toString().padStart(2, '0')}:00`;
            // Simulate different availability patterns per tenant
            // e.g., Barber is busier (mod 3), Dentist less busy (mod 5)
            const divisor = tenantId.length % 2 === 0 ? 3 : 5;

            if ((hash + hour) % divisor !== 0) {
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

                // Here we would effectively save to DB
                console.log(`[MockBookingService] Created booking for ${tenantId}:`, newBooking);

                resolve(newBooking);
            }, 800);
        });
    }
};
