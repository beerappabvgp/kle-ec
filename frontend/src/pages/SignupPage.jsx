import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { signup } from '../api/auth';

export default function SignupPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function handleSignup(form) {
        setLoading(true);
        setError('');
        try {
            await signup(form);
            // Redirect to login page after successful signup, with state
            navigate('/login', { state: { signupSuccess: true } });
        } catch (err) {
            setError(err.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <AuthForm mode="signup" onSubmit={handleSignup} loading={loading} error={error} />
        </div>
    );
} 