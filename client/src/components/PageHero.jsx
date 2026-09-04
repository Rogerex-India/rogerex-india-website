import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const popIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
  }),
};

const PageHero = ({ subtitle, title, highlightText, description }) => {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: '96px 32px 80px',
        background: '#10131a',
      }}
    >
      {/* Ambient orbs */}
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 300,
          borderRadius: '50%',
          background: 'rgba(37,99,235,0.15)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-40px',
          right: '-80px',
          width: 400,
          height: 300,
          borderRadius: '50%',
          background: 'rgba(0,117,159,0.1)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
        }}
      />

      {/* Grid bg */}
      <div
        className="absolute inset-0 grid-bg opacity-40 pointer-events-none"
      />

      {/* Content */}
      <div
        className="relative z-10 max-w-container-max mx-auto text-center"
        style={{ maxWidth: '48rem', margin: '0 auto' }}
      >
        {subtitle && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={popIn}
            custom={0.05}
            className="inline-flex items-center gap-2 rounded-full mb-6"
            style={{
              padding: '6px 16px',
              background: 'rgba(27,32,38,0.8)',
              border: '1px solid rgba(67,70,85,0.5)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: '#7bd0ff' }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#a4c9ff',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {subtitle}
            </span>
          </motion.div>
        )}

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.15}
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            color: '#e0e2eb',
            marginBottom: 24,
          }}
        >
          {title}{' '}
          {highlightText && (
            <span className="text-gradient">{highlightText}</span>
          )}
        </motion.h1>

        {description && (
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.28}
            style={{
              fontSize: 18,
              lineHeight: 1.65,
              color: '#8d90a0',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
