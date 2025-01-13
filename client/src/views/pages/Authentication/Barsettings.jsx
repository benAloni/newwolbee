import React, { useState } from 'react';
import gift from '../../../imgs/gift.png';
import Sharing from '../../../imgs/Sharing.png';
import rings from '../../../imgs/rings.png';
import sick from '../../../imgs/sick.png';
import baby from '../../../imgs/baby.png';
import arrows from '../../../imgs/arrows.png';
import reminder from '../../../imgs/reminder.png';
import rescheduling from '../../../imgs/rescheduling.png'

import vacation from '../../../imgs/off.png'

const BoxSelector = () => {
  const [selectedBox, setSelectedBox] = useState(null);

  const boxes = [
    { id: 1, name: 'Birthdays', imageUrl: gift },
    { id: 2, name: 'Pregnancy', imageUrl: baby },
    { id: 3, name: 'Sick Leave', imageUrl: sick },
    { id: 4, name: 'Vacation Leave', imageUrl: vacation },
    { id: 5, name: 'Engagement', imageUrl: rings },
    { id: 6, name: 'Work Routine Changes', imageUrl: arrows },
    { id: 7, name: 'Important Dates and Events', imageUrl: rescheduling },
    { id: 8, name: 'Important Life Events', imageUrl: reminder },
  ];

  const handleClick = (id) => {
    setSelectedBox(id);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '10px' }}>
        {boxes.map((box) => (
          <div
            key={box.id}
            onClick={() => handleClick(box.id)}
            style={{
              width: '60px',
              height: '60px',
              border: selectedBox === box.id ? '2px solid orange' : '2px solid gray',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <img src={box.imageUrl} alt={box.name} style={{ width: '50px', height: '50px' }} />
          </div>
        ))}
      </div>
      {selectedBox && (
        <div style={{ marginTop: '20px' }}>
          <h3>{boxes.find((box) => box.id === selectedBox).name}</h3>
        </div>
      )}
    </div>
  );
};

export default BoxSelector;
