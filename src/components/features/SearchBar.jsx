import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import Button from '../common/Button';

const SearchBar = ({ className = '' }) => {
    const navigate = useNavigate();
    const [destination, setDestination] = useState('');
    const [dates, setDates] = useState({ checkIn: new Date().toISOString().split('T')[0], checkOut: '' });
    const [guests, setGuests] = useState(2);

    const handleSearch = (e) => {
        e.preventDefault();
        const queryParams = new URLSearchParams({
            destination,
            checkIn: dates.checkIn,
            checkOut: dates.checkOut,
            guests
        }).toString();
        navigate(`/hotels?${queryParams}`);
    };

    return (
        <form
            onSubmit={handleSearch}
            className={className}
            style={{
                display: 'flex',
                background: 'white',
                padding: '1rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                maxWidth: '1100px',
                width: '100%',
                alignItems: 'center',
                border: '1px solid var(--border)'
            }}
        >
            {/* Destination Input */}
            <div style={{ flex: '2', padding: '0.5rem 1.5rem', borderRight: '1px solid var(--border)' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    City, Property or Location
                </label>
                <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Goa, India"
                    style={{
                        width: '100%',
                        border: 'none',
                        outline: 'none',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'var(--text-main)',
                        padding: '0.25rem 0'
                    }}
                />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>India</span>
            </div>

            {/* Check In */}
            <div style={{ flex: '1', padding: '0.5rem 1.5rem', borderRight: '1px solid var(--border)' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Check-In
                </label>
                <input
                    type="date"
                    value={dates.checkIn}
                    onChange={(e) => setDates({ ...dates, checkIn: e.target.value })}
                    style={{
                        width: '100%',
                        border: 'none',
                        outline: 'none',
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: 'var(--text-main)',
                        fontFamily: 'inherit'
                    }}
                />
            </div>

            {/* Check Out */}
            <div style={{ flex: '1', padding: '0.5rem 1.5rem', borderRight: '1px solid var(--border)' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Check-Out
                </label>
                <input
                    type="date"
                    value={dates.checkOut}
                    onChange={(e) => setDates({ ...dates, checkOut: e.target.value })}
                    style={{
                        width: '100%',
                        border: 'none',
                        outline: 'none',
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        color: 'var(--text-main)',
                        fontFamily: 'inherit'
                    }}
                />
            </div>

            {/* Guests */}
            <div style={{ flex: '1.5', padding: '0.5rem 1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Rooms & Guests
                </label>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)' }}>
                        1
                    </span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>Room</span>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        style={{
                            width: '50px',
                            border: 'none',
                            outline: 'none',
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            color: 'var(--text-main)',
                            marginLeft: '0.5rem',
                            textAlign: 'right'
                        }}
                    />
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>Adults</span>
                </div>
            </div>

            {/* Search Button */}
            <div style={{ position: 'absolute', bottom: '-25px', left: '50%', transform: 'translateX(-50%)' }}>
                <Button
                    type="submit"
                    style={{
                        borderRadius: 'var(--radius-full)',
                        padding: '0.75rem 3rem',
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                        textTransform: 'uppercase'
                    }}
                >
                    Search
                </Button>
            </div>
        </form>
    );
};

export default SearchBar;
