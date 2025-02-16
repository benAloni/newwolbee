import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useUpdateEvent } from "../../../../services/api/useUpdateEvent";
import { Modal, Button } from "react-bootstrap";

export default function WeddingModal({
  selectedWeddingDate,
  setSelectedWeddingDate,
  selectedEmployee,
  closeModal,
}) {
  const { mutateAsync: updateWeddingDay } = useUpdateEvent("wedding");

  const [showModal, setShowModal] = useState(true);

  const handleWeddingDateChange = (date) => {
    setSelectedWeddingDate(date);
  };

  const handleSubmit = async () => {
    try {
      const weddingData = {
        id: selectedEmployee.id,
        eventType: "wedding",
        startDate: selectedWeddingDate,
        endDate: selectedWeddingDate,
        show: false,
      };

      await updateWeddingDay(weddingData);
      setSelectedWeddingDate(null); // Reset selected date
      closeModal();
    } catch (error) {
      console.error("Error updating wedding day:", error);
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    closeModal();
  };

  return (
    <Modal
      backdrop="static"
      keyboard={false}
      centered
      show={showModal}
      onHide={handleCloseModal}
    >
      {" "}
      <Modal.Header closeButton>
        <Modal.Title>
          Set Wedding Date for {selectedEmployee.fullName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>
            When is the wedding?
          </h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "250px" }}>
              <ReactDatePicker
                selected={selectedWeddingDate}
                onChange={handleWeddingDateChange}
                dateFormat="yyyy/MM/dd"
                minDate={new Date()} // Prevent selecting past dates
                className="form-control form-control-solid w-250px"
                placeholderText="Wedding Date"
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
