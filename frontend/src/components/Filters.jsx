import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, ChevronUp, RotateCcw, Sparkles } from 'lucide-react';

const Filters = ({ leads = [], onFilterChange }) => {
    const [selectedTiers, setSelectedTiers] = useState(['HOT', 'MEDIUM', 'LOW', 'JUNK']);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [locationSearch, setLocationSearch] = useState('');
    const [tierExpanded, setTierExpanded] = useState(true);
    const [locationExpanded, setLocationExpanded] = useState(false);

    // Get unique locations from leads
    const locations = [...new Set(leads.map(l => l.data?.location_preference || 'Unknown').filter(Boolean))];

    // Count leads per tier
    const tierCounts = {
        HOT: leads.filter(l => l.tier === 'HOT').length,
        MEDIUM: leads.filter(l => l.tier === 'MEDIUM').length,
        LOW: leads.filter(l => l.tier === 'LOW').length,
        JUNK: leads.filter(l => l.tier === 'JUNK').length,
    };

    // Filter locations by search
    const filteredLocations = locations.filter(loc =>
        loc.toLowerCase().includes(locationSearch.toLowerCase())
    );

    // Count active filters
    const activeFiltersCount = (4 - selectedTiers.length === 0 ? 0 : 4 - selectedTiers.length) + selectedLocations.length;

    const handleTierChange = (tier) => {
        setSelectedTiers(prev =>
            prev.includes(tier)
                ? prev.filter(t => t !== tier)
                : [...prev, tier]
        );
    };

    const handleLocationChange = (location) => {
        setSelectedLocations(prev =>
            prev.includes(location)
                ? prev.filter(l => l !== location)
                : [...prev, location]
        );
    };

    const applyFilters = () => {
        onFilterChange({ tiers: selectedTiers, locations: selectedLocations });
    };

    const resetFilters = () => {
        setSelectedTiers(['HOT', 'MEDIUM', 'LOW', 'JUNK']);
        setSelectedLocations([]);
        setLocationSearch('');
        onFilterChange({ tiers: ['HOT', 'MEDIUM', 'LOW', 'JUNK'], locations: [] });
    };

    const tierColors = {
        HOT: { bg: 'linear-gradient(135deg, #10b981, #059669)', shadow: 'rgba(16, 185, 129, 0.3)' },
        MEDIUM: { bg: 'linear-gradient(135deg, #f59e0b, #d97706)', shadow: 'rgba(245, 158, 11, 0.3)' },
        LOW: { bg: 'linear-gradient(135deg, #6b7280, #4b5563)', shadow: 'rgba(107, 114, 128, 0.3)' },
        JUNK: { bg: 'linear-gradient(135deg, #ef4444, #dc2626)', shadow: 'rgba(239, 68, 68, 0.3)' },
    };

    return (
        <div className="card border-0 h-100">
            {/* Header */}
            <div className="card-header border-0 py-3 d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <div
                        className="p-2 rounded-3"
                        style={{ background: 'rgba(139, 92, 246, 0.2)' }}
                    >
                        <Filter size={16} className="text-purple" style={{ color: '#8b5cf6' }} />
                    </div>
                    <h6 className="mb-0 fw-bold text-white">Filters</h6>
                </div>
                <span
                    className="badge rounded-pill px-3"
                    style={{
                        background: activeFiltersCount > 0 ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'rgba(255,255,255,0.1)',
                        color: activeFiltersCount > 0 ? 'white' : '#94a3b8'
                    }}
                >
                    {activeFiltersCount} ACTIVE
                </span>
            </div>

            {/* Filter Sections */}
            <div className="card-body p-0">

                {/* Tier Filter */}
                <div
                    className="border-bottom"
                    style={{ borderColor: 'rgba(255,255,255,0.05) !important' }}
                >
                    <button
                        className="w-100 px-4 py-3 d-flex justify-content-between align-items-center bg-transparent border-0 text-start"
                        onClick={() => setTierExpanded(!tierExpanded)}
                        style={{ color: '#e2e8f0' }}
                    >
                        <span className="fw-semibold">By Priority Tier</span>
                        {tierExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    {tierExpanded && (
                        <div className="px-4 pb-3">
                            {['HOT', 'MEDIUM', 'LOW', 'JUNK'].map(tier => (
                                <div
                                    key={tier}
                                    className="d-flex align-items-center justify-content-between py-2 cursor-pointer rounded-2 px-2 mb-1"
                                    onClick={() => handleTierChange(tier)}
                                    style={{
                                        background: selectedTiers.includes(tier) ? 'rgba(255,255,255,0.05)' : 'transparent',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <div className="d-flex align-items-center gap-3">
                                        <div
                                            className="d-flex align-items-center justify-content-center rounded"
                                            style={{
                                                width: '20px',
                                                height: '20px',
                                                background: selectedTiers.includes(tier)
                                                    ? tierColors[tier].bg
                                                    : 'rgba(255,255,255,0.1)',
                                                border: '2px solid rgba(255,255,255,0.2)',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            {selectedTiers.includes(tier) && (
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            )}
                                        </div>
                                        <span style={{ color: selectedTiers.includes(tier) ? '#f1f5f9' : '#64748b' }}>
                                            {tier}
                                        </span>
                                    </div>
                                    <span
                                        className="badge rounded-pill px-2"
                                        style={{
                                            background: tierColors[tier].bg,
                                            boxShadow: `0 2px 8px ${tierColors[tier].shadow}`,
                                            minWidth: '28px'
                                        }}
                                    >
                                        {tierCounts[tier]}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Location Filter */}
                <div>
                    <button
                        className="w-100 px-4 py-3 d-flex justify-content-between align-items-center bg-transparent border-0 text-start"
                        onClick={() => setLocationExpanded(!locationExpanded)}
                        style={{ color: '#e2e8f0' }}
                    >
                        <span className="fw-semibold">By Location</span>
                        {locationExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    {locationExpanded && (
                        <div className="px-4 pb-3">
                            <input
                                type="text"
                                className="form-control form-control-sm mb-3"
                                placeholder="Search location..."
                                value={locationSearch}
                                onChange={(e) => setLocationSearch(e.target.value)}
                                style={{
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: '#f1f5f9'
                                }}
                            />
                            <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                                {filteredLocations.length === 0 ? (
                                    <p className="text-muted small mb-0">No locations found</p>
                                ) : (
                                    filteredLocations.map(loc => (
                                        <div
                                            key={loc}
                                            className="d-flex align-items-center gap-3 py-2 cursor-pointer"
                                            onClick={() => handleLocationChange(loc)}
                                        >
                                            <div
                                                className="d-flex align-items-center justify-content-center rounded"
                                                style={{
                                                    width: '18px',
                                                    height: '18px',
                                                    background: selectedLocations.includes(loc)
                                                        ? 'linear-gradient(135deg, #3b82f6, #6366f1)'
                                                        : 'rgba(255,255,255,0.1)',
                                                    border: '2px solid rgba(255,255,255,0.2)'
                                                }}
                                            >
                                                {selectedLocations.includes(loc) && (
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                )}
                                            </div>
                                            <span style={{ color: selectedLocations.includes(loc) ? '#f1f5f9' : '#94a3b8', fontSize: '0.9rem' }}>
                                                {loc}
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>

            </div>

            {/* Footer with buttons */}
            <div className="card-footer border-0 p-3">
                <button
                    className="btn w-100 mb-2 py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
                    onClick={applyFilters}
                    style={{
                        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                        border: 'none',
                        color: 'white',
                        boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)'
                    }}
                >
                    <Sparkles size={16} />
                    Apply Filters
                </button>
                <button
                    className="btn w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                    onClick={resetFilters}
                    style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#94a3b8'
                    }}
                >
                    <RotateCcw size={14} />
                    Reset All
                </button>
            </div>
        </div>
    );
};

export default Filters;
