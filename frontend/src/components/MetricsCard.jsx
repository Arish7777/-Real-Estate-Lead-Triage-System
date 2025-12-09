import React from 'react';

const MetricsCard = ({ title, value, icon: Icon, colorClass, badge, onClick }) => {
    return (
        <div
            className="card h-100 cursor-pointer animate-fade-in"
            onClick={onClick}
            style={{
                animationDelay: '0.1s',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Animated gradient border on left */}
            <div
                className={`position-absolute start-0 top-0 bottom-0 ${colorClass}`}
                style={{ width: '4px' }}
            />

            <div className="card-body ps-4">
                <div className="d-flex justify-content-between align-items-start">
                    <div>
                        <p className="text-muted small fw-bold text-uppercase mb-1 letter-spacing-1">
                            {title}
                        </p>
                        <h2 className="fw-bold mb-0 display-6" style={{
                            background: 'linear-gradient(135deg, #fff 0%, #94a3b8 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            {value}
                        </h2>
                        {badge && (
                            <span className="badge bg-primary bg-opacity-25 text-primary mt-2 rounded-pill px-3">
                                {badge}
                            </span>
                        )}
                    </div>
                    <div
                        className={`p-3 rounded-3 ${colorClass}`}
                        style={{
                            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
                        }}
                    >
                        <Icon size={28} className="text-white" />
                    </div>
                </div>
            </div>

            {/* Hover glow effect */}
            <div
                className="position-absolute top-0 end-0"
                style={{
                    width: '100px',
                    height: '100px',
                    background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
                    transform: 'translate(30%, -30%)',
                    pointerEvents: 'none'
                }}
            />
        </div>
    );
};

export default MetricsCard;
