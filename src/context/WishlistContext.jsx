import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    // Load wishlist from local storage on mount
    useEffect(() => {
        const storedWishlist = JSON.parse(localStorage.getItem('stayease_wishlist') || '[]');
        setWishlist(storedWishlist);
    }, []);

    const addToWishlist = (hotel) => {
        const exists = wishlist.find(h => h.id === hotel.id);
        if (exists) {
            toast.error('Already in wishlist!');
            return;
        }
        const updatedWishlist = [...wishlist, hotel];
        setWishlist(updatedWishlist);
        localStorage.setItem('stayease_wishlist', JSON.stringify(updatedWishlist));
        toast.success('Added to wishlist!');
    };

    const removeFromWishlist = (hotelId) => {
        const updatedWishlist = wishlist.filter(h => h.id !== hotelId);
        setWishlist(updatedWishlist);
        localStorage.setItem('stayease_wishlist', JSON.stringify(updatedWishlist));
        toast.success('Removed from wishlist');
    };

    const isInWishlist = (hotelId) => {
        return wishlist.some(h => h.id === hotelId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
