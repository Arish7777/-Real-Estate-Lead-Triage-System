import React, { useState } from 'react';
import { Eye, Phone, Mail, ArrowUpDown, ChevronUp, ChevronDown, Download } from 'lucide-react';
import { exportToCSV } from '../utils/exportUtils';

const LeadTable = ({ leads, onViewDetail }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'desc' });

  const getTierBadgeClass = (tier) => {
    switch (tier) {
      case 'HOT': return 'bg-success';
      case 'MEDIUM': return 'bg-brand-amber text-dark';
      case 'LOW': return 'bg-secondary';
      case 'JUNK': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const getIntentBadgeClass = (intent) => {
    if (!intent) return 'bg-light text-dark border';
    const i = intent.toLowerCase();
    if (i.includes('buyer')) return 'bg-primary';
    if (i.includes('renter')) return 'bg-info text-dark';
    if (i.includes('seller')) return 'bg-success';
    if (i.includes('spam')) return 'bg-danger';
    return 'bg-secondary';
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleExport = () => {
    exportToCSV(leads, 'all_leads_export.csv');
  };

  const sortedLeads = [...leads].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue, bValue;

    if (sortConfig.key === 'score') {
      aValue = a.score;
      bValue = b.score;
    } else if (sortConfig.key === 'name') {
      aValue = a.data.name;
      bValue = b.data.name;
    } else if (sortConfig.key === 'tier') {
      const tiers = { HOT: 3, MEDIUM: 2, LOW: 1, JUNK: 0 };
      aValue = tiers[a.tier] || 0;
      bValue = tiers[b.tier] || 0;
    } else {
      aValue = a.data[sortConfig.key] || '';
      bValue = b.data[sortConfig.key] || '';
    }

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return <ArrowUpDown size={14} className="text-muted opacity-25 ms-1" />;
    return sortConfig.direction === 'asc' ? <ChevronUp size={14} className="ms-1" /> : <ChevronDown size={14} className="ms-1" />;
  };

  return (
    <div>
      {leads.length > 0 && (
        <div className="d-flex justify-content-end p-3 border-bottom bg-light">
          <button
            className="btn btn-sm btn-outline-primary d-flex align-items-center gap-2"
            onClick={handleExport}
          >
            <Download size={14} />
            Export to CSV
          </button>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="bg-light">
            <tr>
              <th onClick={() => handleSort('name')} className="cursor-pointer" style={{ minWidth: '180px' }}>
                Name <SortIcon columnKey="name" />
              </th>
              <th>Contact</th>
              <th onClick={() => handleSort('location_preference')} className="cursor-pointer">
                Location <SortIcon columnKey="location_preference" />
              </th>
              <th onClick={() => handleSort('budget')} className="cursor-pointer">
                Budget <SortIcon columnKey="budget" />
              </th>
              <th onClick={() => handleSort('score')} className="cursor-pointer">
                Score <SortIcon columnKey="score" />
              </th>
              <th onClick={() => handleSort('tier')} className="cursor-pointer">
                Tier <SortIcon columnKey="tier" />
              </th>
              <th>Intent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedLeads.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-5 text-muted">
                  <div className="mb-2">No leads to display</div>
                  <small>Upload a CSV file to get started</small>
                </td>
              </tr>
            ) : (
              sortedLeads.map((lead, index) => (
                <tr key={index} className="cursor-pointer" onClick={() => onViewDetail(lead)}>
                  <td>
                    <div className="fw-bold text-dark">{lead.data.name}</div>
                    <small className="text-muted">{lead.data.source || 'Unknown Source'}</small>
                  </td>
                  <td>
                    <div className="d-flex flex-column gap-1">
                      {lead.data.phone && (
                        <small className="d-flex align-items-center text-secondary">
                          <Phone size={12} className="me-1" /> {lead.data.phone}
                        </small>
                      )}
                      {lead.data.email && (
                        <small className="d-flex align-items-center text-secondary">
                          <Mail size={12} className="me-1" /> {lead.data.email}
                        </small>
                      )}
                    </div>
                  </td>
                  <td>{lead.data.location_preference || 'N/A'}</td>
                  <td>{lead.data.budget || 'N/A'}</td>
                  <td style={{ width: '100px' }}>
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <span className={`fw-bold ${lead.score >= 80 ? 'text-success' : ''}`}>{lead.score}</span>
                    </div>
                    <div className="progress" style={{ height: '4px' }}>
                      <div className={`progress-bar ${getTierBadgeClass(lead.tier)}`}
                        role="progressbar"
                        style={{ width: `${lead.score}%` }}>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${getTierBadgeClass(lead.tier)} rounded-pill`}>
                      {lead.tier === 'HOT' && '🔥'} {lead.tier}
                    </span>
                  </td>
                  <td>
                    {lead.ai_analysis && (
                      <span className={`badge ${getIntentBadgeClass(lead.ai_analysis.intent_label)} fw-normal`}>
                        {lead.ai_analysis.intent_label?.replace('_', ' ')}
                      </span>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary d-flex align-items-center" onClick={(e) => { e.stopPropagation(); onViewDetail(lead); }}>
                      <Eye size={14} className="me-1" /> View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;
