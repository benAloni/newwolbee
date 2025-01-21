import React from 'react'
import ReactDatePicker from "react-datepicker";

export default function SickLeaveModal({
    employeeName,
    selectedStartDate,
    selectedEndDate,
    setSelectedStartDate,
    setSelectedEndDate,
    updateSickDay,
  }) {
 // Handle start date change
  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  // Handle end date change
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };


  return (
    <div className="sub-modal">
      <h2>{employeeName}</h2>
      <div
        style={{
          width: "800px",
          height: "500px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>When?</h2>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <div style={{ width: "250px" }}>
            <ReactDatePicker
              selected={selectedStartDate}
              onChange={handleStartDateChange}
              dateFormat="yyyy/MM/dd" // Only display date without time
              minDate={new Date()} // Prevent selecting past dates
              className='form-control form-control-solid w-250px '
              placeholderText="Start Date"
            />
          </div>
          <div style={{ width: "250px" }}>
            <ReactDatePicker
              selected={selectedEndDate}
              onChange={handleEndDateChange}
              dateFormat="yyyy/MM/dd" // Only display date without time
              minDate={selectedStartDate} // Ensure end date is not before start date
              className='form-control form-control-solid w-250px '
              placeholderText="End Date"
            />
          </div>
        </div>
        <button
          onClick={() => {
            updateSickDay(selectedStartDate, selectedEndDate);
          }}
          style={{
            marginTop: "30px",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};