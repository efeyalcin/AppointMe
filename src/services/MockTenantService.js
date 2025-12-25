// Mock data store for tenants
const mockTenants = {
    'barber-shop': {
        id: 'barber-shop',
        name: 'The Gentle Barber',
        logo: null, // Could be URL or component
        theme: {
            primaryColor: 'blue', // Tailwind color name or hex
            isDark: false
        },
        contact: {
            phone: '555-0101',
            address: '123 Main St, Cityville'
        }
    },
    'dental-clinic': {
        id: 'dental-clinic',
        name: 'Bright Smiles Dental',
        logo: null,
        theme: {
            primaryColor: 'teal',
            isDark: false
        },
        contact: {
            phone: '555-0202',
            address: '456 Oak Ave, Townsburg'
        }
    },
    'yoga-studio': {
        id: 'yoga-studio',
        name: 'Zen Flow Yoga',
        logo: null,
        theme: {
            primaryColor: 'rose',
            isDark: true
        },
        contact: {
            phone: '555-0303',
            address: '789 Pine Ln, Villageton'
        }
    }
};

export const MockTenantService = {
    getTenantById: async (tenantId) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const tenant = mockTenants[tenantId];
                if (tenant) {
                    resolve(tenant);
                } else {
                    reject(new Error("Tenant not found"));
                }
            }, 300); // Simulate network delay
        });
    },

    // Admin function to update tenant details
    updateTenant: async (tenantId, updates) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                if (mockTenants[tenantId]) {
                    mockTenants[tenantId] = { ...mockTenants[tenantId], ...updates };
                    resolve(mockTenants[tenantId]);
                }
            }, 300);
        });
    }
};
