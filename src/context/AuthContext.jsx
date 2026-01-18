import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';
import { toast } from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const initAuth = async () => {
            try {
                const currentUser = await authService.me();
                setUser(currentUser);
            } catch (error) {
                // Token invalid or not found, silently fail
                console.log('No active session');
            } finally {
                setLoading(false);
            }
        };
        initAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const { user } = await authService.login(email, password);
            setUser(user);
            toast.success('Welcome back!');
            return true;
        } catch (error) {
            toast.error(error.message);
            return false;
        }
    };

    const signup = async (name, email, password) => {
        try {
            const { user } = await authService.signup(name, email, password);
            setUser(user);
            toast.success('Account created successfully!');
            return true;
        } catch (error) {
            toast.error(error.message);
            return false;
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        toast.success('Logged out');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, isAuthenticated: !!user }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
