import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useUpdateSickDay } from "../../../../services/api/useUpdateEvent";
import { Modal, Button } from "react-bootstrap";

export default function SickLeaveModal({
  employeeName,
  selectedEmployee,
  closeModal,
}) {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const { updateSickDay } = useUpdateSickDay();

  const [showModal, setShowModal] = useState(true);

  // Handle start date change
  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  // Handle end date change
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      await updateSickDay(selectedEmployee, selectedStartDate, selectedEndDate);
      closeModal();
    } catch (error) {
      console.error("Error updating sick leave:", error);
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    closeModal();
  };

  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Update Sick Leave for {selectedEmployee.fullName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>When?</h2>
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
            <div style={{ width: "250px" }}>
              <ReactDatePicker
                selected={selectedStartDate}
                onChange={handleStartDateChange}
                dateFormat="yyyy/MM/dd"
                minDate={new Date()} // Prevent selecting past dates
                className="form-control form-control-solid w-250px"
                placeholderText="Start Date"
              />
            </div>
            <div style={{ width: "250px" }}>
              <ReactDatePicker
                selected={selectedEndDate}
                onChange={handleEndDateChange}
                dateFormat="yyyy/MM/dd"
                minDate={selectedStartDate} // Ensure end date is not before start date
                className="form-control form-control-solid w-250px"
                placeholderText="End Date"
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
