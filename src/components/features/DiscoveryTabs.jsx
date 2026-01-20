import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const DiscoveryTabs = () => {
    const [activeTab, setActiveTab] = useState('Beach Vacations');
    const navigate = useNavigate();

    const categories = {
        'Beach Vacations': [
            { name: 'Maldives', img: '/maldives-custom-new.png' },
            { name: 'Krabi', img: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=500&q=80' },
            { name: 'Phuket', img: '/phuket-custom-new.png' },
            { name: 'Langkawi', img: '/langkawi-custom.png' },
            { name: 'Goa', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=80' }
        ],
        'Weekend Getaways': [
            { name: 'Ooty', img: '/ooty-custom.png' },
            { name: 'Chandigarh', img: '/chandigarh-custom.png' },
            { name: 'Dehradun', img: '/dehradun-custom.png' },
            { name: 'Munnar', img: '/munnar-custom.png' },
            { name: 'Mysore', img: '/mysore-custom.png' }
        ],
        'Mountains Calling': [
            { name: 'Ooty', img: '/ooty-mountains.png' },
            { name: 'Shimla', img: '/shimla-custom.png' },
            { name: 'Munnar', img: '/munnar-custom.png' },
            { name: 'Manali', img: '/manali-custom.png' },
            { name: 'Pokhara', img: '/pokhara-custom.png' },
            { name: 'Kasol', img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=500&q=80' }
        ],
        'Stay Like Royals': [
            { name: 'Jodhpur', img: '/jodhpur-custom.png' },
            { name: 'Udaipur', img: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?w=500&q=80' },
            { name: 'Abu Dhabi', img: '/abudhabi-custom.png' },
            { name: 'Dubai', img: 'https://images.unsplash.com/photo-1546412414-e1885259563a?w=500&q=80' },
            { name: 'Mysore', img: '/mysore-royals.png' }
        ],
        'Indian Pilgrimages': [
            { name: 'Tirupati', img: '/tirupati-custom.png' },
            { name: 'Varanasi', img: 'https://images.unsplash.com/photo-1561359313-0639aad49ca6?w=500&q=80' },
            { name: 'Puri', img: '/puri-custom.png' },
            { name: 'Bhubaneswar', img: '/bhubaneshwar-custom.png' },
            { name: 'Amritsar', img: '/amritsar-custom.png' },
            { name: 'Gokarna', img: '/gokarna-new.png' }
        ],
        'Party Destinations': [
            { name: 'Amsterdam', img: '/amsterdam-custom.png' },
            { name: 'Hong Kong', img: '/hong-kong-custom.png' },
            { name: 'Mumbai', img: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=500&q=80' },
            { name: 'Pattaya', img: '/pattaya-custom.png' },
            { name: 'Goa', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500&q=80' }
        ]
    };

    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const { current } = scrollRef;
        if (current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div style={{ background: 'var(--card-bg)', padding: '2rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)', position: 'relative', zIndex: 10 }}>
            <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--text-main)', textAlign: 'left' }}>
                Discover by Interest
            </h2>

            {/* Tabs Navigation */}
            <div style={{
                display: 'flex',
                gap: '2rem',
                borderBottom: '1px solid var(--border)',
                marginBottom: '2rem',
                overflowX: 'auto',
                scrollbarWidth: 'none'
            }}>
                {Object.keys(categories).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            background: 'none',
                            border: 'none',
                            borderBottom: activeTab === tab ? '3px solid var(--primary)' : '3px solid transparent',
                            color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: activeTab === tab ? 'bold' : '500',
                            padding: '0.8rem 0.5rem',
                            cursor: 'pointer',
                            fontSize: 'var(--font-size-base)',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.2s'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Slider Container */}
            <div style={{ position: 'relative' }}>
                {/* Left Button */}
                <button
                    onClick={() => scroll('left')}
                    style={{
                        position: 'absolute',
                        left: '-20px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 2,
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border)',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-md)',
                        color: 'var(--primary)'
                    }}
                >
                    &#10094;
                </button>

                {/* Grid Content */}
                <div
                    ref={scrollRef}
                    style={{
                        display: 'flex',
                        gap: '2rem',
                        overflowX: 'auto',
                        padding: '0.5rem',
                        scrollbarWidth: 'none',
                        scrollBehavior: 'smooth'
                    }}
                >
                    {categories[activeTab].map(dest => (
                        <div
                            key={dest.name}
                            onClick={() => navigate(`/hotels?destination=${encodeURIComponent(dest.name)}`)}
                            style={{ cursor: 'pointer', minWidth: '240px', flex: '0 0 auto' }}
                        >
                            <div style={{
                                height: '180px',
                                borderRadius: 'var(--radius-lg)',
                                overflow: 'hidden',
                                marginBottom: '0.75rem',
                                position: 'relative',
                                boxShadow: 'var(--shadow-md)'
                            }}>
                                <img
                                    src={dest.img}
                                    alt={dest.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform 0.3s ease'
                                    }}
                                    onMouseOver={e => e.target.style.transform = 'scale(1.1)'}
                                    onMouseOut={e => e.target.style.transform = 'scale(1)'}
                                />
                            </div>
                            <h4 style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--text-main)', textAlign: 'left' }}>{dest.name}</h4>
                        </div>
                    ))}
                </div>

                {/* Right Button */}
                <button
                    onClick={() => scroll('right')}
                    style={{
                        position: 'absolute',
                        right: '-20px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 2,
                        background: 'var(--card-bg)',
                        border: '1px solid var(--border)',
                        borderRadius: '50%',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-md)',
                        color: 'var(--primary)'
                    }}
                >
                    &#10095;
                </button>
            </div>
        </div>
    );
};

export default DiscoveryTabs;
