import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAddEventForSon } from "../../../../services/api/useUpdateEvent";

const EmployeesChildren = ({
  employeeName,
  familyMembers,
  closeModal,
  selectedEmployee,
  setCurrentPage,
}) => {
  const [selectedSon, setSelectedSon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [eventType, setEventType] = useState(null);

  const { addEventForSon } = useAddEventForSon();

  // Filter family members for sons
  const sons =
    familyMembers?.filter((member) => member.relationship === "son") || [];

  // Reset selectedSon when selectedEmployee changes
  useEffect(() => {
    setSelectedSon(null); // Clear the selected son when the employee changes
  }, [selectedEmployee]);

  const handleSonClick = (son) => {
    setSelectedSon(son);
    setShowModal(true); // Show modal after selecting a son
  };

  const handleAddEvent = async () => {
    if (startDate && endDate && selectedSon && eventType) {
      try {
        await addEventForSon(
          selectedSon,
          startDate,
          endDate,
          selectedEmployee,
          eventType.value
        );
        setShowModal(false); // Close modal after successful event creation
      } catch (error) {
        console.error("Error adding event:", error);
      }
    }
  };

  const handleGoBackModal = () => {
    setCurrentPage("employeeSelection"); // Go back to employee selection page
  };

  const handleCloseModal = () => {
    setShowModal(false);
    closeModal(); // Close the modal when finished
  };

  return (
    <div>
      {selectedSon === null ? (
        <div className="employee-list">
          {sons.length > 0 ? (
            sons.map((son, index) => (
              <div key={index} className="employee-sons">
                <p onClick={() => handleSonClick(son)}>{son.name}</p>
              </div>
            ))
          ) : (
            <div>
              <p>No sons found for this employee.</p>
              <Button variant="secondary" onClick={handleGoBackModal}>
                Go Back
              </Button>
            </div>
          )}
        </div>
      ) : null}

      {/* Modal for adding event when a son is selected */}
      {showModal && selectedSon && (
        <Modal
          backdrop="static"
          keyboard={false}
          centered
          show={showModal}
          onHide={handleCloseModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Event for {selectedSon.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <label>Start Date:</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select start date"
                className="form-control"
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <label>End Date:</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select end date"
                className="form-control"
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <label>Event:</label>
              <Select
                options={[
                  { value: "sickday", label: "Sick Day" },
                  { value: "birthday", label: "Birthday" },
                  { value: "schoolGraduation", label: "School Graduation" },
                  {
                    value: "dischargeFromMilitaryService",
                    label: "Discharge from Military Service",
                  },
                  { value: "militaryDraftDay", label: "Military Draft Day" },
                  {
                    value: "startingFirstGrade",
                    label: "Starting First Grade",
                  },
                ]}
                value={eventType}
                onChange={(selectedOption) => setEventType(selectedOption)}
                placeholder="Select an event"
                isClearable
                isSearchable
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddEvent}>
              Add Event
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default EmployeesChildren;
