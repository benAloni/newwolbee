import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Make sure this matches your root element in the DOM

export default function EditInsightsActivity({ isOpen, closeModal }) {
  const [topInsights, setTopInsights] = useState({
    insight1: "type here",
    insight2: "type here",
    insight3: "type here",
  });
  const [latestInsights, setLatestInsights] = useState({
    latestInsight1: "type here",
    latestInsight2: "type here",
    latestInsight3: "type here",
  });
  const [latestActivity, setLatestActivity] = useState({
    latestActivity1: "type here",
    latestActivity2: "type here",
    latestActivity3: "type here",
  });

  const handleChange1 = (event, key) => {
    setTopInsights((prevState) => ({
      ...prevState,
      [key]: event.target.value,
    }));
  };
  const handleChange2 = (event, key) => {
    setTopInsights((prevState) => ({
      ...prevState,
      [key]: event.target.value,
    }));
  };
  const handleChange3 = (event, key) => {
    setTopInsights((prevState) => ({
      ...prevState,
      [key]: event.target.value,
    }));
  };

  const handleSave = () => {
    console.log("Saving insights:", topInsights);
    closeModal();
  };

  return (
    <Modal
      isOpen={!!isOpen} // Ensure isOpen is a boolean
      onRequestClose={closeModal}
      contentLabel="Edit Insights Activity"
      style={customStyles}
    >
      {isOpen === 1 && (
        <>
          <h2 style={headerStyle}>Wolbee’s Top Insights</h2>
          <div style={containerStyle}>
            <input
              type="text"
              style={inputStyle}
              value={topInsights.insight1}
              onChange={(e) => handleChange1(e, "insight1")}
            />
            <input
              type="text"
              style={inputStyle}
              value={topInsights.insight2}
              onChange={(e) => handleChange1(e, "insight2")}
            />
            <input
              type="text"
              style={inputStyle}
              value={topInsights.insight3}
              onChange={(e) => handleChange1(e, "insight3")}
            />
          </div>
        </>
      )}

      {isOpen === 2 && (
        <>
          <h2 style={headerStyle}>Latest Insights</h2>
          <div style={containerStyle}>
            <input
              type="text"
              style={inputStyle}
              value={latestInsights.latestInsight1}
              onChange={(e) => handleChange3(e, "latestActivity1")}
            />
            <input
              type="text"
              style={inputStyle}
              value={latestInsights.latestInsight2}
              onChange={(e) => handleChange3(e, "latestActivity2")}
            />
            <input
              type="text"
              style={inputStyle}
              value={latestInsights.latestInsight3}
              onChange={(e) => handleChange3(e, "latestActivity3")}
            />
          </div>
        </>
      )}

      {isOpen === 3 && (
        <>
          <h2 style={headerStyle}>Latest Activity</h2>
          <div style={containerStyle}>
            <input
              type="text"
              style={inputStyle}
              value={latestActivity.latestActivity1}
              onChange={(e) => handleChange3(e, "latestActivity1")}
            />
            <input
              type="text"
              style={inputStyle}
              value={latestActivity.latestActivity2}
              onChange={(e) => handleChange3(e, "latestActivity2")}
            />
            <input
              type="text"
              style={inputStyle}
              value={latestActivity.latestActivity3}
              onChange={(e) => handleChange3(e, "latestActivity3")}
            />
          </div>
        </>
      )}

      <div style={buttonContainerStyle}>
        <button
          onClick={handleSave}
          style={{
            backgroundColor: "#FFA500", // Orange background
            color: "black", // Black text
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s",
            marginRight: "10px",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#e69500")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#FFA500")}
        >
          Save
        </button>
        <button
          onClick={closeModal}
          style={{
            backgroundColor: "#000000", // Black background
            color: "white", // White text
            border: "none",
            padding: "10px 20px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s",
            marginLeft: "10px",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#333333")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#000000")}
        >
          Close
        </button>
      </div>
    </Modal>
  );
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "500px", // Set a max width for the modal
    width: "100%", // Full width
  },
};

const inputStyle = {
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "16px",
  width: "100%", // Full width of the container
};

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center", // Center buttons horizontally
  marginTop: "20px",
};

const headerStyle = {
  padding: "10px",
  margin: 0,
};
