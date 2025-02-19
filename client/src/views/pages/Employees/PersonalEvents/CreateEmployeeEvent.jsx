import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { fetchEmployees } from "../../../../services/api/employees";
import VacationModal from "./VacationModal";
import SickLeaveModal from "./SickLeaveModal";
import FloatingButton from "../FloatingButton";
import "./popup.css";
import { useQuery,useQueryClient } from "@tanstack/react-query";
import EmployeesChildren from "./EmployeesChildren";
import WeddingModal from "./WeddingModal";
import EngagementModal from "./EngagementModal";
import WeddingAnniversaryModal from "./WeddingAnniversaryModal";

export default function CreateEmployeeEvent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("eventSelection");
  const [currentEventType, setCurrentEventType] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient(); // Add this at the top


  const [selectedStartDate, setSelectedStartDate] = useState(null);

  const { data: employees, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const events = [
    { id: 1, name: "Vacation Leave", type: "vacation" },
    { id: 2, name: "Sick Leave", type: "sickLeave" },
    { id: 3, name: "Children of Employees", type: "childrenOfWorkers" },
    { id: 4, name: "Wedding", type: "wedding" },
    { id: 5, name: "Engagement", type: "engagement" },
    { id: 6, name: "Wedding Anniversary", type: "weddingAnniversary" },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  }
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
    setSelectedEmployee(employee); // Select the employee from the list
    setCurrentPage("dateSelection");
  };

  // Filter employees based on search query
  const filteredEmployees = employees?.filter((employee) =>
    employee.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Limit to 12 employees and paginate them (4 per row)
  const employeesPerPage = 12;
  const startIndex = (page - 1) * employeesPerPage;
  const displayedEmployees = filteredEmployees?.slice(
    startIndex,
    startIndex + employeesPerPage
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset to first page on search change
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Function to refresh family members for the selected employee
  const refreshFamilyMembers = (newMember) => {
    setSelectedEmployee((prevEmployee) => ({
      ...prevEmployee,
      familyMembers: [...(prevEmployee.familyMembers || []), newMember], // Add the new member
    }));
  };

  return (
    <div>
      <FloatingButton onClick={openModal} />

      <Modal
        backdrop="static"
        keyboard={false}
        centered
        show={isModalOpen}
        onHide={closeModal}
        className="modelsize"
      >
        <button onClick={closeModal} className="buttonXStyle">
          X
        </button>

        {currentPage === "eventSelection" && (
          <div className="button-container">
            <h1>Please choose type of event</h1>
            <br />
            {events.map((event) => (
              <div className="button-wrapper" key={event.id}>
                <button onClick={() => handleEventClick(event.type)}>
                  {event.name}
                </button>
              </div>
            ))}
          </div>
        )}

        {currentPage === "employeeSelection" && (
          <div>
            <input
              className="search-input"
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by Name"
            />
            {isLoading && <p>Loading employees...</p>}
            {!isLoading && filteredEmployees && (
              <div className="employee-list">
                {displayedEmployees.map((employee) => (
                  <div
                    key={employee.id}
                    className="employee-names"
                    onClick={() => handleEmployeeClick(employee)}
                  >
                    <img
                      src={
                        employee.avatar ||
                        "https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg"
                      }
                      alt={`${employee.fullName}'s avatar`}
                    />{" "}
                    <p>{employee.fullName}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="pagination">
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page * employeesPerPage >= filteredEmployees.length}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentPage === "dateSelection" &&
          currentEventType === "vacation" && (
            <VacationModal
              employeeName={selectedEmployee?.fullName}
              closeModal={closeModal}
              selectedEmployee={selectedEmployee}
            />
          )}

        {currentPage === "dateSelection" &&
          currentEventType === "sickLeave" && (
            <SickLeaveModal
              employeeName={selectedEmployee?.fullName}
              closeModal={closeModal}
              selectedEmployee={selectedEmployee}
            />
          )}

        {currentPage === "dateSelection" &&
          currentEventType === "wedding" && (
            <WeddingModal
              selectedEmployee={selectedEmployee}
              selectedWeddingDate={selectedStartDate}
              setSelectedWeddingDate={setSelectedStartDate}
              closeModal={closeModal}
            />
          )}

        {currentPage === "dateSelection" &&
          currentEventType === "engagement" && (
            <EngagementModal
              selectedEmployee={selectedEmployee}
              selectedEngagementDate={selectedStartDate}
              setSelectedEngagementDate={setSelectedStartDate}
              closeModal={closeModal}
            />
          )}

        {currentPage === "dateSelection" &&
          currentEventType === "weddingAnniversary" && (
            <WeddingAnniversaryModal
              selectedEmployee={selectedEmployee}
              selectedAnniversaryDate={selectedStartDate}
              setSelectedAnniversaryDate={setSelectedStartDate}
              closeModal={closeModal}
            />
          )}

        {currentPage === "dateSelection" &&
          currentEventType === "childrenOfWorkers" && (
            <EmployeesChildren
              employeeName={selectedEmployee.fullName}
              familyMembers={selectedEmployee.familyMembers}
              selectedEmployee={selectedEmployee}
              setCurrentPage={setCurrentPage}
              refreshFamilyMembers={refreshFamilyMembers} // Pass the refresh function
            />
          )}
      </Modal>
    </div>
  );
}