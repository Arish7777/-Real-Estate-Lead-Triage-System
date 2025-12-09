import React from 'react';
import { Flame, TrendingUp } from 'lucide-react';

const StatsPanel = ({ report }) => {
    const sources = Object.keys(report);

    return (
        <div className="card animate-fade-in" style={{ height: 'fit-content' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
                <Flame color="var(--danger)" />
                HOT Leads Report
            </h3>

            {sources.length === 0 ? (
                <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem 0' }}>
                    No HOT leads found yet.
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {sources.map(source => (
                        <div key={source}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
                                <span>{source}</span>
                                <span>{report[source].length} Leads</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {report[source].map(lead => (
                                    <div key={lead.id} style={{ background: 'var(--bg-primary)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid var(--danger)' }}>
                                        <div style={{ fontWeight: 600 }}>{lead.data.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                                            <span>{lead.data.phone || lead.data.email}</span>
                                            <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>{lead.score}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div style={{ marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.875rem' }}>
                    <TrendingUp size={16} />
                    <span>Real-time updates active</span>
                </div>
            </div>
        </div>
    );
};

export default StatsPanel;
