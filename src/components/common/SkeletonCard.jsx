import React from 'react';

const SkeletonCard = ({ viewMode = 'grid' }) => {
    return (
        <div style={{
            background: 'var(--card-bg)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: 'none',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: viewMode === 'list' ? 'row' : 'column',
            height: viewMode === 'list' ? '200px' : 'auto',
            animation: 'pulse 1.5s infinite ease-in-out'
        }}>
            <style>
                {`
                    @keyframes pulse {
                        0% { opacity: 1; }
                        50% { opacity: 0.5; }
                        100% { opacity: 1; }
                    }
                    .skeleton-bg {
                        background-color: #e2e8f0;
                        border-radius: 4px;
                    }
                `}
            </style>

            {/* Image Placeholder */}
            <div
                className="skeleton-bg"
                style={{
                    width: viewMode === 'list' ? '300px' : '100%',
                    height: viewMode === 'list' ? '100%' : '200px',
                    flexShrink: 0
                }}
            />

            {/* Content Placeholder */}
            <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="skeleton-bg" style={{ width: '60%', height: '24px' }}></div>
                    <div className="skeleton-bg" style={{ width: '20%', height: '24px' }}></div>
                </div>

                <div className="skeleton-bg" style={{ width: '40%', height: '16px' }}></div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
                    <div className="skeleton-bg" style={{ width: '30px', height: '30px', borderRadius: '50%' }}></div>
                    <div className="skeleton-bg" style={{ width: '30px', height: '30px', borderRadius: '50%' }}></div>
                    <div className="skeleton-bg" style={{ width: '30px', height: '30px', borderRadius: '50%' }}></div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                    <div className="skeleton-bg" style={{ width: '30%', height: '28px' }}></div>
                    <div className="skeleton-bg" style={{ width: '30%', height: '40px', borderRadius: '8px' }}></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
