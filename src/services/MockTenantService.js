// Initial mock data
const defaultTenants = {
    'barber-shop': {
        id: 'barber-shop',
        name: 'The Gentle Barber',
        theme: {
            primaryColor: 'blue',
            isDark: false
        },
        contact: {
            phone: '555-0101',
            address: '123 Main St, Cityville'
        },
        workingHours: {
            start: '10:00',
            end: '22:00'
        }
    },
    'dental-clinic': {
        id: 'dental-clinic',
        name: 'Bright Smiles Dental',
        theme: {
            primaryColor: 'teal',
            isDark: false
        },
        contact: {
            phone: '555-0202',
            address: '456 Oak Ave, Townsburg'
        },
        workingHours: {
            start: '09:00',
            end: '17:00'
        }
    },
    'yoga-studio': {
        id: 'yoga-studio',
        name: 'Zen Flow Yoga',
        theme: {
            primaryColor: 'rose',
            isDark: true
        },
        contact: {
            phone: '555-0303',
            address: '789 Pine Ln, Villageton'
        },
        workingHours: {
            start: '07:00',
            end: '19:00'
        }
    }
};

// Helper to get tenants from storage
const getTenants = () => {
    try {
        const stored = localStorage.getItem('datefind_tenants');
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.error("Failed to parse tenants", e);
    }
    // Initialize if empty
    localStorage.setItem('datefind_tenants', JSON.stringify(defaultTenants));
    return defaultTenants;
};

export const MockTenantService = {
    getTenantById: async (tenantId) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const tenants = getTenants();
                const tenant = tenants[tenantId];
                if (tenant) {
                    resolve(tenant);
                } else {
                    reject(new Error("Tenant not found"));
                }
            }, 300);
        });
    },

    updateTenant: async (tenantId, updates) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const tenants = getTenants();
                if (tenants[tenantId]) {
                    // Deep merge for simpler updates (e.g. updating just theme)
                    const updatedTenant = {
                        ...tenants[tenantId],
                        ...updates,
                        // Handle nested objects if provided individually
                        theme: { ...tenants[tenantId].theme, ...(updates.theme || {}) },
                        contact: { ...tenants[tenantId].contact, ...(updates.contact || {}) },
                        workingHours: { ...tenants[tenantId].workingHours, ...(updates.workingHours || {}) }
                    };

                    tenants[tenantId] = updatedTenant;
                    localStorage.setItem('datefind_tenants', JSON.stringify(tenants));
                    resolve(updatedTenant);
                } else {
                    reject(new Error("Tenant not found"));
                }
            }, 300);
        });
    }
};
