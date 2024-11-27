import React, { useEffect, useState } from "react";

const HelfBar = ({ percentage }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let animationFrame;
    let start = null;

    const duration = 3000; // משך האנימציה במילישניות
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

  const rotation = 45 + currentValue * 1.8; // חישוב הזווית

  // סגנונות
  const styles = {
    progress: {
      position: "relative",
      margin: "4px",
      textAlign: "center",
    },
    barOverflow: {
      position: "relative",
      overflow: "hidden",
      width: "200px", // גודל חדש
      height: "100px", // חצי הגובה
      marginBottom: "-20px",
    },
    bar: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "200px", // גודל חדש
        height: "200px", // גודל מלא
        borderRadius: "50%",
        boxSizing: "border-box",
        border: "12px solid transparent", // צבע גבול שקוף כדי לשלוט ידנית
        borderBottomColor: `hsl(${240 + (currentValue / 2)}, 100%, 50%)`, // כחול משתנה בהדרגה
        borderRightColor: `hsl(${240 + (currentValue / 2)}, 100%, 50%)`, // כחול משתנה בהדרגה
        borderRightColor: "#0bf", // צבע כחול לימין
        borderTopColor: "#eee", // צבע אפור לחלק העליון
        borderLeftColor: "#eee", // צבע אפור לשמאל
        transform: `rotate(${rotation}deg)`,
      },
  
    percentage: {
      display: "inline-block",
      fontSize: "32px", // הגדלת טקסט האחוזים
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

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "100vh", // גובה מסך מלא/
        backgroundColor: "#f9f9f9", // צבע רקע רך
      }}
    >
      <HelfBar percentage={56.5} />
    </div>
  );
};

export default App;
