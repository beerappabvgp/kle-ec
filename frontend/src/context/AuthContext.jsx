import React, { createContext, useContext, useState, useEffect } from 'react';
import { logout as apiLogout } from '../api/auth';
import api from '../api/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            // Fetch user info if token exists but user is not loaded
            if (!user) {
                api.get('/users/me')
                    .then(res => setUser(res.data.data || res.data.user))
                    .catch(() => setUser(null));
            }
        } else {
            localStorage.removeItem('token');
            setUser(null);
        }
    }, [token]);

    async function login(token) {
        setToken(token);
        // Fetch user info after login
        try {
            const res = await api.get('/users/me');
            setUser(res.data.data || res.data.user);
        } catch {
            setUser(null);
        }
    }

    async function logout() {
        await apiLogout();
        setToken(null);
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ token, user, setUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
} 