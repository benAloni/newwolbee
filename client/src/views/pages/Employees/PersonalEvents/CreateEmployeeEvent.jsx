import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import EventButton from "../EventButton";
import VacationModal from "./VacationModal";
import SickLeaveModal from "./SickLeaveModal";
import FloatingButton from "../FloatingButton";
import "./popup.css";
import { useQuery } from '@tanstack/react-query';
import EmployeesChildren from "./EmployeesChildren";
import WeddingModal from "./WeddingModal";
import EngagementModal from "./EngagementModal";
import ChildsBirthdayModal from "./ChildsBirthdayModal";
import WeddingAnniversaryModal from "./WeddingAnniversaryModal";
import { useUpdateVacation, useUpdateSickDay, useAddSickDayForSon } from './useUpdateEvent';

export default function CreateEmployeeEvent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("eventSelection");
  const [currentEventType, setCurrentEventType] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // States for event modal
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const { data: employees, isLoading, error } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const response = await fetch("/api/employees");
      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }
      return response.json();
    },
  });

  const events = [
    { id: 1, name: "Vacation Leave", type: "vacation" },
    { id: 2, name: "Sick Leave", type: "sickLeave" },
    { id: 3, name: "Children's of Workers", type: "childrenOfWorkers" },
    { id: 4, name: "Wedding", type: "wedding" },
    { id: 5, name: "Engagement", type: "engagement" },
    { id: 6, name: "Child's Birthday", type: "childsBirthday" },
    { id: 7, name: "Wedding Anniversary", type: "weddingAnniversary" },
  ];

  const { updateVacationMutation, updateVacation } = useUpdateVacation();
  const { updateSickDayMutation, updateSickDay } = useUpdateSickDay();
  const { addSickDayForSonMutation, addSickDayForSon } = useAddSickDayForSon();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPage("eventSelection");
    setCurrentEventType(null);
    setSelectedEmployee(null);
  };

  const handleEventClick = (eventType) => {
    setCurrentEventType(eventType);
    setCurrentPage("employeeSelection");
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setCurrentPage("dateSelection");
  };

  const handleAddSickDay = (selectedSon, startDate, endDate) => {
    addSickDayForSon(selectedSon, startDate, endDate, selectedEmployee);
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
                  >
                    <p>{employee.fullName}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {currentPage === "dateSelection" && currentEventType === "vacation" && (
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

        {currentPage === "dateSelection" && currentEventType === "sickLeave" && (
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

        {currentPage === "dateSelection" && currentEventType === "wedding" && (
          <WeddingModal
          selectedEmployee={selectedEmployee}
            selectedWeddingDate={selectedStartDate}
            setSelectedWeddingDate={setSelectedStartDate}
            updateWeddingDay={() => {}}
            closeModal={closeModal}
          />
        )}

        {currentPage === "dateSelection" && currentEventType === "engagement" && (
          <EngagementModal
          selectedEmployee={selectedEmployee}
            selectedEngagementDate={selectedStartDate}
            setSelectedEngagementDate={setSelectedStartDate}
            updateEngagementDay={() => {}}
            closeModal={closeModal}
          />
        )}

        {currentPage === "dateSelection" && currentEventType === "childsBirthday" && (
          <ChildsBirthdayModal
            employeeName={selectedEmployee?.fullName}
            selectedChildBirthday={selectedStartDate}
            setSelectedChildBirthday={setSelectedStartDate}
            updateChildBirthday={() => {}}
          />
        )}

        {currentPage === "dateSelection" && currentEventType === "weddingAnniversary" && (
          <WeddingAnniversaryModal
          selectedEmployee={selectedEmployee}
            selectedAnniversaryDate={selectedStartDate}
            setSelectedAnniversaryDate={setSelectedStartDate}
            updateAnniversaryDay={() => {}}
            closeModal={closeModal}
          />
        )}

        {currentPage === "dateSelection" && selectedEmployee && (
          <EmployeesChildren
            employeeName={selectedEmployee.fullName}
            familyMembers={selectedEmployee.familyMembers}
            closeModal={closeModal}
            onAddSickDay={handleAddSickDay}
            onAddVacation={() => {}}
          />
        )}
      </Modal>
    </div>
  );
}
