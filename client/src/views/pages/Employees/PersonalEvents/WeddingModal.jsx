import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { useUpdateEvent } from "../../../../services/api/useUpdateEvent";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import Select from "react-select";
import { useForm } from "react-hook-form";

export default function WeddingModal({
  selectedWeddingDate,
  setSelectedWeddingDate,
  selectedEmployee,
  closeModal,
}) {
  const { mutateAsync: updateWeddingDay } = useUpdateEvent("wedding");

  const [showModal, setShowModal] = useState(true);
  const [selectedGender, setSelectedGender] = useState("");
  const {
      register,
      handleSubmit,
      reset,
      setValue,
      watch,
      formState: { errors, isSubmitting },
    } = useForm();

  const handleWeddingDateChange = (date) => {
    setSelectedWeddingDate(date.toISOString());
  };

  const onSubmit = async () => {
    try {
      const weddingData = {
        id: selectedEmployee.id,
        eventType: "wedding",
        startDate: selectedWeddingDate,
        endDate: selectedWeddingDate,
        show: false,
      };

      const response = await updateWeddingDay(weddingData);
      if (response.status === 200) {
        Swal.fire(
          "Success!",
          `${selectedEmployee?.fullName}'s wedding has been created successfully!`,
          "success"
        );
        closeModal();
        setSelectedWeddingDate(null);
      }
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
        <Modal.Title>{selectedEmployee.fullName}'s Wedding Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ textAlign: "center" }}>
          <label style={{ marginTop: "30px", marginBottom: "10px" }}>
            When is the wedding?
          </label>
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
        <Button variant="primary" onClick={handleSubmit(onSubmit)}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
