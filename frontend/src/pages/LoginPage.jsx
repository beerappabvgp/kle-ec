import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { login as loginApi } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { getErrorMessage } from '../utils/errorHandler';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const signupSuccess = location.state && location.state.signupSuccess;
    const { login } = useAuth();
    const { showSuccess, showError } = useToast();

    const handleLogin = async (formData) => {
        setLoading(true);
        setError('');
        try {
            const res = await loginApi({ email: formData.email, password: formData.password });
            const { token } = res.data;
            await login(token);
            setLoading(false);
            showSuccess('Welcome Back!', 'You have been logged in successfully.');
            navigate('/products');
        } catch (err) {
            const errorInfo = getErrorMessage(err);
            setError(errorInfo.message);
            showError(errorInfo.title, errorInfo.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white py-6 px-2 sm:px-4 flex items-center justify-center">
            <div className="w-full max-w-md border border-gray-800 rounded-2xl p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 dark:text-white text-center">Login</h1>
                {signupSuccess && (
                    <div className="mb-4 p-3 rounded bg-green-100 text-green-800 text-center dark:bg-green-900 dark:text-green-200">
                        ✅ Account created successfully! Please log in with your credentials.
                    </div>
                )}
                <AuthForm mode="login" onSubmit={handleLogin} loading={loading} error={error} />
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
} 