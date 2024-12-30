// FloatingButton.jsx
import React from 'react';

const FloatingButton = ({ onClick }) => (
  <div
    className="floatingButton"
    onClick={onClick}
    style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: '#4CAF50',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      cursor: 'pointer',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
    }}
  >
    +
  </div>
);

export default FloatingButton;
