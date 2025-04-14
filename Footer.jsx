import React from 'react';

function Footer() {
  // CSS Styles
  const footerStyle = {
    backgroundColor: '#f8f9fa',
    padding: '1.5rem 0',
    marginTop: '2rem',
    borderTop: '1px solid #e9ecef',
    color: '#6c757d',
    fontSize: '0.9rem'
  };

  return (
    <footer style={footerStyle}>
      <div className="container">
        <p className="text-center mb-0">&copy; {new Date().getFullYear()} Fitness Tracker Pro. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
