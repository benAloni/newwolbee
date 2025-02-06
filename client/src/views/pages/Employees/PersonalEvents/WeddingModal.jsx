import React from 'react';
import ReactDatePicker from "react-datepicker";
import { useUpdateEvent } from './useUpdateEvent';

export default function WeddingModal({
  selectedWeddingDate,
  setSelectedWeddingDate,
  selectedEmployee,
  closeModal,
}) {
  const { mutateAsync: updateWeddingDay } = useUpdateEvent("wedding");

  const handleWeddingDateChange = (date) => {
    setSelectedWeddingDate(date);
  };  

  const handleSubmit = async () => {
    try {
      const formattedWeddingDate = new Date(selectedWeddingDate);
      const weddingDateString = `${formattedWeddingDate.getFullYear()}-${(formattedWeddingDate.getMonth() + 1).toString().padStart(2, '0')}-${formattedWeddingDate.getDate().toString().padStart(2, '0')}`;
  
      const weddingData = {
        id: selectedEmployee.id,
        eventType: "wedding",
        startDate: selectedWeddingDate,
        endDate: selectedWeddingDate, 
        show: false,
      };
            
  console.log(weddingData);
  
      await updateWeddingDay(weddingData); 
      setSelectedWeddingDate(null);
      closeModal();
    } catch (error) {
      console.error("Error updating wedding day:", error);
    }
  };

  return (
    <div className="sub-modal">
      <h2>{selectedEmployee.fullname}</h2>
      <div style={{ width: "800px", height: "500px", padding: "20px", textAlign: "center" }}>
        <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>When is the wedding?</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "250px" }}>
            <ReactDatePicker
              selected={selectedWeddingDate}
              onChange={handleWeddingDateChange}
              dateFormat="yyyy/MM/dd"
              minDate={new Date()}
              className='form-control form-control-solid w-250px '
              placeholderText="Wedding Date"
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
