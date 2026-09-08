import React from 'react';
import { Eye, Trash2 } from 'lucide-react';

const CareerTable = ({ careers, totalCount, onOpenDetail, onStatusChange, onDelete }) => {
  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    Reviewed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    Rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="rounded-xl overflow-hidden shadow-sm" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr style={{ background: 'var(--bg-alt)', borderBottom: '1px solid var(--border-color)' }}>
              <th className="p-4 font-semibold text-sm" style={{ color: 'var(--text-muted)' }}>Date</th>
              <th className="p-4 font-semibold text-sm" style={{ color: 'var(--text-muted)' }}>Applicant</th>
              <th className="p-4 font-semibold text-sm" style={{ color: 'var(--text-muted)' }}>Role</th>
              <th className="p-4 font-semibold text-sm" style={{ color: 'var(--text-muted)' }}>Status</th>
              <th className="p-4 font-semibold text-sm text-right" style={{ color: 'var(--text-muted)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {careers.map((career) => (
              <tr
                key={career._id}
                className="transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                style={{ borderBottom: '1px solid var(--border-color)' }}
              >
                <td className="p-4 text-sm" style={{ color: 'var(--text-muted)' }}>
                  {new Date(career.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="font-medium text-sm" style={{ color: 'var(--text-main)' }}>{career.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{career.email}</div>
                </td>
                <td className="p-4 text-sm font-medium" style={{ color: 'var(--text-main)' }}>
                  {career.role}
                </td>
                <td className="p-4">
                  <select
                    value={career.status}
                    onChange={(e) => onStatusChange(career._id, e.target.value)}
                    className={`text-xs font-medium px-2.5 py-1 rounded-full outline-none cursor-pointer border border-transparent hover:border-black/10 dark:hover:border-white/10 ${statusColors[career.status] || ''}`}
                    style={{ appearance: 'none' }}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onOpenDetail(career)}
                      className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                      title="View Details"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(career._id, career.name)}
                      className="p-1.5 rounded-md transition-colors text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {careers.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 text-xs flex justify-between items-center" style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
        <span>Showing {careers.length} of {totalCount} applications</span>
      </div>
    </div>
  );
};

export default CareerTable;
