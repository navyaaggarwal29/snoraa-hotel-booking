import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        const success = await login(formData.email, formData.password);
        setIsSubmitting(false);

        if (success) {
            navigate('/');
        }
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: '4rem auto',
            padding: '2rem',
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)'
        }}>
            <h1 style={{
                textAlign: 'center',
                marginBottom: '0.5rem',
                color: 'var(--text-main)',
                fontSize: 'var(--font-size-2xl)'
            }}>Welcome Back</h1>
            <p style={{
                textAlign: 'center',
                marginBottom: '2rem',
                color: 'var(--text-muted)'
            }}>Sign in to access your bookings</p>

            <form onSubmit={handleSubmit}>
                <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="navya@example.com"
                />
                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    placeholder="••••••••"
                />

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    style={{ width: '100%', marginTop: '1rem' }}
                >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
            </form>

            <p style={{
                textAlign: 'center',
                marginTop: '1.5rem',
                color: 'var(--text-muted)',
                fontSize: 'var(--font-size-sm)'
            }}>
                Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: '500' }}>Sign up</Link>
            </p>
        </div>
    );
};

export default Login;
