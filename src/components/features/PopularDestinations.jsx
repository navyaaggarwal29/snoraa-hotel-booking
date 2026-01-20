import React from 'react';
import { useNavigate } from 'react-router-dom';

const destinations = [
    {
        id: 'goa',
        name: 'Goa',
        description: 'Beaches, Sun, and endless parties',
        image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&auto=format&fit=crop&q=60',
        size: 'large' // Occupies 2 columns on large screens
    },
    {
        id: 'udaipur',
        name: 'Udaipur',
        description: 'Crowned as India\'s most romantic city',
        image: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=800&auto=format&fit=crop&q=60',
        size: 'tall' // Occupies 2 rows
    },
    {
        id: 'shimla',
        name: 'Shimla',
        description: 'Endearing combination of snow-covered peaks',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=60',
        size: 'normal'
    },
    {
        id: 'manali',
        name: 'Manali',
        description: 'A gift of the Himalayas to the world',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=60',
        size: 'normal'
    },
    {
        id: 'dubai',
        name: 'Dubai',
        description: 'The city of life and luxury',
        image: 'https://images.unsplash.com/photo-1546412414-e1885259563a?w=800&auto=format&fit=crop&q=60',
        size: 'large'
    },
    {
        id: 'maldives',
        name: 'Maldives',
        description: 'Tropical paradise boastings stunning beaches',
        image: 'https://images.unsplash.com/photo-1573843980622-be7d5fe6d467?w=800&auto=format&fit=crop&q=60',
        size: 'normal'
    }
];

const PopularDestinations = () => {
    const navigate = useNavigate();

    return (
        <div style={{ marginTop: '4rem' }}>
            <h2 style={{
                fontSize: 'var(--font-size-2xl)',
                fontWeight: 'bold',
                marginBottom: '1.5rem',
                color: 'var(--text-main)'
            }}>
                Popular Destinations
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                autoRows: '250px' // Base row height
            }}>
                {destinations.map((dest, index) => {
                    // Custom grid spans for visual interest (like the reference)
                    const gridColumn = dest.size === 'large' ? 'span 2' : 'span 1';
                    const gridRow = dest.size === 'tall' ? 'span 2' : 'span 1';

                    return (
                        <div
                            key={dest.id}
                            onClick={() => navigate(`/hotels?destination=${dest.name}`)}
                            style={{
                                position: 'relative',
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                gridColumn: window.innerWidth > 768 ? gridColumn : 'auto', // Responsive: stack on mobile
                                gridRow: window.innerWidth > 768 ? gridRow : 'auto',
                                boxShadow: 'var(--shadow-md)',
                                transition: 'transform 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <img
                                src={dest.image}
                                alt={dest.name}
                                loading="lazy"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.5s ease'
                                }}
                            />

                            {/* Gradient Overlay */}
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                height: '50%',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                padding: '1.5rem'
                            }}>
                                <h3 style={{
                                    color: 'white',
                                    fontSize: 'var(--font-size-xl)',
                                    fontWeight: 'bold',
                                    marginBottom: '0.25rem',
                                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                                }}>
                                    {dest.name}
                                </h3>
                                <p style={{
                                    color: 'rgba(255,255,255,0.9)',
                                    fontSize: 'var(--font-size-sm)',
                                    fontWeight: '500'
                                }}>
                                    {dest.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PopularDestinations;
