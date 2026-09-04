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
        className="max-w-container-max mx-auto relative overflow-hidden rounded-[32px] text-center transition-colors duration-300"
        style={{
          background: 'var(--cta-gradient)',
          border: '1px solid var(--border-color)',
          padding: '80px 48px',
          boxShadow: '0 12px 40px var(--shadow-color)',
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
                background: 'var(--orb-primary)',
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
                background: 'var(--orb-secondary)',
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
            background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.3), transparent)',
          }}
        />

        <div className="relative z-10">
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              color: 'var(--text-main)',
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
                color: 'var(--text-muted)',
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
