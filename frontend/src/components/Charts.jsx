import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const COLORS = ['#10b981', '#f59e0b', '#6b7280', '#ef4444']; // HOT, MEDIUM, LOW, JUNK

// Custom tooltip with dark theme
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div
                style={{
                    background: 'rgba(30, 41, 59, 0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
            >
                <p style={{ color: '#f1f5f9', margin: 0, fontWeight: 600 }}>
                    {payload[0].name}: <span style={{ color: payload[0].payload.fill || '#3b82f6' }}>{payload[0].value}</span>
                </p>
            </div>
        );
    }
    return null;
};

// Custom legend with light text
const CustomLegend = ({ payload }) => {
    return (
        <div className="d-flex justify-content-center gap-4 mt-3">
            {payload.map((entry, index) => (
                <div key={index} className="d-flex align-items-center gap-2">
                    <div
                        style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '3px',
                            background: entry.color,
                            boxShadow: `0 0 10px ${entry.color}50`
                        }}
                    />
                    <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{entry.value}</span>
                </div>
            ))}
        </div>
    );
};

const Charts = ({ leads }) => {
    const tierData = [
        { name: 'HOT', value: leads.filter(l => l.tier === 'HOT').length, fill: '#10b981' },
        { name: 'MEDIUM', value: leads.filter(l => l.tier === 'MEDIUM').length, fill: '#f59e0b' },
        { name: 'LOW', value: leads.filter(l => l.tier === 'LOW').length, fill: '#6b7280' },
        { name: 'JUNK', value: leads.filter(l => l.tier === 'JUNK').length, fill: '#ef4444' },
    ].filter(d => d.value > 0);

    const sourceData = leads.reduce((acc, lead) => {
        const source = lead.data.source || 'Unknown';
        const existing = acc.find(item => item.name === source);
        if (existing) {
            existing.value++;
        } else {
            acc.push({ name: source, value: 1 });
        }
        return acc;
    }, []);

    return (
        <div className="row g-4 mb-4">
            {/* Tier Distribution - Donut Chart */}
            <div className="col-md-6">
                <div className="card border-0 h-100">
                    <div className="card-header border-0 py-3">
                        <h6 className="mb-0 fw-bold text-white">📊 Lead Tier Distribution</h6>
                    </div>
                    <div className="card-body" style={{ minHeight: '320px' }}>
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <defs>
                                    {tierData.map((entry, index) => (
                                        <linearGradient key={`gradient-${index}`} id={`gradient-${entry.name}`} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={entry.fill} stopOpacity={1} />
                                            <stop offset="100%" stopColor={entry.fill} stopOpacity={0.6} />
                                        </linearGradient>
                                    ))}
                                </defs>
                                <Pie
                                    data={tierData}
                                    cx="50%"
                                    cy="45%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={3}
                                    dataKey="value"
                                    stroke="rgba(0,0,0,0.3)"
                                    strokeWidth={2}
                                >
                                    {tierData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={`url(#gradient-${entry.name})`}
                                            style={{
                                                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                                            }}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend content={<CustomLegend />} />

                                {/* Center text */}
                                <text
                                    x="50%"
                                    y="42%"
                                    textAnchor="middle"
                                    fill="#f1f5f9"
                                    style={{ fontSize: '2rem', fontWeight: 700 }}
                                >
                                    {leads.length}
                                </text>
                                <text
                                    x="50%"
                                    y="52%"
                                    textAnchor="middle"
                                    fill="#94a3b8"
                                    style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                                >
                                    Total Leads
                                </text>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Source Bar Chart */}
            <div className="col-md-6">
                <div className="card border-0 h-100">
                    <div className="card-header border-0 py-3">
                        <h6 className="mb-0 fw-bold text-white">📈 Leads by Source</h6>
                    </div>
                    <div className="card-body" style={{ minHeight: '320px' }}>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={sourceData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="rgba(255,255,255,0.05)"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="name"
                                    fontSize={12}
                                    tick={{ fill: '#94a3b8' }}
                                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                                    tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                                />
                                <YAxis
                                    allowDecimals={false}
                                    tick={{ fill: '#94a3b8' }}
                                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                                    tickLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
                                <Bar
                                    dataKey="value"
                                    fill="url(#barGradient)"
                                    radius={[8, 8, 0, 0]}
                                    maxBarSize={60}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Charts;
