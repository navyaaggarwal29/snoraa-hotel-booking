import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { hotels as mockHotels } from '../services/mockData';
import HotelCard from '../components/features/HotelCard';
import Filters from '../components/features/Filters';
import SearchBar from '../components/features/SearchBar';
import SkeletonCard from '../components/common/SkeletonCard';
import { LayoutGrid, List as ListIcon } from 'lucide-react';

const Listings = () => {
    const [searchParams] = useSearchParams();
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [sortBy, setSortBy] = useState('recommended');
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    const [filters, setFilters] = useState({
        maxPrice: 50000,
        amenities: [],
        types: []
    });

    // Initial load & Search Params handling
    useEffect(() => {
        setLoading(true);
        // Simulate API delay
        setTimeout(() => {
            const destination = searchParams.get('destination')?.toLowerCase() || '';

            let results = mockHotels;
            if (destination) {
                results = results.filter(h => h.location.toLowerCase().includes(destination));
            }

            setHotels(results);
            setFilteredHotels(results);
            setLoading(false);
        }, 800);
    }, [searchParams]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Apply Client-side Filters & Sort
    useEffect(() => {
        let result = [...hotels];

        // Filter by Price
        result = result.filter(h => h.price <= filters.maxPrice);

        // Filter by Property Type
        if (filters.types.length > 0) {
            result = result.filter(h => filters.types.includes(h.type));
        }

        // Filter by Amenities
        if (filters.amenities.length > 0) {
            result = result.filter(h =>
                filters.amenities.every(filterAmenity =>
                    h.amenities.some(hotelAmenity =>
                        hotelAmenity.toLowerCase().includes(filterAmenity.toLowerCase())
                    )
                )
            );
        }

        // Sorting
        if (sortBy === 'price_low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'price_high') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === 'rating') {
            result.sort((a, b) => b.rating - a.rating);
        }

        setFilteredHotels(result);
        setCurrentPage(1); // Reset to first page when filters change
    }, [hotels, filters, sortBy]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
    const displayedHotels = filteredHotels.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            {/* Top Search Bar (Compact) */}
            <div style={{ marginBottom: '2rem' }}>
                <SearchBar />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem', minHeight: '80vh' }}>
                {/* Sidebar */}
                <aside>
                    <Filters filters={filters} setFilters={setFilters} />
                </aside>

                {/* Main Content */}
                <main>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'bold' }}>
                            {loading ? 'Searching...' : `${filteredHotels.length} places to stay`}
                        </h2>

                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            {/* View Toggle */}
                            <div style={{ display: 'flex', background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    style={{
                                        padding: '0.5rem',
                                        background: viewMode === 'grid' ? 'var(--primary-light)' : 'transparent',
                                        color: viewMode === 'grid' ? 'var(--primary)' : 'var(--text-muted)',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <LayoutGrid size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    style={{
                                        padding: '0.5rem',
                                        background: viewMode === 'list' ? 'var(--primary-light)' : 'transparent',
                                        color: viewMode === 'list' ? 'var(--primary)' : 'var(--text-muted)',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <ListIcon size={20} />
                                </button>
                            </div>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{
                                    padding: '0.5rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border)',
                                    outline: 'none'
                                }}
                            >
                                <option value="recommended">Recommended</option>
                                <option value="price_low">Price: Low to High</option>
                                <option value="price_high">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                            </select>
                        </div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: viewMode === 'grid' ? 'repeat(auto-fill, minmax(300px, 1fr))' : '1fr',
                        gap: '1.5rem'
                    }}>
                        {loading ? (
                            // Show Skeletons
                            Array.from({ length: 6 }).map((_, i) => (
                                <SkeletonCard key={i} viewMode={viewMode} />
                            ))
                        ) : displayedHotels.length > 0 ? (
                            displayedHotels.map(hotel => (
                                <HotelCard key={hotel.id} hotel={hotel} viewMode={viewMode} />
                            ))
                        ) : (
                            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                                <h3>No properties found matching your criteria.</h3>
                                <p>Try adjusting your search or filters.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {!loading && totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '3rem' }}>
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                style={{
                                    padding: '0.5rem 1rem',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-md)',
                                    background: currentPage === 1 ? 'var(--background)' : 'var(--card-bg)',
                                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                    color: currentPage === 1 ? 'var(--text-muted)' : 'var(--text-main)'
                                }}
                            >
                                Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: page === currentPage ? 'none' : '1px solid var(--border)',
                                        borderRadius: 'var(--radius-md)',
                                        background: page === currentPage ? 'var(--primary)' : 'var(--card-bg)',
                                        color: page === currentPage ? 'white' : 'var(--text-main)',
                                        fontWeight: page === currentPage ? 'bold' : 'normal',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                style={{
                                    padding: '0.5rem 1rem',
                                    border: '1px solid var(--border)',
                                    borderRadius: 'var(--radius-md)',
                                    background: currentPage === totalPages ? 'var(--background)' : 'var(--card-bg)',
                                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                    color: currentPage === totalPages ? 'var(--text-muted)' : 'var(--text-main)'
                                }}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Listings;
