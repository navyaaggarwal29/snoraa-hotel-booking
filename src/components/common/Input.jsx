import React from 'react';

const Input = ({ label, error, containerClass = '', ...props }) => {
    return (
        <div className={`input-group ${containerClass}`} style={{ marginBottom: '1rem' }}>
            {label && (
                <label
                    style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: '500',
                        color: 'var(--text-main)'
                    }}
                >
                    {label}
                </label>
            )}
            <input
                style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: `1px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
                    backgroundColor: 'white',
                    fontSize: 'var(--font-size-base)',
                    outline: 'none',
                    transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                onBlur={(e) => e.target.style.borderColor = error ? 'var(--danger)' : 'var(--border)'}
                {...props}
            />
            {error && (
                <span style={{ color: 'var(--danger)', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                    {error}
                </span>
            )}
        </div>
    );
};

export default Input;
