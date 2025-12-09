import React from 'react';
import { Flame, TrendingUp, Phone, Download, Star } from 'lucide-react';
import { exportHotLeadsReport } from '../utils/exportUtils';

const HotLeadsPanel = ({ report }) => {
    const sources = Object.keys(report);
    const totalHot = sources.reduce((acc, source) => acc + report[source].length, 0);

    const handleExport = () => {
        exportHotLeadsReport(report);
    };

    return (
        <div
            className="card border-0 overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)'
            }}
        >
            {/* Header with gradient */}
            <div
                className="card-header py-3"
                style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #b91c1c 100%)',
                    border: 'none'
                }}
            >
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <div
                            className="p-2 rounded-3 me-2"
                            style={{ background: 'rgba(255,255,255,0.2)' }}
                        >
                            <Flame className="text-white animate-pulse" size={20} />
                        </div>
                        <h6 className="mb-0 fw-bold text-white">HOT Leads Report</h6>
                    </div>
                    <button
                        className="btn btn-sm btn-light fw-bold d-flex align-items-center rounded-pill px-3"
                        onClick={handleExport}
                        disabled={totalHot === 0}
                        style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)' }}
                    >
                        <Download size={14} className="me-1 text-danger" /> Export
                    </button>
                </div>
            </div>

            <div className="card-body">
                {/* Big Number Display */}
                <div className="text-center py-4">
                    <div
                        className="display-3 fw-bold mb-2"
                        style={{
                            background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '0 4px 20px rgba(239, 68, 68, 0.3)'
                        }}
                    >
                        {totalHot}
                    </div>
                    <p
                        className="text-uppercase fw-bold mb-0"
                        style={{
                            color: 'rgba(148, 163, 184, 0.8)',
                            fontSize: '0.7rem',
                            letterSpacing: '0.1em'
                        }}
                    >
                        Leads Requiring Immediate Attention
                    </p>
                </div>

                {sources.length === 0 ? (
                    <div className="text-center py-4">
                        <Star className="text-muted mb-2 opacity-50" size={32} />
                        <p className="text-muted small mb-0">No HOT leads detected yet.</p>
                    </div>
                ) : (
                    <div className="mt-3">
                        {sources.map((source, idx) => {
                            const count = report[source].length;
                            const percentage = totalHot > 0 ? Math.round((count / totalHot) * 100) : 0;

                            return (
                                <div
                                    key={source}
                                    className="mb-4 animate-fade-in"
                                    style={{ animationDelay: `${idx * 0.1}s` }}
                                >
                                    <div className="d-flex justify-content-between small fw-bold mb-2">
                                        <span className="text-muted">{source}</span>
                                        <span className="text-white">{count} ({percentage}%)</span>
                                    </div>
                                    <div className="progress" style={{ height: '6px' }}>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{
                                                width: `${percentage}%`,
                                                background: 'linear-gradient(90deg, #ef4444 0%, #f97316 100%)'
                                            }}
                                        />
                                    </div>

                                    {/* Lead List */}
                                    <div className="mt-3">
                                        {report[source].slice(0, 3).map((lead, leadIdx) => (
                                            <div
                                                key={lead.id}
                                                className="d-flex justify-content-between align-items-center p-3 rounded-3 mb-2 cursor-pointer"
                                                style={{
                                                    background: 'rgba(239, 68, 68, 0.1)',
                                                    borderLeft: '3px solid #ef4444',
                                                    transition: 'all 0.3s ease',
                                                    animationDelay: `${(idx * 3 + leadIdx) * 0.05}s`
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.transform = 'translateX(8px)';
                                                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.transform = 'translateX(0)';
                                                    e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                                                }}
                                            >
                                                <div className="text-truncate" style={{ maxWidth: '140px' }}>
                                                    <span className="small fw-bold text-white d-block">{lead.data.name}</span>
                                                </div>
                                                <button
                                                    className="btn btn-sm py-1 px-3 rounded-pill fw-bold"
                                                    style={{
                                                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                                                        border: 'none',
                                                        fontSize: '0.7rem',
                                                        boxShadow: '0 2px 10px rgba(16, 185, 129, 0.3)'
                                                    }}
                                                >
                                                    <Phone size={10} className="me-1" /> Call
                                                </button>
                                            </div>
                                        ))}
                                        {count > 3 && (
                                            <div className="text-center mt-2">
                                                <span
                                                    className="badge rounded-pill cursor-pointer px-3 py-2"
                                                    style={{
                                                        background: 'rgba(255, 255, 255, 0.1)',
                                                        border: '1px solid rgba(255, 255, 255, 0.1)'
                                                    }}
                                                >
                                                    + {count - 3} more
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div
                className="card-footer small d-flex align-items-center"
                style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                }}
            >
                <TrendingUp size={14} className="me-2 text-success" />
                <span className="text-muted">Updates in real-time</span>
            </div>
        </div>
    );
};

export default HotLeadsPanel;
