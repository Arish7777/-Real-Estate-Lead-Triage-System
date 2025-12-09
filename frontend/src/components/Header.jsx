import React from 'react';
import { Home, Settings, Bell } from 'lucide-react';

const Header = ({ leads = [] }) => {
    const hotCount = leads.filter(l => l.tier === 'HOT').length;
    const mediumCount = leads.filter(l => l.tier === 'MEDIUM').length;

    return (
        <nav className="navbar navbar-dark sticky-top px-4 py-3">
            <div className="d-flex align-items-center">
                <div className="navbar-brand d-flex align-items-center fw-bold" href="#">
                    <div
                        className="p-2 rounded-3 me-3"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <Home size={24} />
                    </div>
                    <div>
                        <span className="fs-5">RealEstate Triage</span>
                        <span
                            className="d-block small opacity-75"
                            style={{ fontSize: '0.7rem' }}
                        >
                            Lead Management System
                        </span>
                    </div>
                </div>
            </div>

            <div className="d-flex align-items-center gap-4">
                {/* Stats Pills */}
                <div className="d-none d-md-flex align-items-center gap-3">
                    <div
                        className="px-4 py-2 rounded-pill d-flex align-items-center"
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <span className="opacity-75 me-2">Total:</span>
                        <span className="fw-bold fs-5">{leads.length}</span>
                    </div>

                    <div
                        className="px-3 py-2 rounded-pill d-flex align-items-center gap-2"
                        style={{
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.3) 100%)',
                            boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)'
                        }}
                    >
                        <span className="animate-pulse">🔥</span>
                        <span className="fw-bold">{hotCount}</span>
                        <span className="opacity-75 small">HOT</span>
                    </div>

                    <div
                        className="px-3 py-2 rounded-pill d-flex align-items-center gap-2"
                        style={{
                            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.3) 0%, rgba(234, 88, 12, 0.3) 100%)'
                        }}
                    >
                        <span className="fw-bold">{mediumCount}</span>
                        <span className="opacity-75 small">MEDIUM</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="vr opacity-25 d-none d-md-block" style={{ height: '30px' }}></div>

                {/* Action Buttons */}
                <div className="d-flex align-items-center gap-2">
                    <button
                        className="btn btn-link text-white position-relative p-2"
                        style={{ opacity: 0.8 }}
                    >
                        <Bell size={20} />
                        <span
                            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                            style={{ fontSize: '0.6rem' }}
                        >
                            3
                        </span>
                    </button>

                    <button
                        className="btn btn-outline-light d-flex align-items-center gap-2 rounded-pill px-3"
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}
                    >
                        <Settings size={16} />
                        <span className="d-none d-sm-inline">Settings</span>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Header;
