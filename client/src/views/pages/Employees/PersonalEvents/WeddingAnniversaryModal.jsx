import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useUpdateEvent } from "../../../../services/api/useUpdateEvent";
import { Modal, Button } from "react-bootstrap";

export default function WeddingAnniversaryModal({
  selectedAnniversaryDate,
  setSelectedAnniversaryDate,
  selectedEmployee,
  closeModal,
}) {
  const { mutateAsync: updateAnniversaryDay } =
    useUpdateEvent("weddingAnniversary");

  const [showModal, setShowModal] = useState(true);

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
      <Modal.Header closeButton>
        <Modal.Title>
          Wedding Anniversary Date for {selectedEmployee.fullName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>
            When is the wedding anniversary?
          </h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "250px" }}>
              <ReactDatePicker
                selected={selectedAnniversaryDate}
                onChange={handleAnniversaryDateChange}
                dateFormat="yyyy/MM/dd"
                minDate={new Date()} // Prevent selecting past dates
                className="form-control form-control-solid w-250px"
                placeholderText="Wedding Anniversary Date"
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
