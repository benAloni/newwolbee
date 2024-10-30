import React from 'react';

const Loading = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: "30rem",
    height: '100vh',
    backgroundColor: '#f8f9fa', 
  };

  const spinnerStyle = {
    width: '50px',
    height: '50px',
    border: '5px solid rgba(0, 0, 0, 0.1)',
    borderTopColor: '#007bff', 
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  const keyframesStyle = `
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `;

  return (
    <div style={containerStyle}>
      <style>{keyframesStyle}</style> 
      <div style={spinnerStyle}></div>
    </div>
  );
};

export default Loading;
