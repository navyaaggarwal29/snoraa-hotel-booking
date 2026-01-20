import React from 'react';
import SearchBar from '../components/features/SearchBar';
import ServiceIcons from '../components/features/ServiceIcons';
import DiscoveryTabs from '../components/features/DiscoveryTabs';
import PopularDestinations from '../components/features/PopularDestinations';

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
                background: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url("/home-bg-new.jpg")', // Lighter dark overlay
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white'
            }}>



                {/* Search Bar Container - Pushed down to overlap */}
                <div style={{ marginTop: 'auto', marginBottom: '-3rem', width: '100%', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 20 }}>
                    <SearchBar />
                </div>
            </section>

            {/* Discovery Section (Pushed down to accommodate search bar) */}
            {/* Discovery Section */}
            <div className="container" style={{ padding: '5rem 1rem 4rem' }}>
                <DiscoveryTabs />
                <PopularDestinations />
            </div>
        </div>
    );
};

export default Home;
