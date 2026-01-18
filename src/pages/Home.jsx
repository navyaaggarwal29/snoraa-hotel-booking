import React from 'react';
import SearchBar from '../components/features/SearchBar';
import ServiceIcons from '../components/features/ServiceIcons';
import DiscoveryTabs from '../components/features/DiscoveryTabs';

const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section style={{
                position: 'relative',
                height: '500px', // Increased height to show off the image
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2rem 1rem 0',
                background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url("/hero-bg-new.jpg")', // New sunset image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white'
            }}>

                <ServiceIcons />

                <div style={{ maxWidth: '800px', width: '100%', marginBottom: '1rem', textAlign: 'center' }}>
                    <h1 style={{
                        fontSize: 'var(--font-size-2xl)',
                        fontWeight: 'bold',
                        marginBottom: '0.5rem',
                        textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}>
                        Book Domestic and International Property Online
                    </h1>
                </div>

                {/* Search Bar Container - Pushed down to overlap */}
                <div style={{ marginBottom: '-3rem', width: '100%', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 20 }}>
                    <SearchBar />
                </div>
            </section>

            {/* Discovery Section (Pushed down to accommodate search bar) */}
            {/* Discovery Section */}
            <div className="container" style={{ padding: '5rem 1rem 4rem' }}>
                <DiscoveryTabs />
            </div>
        </div>
    );
};

export default Home;
