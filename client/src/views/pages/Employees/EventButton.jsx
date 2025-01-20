import React from 'react';

const EventButton = ({ event, onClick }) => (
  <button
    key={event.id}
    className="eventButton"
    onClick={onClick}
    style={{
      width: '150px',
      height: '150px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      cursor: onClick ? 'pointer' : 'default',
      backgroundColor: '#f9f9f9',
    }}
  >
    {/* <img
      src={event.imageUrl}
      alt={event.name}
      style={{
        marginBottom: '10px',
        width: '80px',
        height: '80px',
      }}
    /> */}
    <span>{event.name}</span>
  </button>
);

export default EventButton;
