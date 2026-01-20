import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { hotels as mockHotels } from '../services/mockData';
import { Star, MapPin, Wifi, Wind, Coffee, Anchor, ArrowLeft, CheckCircle } from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const HotelDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [hotel, setHotel] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [loading, setLoading] = useState(true);

    // Date State
    const [dates, setDates] = useState({
        checkIn: '',
        checkOut: ''
    });

    const handleDateChange = (field, value) => {
        setDates(prev => ({ ...prev, [field]: value }));
    };

    useEffect(() => {
        // Simulate API fetch
        const foundHotel = mockHotels.find(h => h.id === id);
        if (foundHotel) {
            setHotel(foundHotel);
        }
        setLoading(false);
    }, [id]);

    if (loading) return <div className="container">Loading...</div>;
    if (!hotel) return <div className="container">Hotel not found</div>;

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'none',
                    color: 'var(--text-muted)',
                    marginBottom: '1rem'
                }}
            >
                <ArrowLeft size={20} /> Back to Search
            </button>

            {/* Header Info */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'bold', marginBottom: '0.5rem' }}>{hotel.name}</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin size={18} /> {hotel.location}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Star size={18} fill="orange" color="orange" /> {hotel.rating} ({hotel.reviews} reviews)
                    </span>
                </div>
            </div>

            {/* Gallery */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: '1rem',
                height: '400px',
                marginBottom: '2rem',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden'
            }}>
                <img
                    src={hotel.image}
                    alt={hotel.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <img
                        src={hotel.rooms?.[0]?.image || "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&auto=format&fit=crop&q=60"}
                        alt="Interior 1"
                        style={{ width: '100%', height: 'calc(50% - 0.5rem)', objectFit: 'cover' }}
                    />
                    <img
                        src={hotel.rooms?.[1]?.image || hotel.rooms?.[0]?.image || "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=500&auto=format&fit=crop&q=60"}
                        alt="Interior 2"
                        style={{ width: '100%', height: 'calc(50% - 0.5rem)', objectFit: 'cover' }}
                    />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Main Details */}
                <div>
                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', marginBottom: '1rem' }}>About this place</h2>
                        <p style={{ lineHeight: '1.6', color: 'var(--text-muted)' }}>
                            {hotel.description} Located just minutes away from major attractions, this property offers a perfect blend of comfort and convenience.
                            Enjoy our world-class facilities including a rooftop pool, 24/7 fitness center, and gourmet dining options.
                        </p>
                    </div>

                    {/* Room Selection */}
                    <div style={{ marginBottom: '2rem' }} id="room-selection">
                        <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', marginBottom: '1rem' }}>Choose your room</h2>
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {hotel.rooms && hotel.rooms.map(room => (
                                <div key={room.id}
                                    onClick={() => setSelectedRoom(room)}
                                    style={{
                                        border: selectedRoom?.id === room.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                                        borderRadius: 'var(--radius-lg)',
                                        cursor: 'pointer',
                                        background: selectedRoom?.id === room.id ? 'var(--primary-light)' : 'var(--card-bg)',
                                        transition: 'all 0.2s',
                                        overflow: 'hidden'
                                    }}>
                                    <div style={{ display: 'flex', flexDirection: window.innerWidth < 640 ? 'column' : 'row' }}>
                                        {/* Room Image */}
                                        <div style={{
                                            width: window.innerWidth < 640 ? '100%' : '180px',
                                            height: window.innerWidth < 640 ? '160px' : 'auto',
                                            flexShrink: 0
                                        }}>
                                            <img
                                                src={room.image || hotel.image}
                                                alt={room.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                loading="lazy"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div style={{
                                            padding: '1.25rem',
                                            flex: 1,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                            gap: '1rem'
                                        }}>
                                            <div style={{ flex: 1, minWidth: '200px' }}>
                                                <div style={{ fontWeight: 'bold', fontSize: 'var(--font-size-lg)' }}>{room.name}</div>
                                                <div style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-sm)', marginBottom: '0.5rem' }}>{room.description}</div>

                                                {/* Room Features */}
                                                {room.features && (
                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                        {room.features.map((feature, index) => (
                                                            <span key={index} style={{
                                                                fontSize: '0.75rem',
                                                                background: 'var(--bg-secondary)',
                                                                padding: '0.25rem 0.5rem',
                                                                borderRadius: '4px',
                                                                border: '1px solid var(--border)',
                                                                color: 'var(--text-main)'
                                                            }}>
                                                                {feature}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                <div style={{ fontSize: 'var(--font-size-sm)' }}>Max: {room.capacity} Guests</div>
                                            </div>

                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold' }}>₹{room.price}</div>
                                                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>/ night</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', marginBottom: '1rem' }}>What this place offers</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            {hotel.amenities.map(amenity => (
                                <div key={amenity} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)' }}>
                                    <CheckCircle size={18} color="var(--primary)" /> {amenity}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Booking Card */}
                <div>
                    <div style={{
                        background: 'var(--card-bg)',
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-xl)',
                        border: '1px solid var(--border)',
                        position: 'sticky',
                        top: '100px'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <div>
                                {selectedRoom ? (
                                    <>
                                        <span style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 'bold' }}>₹{selectedRoom.price}</span>
                                        <span style={{ color: 'var(--text-muted)' }}> / night</span>
                                        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--primary)' }}>{selectedRoom.name}</div>
                                    </>
                                ) : (
                                    <>
                                        <span style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-muted)' }}>Select a room</span>
                                        <span style={{ fontSize: 'var(--font-size-sm)', display: 'block' }}>from ₹{Math.min(...(hotel.rooms?.map(r => r.price) || [hotel.price]))}</span>
                                    </>
                                )}
                            </div>
                            <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 'bold', color: 'var(--text-muted)' }}>
                                4.8 ★
                            </span>
                        </div>





                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                                <div style={{ display: 'flex', borderBottom: '1px solid var(--border)' }}>
                                    <div style={{ padding: '0.5rem 1rem', flex: 1, borderRight: '1px solid var(--border)' }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>CHECK-IN</div>
                                        <input
                                            type="date"
                                            value={dates.checkIn}
                                            onChange={(e) => handleDateChange('checkIn', e.target.value)}
                                            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.875rem', color: 'var(--text-main)' }}
                                        />
                                    </div>
                                    <div style={{ padding: '0.5rem 1rem', flex: 1 }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>CHECK-OUT</div>
                                        <input
                                            type="date"
                                            value={dates.checkOut}
                                            onChange={(e) => handleDateChange('checkOut', e.target.value)}
                                            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.875rem', color: 'var(--text-main)' }}
                                        />
                                    </div>
                                </div>
                                <div style={{ padding: '0.5rem 1rem' }}>
                                    <div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>GUESTS</div>
                                    <div style={{ fontSize: '0.875rem' }}>{selectedRoom ? `${selectedRoom.capacity} Guests Max` : 'Select room'}</div>
                                </div>
                            </div>
                        </div>

                        <Button
                            style={{ width: '100%' }}
                            onClick={() => {
                                if (!selectedRoom) {
                                    toast.error('Please select a room to proceed');
                                    document.getElementById('room-selection').scrollIntoView({ behavior: 'smooth' });
                                    return;
                                }
                                if (!dates.checkIn || !dates.checkOut) {
                                    toast.error('Please select check-in and check-out dates');
                                    return;
                                }

                                const bookingUrl = `/booking?hotelId=${hotel.id}&roomId=${selectedRoom.id}&checkIn=${dates.checkIn}&checkOut=${dates.checkOut}`;

                                if (isAuthenticated) {
                                    navigate(bookingUrl);
                                } else {
                                    navigate('/login', { state: { from: bookingUrl } });
                                }
                            }}
                        >
                            Reserve
                        </Button>
                        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>
                            You won't be charged yet
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;
