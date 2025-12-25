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

    const login = async (name, phone) => {
        // Mock login logic - requiring Name and Phone
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (name && phone) {
                    // Simulate login
                    const mockUser = { id: '1', name, phone, profileComplete: true };
                    setUser(mockUser);
                    localStorage.setItem('datefind_user', JSON.stringify(mockUser));
                    resolve(mockUser);
                } else {
                    reject(new Error("Please provide both Name and Phone Number."));
                }
            }, 500);
        });
    };

    const signup = async (name, phone) => {
        // Mock signup logic - effectively same as login for this demo
        return login(name, phone);
    };

    const updateProfile = async (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const updatedUser = { ...user, ...data };
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
