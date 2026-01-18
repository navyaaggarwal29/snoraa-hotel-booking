import React from 'react';

const Filters = ({ filters, setFilters }) => {
    const handleAmenityChange = (amenity) => {
        const newAmenities = filters.amenities.includes(amenity)
            ? filters.amenities.filter(a => a !== amenity)
            : [...filters.amenities, amenity];
        setFilters({ ...filters, amenities: newAmenities });
    };

    return (
        <div style={{
            background: 'var(--card-bg)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
            alignSelf: 'start', // Keeps it at the top when scrolling if used in flex/grid
            border: '1px solid var(--border)',
            transition: 'background-color 0.3s ease'
        }}>
            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-main)' }}>Price Range</h3>
                <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: parseInt(e.target.value) })}
                    style={{ width: '100%', marginBottom: '0.5rem' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>
                    <span>₹1000</span>
                    <span>₹{filters.maxPrice}+</span>
                </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-main)' }}>Property Type</h3>
                {['Hotel', 'Resort', 'Apartment'].map(type => (
                    <div key={type} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="checkbox"
                            checked={filters.types.includes(type)}
                            onChange={() => {
                                const newTypes = filters.types.includes(type)
                                    ? filters.types.filter(t => t !== type)
                                    : [...filters.types, type];
                                setFilters({ ...filters, types: newTypes });
                            }}
                            style={{ width: '16px', height: '16px' }}
                        />
                        <label style={{ color: 'var(--text-main)' }}>{type}</label>
                    </div>
                ))}
            </div>

            <div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-main)' }}>Amenities</h3>
                {['WiFi', 'Pool', 'Gym', 'Spa', 'AC', 'Parking'].map(amenity => (
                    <div key={amenity} style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                            type="checkbox"
                            checked={filters.amenities.includes(amenity)}
                            onChange={() => handleAmenityChange(amenity)}
                            style={{ width: '16px', height: '16px' }}
                        />
                        <label style={{ color: 'var(--text-main)' }}>{amenity}</label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Filters;
