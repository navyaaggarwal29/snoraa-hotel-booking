import React from 'react';
import { Plane, Building, Home, Map, Train, Bus, Car, Ticket } from 'lucide-react';

const ServiceIcons = () => {
    const services = [
        { icon: <Plane size={24} />, label: 'Flights' },
        { icon: <Building size={24} />, label: 'Hotels', active: true },
        { icon: <Home size={24} />, label: 'Homestays' },
        { icon: <Map size={24} />, label: 'Packages' },
        { icon: <Train size={24} />, label: 'Trains' },
        { icon: <Bus size={24} />, label: 'Buses' },
        { icon: <Car size={24} />, label: 'Cabs' },
        { icon: <Ticket size={24} />, label: 'Visa' },
    ];

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            background: 'var(--card-bg)',
            padding: '1rem 2rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            marginBottom: '2rem',
            flexWrap: 'wrap'
        }}>
            {services.map((item, index) => (
                <div key={index} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    color: item.active ? 'var(--secondary)' : 'var(--text-muted)',
                    position: 'relative'
                }}>
                    <div style={{
                        padding: '0.5rem',
                        borderRadius: '50%',
                        background: item.active ? 'rgba(34, 116, 224, 0.1)' : 'transparent'
                    }}>
                        {item.icon}
                    </div>
                    <span style={{
                        fontSize: '0.875rem',
                        fontWeight: item.active ? 'bold' : 'normal',
                        borderBottom: item.active ? '2px solid var(--secondary)' : 'none',
                        paddingBottom: '2px'
                    }}>
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ServiceIcons;
