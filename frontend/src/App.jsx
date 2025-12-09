import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LeadTable from './components/LeadTable';
import LeadDetailModal from './components/LeadDetailModal';
import Filters from './components/Filters';
import { LoadingOverlay } from './components/LoadingStates';

// API URL from environment variable (set VITE_API_URL in Vercel dashboard or .env file)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [activeFilters, setActiveFilters] = useState({ tiers: ['HOT', 'MEDIUM', 'LOW', 'JUNK'], locations: [] });
  const [report, setReport] = useState({});
  const [selectedLead, setSelectedLead] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Apply filters whenever leads or activeFilters change
  useEffect(() => {
    let filtered = leads;

    // Filter by tier
    if (activeFilters.tiers.length > 0 && activeFilters.tiers.length < 4) {
      filtered = filtered.filter(lead => activeFilters.tiers.includes(lead.tier));
    }

    // Filter by location
    if (activeFilters.locations.length > 0) {
      filtered = filtered.filter(lead =>
        activeFilters.locations.includes(lead.data?.location_preference)
      );
    }

    setFilteredLeads(filtered);
  }, [leads, activeFilters]);

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/leads`);
      const data = await res.json();
      // Transform backend data to match frontend expectations
      const transformedLeads = data.map(lead => ({
        ...lead,
        ai_analysis: {
          intent_label: lead.intent || 'unknown',
          short_reason: lead.reason || ''
        },
        // Map breakdown keys to match frontend expectations (_score suffix)
        score_breakdown: {
          location_score: lead.breakdown?.location || 0,
          budget_score: lead.breakdown?.budget || 0,
          timeframe_score: lead.breakdown?.timeframe || 0,
          contact_score: lead.breakdown?.contact || 0,
          message_score: lead.breakdown?.message || 0
        }
      }));
      setLeads(transformedLeads);
      console.log('Fetched leads:', transformedLeads.length);
    } catch (err) {
      console.error("Failed to fetch leads", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReport = async () => {
    try {
      const res = await fetch(`${API_URL}/report`);
      const data = await res.json();
      setReport(data);
    } catch (err) {
      console.error("Failed to fetch report", err);
    }
  };

  useEffect(() => {
    fetchLeads();
    fetchReport();
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_URL}/process`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        await fetchLeads();
        await fetchReport();
      } else {
        alert("Failed to process file");
      }
    } catch (err) {
      console.error("Upload error", err);
      alert("Error uploading file");
    } finally {
      setUploading(false);
      // Reset input if needed, but event.target might be reused
      event.target.value = null;
    }
  };

  const handleClearLeads = async () => {
    if (!window.confirm('Are you sure you want to delete all leads? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/clear`, {
        method: 'DELETE',
      });
      if (res.ok) {
        await fetchLeads();
        await fetchReport();
        alert('All leads have been cleared successfully.');
      } else {
        alert("Failed to clear leads");
      }
    } catch (err) {
      console.error("Clear error", err);
      alert("Error clearing leads");
    }
  };

  return (
    <div className="d-flex flex-column vh-100 bg-light">
      {uploading && <LoadingOverlay />}

      <Header leads={leads} />

      <div className="d-flex flex-grow-1 overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <main className="flex-grow-1 overflow-auto p-4">
          <div className="container-fluid">

            {activeTab === 'dashboard' && (
              <Dashboard
                leads={leads}
                report={report}
                onRefresh={async () => {
                  await fetchLeads();
                  await fetchReport();
                }}
                uploading={uploading}
                onUpload={handleFileUpload}
                onViewDetail={setSelectedLead}
                onClear={handleClearLeads}
                onViewAll={() => setActiveTab('leads')}
              />
            )}

            {activeTab === 'leads' && (
              <div className="row g-4">
                <div className="col-md-3">
                  <Filters leads={leads} onFilterChange={handleFilterChange} />
                </div>
                <div className="col-md-9">
                  <div className="card shadow-sm border-0">
                    <div className="card-header border-0 py-3 d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 fw-bold text-white">All Leads</h5>
                      <span
                        className="badge rounded-pill px-3 py-2"
                        style={{
                          background: 'rgba(255,255,255,0.1)',
                          color: '#94a3b8'
                        }}
                      >
                        {filteredLeads.length} RECORDS
                      </span>
                    </div>
                    <div className="card-body p-0">
                      <LeadTable leads={filteredLeads} onViewDetail={setSelectedLead} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {(activeTab === 'analytics' || activeTab === 'settings') && (
              <div className="d-flex justify-content-center align-items-center h-100 text-muted">
                <div className="text-center">
                  <h4>Coming Soon</h4>
                  <p>This module is under development.</p>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {selectedLead && (
        <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} />
      )}
    </div>
  );
}

export default App;
