import React from 'react';
import MetricsCard from './MetricsCard';
import Charts from './Charts';
import LeadTable from './LeadTable';
import HotLeadsPanel from './HotLeadsPanel';
import ScoringRulesPanel from './ScoringRulesPanel';
import FileUpload from './FileUpload';
import { Users, Flame, Clock, Archive, Trash2 } from 'lucide-react';

const Dashboard = ({ leads, report, onRefresh, uploading, onUpload, onViewDetail, onClear, onViewAll }) => {
    const hotCount = leads.filter(l => l.tier === 'HOT').length;
    const mediumCount = leads.filter(l => l.tier === 'MEDIUM').length;
    const lowCount = leads.filter(l => l.tier === 'LOW').length;

    return (
        <div className="row">
            {/* Header / Actions Row */}
            <div className="col-12 mb-4 d-flex justify-content-between align-items-center">
                <h2 className="fw-bold mb-0 text-dark">Dashboard</h2>
                <div className="d-flex gap-2">
                    {leads.length > 0 && (
                        <button
                            className="btn btn-outline-danger d-flex align-items-center gap-2"
                            onClick={onClear}
                        >
                            <Trash2 size={16} />
                            Clear All
                        </button>
                    )}
                </div>
            </div>

            {/* Metrics Row */}
            <div className="col-12 mb-4">
                <div className="row g-3">
                    <div className="col-md-3">
                        <MetricsCard
                            title="Total Leads"
                            value={leads.length}
                            icon={Users}
                            colorClass="bg-brand-blue"
                        />
                    </div>
                    <div className="col-md-3">
                        <MetricsCard
                            title="HOT Leads"
                            value={hotCount}
                            badge={`${Math.round((hotCount / leads.length) * 100) || 0}% of total`}
                            icon={Flame}
                            colorClass="bg-brand-success"
                        />
                    </div>
                    <div className="col-md-3">
                        <MetricsCard
                            title="MEDIUM Leads"
                            value={mediumCount}
                            badge="Call later"
                            icon={Clock}
                            colorClass="bg-brand-amber"
                        />
                    </div>
                    <div className="col-md-3">
                        <MetricsCard
                            title="LOW / JUNK"
                            value={lowCount + (leads.length - hotCount - mediumCount - lowCount)}
                            icon={Archive}
                            colorClass="bg-secondary"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="col-md-9">
                {/* If no leads, show big upload zone */}
                {leads.length === 0 ? (
                    <div className="mb-4">
                        <FileUpload uploading={uploading} onUpload={onUpload} />
                    </div>
                ) : null}

                {/* Charts Section */}
                {leads.length > 0 && <Charts leads={leads} />}

                {/* Recent Leads Table */}
                <div className="card shadow-sm border-0 mb-4">
                    <div className="card-header border-bottom py-3 d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 fw-bold text-white">📋 Recent Leads</h5>
                        <button
                            className="btn btn-sm px-3 py-2 d-flex align-items-center gap-2 rounded-pill"
                            onClick={onViewAll}
                            style={{
                                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
                                border: '1px solid rgba(59, 130, 246, 0.3)',
                                color: '#3b82f6',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)';
                                e.currentTarget.style.color = 'white';
                                e.currentTarget.style.transform = 'translateX(4px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)';
                                e.currentTarget.style.color = '#3b82f6';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}
                        >
                            View All
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                    <div className="card-body p-0">
                        {/* Show only top 5-10 leads in dashboard */}
                        <LeadTable leads={leads.slice(0, 10)} onViewDetail={onViewDetail} />
                    </div>
                </div>
            </div>

            {/* Sidebar / Right Panel */}
            <div className="col-md-3">
                <div className="vstack gap-4">
                    <HotLeadsPanel report={report} />
                    <ScoringRulesPanel />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
