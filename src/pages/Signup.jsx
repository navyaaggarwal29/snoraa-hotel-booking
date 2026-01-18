import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Full name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        const success = await signup(formData.name, formData.email, formData.password);
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
            }}>Create Account</h1>
            <p style={{
                textAlign: 'center',
                marginBottom: '2rem',
                color: 'var(--text-muted)'
            }}>Join StayEase to book your next trip</p>

            <form onSubmit={handleSubmit}>
                <Input
                    label="Full Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    placeholder="John Doe"
                />
                <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    placeholder="john@example.com"
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
                <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    placeholder="••••••••"
                />

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    style={{ width: '100%', marginTop: '1rem' }}
                >
                    {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                </Button>
            </form>

            <p style={{
                textAlign: 'center',
                marginTop: '1.5rem',
                color: 'var(--text-muted)',
                fontSize: 'var(--font-size-sm)'
            }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '500' }}>Log in</Link>
            </p>
        </div>
    );
};

export default Signup;
