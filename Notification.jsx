import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Notification({ message, type }) {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    // Set a timeout to hide the notification
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2500);
    
    // Clear timeout on component unmount
    return () => clearTimeout(timer);
  }, []);
  
  // Get icon based on notification type
  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'exclamation-circle';
      case 'warning':
        return 'exclamation-triangle';
      default:
        return 'info-circle';
    }
  };
  
  // CSS Styles
  const notificationStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '15px 20px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    transform: visible ? 'translateX(0)' : 'translateX(120%)',
    transition: 'transform 0.3s ease',
    maxWidth: '350px',
    borderLeft: type === 'success' ? '4px solid #2ecc71' :
               type === 'error' ? '4px solid #e74c3c' :
               type === 'warning' ? '4px solid #f39c12' :
               '4px solid #3498db'
  };

  const contentStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const iconStyle = {
    fontSize: '1.2rem',
    color: type === 'success' ? '#2ecc71' :
           type === 'error' ? '#e74c3c' :
           type === 'warning' ? '#f39c12' :
           '#3498db'
  };

  return (
    <div style={notificationStyle}>
      <div style={contentStyle}>
        <FontAwesomeIcon icon={getIcon()} style={iconStyle} />
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Notification;
