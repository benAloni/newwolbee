import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useUpdateEvent } from "../../../../services/api/useUpdateEvent";
import { Modal, Button } from "react-bootstrap";

export default function EngagementModal({
  selectedEngagementDate,
  setSelectedEngagementDate,
  selectedEmployee,
  closeModal,
}) {
  const { mutateAsync: updateEngagementDay } = useUpdateEvent("engagement");

  const [showModal, setShowModal] = useState(true);

  // Handle engagement date change
  const handleEngagementDateChange = (date) => {
    setSelectedEngagementDate(date);
  };

  const handleSubmit = async () => {
    try {
      const engagementData = {
        id: selectedEmployee.id,
        eventType: "engagement",
        startDate: selectedEngagementDate,
        endDate: selectedEngagementDate,
        show: false,
      };

      await updateEngagementDay(engagementData);
      setSelectedEngagementDate(null);
      closeModal();
    } catch (error) {
      console.error("Error updating engagement day:", error);
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
          Engagement Date for {selectedEmployee.fullName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>
            When is the engagement?
          </h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "250px" }}>
              <ReactDatePicker
                selected={selectedEngagementDate}
                onChange={handleEngagementDateChange}
                dateFormat="yyyy/MM/dd" // Only display date without time
                minDate={new Date()} // Prevent selecting past dates
                className="form-control form-control-solid w-250px"
                placeholderText="Engagement Date"
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
