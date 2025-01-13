import React, { useState, useEffect } from "react";
import { Modal } from "antd";
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
      const sorted = Object.entries(modalContent.options)
        .sort(([, a], [, b]) => {
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
    setIsOptionModalVisible(true);
  };

  const closeOptionModal = () => {
    setIsOptionModalVisible(false);
    setSelectedOptionData(null);
  };

  return (
    <Modal
      open={modalOpen}
      onCancel={closeModal}
      footer={null}
      centered
      styles={{
        padding: "20px",
        borderRadius: "8px",
        background: "#f7f7f7",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      {modalContent ? (
        <>
          <header style={{ textAlign: "center", marginBottom: "20px" }}>
            <h2 style={{ color: "#333", marginBottom: "5px" }}>
              {modalContent.description}
            </h2>
            <h4 style={{ color: "#777" }}>{modalContent.underDescription}</h4>
          </header>

          <section style={{ textAlign: "center", marginBottom: "20px" }}>
            <h5 style={{ margin: "10px 0" }}>You have:</h5>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <p>Employees with gluten allergy: <strong>2</strong></p>
              <p>Vegetarian employees: <strong>8</strong></p>
              <p>Vegan employees: <strong>4</strong></p>
            </div>
          </section>

          <section style={{ marginBottom: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <select
                value={selectedOption}
                onChange={handleOptionChange}
                style={{
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  background: "#fff",
                }}
              >
                {Object.keys(optionsData).map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
              <select
                value={sortOrder}
                onChange={handleSortOrderChange}
                style={{
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  background: "#fff",
                }}
              >
                <option value="ascending">Low to High</option>
                <option value="descending">High to Low</option>
              </select>
            </div>
          </section>

          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              padding: "10px",
            }}
          >
            {sortedOptions.map((option) => {
              const shouldShowOption = daysDifference >= option.time;
              return (
                shouldShowOption && (
                  <div
                    key={option.key}
                    style={{
                      background: "#fff",
                      borderRadius: "8px",
                      overflow: "hidden",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      cursor: "pointer",
                      transition: "transform 0.3s ease",
                    }}
                    onClick={() => handleOptionClick(option)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "150px",
                        background: `url(${option.imageUrl}) center/cover no-repeat`,
                      }}
                    />
                    <div style={{ padding: "10px", textAlign: "center" }}>
                      <h4>{option.title}</h4>
                      <p style={{ color: "#555" }}>{option.text}</p>
                    </div>
                  </div>
                )
              );
            })}
          </section>

          <Modal
            open={isOptionModalVisible}
            onCancel={closeOptionModal}
            footer={null}
          >
            {selectedOptionData && (
              <HolidaysOptionsDetails selectedOptionData={selectedOptionData} />
            )}
          </Modal>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Modal>
  );
}
