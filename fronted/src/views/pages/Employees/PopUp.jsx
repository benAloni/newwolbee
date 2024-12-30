// PopUp.jsx
import React, { useState } from 'react';
import Modal from './Modal';
import EventButton from './EventButton';
import EmployeeGrid from './EmployeeGrid';
import VacationModal from './VacationModal';
import SickLeaveModal from './SickLeaveModal';
import FloatingButton from './FloatingButton';
import './popup.css';

import { useQuery } from '@tanstack/react-query';

export default function PopUp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('eventSelection');
  const [currentEventType, setCurrentEventType] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetch employees using useQuery
  // Fetch employees using useQuery
const { data: employees, isLoading, error } = useQuery({
  queryKey: ['employees'],
  queryFn: async () => {
    const response = await fetch('/api/employees'); // Update with your API endpoint
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    return response.json();
  },
});


  // Define the events array
  const events = [
    { id: 1, name: 'Vacation Leave', imageUrl: '/path/to/vacation-icon', type: 'Vacation' },
    { id: 2, name: 'Sick Leave', imageUrl: '/path/to/sickleave-icon', type: 'Sick Leave' },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPage('eventSelection');
    setCurrentEventType(null);
    setSelectedEmployee(null);
  };

  const handleEventClick = (eventType) => {
    setCurrentEventType(eventType);
    setCurrentPage('employeeSelection');
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setCurrentPage('dateSelection');
  };

  return (
    <div className="PopUp">
      <FloatingButton onClick={openModal} />

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {currentPage === 'eventSelection' && (
          <div>
            <h1>Select Event Type</h1>
            <div className="button-container">
              {events.map((event) => (
                <EventButton
                  key={event.id}
                  event={event}
                  onClick={() => handleEventClick(event.type)}
                />
              ))}
            </div>
          </div>
        )}

        {currentPage === 'employeeSelection' && (
          <div>
            <h2>Select Employee for {currentEventType}</h2>
            {isLoading && <p>Loading employees...</p>}
            {error && <p>Failed to load employees: {error.message}</p>}
            {!isLoading && employees && (
              <EmployeeGrid employees={employees} onEmployeeClick={handleEmployeeClick} />
            )}
          </div>
        )}

        {currentPage === 'dateSelection' && currentEventType === 'Vacation' && (
          <VacationModal employeeName={selectedEmployee?.fullName} />
        )}

        {currentPage === 'dateSelection' && currentEventType === 'Sick Leave' && (
          <SickLeaveModal employeeName={selectedEmployee?.fullName} />
        )}
      </Modal>
    </div>
  );
}
