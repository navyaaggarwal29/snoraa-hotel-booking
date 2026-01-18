// Mock API delay to simulate network latency
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const USERS_KEY = 'stayease_users';
const TOKEN_KEY = 'stayease_token';

// Helper to get users from local storage
const getUsers = () => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
};

export const authService = {
    // Login: Verify against mock users
    login: async (email, password) => {
        await delay(800);
        const users = getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Create a fake token
        const token = btoa(JSON.stringify({ id: user.id, email: user.email }));
        localStorage.setItem(TOKEN_KEY, token);

        const { password: _, ...userWithoutPass } = user;
        return { user: userWithoutPass, token };
    },

    // Signup: Register new user
    signup: async (name, email, password) => {
        await delay(800);
        const users = getUsers();

        if (users.find(u => u.email === email)) {
            throw new Error('User already exists');
        }

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password, // In a real app, never store plain passwords!
            bookmarks: []
        };

        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        const token = btoa(JSON.stringify({ id: newUser.id, email: newUser.email }));
        localStorage.setItem(TOKEN_KEY, token);

        const { password: _, ...userWithoutPass } = newUser;
        return { user: userWithoutPass, token };
    },

    // Get Current User: Simulate fetching user from token
    me: async () => {
        await delay(300);
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) throw new Error('No token found');

        try {
            const decoded = JSON.parse(atob(token));
            const users = getUsers();
            const user = users.find(u => u.id === decoded.id);

            if (!user) throw new Error('User not found');

            const { password: _, ...userWithoutPass } = user;
            return userWithoutPass;
        } catch (e) {
            localStorage.removeItem(TOKEN_KEY);
            throw new Error('Invalid token');
        }
    },

    logout: () => {
        localStorage.removeItem(TOKEN_KEY);
    },

    // Booking Management
    createBooking: async (userId, bookingDetails) => {
        await delay(800);
        const bookings = JSON.parse(localStorage.getItem('stayease_bookings') || '[]');
        const newBooking = {
            id: Date.now().toString(),
            userId,
            status: 'confirmed',
            createdAt: new Date().toISOString(),
            ...bookingDetails
        };
        bookings.push(newBooking);
        localStorage.setItem('stayease_bookings', JSON.stringify(bookings));
        return newBooking;
    },

    getBookings: async (userId) => {
        await delay(500);
        const bookings = JSON.parse(localStorage.getItem('stayease_bookings') || '[]');
        return bookings.filter(b => b.userId === userId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    cancelBooking: async (bookingId) => {
        await delay(500);
        const bookings = JSON.parse(localStorage.getItem('stayease_bookings') || '[]');
        const updatedBookings = bookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b);
        localStorage.setItem('stayease_bookings', JSON.stringify(updatedBookings));
        return true;
    }
};
