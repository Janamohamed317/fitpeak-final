import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // CSS Styles
  const headerStyle = {
    textAlign: 'center',
    padding: scrolled ? '40px 0' : '70px 0',
    background: 'linear-gradient(135deg, #000000, #1a1a1a)',
    color: 'white',
    borderRadius: 'var(--border-radius)',
    marginBottom: '40px',
    position: 'relative',
    boxShadow: scrolled ? '0 15px 35px rgba(0, 0, 0, 0.2)' : 'var(--shadow-strong)',
    transition: 'all 0.4s ease',
    overflow: 'hidden',
  };

  // Pseudo-element styles are applied via a separate style tag
  const headerBeforeStyle = `
    .header-component::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 10%, transparent 10.5%);
      background-size: 50px 50px;
      transform: rotate(30deg);
      z-index: 1;
    }

    .header-component > * {
      position: relative;
      z-index: 2;
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  `;

  const logoStyle = {
    fontSize: '3.5rem',
    marginBottom: '20px',
    display: 'inline-block',
  };

  const pulseIconStyle = {
    filter: 'drop-shadow(0 0 10px rgba(46, 204, 113, 0.7))',
    color: '#2ecc71',
    animation: 'pulse 2s infinite',
  };

  const titleStyle = {
    marginBottom: '15px',
    fontSize: '2.8rem',
    fontWeight: 700,
    letterSpacing: '1px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
  };

  const subtitleStyle = {
    fontSize: '1.3rem',
    opacity: 0.9,
    maxWidth: '700px',
    margin: '0 auto 20px',
    lineHeight: 1.6,
  };

  const decorationStyle = {
    height: '4px',
    background: '#2ecc71',
    margin: '0 auto',
    borderRadius: '4px',
    boxShadow: '0 0 15px rgba(46, 204, 113, 0.8)',
  };

  return (
    <>
      <style>{headerBeforeStyle}</style>
      <header style={headerStyle} className="header-component">
        <motion.div 
          style={logoStyle}
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
        >
          <FontAwesomeIcon icon="heartbeat" style={pulseIconStyle} />
        </motion.div>
        
        <motion.h1
          style={titleStyle}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Fitness Tracker Pro
        </motion.h1>
        
        <motion.p
          style={subtitleStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Track your workouts and monitor your progress with our professional fitness app
        </motion.p>
        
        <motion.div 
          style={decorationStyle}
          initial={{ width: 0 }}
          animate={{ width: '150px' }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />
      </header>
    </>
  );
};

export default Header;
