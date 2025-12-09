import React from 'react';

export const LoadingSpinner = ({ size = 'md' }) => {
    const sizeMap = { sm: 24, md: 48, lg: 64 };
    const s = sizeMap[size] || 48;

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div
                className="position-relative"
                style={{ width: s, height: s }}
            >
                {/* Outer ring */}
                <div
                    className="position-absolute w-100 h-100 rounded-circle"
                    style={{
                        border: '3px solid rgba(59, 130, 246, 0.1)',
                        borderTopColor: '#3b82f6',
                        animation: 'spin 1s linear infinite'
                    }}
                />
                {/* Inner glow */}
                <div
                    className="position-absolute rounded-circle"
                    style={{
                        top: '20%',
                        left: '20%',
                        width: '60%',
                        height: '60%',
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
                        animation: 'pulse 2s ease-in-out infinite'
                    }}
                />
            </div>
        </div>
    );
};

export const LoadingOverlay = () => {
    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center"
            style={{
                background: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(10px)',
                zIndex: 9999
            }}
        >
            {/* Animated background */}
            <div
                className="position-absolute w-100 h-100"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                    animation: 'pulse 3s ease-in-out infinite'
                }}
            />

            {/* Main spinner */}
            <div className="position-relative mb-4">
                <div
                    style={{
                        width: '80px',
                        height: '80px',
                        border: '4px solid rgba(59, 130, 246, 0.1)',
                        borderTopColor: '#3b82f6',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                    }}
                />
                <div
                    className="position-absolute"
                    style={{
                        top: '10px',
                        left: '10px',
                        width: '60px',
                        height: '60px',
                        border: '4px solid rgba(139, 92, 246, 0.1)',
                        borderBottomColor: '#8b5cf6',
                        borderRadius: '50%',
                        animation: 'spin 1.5s linear infinite reverse'
                    }}
                />
            </div>

            <h4
                className="text-white fw-bold mb-2"
                style={{
                    background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}
            >
                Processing Leads
            </h4>
            <p className="text-muted small mb-4">AI is analyzing your data...</p>

            {/* Progress dots */}
            <div className="d-flex gap-2">
                {[0, 1, 2, 3, 4].map(i => (
                    <div
                        key={i}
                        className="rounded-circle"
                        style={{
                            width: '10px',
                            height: '10px',
                            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                            animation: `pulse 1.5s ease-in-out ${i * 0.15}s infinite`,
                            boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export const SkeletonRow = () => {
    return (
        <tr>
            {[...Array(6)].map((_, i) => (
                <td key={i}>
                    <div
                        className="rounded"
                        style={{
                            height: '20px',
                            background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 1.5s infinite'
                        }}
                    />
                </td>
            ))}
        </tr>
    );
};
