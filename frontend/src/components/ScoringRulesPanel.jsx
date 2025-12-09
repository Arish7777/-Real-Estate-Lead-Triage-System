import React from 'react';
import { Info, MapPin, DollarSign, Clock, MessageSquare, Phone } from 'lucide-react';

const ScoringRulesPanel = () => {
    const scoringItems = [
        { icon: MapPin, label: 'Location', points: 30, color: '#3b82f6', width: '30%' },
        { icon: DollarSign, label: 'Budget', points: 25, color: '#06b6d4', width: '25%' },
        { icon: Clock, label: 'Timeframe', points: 20, color: '#f59e0b', width: '20%' },
        { icon: Phone, label: 'Contact Info', points: 15, color: '#8b5cf6', width: '15%' },
        { icon: MessageSquare, label: 'Message Quality', points: 10, color: '#6b7280', width: '10%' },
    ];

    return (
        <div className="card border-0">
            <div className="card-header border-0 py-3">
                <div className="d-flex align-items-center gap-2">
                    <div
                        className="p-2 rounded-3"
                        style={{ background: 'rgba(59, 130, 246, 0.2)' }}
                    >
                        <Info size={16} className="text-primary" />
                    </div>
                    <h6 className="mb-0 fw-bold text-white">How Scoring Works</h6>
                </div>
            </div>
            <div className="card-body pt-0">
                <p className="small mb-4" style={{ color: '#94a3b8' }}>
                    Leads are scored from 0-100 based on 5 key criteria.
                    High scores indicate a higher likelihood of conversion.
                </p>

                <div className="mb-4">
                    <h6
                        className="text-uppercase fw-bold mb-3"
                        style={{
                            fontSize: '0.65rem',
                            color: 'rgba(148, 163, 184, 0.8)',
                            letterSpacing: '0.1em'
                        }}
                    >
                        Scoring Weights
                    </h6>

                    <div className="d-flex flex-column gap-3">
                        {scoringItems.map((item, index) => (
                            <div
                                key={item.label}
                                className="animate-fade-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="d-flex justify-content-between small mb-2">
                                    <span className="d-flex align-items-center gap-2" style={{ color: '#e2e8f0' }}>
                                        <item.icon size={14} style={{ color: item.color }} />
                                        {item.label}
                                    </span>
                                    <span
                                        className="fw-bold px-2 py-1 rounded"
                                        style={{
                                            background: `${item.color}20`,
                                            color: item.color,
                                            fontSize: '0.75rem'
                                        }}
                                    >
                                        {item.points} pts
                                    </span>
                                </div>
                                <div className="progress" style={{ height: '6px' }}>
                                    <div
                                        className="progress-bar"
                                        style={{
                                            width: item.width,
                                            background: `linear-gradient(90deg, ${item.color}, ${item.color}80)`
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    className="p-3 rounded-3"
                    style={{
                        background: 'rgba(245, 158, 11, 0.1)',
                        border: '1px solid rgba(245, 158, 11, 0.2)'
                    }}
                >
                    <p className="mb-0 small" style={{ color: '#fbbf24' }}>
                        <strong>Note:</strong> AI Analysis may adjust the final tier assignment but does not directly modify the raw score.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ScoringRulesPanel;
