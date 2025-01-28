import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import EventButton from "../EventButton";
import VacationModal from "./VacationModal";
import SickLeaveModal from "./SickLeaveModal";
import FloatingButton from "../FloatingButton";
import "./popup.css";
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { auth } from '../../../../firebase/firebaseConfig';
import EmployeesChildren from "./EmployeesChildren";

export default function CreateEmployeeEvent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("eventSelection");
  const [currentEventType, setCurrentEventType] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // States for vacation modal
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [fetchCount, setFetchCount] = useState(0);

  const { data: employees, isLoading, error } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await fetch("/api/employees");
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }
      return response.json();
    },
    enabled: fetchCount < 3,  // Only fetch 3 times
  });  

  // Define the events array
  const events = [
    {
      id: 1,
      name: "Vacation Leave",
      imageUrl: "/path/to/vacation-icon",
      type: "Vacation",
    },
    {
      id: 2,
      name: "Sick Leave",
      imageUrl: "/path/to/sickleave-icon",
      type: "Sick Leave",
    },
    {
      id: 3,
      name: "children's of workers",
      imageUrl: "/path/to/sickleave-icon",
      type: "children of workers",
    },
  ];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPage("eventSelection");
    setCurrentEventType(null);
    setSelectedEmployee(null);
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setSelectedPurpose(null);
    setSelectedCountry(null);
  };

  const handleEventClick = (eventType) => {
    setCurrentEventType(eventType);
    setCurrentPage("employeeSelection");
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setCurrentPage("dateSelection");
  };

  // --------------------VacationMutation---------------------
  const updateVacationMutation = useMutation({
    mutationFn: async (vacationData) => {
      const token = await auth.currentUser.getIdToken(); // Get token from Firebase auth
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/updateEmployeeVacation`, // Update with your actual API endpoint
        vacationData,  // Pass the vacationData object directly
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Send token in Authorization header
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      console.log('Vacation updated successfully');
    },
    onError: (error) => {
      console.error('Error updating vacation:', error);
    },
  });

  const updateVacation = async () => {
    try {
      // Create the start and end dates, and ensure the time is set to midnight (local timezone)
      const formattedStartDate = new Date(selectedStartDate);
      const formattedEndDate = new Date(selectedEndDate);
  
      // Get the local date format (YYYY-MM-DD) without the time zone impact
      const startDateString = `${formattedStartDate.getFullYear()}-${(formattedStartDate.getMonth() + 1).toString().padStart(2, '0')}-${formattedStartDate.getDate().toString().padStart(2, '0')}`;
      const endDateString = `${formattedEndDate.getFullYear()}-${(formattedEndDate.getMonth() + 1).toString().padStart(2, '0')}-${formattedEndDate.getDate().toString().padStart(2, '0')}`;
  
      // Prepare the vacation data object with the relevant fields
      const vacationData = {
        id: selectedEmployee.id,
        purposeOfTrip: selectedPurpose,
        destination: selectedCountry?.value,
        startDate: startDateString, // Send the start date in local format
        endDate: endDateString,     // Send the end date in local format
      };  
      // Trigger the mutation to send data to the backend
      await updateVacationMutation.mutateAsync(vacationData);
  
      // Reset the state after success
      setSelectedStartDate(null);
      setSelectedEndDate(null);
      setSelectedPurpose(null);
      setSelectedCountry(null);
  
      closeModal(); // Close the modal after updating
  
    } catch (error) {
      console.error("Error updating vacation:", error);
    }
  };  
  
  

  // --------------------SickDayMutation---------------------
  const updateSickDayMutation = useMutation({
    mutationFn: async (sickDayData) => {
      const token = await auth.currentUser.getIdToken(); // Get token from Firebase auth
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/updateEmployeeSickLeave`, // Update with your actual API endpoint
        sickDayData,  // Pass the sickDayData object directly
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Send token in Authorization header
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      console.log('Sick Day updated successfully');
    },
    onError: (error) => {
      console.error('Error updating sick day:', error);
    },
  });  

  const updateSickDay = async () => {
    try {
      // Create the start and end dates, and ensure the time is set to midnight (local timezone)
      const formattedStartDate = new Date(selectedStartDate);
      const formattedEndDate = new Date(selectedEndDate);
  
      // Get the local date format (YYYY-MM-DD) without the time zone impact
      const startDateString = `${formattedStartDate.getFullYear()}-${(formattedStartDate.getMonth() + 1).toString().padStart(2, '0')}-${formattedStartDate.getDate().toString().padStart(2, '0')}`;
      const endDateString = `${formattedEndDate.getFullYear()}-${(formattedEndDate.getMonth() + 1).toString().padStart(2, '0')}-${formattedEndDate.getDate().toString().padStart(2, '0')}`;
  
      // Prepare the vacation data object with the relevant fields
      const sickDayData = {
        id: selectedEmployee.id,
        startDate: startDateString, // Send the start date in local format
        endDate: endDateString,     // Send the end date in local format
      };  
      
      // Trigger the mutation to send data to the backend
      await updateSickDayMutation.mutateAsync(sickDayData);
  
      // Reset the state after success
      setSelectedStartDate(null);
      setSelectedEndDate(null);
  
      closeModal(); // Close the modal after updating
  
    } catch (error) {
      console.error("Error updating sick day:", error);
    }
  };

  return (
    <div>
      <FloatingButton onClick={openModal} />

      <Modal show={isModalOpen} onHide={closeModal}>
        {currentPage === "eventSelection" && (
          <div className="button-container">
            {events.map((event) => (
              <EventButton
                key={event.id}
                event={event}
                onClick={() => handleEventClick(event.type)}
              />
            ))}
          </div>
        )}

        {currentPage === "employeeSelection" && (
          <div>
            {isLoading && <p>Loading employees...</p>}
            {error && <p>Failed to load employees: {error.message}</p>}
            {!isLoading && employees && (
              <div className="employee-list">
                {employees.map((employee) => (
                  <div
                    key={employee.id}
                    className="employee-item"
                    onClick={() => handleEmployeeClick(employee)}
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      border: "1px solid #ccc",
                      marginBottom: "10px",
                    }}
                  >
                    <p>{employee.fullName}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {currentPage === "dateSelection" && currentEventType === "Vacation" && (
          <VacationModal
            employeeName={selectedEmployee?.fullName}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            selectedPurpose={selectedPurpose}
            selectedCountry={selectedCountry}
            setSelectedStartDate={setSelectedStartDate}
            setSelectedEndDate={setSelectedEndDate}
            setSelectedPurpose={setSelectedPurpose}
            setSelectedCountry={setSelectedCountry}
            updateVacation={updateVacation}
            closeModal={closeModal}
          />
        )}

        {currentPage === "dateSelection" && currentEventType === "Sick Leave" && (
          <SickLeaveModal
            employeeName={selectedEmployee?.fullName}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            setSelectedStartDate={setSelectedStartDate}
            setSelectedEndDate={setSelectedEndDate}
            updateSickDay={updateSickDay}
            closeModal={closeModal}
          />
        )}
        {currentPage === "dateSelection" && currentEventType === "children of workers" && (
          <EmployeesChildren
            employeeName={selectedEmployee?.fullName}
            selectedStartDate={selectedStartDate}
            selectedEndDate={selectedEndDate}
            setSelectedStartDate={setSelectedStartDate}
            setSelectedEndDate={setSelectedEndDate}
            updateSickDay={updateSickDay}
            closeModal={closeModal}
          />
        )}
      </Modal>
    </div>
  );
}
