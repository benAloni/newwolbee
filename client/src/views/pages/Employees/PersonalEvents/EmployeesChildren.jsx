import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker'; // For date picking
import "react-datepicker/dist/react-datepicker.css"; // Import date picker styles

const EmployeesChildren = ({ employeeName, familyMembers, closeModal, onAddSickDay, onAddVacation }) => {
  const [selectedSon, setSelectedSon] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  // States for the sick day date picker
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Filter the family members to get only the sons
  const sons = familyMembers?.filter(member => member.relationship === "son") || [];

  const handleSonClick = (son) => {
    setSelectedSon(son);  // Set the selected son
    setShowModal(true);    // Show the modal for adding sick day
  };

  const handleAddSickDay = () => {
    // Pass the selected son and the dates to the parent function
    if (startDate && endDate) {
      onAddSickDay(selectedSon, startDate, endDate); // Pass the start and end dates
    }
    setShowModal(false);  // Close the modal
  };

  const handleCloseModal = () => {
    setShowModal(false);  // Close the modal
  };

  return (
    <div>
      <h3>{employeeName}'s Sons</h3>
      <div>
        {sons.length > 0 ? (
          sons.map((son, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <p onClick={() => handleSonClick(son)} style={{ cursor: 'pointer' }}>
                {son.name}
              </p> 
            </div>
          ))
        ) : (
          <p>No sons found for this employee.</p>
        )}
      </div>

      {/* Sick Day Modal */}
      {showModal && selectedSon && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Sick Day for {selectedSon.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <label>Start Date:</label>
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select start date"
                className="form-control"
              />
            </div>
            <div style={{ marginTop: '10px' }}>
              <label>End Date:</label>
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select end date"
                className="form-control"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            <Button variant="primary" onClick={handleAddSickDay}>Add Sick Day</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default EmployeesChildren;
