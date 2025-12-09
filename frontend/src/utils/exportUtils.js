// Export utilities for lead data

export const exportToCSV = (data, filename = 'leads_export.csv') => {
    if (!data || data.length === 0) {
        alert('No data to export');
        return;
    }

    // Define CSV headers
    const headers = ['Name', 'Email', 'Phone', 'Location', 'Budget', 'Timeframe', 'Property Type', 'Score', 'Tier', 'Intent', 'Message', 'Source'];

    // Convert data to CSV rows
    const rows = data.map(lead => [
        lead.data.name || '',
        lead.data.email || '',
        lead.data.phone || '',
        lead.data.location_preference || '',
        lead.data.budget || '',
        lead.data.timeframe_to_move || '',
        lead.data.property_type || '',
        lead.score || '',
        lead.tier || '',
        lead.ai_analysis?.intent_label || '',
        (lead.data.message || '').replace(/\n/g, ' ').replace(/"/g, '""'),
        lead.data.source || ''
    ]);

    // Combine headers and rows
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const exportHotLeadsReport = (report) => {
    const hotLeads = [];

    Object.keys(report).forEach(source => {
        report[source].forEach(lead => {
            hotLeads.push(lead);
        });
    });

    exportToCSV(hotLeads, 'hot_leads_report.csv');
};
