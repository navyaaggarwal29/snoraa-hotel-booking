import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import { Calendar, MapPin, Clock, XCircle, LogOut, Heart } from 'lucide-react';
import Button from '../components/common/Button';
import HotelCard from '../components/features/HotelCard';
import { useWishlist } from '../context/WishlistContext';
import { toast } from 'react-hot-toast';

const Profile = () => {
    const { user, logout } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            if (user) {
                const data = await authService.getBookings(user.id);
                setBookings(data);
            }
        } catch (error) {
            console.error('Failed to fetch bookings', error);
            toast.error('Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [user]);

    const handleCancel = async (bookingId) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            try {
                await authService.cancelBooking(bookingId);
                toast.success('Booking cancelled');
                fetchBookings(); // Refresh list
            } catch (error) {
                toast.error('Failed to cancel booking');
            }
        }
    };

    if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading...</div>;

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <div>
                    <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold' }}>My Profile</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Manage your account and bookings</p>
                </div>
                <Button variant="outline" onClick={logout} style={{ gap: '0.5rem' }}>
                    <LogOut size={16} /> Logout
                </Button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {/* User Details */}
                <div style={{ alignSelf: 'start' }}>
                    <div style={{
                        background: 'white',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1.5rem',
                        boxShadow: 'var(--shadow-sm)',
                        border: '1px solid var(--border)'
                    }}>
                        <div style={{
                            width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary-light)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem',
                            marginBottom: '1rem'
                        }}>
                            {user?.name.charAt(0).toUpperCase()}
                        </div>
                        <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', marginBottom: '0.5rem' }}>{user?.name}</h2>
                        <p style={{ color: 'var(--text-muted)' }}>{user?.email}</p>
                    </div>
                </div>

                {/* Bookings List */}
                <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', marginBottom: '1.5rem' }}>My Bookings</h2>
                    {bookings.length === 0 ? (
                        <div style={{
                            background: 'white', padding: '3rem', borderRadius: 'var(--radius-lg)',
                            textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed var(--text-muted)'
                        }}>
                            <Calendar size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <p>You don't have any bookings yet.</p>
                            <Button style={{ marginTop: '1rem' }} onClick={() => window.location.href = '/hotels'}>Start Exploring</Button>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {bookings.map(booking => (
                                <div key={booking.id} style={{
                                    background: 'white',
                                    borderRadius: 'var(--radius-lg)',
                                    padding: '1.5rem',
                                    boxShadow: 'var(--shadow-sm)',
                                    border: '1px solid var(--border)',
                                    display: 'flex',
                                    gap: '1rem',
                                    flexWrap: 'wrap',
                                    opacity: booking.status === 'cancelled' ? 0.7 : 1
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                            <h3 style={{ fontWeight: 'bold' }}>{booking.hotelName}</h3>
                                            <span style={{
                                                fontSize: '0.75rem', fontWeight: 'bold', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-full)',
                                                background: booking.status === 'confirmed' ? '#dcfce7' : '#f1f5f9',
                                                color: booking.status === 'confirmed' ? '#166534' : '#64748b'
                                            }}>
                                                {booking.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <p style={{ fontWeight: '500', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                                            {booking.roomName || 'Standard Room'}
                                        </p>
                                        <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: '0.25rem' }}>
                                            <Calendar size={14} /> {booking.checkIn} — {booking.checkOut}
                                        </p>
                                        <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)' }}>
                                            <MapPin size={14} /> ₹{booking.totalPrice} total • {booking.guests} Guests
                                        </p>
                                        {booking.guestDetails && (
                                            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                                Booked for: {booking.guestDetails.name}
                                            </p>
                                        )}
                                    </div>

                                    {booking.status === 'confirmed' && (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <Button variant="outline" size="sm" onClick={() => {
                                                const printContent = `
                                                    <html>
                                                        <body style="font-family: sans-serif; padding: 2rem;">
                                                            <h1>Booking Confirmation</h1>
                                                            <hr/>
                                                            <h2>${booking.hotelName}</h2>
                                                            <p><strong>Booking ID:</strong> ${booking.id}</p>
                                                            <p><strong>Dates:</strong> ${booking.checkIn} to ${booking.checkOut}</p>
                                                            <p><strong>Guests:</strong> ${booking.guests}</p>
                                                            <p><strong>Total Paid:</strong> ₹${booking.totalPrice}</p>
                                                            <hr/>
                                                            <p>Thank you for booking with Snoraa!</p>
                                                        </body>
                                                    </html>
                                                `;
                                                const printWindow = window.open('', '', 'height=600,width=800');
                                                printWindow.document.write(printContent);
                                                printWindow.document.close();
                                                setTimeout(() => printWindow.print(), 500);
                                            }}>
                                                Download Ticket
                                            </Button>
                                            <button
                                                onClick={() => handleCancel(booking.id)}
                                                style={{
                                                    color: 'var(--danger)', background: 'none', border: 'none',
                                                    display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: 'var(--font-size-sm)', cursor: 'pointer'
                                                }}
                                            >
                                                <XCircle size={16} /> Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Wishlist Section */}
            <div style={{ marginTop: '4rem' }}>
                <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Heart size={24} fill="var(--primary)" stroke="none" /> Saved Properties
                </h2>
                <WishlistSection />
            </div>
        </div>
    );
};

const WishlistSection = () => {
    const { wishlist } = useWishlist();

    if (wishlist.length === 0) {
        return (
            <div style={{ padding: '2rem', border: '1px dashed var(--border)', borderRadius: 'var(--radius-lg)', textAlign: 'center', color: 'var(--text-muted)' }}>
                <p>No saved properties yet.</p>
            </div>
        );
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {wishlist.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} />
            ))}
        </div>
    );
};

export default Profile;
