import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Modal from "react-modal";

// imgs
import pizza from "../../../../../imgs/dismissIcon.png";

export default function ShowUpcomingEvents({ closestEvents }) {
  const location = useLocation();

  // State
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openModal = (event) => {
    setSelectedEvent(event); // Set the event to display in the modal
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null); // Clear selected event
  };

  useEffect(() => {
    if (location.state?.fromContact) {
      setModalIsOpen(true);
    }
  }, [location]);

  // Function to find the closest event
  const getClosestEvent = () => {
    const currentDate = new Date();
    let closestEvent = null;
    let closestDiff = Infinity;

    closestEvents.forEach((event) => {
      const eventDate = new Date(event.start);
      const diff = Math.abs(eventDate - currentDate);

      if (diff < closestDiff) {
        closestDiff = diff;
        closestEvent = event;
      }
    });

    return closestEvent;
  };

  // Find the closest event
  const closestEvent = getClosestEvent();

  return (
    <div>
      <h1>Upcoming Events</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {closestEvents.map((event) => (
          <div
            key={event._id}
            className="project-card"
            style={{
              width: "300px",
              height: "300px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              textAlign: "center",
              padding: "20px",
              margin: "10px",
              backgroundColor: "#fff",
              cursor: "pointer",
              transition: "transform 0.3s ease",
              position: "relative", // To position the banner
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
            onClick={() => openModal(event)}
          >
            {/* Show "closest event" banner if this is the closest event */}
            {closestEvent && closestEvent._id === event._id && (
              <div
                style={{
                  position: "absolute",
                  top: "-0.5rem", // Position above the card
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "green",
                  color: "white",
                  textAlign: "center",
                  padding: "0.2rem 0.5rem",
                  fontWeight: "bold",
                  borderRadius: "4px",
                  zIndex: 1,
                  fontSize: "0.8rem", // Smaller font size
                  whiteSpace: "nowrap", // Prevent text wrapping
                  marginTop: "5px",
                }}
              >
                closest event
              </div>
            )}

            <div
              style={{
                width: "100px",
                height: "100px",
                margin: "0 auto",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid #ddd",
              }}
            >
              <img
                src={pizza}
                alt={event.title}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div style={{ marginTop: "10px" }}>
              <h3>{event.title}</h3>
              <p>
                {new Date(event.start).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Event Details"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "8px",
            width: "400px",
            textAlign: "center",
          },
        }}
      >
        {selectedEvent && (
          <div>
            {/* Close Button */}
            <button
              onClick={closeModal}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
                color: "#333",
              }}
            >
              &times;
            </button>

            <h2>{selectedEvent.title}</h2>
            <p>
              {new Date(selectedEvent.start).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
