import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';

const KpiCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Submissions',
      count: stats.total,
      subtitle: 'Total inquiries received via form',
      icon: <FileText className="w-5 h-5" />,
      colorClass: 'bg-blue-500/10 text-blue-500',
      countColor: 'style={{ color: "var(--text-main)" }}',
      delay: 0,
    },
    {
      title: 'Pending Review',
      count: stats.pending,
      subtitle: 'Awaiting admin response',
      icon: <Clock className="w-5 h-5" />,
      colorClass: 'bg-amber-500/10 text-amber-500',
      countColor: 'text-amber-500',
      delay: 0.1,
    },
    {
      title: 'In Progress',
      count: stats.contacted,
      subtitle: 'Contacted & active leads',
      icon: <MessageSquare className="w-5 h-5" />,
      colorClass: 'bg-blue-500/10 text-blue-500',
      countColor: 'text-blue-500',
      delay: 0.2,
    },
    {
      title: 'Resolved',
      count: stats.resolved,
      subtitle: 'Successfully addressed',
      icon: <CheckCircle2 className="w-5 h-5" />,
      colorClass: 'bg-emerald-500/10 text-emerald-500',
      countColor: 'text-emerald-500',
      delay: 0.3,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((c, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: c.delay }}
          className="rounded-2xl p-6 transition-all"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            boxShadow: '0 4px 20px var(--shadow-color)',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              {c.title}
            </span>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${c.colorClass}`}>
              {c.icon}
            </div>
          </div>
          <div className={`text-3xl font-extrabold ${c.countColor}`} style={c.countColor.includes('style') ? { color: 'var(--text-main)' } : {}}>
            {c.count}
          </div>
          <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>
            {c.subtitle}
          </p>
        </motion.div>
      ))}
    </div>
  );
};

export default KpiCards;
