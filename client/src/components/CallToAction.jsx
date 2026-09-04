import React from 'react';

const CallToAction = ({
  title,
  description,
  buttonNode,
  sectionClassName = '',
  containerClassName = '',
  hasAnimatedBg = true,
}) => {
  return (
    <section style={{ padding: '0 32px 120px' }} className={sectionClassName}>
      <div
        className="max-w-container-max mx-auto relative overflow-hidden rounded-[32px] text-center"
        style={{
          background: 'linear-gradient(135deg, #1d2026 0%, #191c22 100%)',
          border: '1px solid rgba(67,70,85,0.5)',
          padding: '80px 48px',
        }}
      >
        {/* Ambient orbs inside CTA */}
        {hasAnimatedBg && (
          <>
            <div
              style={{
                position: 'absolute',
                top: '-40px',
                left: '20%',
                width: 300,
                height: 200,
                borderRadius: '50%',
                background: 'rgba(37,99,235,0.2)',
                filter: 'blur(80px)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-60px',
                right: '20%',
                width: 280,
                height: 200,
                borderRadius: '50%',
                background: 'rgba(0,117,159,0.15)',
                filter: 'blur(80px)',
                pointerEvents: 'none',
              }}
            />
          </>
        )}

        {/* Top border gradient */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(180,197,255,0.3), transparent)',
          }}
        />

        <div className="relative z-10">
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: '#e0e2eb',
              marginBottom: 16,
            }}
          >
            {title}
          </h2>
          {description && (
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.65,
                color: '#8d90a0',
                maxWidth: '560px',
                margin: '0 auto 40px',
              }}
            >
              {description}
            </p>
          )}
          {buttonNode}
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
