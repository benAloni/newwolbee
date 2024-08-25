import React, { useEffect, useState } from 'react';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 20);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
    //   style={{
    //     borderTop: '5px solid red',
    //     marginTop: '40px',
    //     minWidth: '90px',
    //     paddingTop: '20px',
    //   }}
    >
      <div
        style={{
            marginTop: "20px",
          width: '250%',
          backgroundColor: '#f3f3f3',
          borderRadius: '25px',
          overflow: 'hidden',
          position: 'relative',
          height: '5px',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: 'green',
            height: '100%',
            transition: 'width 0.0s ease-in-out',
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
