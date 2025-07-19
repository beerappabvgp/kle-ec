import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { signup } from '../api/auth';
import { useToast } from '../components/Toast';
import { getErrorMessage } from '../utils/errorHandler';

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { showSuccess, showError } = useToast();

    const handleSignup = async (formData) => {
        setLoading(true);
        setError('');
        try {
            console.log('Attempting signup with:', { name: formData.name, email: formData.email, password: '***' });
            const result = await signup({ name: formData.name, email: formData.email, password: formData.password });
            console.log('Signup successful:', result);
            setLoading(false);
            showSuccess('Account Created!', 'Your account has been created successfully! Please login to continue.');
            navigate('/login', { state: { signupSuccess: true } });
        } catch (err) {
            console.error('Signup error:', err);
            const errorInfo = getErrorMessage(err);
            setError(errorInfo.message);
            showError(errorInfo.title, errorInfo.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-white dark:bg-black text-black dark:text-white py-6 px-2 sm:px-4 flex items-center justify-center">
            <div className="w-full max-w-lg border border-gray-800 rounded-2xl p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 dark:text-white text-center">Sign Up</h1>
                <AuthForm mode="signup" onSubmit={handleSignup} loading={loading} error={error} />
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
} 