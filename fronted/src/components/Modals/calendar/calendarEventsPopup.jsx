import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CalendarEventsPopup = ({ show, handleClose, event, onDelete }) => {
  const [notes, setNotes] = useState("");

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSaveNotes = () => {
    // Implement the logic to save notes here
    console.log("Notes saved:", notes);
    // Example: Call a function passed via props to save the notes to a server or context
    // saveNotes(event.id, notes);
  };

  const handleDelete = () => {
    if (onDelete && event.id) {
      onDelete(event.id);
    }
  };  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Event Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {event ? (
          <>
            <h5>{event.title} <img src={event.extendedProps.img}   style={{ width: "20px", height: "20px", borderRadius: "50%" }} /></h5>
            <p>
              <strong>Start:</strong> {new Date(event.start).toLocaleString()}
            </p>
            {event.end && (
              <p>
                <strong>End:</strong> {new Date(event.end).toLocaleString()}
              </p>
            )}
            <p>
              <strong>Class:</strong> {event.className}
            </p>
            <Form.Group controlId="formNotes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={notes}
                onChange={handleNotesChange}
                placeholder="Add your notes here"
              />
            </Form.Group>
          </>
        ) : (
          <p>No event selected.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveNotes}>
          Save Notes
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete Event
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CalendarEventsPopup;
