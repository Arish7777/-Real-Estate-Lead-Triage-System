import React from 'react';
import { LayoutDashboard, Users, BarChart3, Settings, LogOut, ChevronRight } from 'lucide-react';

const Sidebar = ({ activeTab, onTabChange }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'leads', label: 'Leads Table', icon: Users },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'config', label: 'Configuration', icon: Settings },
    ];

    return (
        <div
            className="d-flex flex-column h-100 py-4"
            style={{
                background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.8) 100%)',
                backdropFilter: 'blur(20px)',
                borderRight: '1px solid rgba(255, 255, 255, 0.05)'
            }}
        >
            {/* Menu Label */}
            <div className="px-4 mb-3">
                <span
                    className="text-uppercase small fw-bold"
                    style={{
                        color: 'rgba(148, 163, 184, 0.6)',
                        letterSpacing: '0.1em',
                        fontSize: '0.65rem'
                    }}
                >
                    Menu
                </span>
            </div>

            {/* Navigation Items */}
            <nav className="flex-grow-1">
                <ul className="nav flex-column gap-1 px-2">
                    {navItems.map((item, index) => (
                        <li key={item.id} className="nav-item">
                            <button
                                className={`nav-link w-100 d-flex align-items-center justify-content-between ${activeTab === item.id ? 'active' : ''}`}
                                onClick={() => onTabChange(item.id)}
                                style={{
                                    animationDelay: `${index * 0.1}s`
                                }}
                            >
                                <div className="d-flex align-items-center">
                                    <item.icon size={18} className="me-3" />
                                    <span>{item.label}</span>
                                </div>
                                {activeTab === item.id && (
                                    <ChevronRight size={16} className="opacity-75" />
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* User Section */}
            <div className="px-3 mt-auto">
                <div
                    className="d-flex align-items-center p-3 rounded-3"
                    style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                >
                    <div
                        className="rounded-circle d-flex align-items-center justify-content-center me-3"
                        style={{
                            width: '40px',
                            height: '40px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                        }}
                    >
                        <span className="fw-bold text-white small">JD</span>
                    </div>
                    <div className="flex-grow-1">
                        <div className="fw-bold small text-white">John Doe</div>
                        <div className="small text-muted" style={{ fontSize: '0.7rem' }}>Real Estate Agent</div>
                    </div>
                    <button
                        className="btn btn-link text-muted p-0"
                        title="Logout"
                    >
                        <LogOut size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
