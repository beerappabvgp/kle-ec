import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { login as loginApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const signupSuccess = location.state && location.state.signupSuccess;
    const { login } = useAuth();

    async function handleLogin(form) {
        setLoading(true);
        setError('');
        try {
            const data = await loginApi(form);
            login(data.data.token); // update context with the correct token
            navigate('/');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md">
                {signupSuccess && (
                    <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-center dark:bg-green-900 dark:text-green-200">
                        Signup successful! Please log in.
                    </div>
                )}
                <AuthForm mode="login" onSubmit={handleLogin} loading={loading} error={error} />
            </div>
        </div>
    );
} 