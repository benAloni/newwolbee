import React from 'react';
import ReactDatePicker from "react-datepicker";
import { useUpdateEvent } from './useUpdateEvent'; // Import the hook

export default function EngagementModal({
    selectedEngagementDate,
    setSelectedEngagementDate,
    selectedEmployee,  // Ensure that employee data is passed
    closeModal,         // Ensure closeModal function is passed
}) {
  // Get the mutation function using the useUpdateEvent hook
  const { mutateAsync: updateEngagementDay } = useUpdateEvent("engagement"); // Pass "engagement" as eventType

  // Handle engagement date change
  const handleEngagementDateChange = (date) => {
    setSelectedEngagementDate(date);
  };

  const handleSubmit = async () => {
    try {
      const engagementData = {
        id: selectedEmployee.id,
        eventType: "engagement", // Set the eventType to "engagement"
        startDate: selectedEngagementDate,
        endDate: selectedEngagementDate, // Use the same date for engagement day
        show: false, // Set the event visibility flag here
      };

      await updateEngagementDay(engagementData);  // Pass the structured data with eventFlag
      setSelectedEngagementDate(null);
      closeModal();  // Close modal after success
    } catch (error) {
      console.error("Error updating engagement day:", error);
    }
  };

  return (
    <div className="sub-modal">
      <h2>{selectedEmployee.fullname}</h2>
      <div
        style={{
          width: "800px",
          height: "500px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>When is the engagement?</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "250px" }}>
            <ReactDatePicker
              selected={selectedEngagementDate}
              onChange={handleEngagementDateChange}
              dateFormat="yyyy/MM/dd" // Only display date without time
              minDate={new Date()} // Prevent selecting past dates
              className='form-control form-control-solid w-250px '
              placeholderText="Engagement Date"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
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
