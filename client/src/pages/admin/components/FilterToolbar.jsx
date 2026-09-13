import React from 'react';
import { Search, Download } from 'lucide-react';

const FilterToolbar = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  requests,
  onExportCSV,
}) => {
  const tabs = ['All', 'Pending', 'Contacted', 'Resolved'];

  const getTabCount = (tab) => {
    if (tab === 'All') return requests.length;
    return requests.filter((r) => r.status === tab).length;
  };

  return (
    <div
      className="rounded-2xl p-4 md:p-6 mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        boxShadow: '0 4px 20px var(--shadow-color)',
      }}
    >
      {/* Search Box */}
      <div className="relative flex-grow max-w-md">
        <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Search by client name, email, phone, or subject..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 pl-11 pr-4 rounded-xl text-sm outline-none transition-all"
          style={{
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-main)',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
          onBlur={(e) => (e.target.style.borderColor = 'var(--border-color)')}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs p-1 rounded-md"
            style={{ color: 'var(--text-muted)' }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter Status Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto p-1 rounded-xl" style={{ background: 'var(--bg-pill)', border: '1px solid var(--border-color-subtle)' }}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setStatusFilter(tab)}
            className="px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap"
            style={{
              background: statusFilter === tab ? 'var(--bg-pill-active)' : 'transparent',
              color: statusFilter === tab ? '#2563eb' : 'var(--text-muted)',
              boxShadow: statusFilter === tab ? '0 2px 8px var(--shadow-color)' : 'none',
            }}
          >
            {tab}
            <span className="ml-1.5 opacity-60">({getTabCount(tab)})</span>
          </button>
        ))}
      </div>

      {/* Action Button */}
      <div className="flex items-center gap-2">
        <button
          onClick={onExportCSV}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border"
          style={{ background: 'var(--bg-pill)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
          title="Download filtered items as CSV"
        >
          <Download className="w-4 h-4 text-blue-500" />
          Export CSV
        </button>
      </div>
    </div>
  );
};

export default FilterToolbar;
