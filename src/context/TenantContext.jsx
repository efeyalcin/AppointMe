import React, { createContext, useContext, useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { MockTenantService } from '../services/MockTenantService';

const TenantContext = createContext();

export const useTenant = () => {
    return useContext(TenantContext);
};

export const TenantProvider = ({ children }) => {
    const [tenant, setTenant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // We need to parse tenantId manually because Provider wraps Routes,
    // so it might not have access to router params if placed incorrectly.
    // Ideally, we have a route wrapper, but for Context global access, let's use location.
    const location = useLocation();

    useEffect(() => {
        const fetchTenant = async () => {
            setLoading(true);
            const pathParts = location.pathname.split('/');
            // Expected format: /b/:tenantId/...
            const tenantIndex = pathParts.indexOf('b');

            if (tenantIndex !== -1 && pathParts[tenantIndex + 1]) {
                const tenantId = pathParts[tenantIndex + 1];
                try {
                    const data = await MockTenantService.getTenantById(tenantId);
                    setTenant(data);

                    // Apply dynamic theme color if needed handled by ThemeContext or here
                    // For now we just store data
                } catch (err) {
                    setError(err.message);
                    setTenant(null);
                }
            } else {
                // Not in a tenant route (e.g., home or admin)
                setTenant(null);
            }
            setLoading(false);
        };

        fetchTenant();
    }, [location.pathname]);

    const value = {
        tenant,
        loading,
        error
    };

    return (
        <TenantContext.Provider value={value}>
            {children}
        </TenantContext.Provider>
    );
};
