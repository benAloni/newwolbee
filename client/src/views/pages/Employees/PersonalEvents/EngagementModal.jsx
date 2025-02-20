import React, { useState, useRef } from "react";
import ReactDatePicker from "react-datepicker";
import { useUpdateEvent } from "../../../../services/api/useUpdateEvent";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { updateEmployeeEventMarriageEvent } from "../../../../services";
export default function EngagementModal({
  // selectedEngagementDate,
  // setSelectedEngagementDate,
  selectedEmployee,
  closeModal,
}) {
  const { mutateAsync: updateEngagementDay } = useUpdateEvent("engagement");

  const [showModal, setShowModal] = useState(true);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedEngagementDate, setSelectedEngagementDate] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      eventType: "engagement",
    },
  });
  const spouseGenderRef = useRef();

  const handleEngagementDateChange = (date) => {
    setSelectedEngagementDate(date.toISOString());
  };

  const onSubmit = async (data) => {
    try {
      const engagementData = {
        employeeId: selectedEmployee?.employeeId,
        eventDate: selectedEngagementDate,
        spouseGender: selectedGender,
        ...data,
      };
      const response = await updateEmployeeEventMarriageEvent(engagementData);
      if (response.status === 200) {
        Swal.fire(
          "Success!",
          `${selectedEmployee?.fullName}'s engagement has been created successfully!`,
          "success"
        );
        closeModal();
        setSelectedEngagementDate(null);
        reset();
        spouseGenderRef.current.clearValue();
      }
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
          {selectedEmployee.fullName}'s Engagement Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ textAlign: "center" }}>
          <h4 style={{ marginTop: "30px", marginBottom: "10px" }}>
            When was the engagement?
          </h4>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "250px" }}>
              <ReactDatePicker
                selected={selectedEngagementDate}
                onChange={handleEngagementDateChange}
                dateFormat="dd/MM/YYYY"
                minDate={new Date()}
                className="form-control form-control-solid w-250px"
                placeholderText="Date of the engagement"
              />
            </div>
            <label>Spouse Full Name</label>
            <input
              type="text"
              name="spouseFullName"
              {...register("spouseFullName")}
              placeholder="Spouse's full name"
            />
            <label>Spouse Gender</label>
            <Select
              ref={spouseGenderRef}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
              placeholder="Select a gender"
              onChange={(selectedOption) =>
                setSelectedGender(selectedOption ? selectedOption.value : "")
              }
              isClearable
              name="spouseGender"
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Confirm"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
