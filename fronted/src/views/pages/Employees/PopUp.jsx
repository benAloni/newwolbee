import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

export default function PopUp() {
  const [isOpen, setIsOpen] = useState(false);
//   const navigate = useNavigate();
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [subContent, setSubContent] = useState('');

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setIsSubOpen(false);
  };

  const openSubModal = (content) => {
    setSubContent(content);
    setIsSubOpen(true);
  };

  const closeSubModal = () => {
    setIsSubOpen(false);
  };

//   const handleNavigate = (path) => {
//     closeModal();
//     navigate(path);
//   };

  const modalStyle = {
    display: isOpen ? 'block' : 'none',
    position: 'fixed',
    zIndex: 1,
    left: 0,
    top: -120,
    width: '100%',
    height: '120%',
    overflow: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    animation: isOpen ? 'fadeIn 0.5s' : 'fadeOut 0.5s',
  };

  const modalContentStyle = {
    position: 'relative',
    backgroundColor: '#fefefe',
    margin: '10% auto',
    padding: '20px',
    border: '1px solid #888',
    width: '90%',
    height: '75%',
    maxHeight: '80%',  
    borderRadius: '20px',
    overflow: 'auto', 
    animation: isOpen ? 'slideIn 0.5s' : 'slideOut 0.5s',
  };
  const closeStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: '#aaa',
    fontSize: '28px',
    fontWeight: 'bold',
    cursor: 'pointer',
  };

  const buttonContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '40px',
    margin:'90px',
    marginTop: '50px',
    
  };

  const buttonStyle = {
    flex: '1 0 21%',
    padding: '90px',
    height: '120px',
    borderRadius: '20px',
    border: '1px solid #888',
    backgroundColor: '#FF902F',
    cursor: 'pointer',
    textAlign: 'center',
    color: '#fff',
  };

  const subModalStyle = {
    display: isSubOpen ? 'block' : 'none',
    position: 'fixed',
    zIndex: 2,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '91%',
    height: '92%',
    backgroundColor: '#fefefe',
    padding: '20px',
    border: '1px solid #888',
    borderRadius: '20px',
    overflow: 'auto',
  };



  const floatingButtonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '80px',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    backgroundColor: '#FF902F',
    color: '#fff',
    fontSize: '35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    border: 'none',
    zIndex: 1000,
    // animation: 'spin 10s linear infinite',  
  };

  return (
    <div className="App">
      <div className="floatingButtonContainer">
        <button style={floatingButtonStyle} onClick={openModal}>
          +
        </button>
      </div>
      <div style={modalStyle} className="modal">
        <div style={modalContentStyle} className="modal-content">
          <h1>Please choose type of event</h1>
          <span style={closeStyle} className="close" onClick={closeModal}>
            &times;
          </span>
          <div style={buttonContainerStyle}>
            <button style={buttonStyle} onClick={() => openSubModal('Birthday Content')}>Birthday</button>
            <button style={buttonStyle} onClick={() => openSubModal('Sick leave Content')}>Sick leave</button>
            <button style={buttonStyle} onClick={() => openSubModal('Vacation Content')}>Vacation</button>
            <button style={buttonStyle} onClick={() => openSubModal('Renovation Content')}>Renovation</button>
            <button style={buttonStyle} onClick={() => openSubModal('Pregnancy Content')}>Pregnancy</button>
            <button style={buttonStyle} onClick={() => openSubModal('Anniversary Content')}>Anniversary</button>
            <button style={buttonStyle} onClick={() => openSubModal('Car accident Content')}>Car accident</button>
            <button style={buttonStyle} onClick={() => openSubModal('Death of a relative Content')}>Death of a relative</button>
          </div>
          <div style={subModalStyle} className="sub-modal">
            <h2>{subContent}</h2>
            <span style={closeStyle} className="close" onClick={closeSubModal}>
              &times;
            </span>
            <p>This is the content of the sub modal.</p>
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from {opacity: 0;}
            to {opacity: 1;}
          }

          @keyframes fadeOut {
            from {opacity: 1;}
            to {opacity: 0;}
          }

          @keyframes slideIn {
            from {transform: translateY(-100vh);}
            to {transform: translateY(0);}
          }

          @keyframes slideOut {
            from {transform: translateY(0);}
            to {transform: translateY(-100vh);}
          }

          @keyframes spin {
            from {transform: rotate(0deg);}
            to {transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
}


