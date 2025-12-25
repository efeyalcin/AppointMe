import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for saved user session
        const storedUser = localStorage.getItem('datefind_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        // Mock login logic
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    // Simulate existing user with or without profile
                    const mockUser = { id: '1', email, profileComplete: true, name: 'Test User', phone: '123-456-7890' };
                    setUser(mockUser);
                    localStorage.setItem('datefind_user', JSON.stringify(mockUser));
                    resolve(mockUser);
                } else {
                    reject(new Error("Invalid credentials"));
                }
            }, 500);
        });
    };

    const signup = async (email, password) => {
        // Mock signup logic
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = { id: '2', email, profileComplete: false };
                // In a real app, we wouldn't auto-login or would need token
                setUser(mockUser);
                localStorage.setItem('datefind_user', JSON.stringify(mockUser));
                resolve(mockUser);
            }, 500);
        });
    };

    const updateProfile = async (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const updatedUser = { ...user, ...data, profileComplete: true };
                setUser(updatedUser);
                localStorage.setItem('datefind_user', JSON.stringify(updatedUser));
                resolve(updatedUser);
            }, 500);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('datefind_user');
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
