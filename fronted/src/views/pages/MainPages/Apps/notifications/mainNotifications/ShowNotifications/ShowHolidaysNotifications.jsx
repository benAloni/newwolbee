import React, { useState, useEffect } from "react";
import { Modal } from "antd";
import email from "../../../../../../../imgs/email.png";
import { differenceInDays } from "date-fns";
import HolidaysOptionsDetails from "./HolidaysOptionsDetails";

export default function ShowHolidaysNotifications({
  modalOpen,
  modalContent,
  closeModal,
}) {
  const optionsData = {
    cost: ["low", "lowMedium", "medium", "mediumHigh", "high"],
    effectiveness: ["low", "medium", "high"],
    free: ["unfree", "free"],
    time: ["low", "medium", "high"],
  };

  const [daysDifference, setDaysDifference] = useState(0);
  const [selectedOption, setSelectedOption] = useState("cost");
  const [sortOrder, setSortOrder] = useState("ascending");
  const [sortedOptions, setSortedOptions] = useState([]);
  const [selectedOptionData, setSelectedOptionData] = useState(null);

  const [isOptionModalVisible, setIsOptionModalVisible] = useState(false);

  const ulStyle = {
    margin: 0,
    padding: 0,
    textAlign: "center",
    listStyleType: "none",
  };

  const listItemStyle = {
    listStyleType: "none",
  };

  const imgStyle = {
    width: "100%",
    height: "auto",
    borderRadius: "50%",
  };

  const smallprojectCardStyle = {
    width: "250px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    textAlign: "center",
    transition: "transform 0.3s ease",
    padding: "20px",
    background: "#fff",
    margin: "10px",
    height: "300px",
  };

  const imageContainerStyle = {
    width: "100px",
    height: "100px",
    margin: "0 auto 10px",
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #ddd",
  };

  const sortingControlsStyle = {
    position: "relative",
    right: "20px", // Aligns to the right side
    textAlign: "right",
  };

  const calculateTimeUntilEvent = () => {
    if (modalContent && modalContent.start) {
      const currentDate = new Date();
      const daysDifference = differenceInDays(
        new Date(modalContent.start),
        currentDate
      );
      setDaysDifference(daysDifference);
    }
  };

  useEffect(() => {
    if (modalContent && modalContent.options) {
      // Sort options based on selected property and order
      const sorted = Object.entries(modalContent.options)
        .sort(([, a], [, b]) => {
          // Sort based on ascending or descending order
          if (sortOrder === "ascending") {
            return a[selectedOption] < b[selectedOption] ? -1 : 1;
          } else {
            return a[selectedOption] > b[selectedOption] ? -1 : 1;
          }
        })
        .map(([key, value]) => ({ key, ...value }));

      setSortedOptions(sorted);
    }

    calculateTimeUntilEvent();
  }, [modalContent, selectedOption, sortOrder]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleOptionClick = (option) => {
    setSelectedOptionData(option);
    setIsOptionModalVisible(true); // Show the modal for the selected option
  };

  const closeOptionModal = () => {
    setIsOptionModalVisible(false);
    setSelectedOptionData(null); // Reset the selected option data
  };

  return (
    <Modal open={modalOpen} onCancel={closeModal} footer={null}>
      {modalContent ? (
        <>
          <ul style={ulStyle}>
            <li>
              <div style={{ backgroundColor: "lightblue" }}>
                <h2>{modalContent.description}</h2>
                <h3>{modalContent.underDescription}</h3>
              </div>
              <h5>You have:</h5>
              <div>
                <h4>employees with gluten allergy 2</h4>
                <h4>employees are vegetarian 8</h4>
                <h4>employees are vegan 4</h4>
              </div>
            </li>
          </ul>

          <div style={sortingControlsStyle}>
            <select value={selectedOption} onChange={handleOptionChange}>
              {Object.keys(optionsData).map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
            <select value={sortOrder} onChange={handleSortOrderChange}>
              <option value="ascending">Low to High</option>
              <option value="descending">High to Low</option>
            </select>
            <h4>
              Sorted by:{" "}
              {selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)}{" "}
              ({sortOrder})
            </h4>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "20px",
                }}
              >
                {sortedOptions.map((option) => {
                  const shouldShowOption = daysDifference >= option.time;

                  return (
                    shouldShowOption && (
                      <div
                        key={option.key}
                        className="project-card"
                        style={{
                          ...smallprojectCardStyle,
                          position: "relative",
                          overflow: "hidden",
                          transition: "transform 0.3s ease",
                        }}
                        onClick={() => handleOptionClick(option)} // Trigger modal
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.05)";
                          const optionText =
                            e.currentTarget.querySelector(".option-text");
                          if (optionText) {
                            optionText.style.opacity = 1;
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                          const optionText =
                            e.currentTarget.querySelector(".option-text");
                          if (optionText) {
                            optionText.style.opacity = 0;
                          }
                        }}
                      >
                        <div
                          className="image-container"
                          style={imageContainerStyle}
                        >
                          <img
                            src={email}
                            alt="Project Seven"
                            style={imgStyle}
                          />
                        </div>
                        <h3 className="option-title">{option.title}</h3>

                        <h4
                          className="option-text"
                          style={{
                            position: "relative",
                            top: "5px",
                            left: "10px",
                            transition: "opacity 0.3s ease",
                            color: "black",
                            opacity: 0,
                          }}
                        >
                          {option.text}
                        </h4>
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}

      {/* Option Details Popup Modal */}
      <Modal
        open={isOptionModalVisible}
        onCancel={closeOptionModal}
        footer={null}
      >
        {selectedOptionData && (
          <HolidaysOptionsDetails selectedOptionData={selectedOptionData} />
        )}
      </Modal>
    </Modal>
  );
}