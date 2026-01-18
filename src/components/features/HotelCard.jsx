import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Wifi, Wind, Coffee, Anchor } from 'lucide-react';

const HotelCard = ({ hotel, viewMode = 'grid' }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/hotels/${hotel.id}`)} // Fixed route to match existing
            style={{
                background: 'var(--card-bg)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--border)',
                transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.3s',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: viewMode === 'list' ? 'row' : 'column',
                height: viewMode === 'list' ? '200px' : 'auto'
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
        >
            <div style={{
                height: viewMode === 'list' ? '100%' : '200px',
                width: viewMode === 'list' ? '300px' : '100%',
                flexShrink: 0,
                overflow: 'hidden'
            }}>
                <img
                    src={hotel.image}
                    alt={hotel.name}
                    loading="lazy"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </div>

            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                    <div>
                        <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', marginBottom: '0.25rem', color: 'var(--text-main)' }}>
                            {hotel.name}
                        </h3>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>
                            <MapPin size={14} /> {hotel.location}
                        </p>
                    </div>
                </div>

                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'var(--primary)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', fontSize: 'var(--font-size-sm)', fontWeight: 'bold' }}>
                        {hotel.rating} <Star size={12} fill="white" />
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>({hotel.reviews} reviews)</span>
                </div>

                {/* Amenities Preview */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: 'auto', flexWrap: 'wrap' }}>
                    {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                        <span key={idx} style={{
                            fontSize: '0.7rem',
                            padding: '0.2rem 0.5rem',
                            background: '#f1f5f9',
                            borderRadius: '4px',
                            color: '#475569'
                        }}>
                            {amenity}
                        </span>
                    ))}
                    {hotel.amenities.length > 3 && (
                        <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', color: '#64748b' }}>+{hotel.amenities.length - 3}</span>
                    )}
                </div>

                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', color: 'var(--primary)' }}>
                            ₹{hotel.price.toLocaleString('en-IN')}
                        </div>
                        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>/ night</span>
                    </div>
                    {viewMode === 'list' && (
                        <button style={{
                            padding: '0.5rem 1rem',
                            background: 'var(--secondary)',
                            color: 'white',
                            border: 'none',
                            borderRadius: 'var(--radius-md)',
                            cursor: 'pointer',
                            fontWeight: '600'
                        }}>View Details</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
