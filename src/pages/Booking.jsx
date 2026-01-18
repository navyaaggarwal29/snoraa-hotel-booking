import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { hotels } from '../services/mockData';
import { authService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { toast } from 'react-hot-toast';

const Booking = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    // Initial State Setup
    const hotelId = searchParams.get('hotelId');
    const roomId = searchParams.get('roomId');

    const [hotel, setHotel] = useState(null);
    const [room, setRoom] = useState(null);

    const [dates, setDates] = useState({
        checkIn: new Date().toISOString().split('T')[0],
        checkOut: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
    });

    const [guests, setGuests] = useState(2);

    const [guestDetails, setGuestDetails] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Initialize Data
    useEffect(() => {
        const foundHotel = hotels.find(h => h.id === hotelId);
        if (!foundHotel) {
            toast.error('Hotel not found');
            navigate('/hotels');
            return;
        }
        setHotel(foundHotel);

        const foundRoom = foundHotel.rooms?.find(r => r.id === roomId) ||
            // Fallback for hotels without rooms array in older mock data, or if no room selected
            { id: 'default', name: 'Standard Room', price: foundHotel.price, capacity: 2 };

        setRoom(foundRoom);

        if (user) {
            setGuestDetails(prev => ({ ...prev, name: user.name, email: user.email }));
        }
    }, [hotelId, roomId, navigate, user]);

    // Derived Calculations
    const calculateTotal = () => {
        if (!room) return 0;
        const start = new Date(dates.checkIn);
        const end = new Date(dates.checkOut);
        const nights = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
        const basePrice = room.price * nights;
        const taxes = Math.round(basePrice * 0.12); // 12% tax
        return { nights, basePrice, taxes, total: basePrice + taxes };
    };

    const totals = calculateTotal();

    const handleConfirm = async (e) => {
        e.preventDefault();

        if (!hotel || !user) return;
        if (!guestDetails.name || !guestDetails.email || !guestDetails.phone) {
            toast.error('Please fill in all guest details');
            return;
        }

        setIsSubmitting(true);

        try {
            await authService.createBooking(user.id, {
                hotelId: hotel.id,
                hotelName: hotel.name,
                hotelImage: hotel.image,
                roomId: room.id,
                roomName: room.name,
                checkIn: dates.checkIn,
                checkOut: dates.checkOut,
                totalPrice: totals.total,
                guests,
                guestDetails
            });
            setIsSuccess(true);
            toast.success('Booking Confirmed!');
        } catch (err) {
            toast.error('Booking failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                <div style={{
                    background: 'var(--success)',
                    color: 'white',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 2rem',
                    fontSize: '2rem'
                }}>✓</div>
                <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold' }}>Booking Confirmed!</h1>
                <p style={{ margin: '1rem 0 2rem', color: 'var(--text-muted)' }}>You will receive a confirmation email shortly.</p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Button onClick={() => navigate('/profile')}>View My Bookings</Button>
                    <Button variant="outline" onClick={() => navigate('/')}>Back Home</Button>
                </div>
            </div>
        );
    }

    if (!hotel || !room) return <div className="container">Loading...</div>;

    return (
        <div className="container" style={{ padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold', marginBottom: '2rem' }}>Confirm your trip</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                {/* Left Column: Form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Dates & Guests */}
                    <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                        <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', marginBottom: '1rem' }}>Your Trip</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                            <Input
                                label="Check-in"
                                type="date"
                                value={dates.checkIn}
                                onChange={(e) => setDates({ ...dates, checkIn: e.target.value })}
                            />
                            <Input
                                label="Check-out"
                                type="date"
                                value={dates.checkOut}
                                onChange={(e) => setDates({ ...dates, checkOut: e.target.value })}
                            />
                        </div>
                        <Input
                            label="Guests"
                            type="number"
                            min="1"
                            max={room.capacity}
                            value={guests}
                            onChange={(e) => setGuests(parseInt(e.target.value))}
                        />
                    </div>

                    {/* Guest Details Form */}
                    <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                        <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', marginBottom: '1rem' }}>Guest Details</h2>
                        <form id="booking-form" onSubmit={handleConfirm}>
                            <div style={{ display: 'grid', gap: '1rem' }}>
                                <Input
                                    label="Full Name"
                                    value={guestDetails.name}
                                    onChange={(e) => setGuestDetails({ ...guestDetails, name: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Email Address"
                                    type="email"
                                    value={guestDetails.email}
                                    onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                                    required
                                />
                                <Input
                                    label="Phone Number"
                                    type="tel"
                                    value={guestDetails.phone}
                                    onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                                    placeholder="+1 (555) 000-0000"
                                    required
                                />
                            </div>
                        </form>
                    </div>

                    <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                        <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', marginBottom: '1rem' }}>Payment</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Payment functionality mock (No charge will be made).</p>
                    </div>
                </div>

                {/* Right Column: Order Summary */}
                <div>
                    <div style={{ background: 'var(--card-bg)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', position: 'sticky', top: '100px' }}>
                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                            <img src={hotel.image} alt={hotel.name} style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }} />
                            <div>
                                <h3 style={{ fontWeight: 'bold', fontSize: '1rem' }}>{hotel.name}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{room.name}</p>
                                <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>4.8 ★ ({hotel.reviews} reviews)</p>
                            </div>
                        </div>

                        <hr style={{ margin: '1rem 0', borderColor: 'var(--border)' }} />

                        <h2 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', marginBottom: '1rem' }}>Price Details</h2>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                            <span>₹{room.price} x {totals.nights} nights</span>
                            <span>₹{totals.basePrice}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                            <span>Taxes & fees (12%)</span>
                            <span>₹{totals.taxes}</span>
                        </div>
                        <hr style={{ margin: '1rem 0', borderColor: 'var(--border)' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: 'var(--font-size-xl)' }}>
                            <span>Total</span>
                            <span>₹{totals.total}</span>
                        </div>

                        <Button
                            type="submit"
                            form="booking-form"
                            disabled={isSubmitting}
                            style={{ width: '100%', marginTop: '1.5rem', padding: '1rem', fontSize: 'var(--font-size-lg)' }}
                        >
                            {isSubmitting ? 'Confirming...' : 'Confirm and Pay'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
