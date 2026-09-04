import React from 'react';

const ServiceCard = ({ icon, title, description, variant = 'page', className = '' }) => {
  const cardStyle = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: 20,
    padding: variant === 'home' ? 32 : 40,
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  };

  const iconWrapStyle = {
    width: 52,
    height: 52,
    borderRadius: 14,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    background: 'rgba(37,99,235,0.12)',
    color: '#2563eb',
    border: '1px solid var(--border-color)',
    transition: 'all 0.3s ease',
  };

  return (
    <div
      className={`group ${className}`}
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(37,99,235,0.4)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 16px 48px -12px var(--shadow-color)';
        const iconWrap = e.currentTarget.querySelector('.icon-wrap');
        if (iconWrap) {
          iconWrap.style.background = 'rgba(37,99,235,0.2)';
          iconWrap.style.borderColor = '#2563eb';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        const iconWrap = e.currentTarget.querySelector('.icon-wrap');
        if (iconWrap) {
          iconWrap.style.background = 'rgba(37,99,235,0.12)';
          iconWrap.style.borderColor = 'var(--border-color)';
        }
      }}
    >
      {/* Subtle top glow accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.25), transparent)',
        }}
      />

      <div className="icon-wrap" style={iconWrapStyle}>
        {icon}
      </div>

      <h3
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: 'var(--text-main)',
          marginBottom: 12,
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 15,
          lineHeight: 1.65,
          color: 'var(--text-muted)',
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;
