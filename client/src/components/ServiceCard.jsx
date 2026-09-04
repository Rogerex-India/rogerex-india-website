import React from 'react';

const ServiceCard = ({ icon, title, description, variant = 'page', className = '' }) => {
  const cardStyle = {
    background: '#191c22',
    border: '1px solid rgba(67,70,85,0.4)',
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
    color: '#b4c5ff',
    border: '1px solid rgba(180,197,255,0.12)',
    transition: 'all 0.3s ease',
  };

  return (
    <div
      className={`group ${className}`}
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(180,197,255,0.25)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 16px 48px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(180,197,255,0.1)';
        const iconWrap = e.currentTarget.querySelector('.icon-wrap');
        if (iconWrap) {
          iconWrap.style.background = 'rgba(37,99,235,0.2)';
          iconWrap.style.borderColor = 'rgba(180,197,255,0.25)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(67,70,85,0.4)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        const iconWrap = e.currentTarget.querySelector('.icon-wrap');
        if (iconWrap) {
          iconWrap.style.background = 'rgba(37,99,235,0.12)';
          iconWrap.style.borderColor = 'rgba(180,197,255,0.12)';
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
          background: 'linear-gradient(90deg, transparent, rgba(180,197,255,0.15), transparent)',
        }}
      />

      <div className="icon-wrap" style={iconWrapStyle}>
        {icon}
      </div>

      <h3
        style={{
          fontSize: 20,
          fontWeight: 600,
          color: '#e0e2eb',
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
          color: '#8d90a0',
        }}
      >
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;
