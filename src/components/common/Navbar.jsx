import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { User, LogOut, Calendar, Sun, Moon } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header style={{
            background: 'var(--card-bg)',
            borderBottom: '1px solid var(--border)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            padding: '1rem 0',
            transition: 'background-color 0.3s ease'
        }}>
            <div className="container" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    textDecoration: 'none'
                }}>
                    <img src="/snoraa_logo_icon.png" alt="Snoraa" style={{ height: '42px', width: 'auto', objectFit: 'contain' }} />
                    <span style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: '700',
                        fontSize: '2rem',
                        color: 'var(--primary)',
                        letterSpacing: '-0.5px',
                        paddingBottom: '4px'
                    }}>
                        Snoraa
                    </span>
                </Link>

                <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <button
                        onClick={toggleTheme}
                        style={{
                            background: 'transparent',
                            color: 'var(--text-main)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '0.5rem',
                            borderRadius: '50%'
                        }}
                        title="Toggle Theme"
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>
                    <Link to="/hotels" style={{ color: 'var(--text-main)', fontWeight: '500' }}>Find Hotels</Link>

                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-light)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                                }}>
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span style={{ fontWeight: '500' }}>{user.name}</span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                style={{
                                    background: 'none',
                                    color: 'var(--text-muted)',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/login">
                                <Button variant="outline" style={{ padding: '0.5rem 1rem' }}>Log in</Button>
                            </Link>
                            <Link to="/signup">
                                <Button style={{ padding: '0.5rem 1rem' }}>Sign up</Button>
                            </Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
