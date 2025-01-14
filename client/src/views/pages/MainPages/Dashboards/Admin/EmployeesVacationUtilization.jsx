import React, { useEffect, useState } from "react";

const EmployeesVacationUtilizationBar = ({ percentage }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let animationFrame;
    let start = null;

    const duration = 3000; 
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const progressPercentage = Math.min(progress / duration, 1);
      const newValue = Math.floor(progressPercentage * percentage);

      setCurrentValue(newValue);

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [percentage]);

  const rotation = 45 + currentValue * 1.8; 

 
  const styles = {
    progress: {
      position: "relative",
      margin: "4px",
      textAlign: "center",
    },
    barOverflow: {
      position: "relative",
      overflow: "hidden",
      width: "200px", 
      height: "100px", 
      marginBottom: "-20px",
    },
    bar: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "200px", 
        height: "200px", 
        borderRadius: "50%",
        boxSizing: "border-box",
        border: "12px solid transparent", 
        borderBottomColor: `hsl(${240 + (currentValue / 2)}, 100%, 50%)`, 
        borderRightColor: `hsl(${240 + (currentValue / 2)}, 100%, 50%)`, 
        borderRightColor: "#0bf", 
        borderTopColor: "#eee", 
        borderLeftColor: "#eee", 
        transform: `rotate(${rotation}deg)`,
      },
  
    percentage: {
      display: "inline-block",
      fontSize: "32px", 
      fontWeight: "bold",
    },
  };

  return (
    <div style={styles.progress}>
      <div style={styles.barOverflow}>
        <div style={styles.bar}></div>
      </div>
      <span style={styles.percentage}>{currentValue}</span>%
    </div>
  );
};
export default EmployeesVacationUtilizationBar;

