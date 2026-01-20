import React from 'react';

const ThemeLogo = ({ className, style }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className={className}
            style={style}
            fill="none"
            stroke="var(--primary)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Modern House Shape abstractly forming a V */}
            <path d="M20 40 L50 15 L80 40 V85 H20 V40 Z" fill="none" strokeWidth="6" />
            <path d="M35 85 V55 H65 V85" />
            <path d="M10 40 L50 5 L90 40" />

            {/* V stylized inside or over it? keeping it simple property icon for now as Navbar has text separate */}

            {/* Alternative: A house with V roof */}
        </svg>
    );
};

export default ThemeLogo;
