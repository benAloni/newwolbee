import React from "react";
import ReactDatePicker from "react-datepicker";
import { useUpdateEvent } from "./useUpdateEvent";

export default function WeddingAnniversaryModal({
  selectedAnniversaryDate,
  setSelectedAnniversaryDate,
  selectedEmployee,
  closeModal,
}) {
  const { mutateAsync: updateAnniversaryDay } =
    useUpdateEvent("weddingAnniversary");

  const handleAnniversaryDateChange = (date) => {
    setSelectedAnniversaryDate(date);
  };

  const handleSubmit = async () => {
    try {
      const anniversaryData = {
        id: selectedEmployee.id,
        eventType: "weddingAnniversary",
        startDate: selectedAnniversaryDate,
        endDate: selectedAnniversaryDate,
        show: false,
      };

      await updateAnniversaryDay(anniversaryData);
      setSelectedAnniversaryDate(null);
      closeModal();
    } catch (error) {
      console.error("Error updating wedding anniversary day:", error);
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
        <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>
          When is the wedding anniversary?
        </h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "250px" }}>
            <ReactDatePicker
              selected={selectedAnniversaryDate}
              onChange={handleAnniversaryDateChange}
              dateFormat="yyyy/MM/dd"
              minDate={new Date()}
              className="form-control form-control-solid w-250px "
              placeholderText="Wedding Anniversary Date"
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
}
