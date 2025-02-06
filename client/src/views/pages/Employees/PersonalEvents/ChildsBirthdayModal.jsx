import React from 'react';
import ReactDatePicker from "react-datepicker";

export default function ChildsBirthdayModal({
    employeeName,
    selectedChildBirthday,
    setSelectedChildBirthday,
    updateChildBirthday,
  }) {
  // Handle child's birthday date change
  const handleChildBirthdayChange = (date) => {
    setSelectedChildBirthday(date);
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
        <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>When is the child's birthday?</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "250px" }}>
            <ReactDatePicker
              selected={selectedChildBirthday}
              onChange={handleChildBirthdayChange}
              dateFormat="yyyy/MM/dd" // Only display date without time
              minDate={new Date()} // Prevent selecting past dates
              className='form-control form-control-solid w-250px '
              placeholderText="Child's Birthday"
            />
          </div>
        </div>
        <button
          onClick={() => {
            updateChildBirthday(selectedChildBirthday);
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
