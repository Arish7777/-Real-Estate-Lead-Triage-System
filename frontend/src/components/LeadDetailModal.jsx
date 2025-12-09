import React from 'react';
import { X, Mail, Phone, MapPin, Calendar, Home, Facebook, Globe, Clock, MessageSquare, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const LeadDetailModal = ({ lead, onClose }) => {
    if (!lead) return null;
    const { data, score, score_breakdown, tier, ai_analysis } = lead;

    const getTierBadgeClass = (tier) => {
        switch (tier) {
            case 'HOT': return 'bg-success';
            case 'MEDIUM': return 'bg-brand-amber text-dark';
            case 'LOW': return 'bg-secondary';
            case 'JUNK': return 'bg-danger';
            default: return 'bg-secondary';
        }
    };

    const getSourceBadge = (source) => {
        const s = source?.toLowerCase() || '';
        if (s.includes('facebook')) return <span className="badge bg-primary"><Facebook size={12} className="me-1" /> Facebook</span>;
        if (s.includes('google')) return <span className="badge bg-danger"><Globe size={12} className="me-1" /> Google</span>;
        return <span className="badge bg-secondary"><Globe size={12} className="me-1" /> {source}</span>;
    };

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content shadow-lg border-0">

                    {/* Header */}
                    <div className="modal-header border-bottom">
                        <div className="d-flex align-items-center gap-3">
                            <h5 className="modal-title fw-bold display-6 fs-4">{data.name}</h5>
                            <span className={`badge ${getTierBadgeClass(tier)} rounded-pill px-3`}>
                                {tier === 'HOT' && '🔥'} {tier}
                            </span>
                        </div>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body bg-light p-4">
                        <div className="row g-4">

                            {/* Left Column: Lead Info */}
                            <div className="col-lg-4">
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-header bg-white fw-bold text-uppercase small py-3">
                                        📋 Lead Details
                                    </div>
                                    <div className="card-body">
                                        <div className="vstack gap-3">
                                            <div className="d-flex align-items-center">
                                                <div className="bg-light p-2 rounded me-3 text-secondary"><Mail size={18} /></div>
                                                <div>
                                                    <div className="small text-muted fw-bold text-uppercase">Email</div>
                                                    <a href={`mailto:${data.email}`} className="text-decoration-none fw-medium text-dark">{data.email}</a>
                                                </div>
                                            </div>

                                            <div className="d-flex align-items-center">
                                                <div className="bg-light p-2 rounded me-3 text-secondary"><Phone size={18} /></div>
                                                <div>
                                                    <div className="small text-muted fw-bold text-uppercase">Phone</div>
                                                    <a href={`tel:${data.phone}`} className="text-decoration-none fw-medium text-dark">{data.phone}</a>
                                                </div>
                                            </div>

                                            <div className="d-flex align-items-center">
                                                <div className="bg-light p-2 rounded me-3 text-secondary"><MapPin size={18} /></div>
                                                <div>
                                                    <div className="small text-muted fw-bold text-uppercase">Location</div>
                                                    <div className="fw-medium">{data.location_preference}</div>
                                                </div>
                                            </div>

                                            <div className="d-flex align-items-center">
                                                <div className="bg-light p-2 rounded me-3 text-secondary"><span className="fw-bold">$</span></div>
                                                <div>
                                                    <div className="small text-muted fw-bold text-uppercase">Budget</div>
                                                    <div className="fw-medium">{data.budget}</div>
                                                </div>
                                            </div>

                                            <div className="d-flex align-items-center">
                                                <div className="bg-light p-2 rounded me-3 text-secondary"><Calendar size={18} /></div>
                                                <div>
                                                    <div className="small text-muted fw-bold text-uppercase">Timeframe</div>
                                                    <div className="fw-medium">{data.timeframe_to_move}</div>
                                                </div>
                                            </div>

                                            <div className="d-flex align-items-center">
                                                <div className="bg-light p-2 rounded me-3 text-secondary"><Home size={18} /></div>
                                                <div>
                                                    <div className="small text-muted fw-bold text-uppercase">Property Type</div>
                                                    <div className="fw-medium">{data.property_type}</div>
                                                </div>
                                            </div>

                                            <div className="border-top pt-3 mt-2">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className="small text-muted fw-bold">SOURCE</span>
                                                    {getSourceBadge(data.source)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Middle Column: AI Analysis */}
                            <div className="col-lg-4">
                                <div className="card border-0 shadow-sm h-100">
                                    <div className="card-header bg-white fw-bold text-uppercase small py-3 d-flex justify-content-between align-items-center">
                                        <span>🤖 AI Intent Analysis</span>
                                        {ai_analysis && <span className="badge bg-info text-dark">Confidence: High</span>}
                                    </div>
                                    <div className="card-body">
                                        {ai_analysis ? (
                                            <>
                                                <div className="text-center mb-4">
                                                    <span className="badge bg-primary fs-6 px-3 py-2 mb-2 rounded-pill">
                                                        {ai_analysis.intent_label.replace(/_/g, ' ').toUpperCase()}
                                                    </span>
                                                </div>

                                                <div className="mb-4">
                                                    <h6 className="fw-bold text-secondary small">WHY THIS CLASSIFICATION?</h6>
                                                    <div className="p-3 bg-light rounded border-start border-4 border-primary fst-italic text-muted">
                                                        "{ai_analysis.short_reason}"
                                                    </div>
                                                </div>

                                                <div>
                                                    <h6 className="fw-bold text-secondary small mb-3">📊 SCORE BREAKDOWN ({score}/100)</h6>
                                                    <ul className="list-group list-group-flush fs-sm">
                                                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                            <span>Location Match</span>
                                                            <span className="badge bg-light text-dark border">+ {score_breakdown?.location_score || 0}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                            <span>Budget Match</span>
                                                            <span className="badge bg-light text-dark border">+ {score_breakdown?.budget_score || 0}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                            <span>Timeframe</span>
                                                            <span className="badge bg-light text-dark border">+ {score_breakdown?.timeframe_score || 0}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                            <span>Contact Completeness</span>
                                                            <span className="badge bg-light text-dark border">+ {score_breakdown?.contact_score || 0}</span>
                                                        </li>
                                                        <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                                            <span>Message Quality</span>
                                                            <span className="badge bg-light text-dark border">+ {score_breakdown?.message_score || 0}</span>
                                                        </li>
                                                    </ul>
                                                    <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                                                        <span className="fw-bold text-white">TOTAL SCORE</span>
                                                        <span className={`fw-bold fs-5 ${score >= 80 ? 'text-success' : 'text-white'}`}>{score}</span>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center py-5 text-muted">
                                                <AlertTriangle className="mb-2" />
                                                <p>AI Analysis pending...</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Message & Actions */}
                            <div className="col-lg-4">
                                <div className="vstack gap-4 h-100">

                                    {/* Message Card */}
                                    <div className="card border-0 shadow-sm flex-grow-1">
                                        <div className="card-header bg-white fw-bold text-uppercase small py-3">
                                            💬 Lead Message
                                        </div>
                                        <div className="card-body bg-light">
                                            <div className="p-3 bg-white border rounded shadow-sm" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                                <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>{data.message}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Card */}
                                    <div className="card border-0 shadow-sm">
                                        <div className="card-body">
                                            <h6 className="fw-bold text-secondary small mb-3 text-uppercase">Recommended Action</h6>

                                            {tier === 'HOT' && (
                                                <button className="btn btn-success w-100 btn-lg mb-2 shadow-sm d-flex align-items-center justify-content-center">
                                                    <Phone className="me-2 animate-pulse" /> Call Immediately
                                                </button>
                                            )}
                                            {tier === 'MEDIUM' && (
                                                <button className="btn btn-warning w-100 btn-lg mb-2 shadow-sm d-flex align-items-center justify-content-center text-dark">
                                                    <Clock className="me-2" /> Schedule Call
                                                </button>
                                            )}
                                            {tier === 'LOW' && (
                                                <button className="btn btn-primary w-100 btn-lg mb-2 shadow-sm d-flex align-items-center justify-content-center">
                                                    <Mail className="me-2" /> Send Email
                                                </button>
                                            )}
                                            {tier === 'JUNK' && (
                                                <button className="btn btn-secondary w-100 btn-lg mb-2 shadow-sm d-flex align-items-center justify-content-center">
                                                    <X className="me-2" /> Archive Lead
                                                </button>
                                            )}

                                            <div className="row g-2 mt-2">
                                                <div className="col-6">
                                                    <button className="btn btn-outline-secondary w-100 btn-sm">Copy Info</button>
                                                </div>
                                                <div className="col-6">
                                                    <button className="btn btn-outline-secondary w-100 btn-sm">Add Note</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadDetailModal;
