import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAddEventForSon } from "../../../../services/api/useUpdateEvent";
import AddFamilyMember from "../../Profile/GeneralInfo/AddFamilyMember";

const EmployeesChildren = ({ familyMembers = [], selectedEmployee, setCurrentPage, refreshFamilyMembers }) => {
  const [selectedSon, setSelectedSon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [eventType, setEventType] = useState(null);
  const [sons, setSons] = useState([]);
  const [fromEvent, setFromEvent] = useState(true);
  const { addEventForSon } = useAddEventForSon();


  // Update the `sons` state whenever `familyMembers` changes
  useEffect(() => {
    if (Array.isArray(familyMembers)) {
      setSons(familyMembers.filter((member) => member?.relationship === "son"));
    } else {
      setSons([]);
    }
  }, [familyMembers]);

  // Callback function to refresh the `sons` list
  const handleAddFamilyMember = (newFamilyMember) => {
    if (newFamilyMember.relationship === "son") {
      setSons((prevSons) => [...prevSons, newFamilyMember]); // Add the new son to the list
    }
  };

  if (!selectedEmployee) {
    return <p>Loading employee data...</p>;
  }

  const handleSonClick = (son) => {
    setSelectedSon(son);
    setShowModal(true);
  };

  const handleAddEvent = async () => {
    if (startDate && endDate && selectedSon && eventType) {
      try {
        await addEventForSon(selectedSon, startDate, endDate, selectedEmployee, eventType.value);
        setShowModal(false);
      } catch (error) {
        console.error("Error adding event:", error);
      }
    }
  };

  return (
    <div className="employee-list position-relative p-3 d-flex flex-column" style={{ minHeight: "100%" }}>
      {/* Add Family Member Button */}
      <div className="mb-3">
        <AddFamilyMember
          selectedEmployee={selectedEmployee}
          sons={sons}
          onAddFamilyMember={handleAddFamilyMember}
          setFromEvent={setFromEvent}
          fromEvent={fromEvent}
        />
      </div>

      {/* Sons List */}
      {sons.length > 0 ? (
        <div className="d-flex flex-wrap gap-3">
          {sons.map((son, index) => (
            <button
              key={index}
              className="employee-sons"
              onClick={() => handleSonClick(son)}
              aria-label={`Select son ${son.name}`}
            >
              {son.name}
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-5 text-center">
          <p>No sons found for this employee.</p>
        </div>
      )}

      {/* Go Back Button */}
      <div className="mt-auto d-flex justify-content-end">
        <Button variant="secondary" onClick={() => setCurrentPage("employeeSelection")}>
          Go Back
        </Button>
      </div>

      {/* Bootstrap Modal for Adding Event */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Event for {selectedSon?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label>Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select start date"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select end date"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Event:</label>
            <Select
              options={[
                { value: "sickday", label: "Sick Day" },
                { value: "birthday", label: "Birthday" },
                { value: "schoolGraduation", label: "School Graduation" },
                { value: "dischargeFromMilitaryService", label: "Discharge from Military Service" },
                { value: "militaryDraftDay", label: "Military Draft Day" },
                { value: "startingFirstGrade", label: "Starting First Grade" },
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddEvent}>
            Add Event
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EmployeesChildren;