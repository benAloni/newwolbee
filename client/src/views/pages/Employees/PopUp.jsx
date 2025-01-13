import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import women from "../../../imgs/WomanEvent.png";
import family from "../../../imgs/FamilyEvent.png";
import freinds from "../../../imgs/FreindsEvent.png";
import arrows from "../../../imgs/arrows.png";
import workhome from "../../../imgs/workhome.png";
import additionalTime from "../../../imgs/additionalTime.png";
import finance from "../../../imgs/finance.png";
import Celebratory from "../../../imgs/Celebratory.png";
import gift from "../../../imgs/gift.png";
import Sharing from "../../../imgs/Sharing.png";
import rings from "../../../imgs/rings.png";
import sick from "../../../imgs/sick.png";
import baby from "../../../imgs/baby.png";
import house from "../../../imgs/house.png";
import flight from "../../../imgs/flight.png";
import chase from "../../../imgs/chase.png";
import Temporary from "../../../imgs/Temporary.png";
import vacation from "../../../imgs/off.png";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import "./popup.css";
import { updateEmployeeChildCareIssues } from "../../../services/api/employees";
import {
  updateEmployeeVacation,
  fetchEmployees,
  fetchEmployeesProfilePics,
  updateEmployeeSickLeave,
  

} from "../../../services";
import { userProfile } from "../../../imgs";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { updateChildCareIssues } from "../../../services/api/employees";

export default function PopUp() {

  const [isOpen, setIsOpen] = useState(false);
  const [currentEventType, setCurrentEventType] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEngagementModal, setShowEngagementModal] = useState(false);
  const [showVacationModal, setShowVacationModal] = useState(false);
  const [showSickLeaveModal, setShowSickLeaveModal] = useState(false);
  const [selectedPurposeOfTrip, setSelectedPurposeOfTrip] = useState("");
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showChildcareIssues, setShowChildcareIssues] = useState(false);
  const [showModal, setShowModal] = useState(false);
 
const [childName, setChildName] = useState(""); // שם הילד (לא חובה)
  const queryClient = useQueryClient();
  const uid = useSelector((state) => state.auth?.user.uid);

  const getEmployees = async () => {
    let employeesWithProfilePics;
    try {
      const employees = await fetchEmployees();

      employeesWithProfilePics = await Promise.all(
        employees?.map(async (employee) => {
          const profilePicUrl = await fetchEmployeesProfilePics(
            uid,
            employee.employeeId
          );
          return {
            ...employee,
            avatar: profilePicUrl || userProfile,
          };
        })
      );
      // queryClient.setQueryData(["employees", uid], employeesWithProfilePics);
      return employeesWithProfilePics;
    } catch (error) {
      console.log("Error getting employees :", error);
    }
  };
  const { data: employees } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
    staleTime: 0,
    refetchInterval: 0,
    refetchOnWindowFocus: true,
  });

  const europeanCountries = [
    { value: "albania", label: "Albania" },
    { value: "andorra", label: "Andorra" },
    { value: "armenia", label: "Armenia" },
    { value: "austria", label: "Austria" },
    { value: "azerbaijan", label: "Azerbaijan" },
    { value: "belgium", label: "Belgium" },
    { value: "bosnia", label: "Bosnia and Herzegovina" },
    { value: "bulgaria", label: "Bulgaria" },
    { value: "croatia", label: "Croatia" },
    { value: "cyprus", label: "Cyprus" },
    { value: "czech-republic", label: "Czech Republic" },
    { value: "denmark", label: "Denmark" },
    { value: "estonia", label: "Estonia" },
    { value: "finland", label: "Finland" },
    { value: "france", label: "France" },
    { value: "georgia", label: "Georgia" },
    { value: "germany", label: "Germany" },
    { value: "greece", label: "Greece" },
    { value: "hungary", label: "Hungary" },
    { value: "iceland", label: "Iceland" },
    { value: "ireland", label: "Ireland" },
    { value: "israel", label: "israel" },
    { value: "italy", label: "Italy" },
    { value: "kazakhstan", label: "Kazakhstan" },
    { value: "kosovo", label: "Kosovo" },
    { value: "latvia", label: "Latvia" },
    { value: "liechtenstein", label: "Liechtenstein" },
    { value: "lithuania", label: "Lithuania" },
    { value: "luxembourg", label: "Luxembourg" },
    { value: "malta", label: "Malta" },
    { value: "moldova", label: "Moldova" },
    { value: "monaco", label: "Monaco" },
    { value: "montenegro", label: "Montenegro" },
    { value: "netherlands", label: "Netherlands" },
    { value: "north-macedonia", label: "North Macedonia" },
    { value: "norway", label: "Norway" },
    { value: "poland", label: "Poland" },
    { value: "portugal", label: "Portugal" },
    { value: "romania", label: "Romania" },
    { value: "san-marino", label: "San Marino" },
    { value: "serbia", label: "Serbia" },
    { value: "slovakia", label: "Slovakia" },
    { value: "slovenia", label: "Slovenia" },
    { value: "spain", label: "Spain" },
    { value: "sweden", label: "Sweden" },
    { value: "switzerland", label: "Switzerland" },
    { value: "turkey", label: "Turkey" },
    { value: "ukraine", label: "Ukraine" },
    { value: "vatican", label: "Vatican City" },
  ];

  const events = [
    {
      id: 1,
      name: "Engagement",
      imageUrl: rings,
      onClick: () => openSubModal("Engagement"),
    },
    {
      id: 2,
      name: "Sick leave",
      imageUrl: sick,
      onClick: () => openSubModal("Sick Leave"),
    },
    {
      id: 3,
      name: "Vacation Leave",
      imageUrl: vacation,
      onClick: () => openSubModal("Vacation Leave"),
    },
     { id: 5, 
      name: "Childcare Issues", 
      imageUrl: chase, 
      onClick: () => openSubModal("Childcare Issues")
    },

    { id: 4, name: "Personal Celebrations", imageUrl: gift, onClick: null },
   
    { id: 6, name: "Pregnancy", imageUrl: baby, onClick: null },
    { id: 7, name: "Housing Issues", imageUrl: house, onClick: null },
    { id: 8, name: "Flight", imageUrl: flight, onClick: null },
  ];

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setCurrentEventType(null);
    setSelectedEmployee(null);
    setShowEngagementModal(false);
    setShowVacationModal(false);
    setShowChildcareIssues(false)
  };

  const openSubModal = (eventType) => {
    setCurrentEventType(eventType);
    setShowEngagementModal(false);
    setShowVacationModal(false);
    setShowChildcareIssues(false)
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    if (currentEventType === "Vacation Leave") {
      setShowVacationModal(true);
    } else if (currentEventType === "Engagement") {
      setShowEngagementModal(true);
    } else if (currentEventType === "Sick Leave") {
      setShowSickLeaveModal(true);        
    } else if (currentEventType === "Childcare Issues") {
      setShowChildcareIssues(true);        
    }

  };
  const handleDateClick = () => {
    setShowStartDatePicker(!showStartDatePicker);
  };
  // ___
  const handleEndDateClick = () => {
    setShowEndDatePicker(!showEndDatePicker);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleDateChange = (date) => {
    setSelectedStartDate(date);
    setShowStartDatePicker(false); // Close the date picker after selection
  };

  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
    setShowEndDatePicker(false); // Close the date picker after selection
  };

  const formatStartDate = (date) => {
    if (!date) return "Choose Start date";
    return date.toLocaleDateString("he-IL"); // Format date in Hebrew format
  };

  const formatEndDate = (date) => {
    if (!date) return "Choose End date";
    return date.toLocaleDateString("he-IL"); // Format date in Hebrew format
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const updateVacation = async () => {
    if (
      !selectedEmployee ||
      !selectedPurposeOfTrip ||
      !selectedStartDate ||
      !selectedEndDate
    ) {
      console.log("Missing required data");
      return;
    }
    try {
      const response = await updateEmployeeVacation({
        id: selectedEmployee,
        purposeOfTrip: selectedPurposeOfTrip,
        destination: selectedCountry.label,
        startDate: selectedStartDate,
        endDate: selectedEndDate,
      });

      if (response.status === 200) {
        Swal.fire(
          "Success!",
          `${selectedEmployee.fullName}'s vacation has been added to your calendar successfully`,
          "success"
        );
      }
    } catch (error) {
      console.log("Error updating vacation:", error);
      alert(`Error: ${error.message}`);
      throw error;
    }
  };
  const updateSickLeave = async () => {
    if (
      !selectedEmployee ||
      !selectedStartDate ||
      !selectedEndDate
    ) {
      console.log("Missing required data");
      return;
    }
    try {
      const response = await updateEmployeeSickLeave({
        id: selectedEmployee._id,
        startDate: selectedStartDate,
        endDate: selectedEndDate,
      });

      if (response.status === 200) {
        Swal.fire(
          "Success!",
          `${selectedEmployee.fullName}'s sick leave dates had been added to your calendar successfully`,
          "success"
        );
      }
    } catch (error) {
      console.log("Error updating vacation:", error);
      alert(`Error: ${error.message}`);
      throw error;
    }
  }

  const updateChildCareIssues = async () => {
    // בדיקת נתונים
    if (
      !selectedEmployee ||
      !selectedStartDate ||
      !selectedEndDate
    ) {
      console.log("Missing required data");
      Swal.fire("Error", "Please fill in all required fields.", "error");
      return;
    }
  
    try {
      // קריאה לפונקציה שמעדכנת את הנתונים (בלי שם הילד)
      const response = await updateEmployeeChildCareIssues({
        id: selectedEmployee._id,
        startDate: selectedStartDate,
        endDate: selectedEndDate,
      });
  
      // בדיקת סטטוס התגובה
      if (response.status === 200) {
        Swal.fire(
          "Success!",
          `${selectedEmployee.fullName}'s childcare dates have been added successfully!`,
          "success"
        );
      }
    } catch (error) {
      console.log("Error updating childcare issues:", error);
      Swal.fire("Error", `An error occurred: ${error.message}`, "error");
    }
  };
  
  
  
 
  const h1style = {
    textAlign: "center",
    marginBottom: "20px",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    display: showModal ? "flex" : "none",
    alignItems: "center",
    justifyContent: "center",
    opacity: showModal ? 1 : 0,
    transition: "opacity 0.3s ease",
  };

  const modalContentStyle = {
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "white",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    transform: showModal ? "translateY(0)" : "translateY(-50px)",
    opacity: showModal ? 1 : 0,
    transition: "transform 0.3s ease, opacity 0.3s ease",
    textAlign: "center",
  };
  return (
    <div className="App">
      <style>
        {`.modal {
      display: ${isOpen ? "block" : "none"};
      position: f;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0, 0, 0, 0.4);
   }`}
      </style>
      <div className="floatingButton" onClick={openModal}>
        +
      </div>
      {/* Choose event modal */}
      <div className={`modal ${isOpen ? "open" : ""}`}>
        <div className="modal-content">
          <h1 style={h1style}>Please choose type of event</h1>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <div
            className="button-container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "20px",
            }}
          >
            {events.map((event) => (
              <button
                key={event.id}
                className="eventButton"
                onClick={event.onClick}
                style={{
                  width: "150px",
                  height: "150px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  cursor: event.onClick ? "pointer" : "default",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <img
                  src={event.imageUrl}
                  alt={event.name}
                  style={{
                    marginBottom: "10px",
                    width: "80px",
                    height: "80px",
                  }}
                />
                <span style={h1style}>{event.name}</span>
              </button>
            ))}
          </div>
          {/* Choose employee modal */}
          {currentEventType && (
            <div className="sub-modal">
              <h2 style={h1style}>{currentEventType}</h2>
              <br />
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <p className="d-flex justify-content-center align-items-center">
                Please choose an employee
              </p>
              <div
                className="button-container"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "20px",
                  height: "500px",
                }}
              >
                {employees?.map((employee) => (
                  <div
                    key={employee.employeeId}
                    onClick={() => handleEmployeeClick(employee)}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="eventButton"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        backgroundColor: "#f9f9f9",
                        height: "50%",
                      }}
                    >
                      <div
                        className="profile-img"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "70%",
                        }}
                      >
                        <img
                          src={employee.avatar}
                          alt={employee.fullName}
                          style={{
                            marginBottom: "10px",
                            width: "70px",
                            height: "70px",
                            borderRadius: "50%",
                          }}
                        />{" "}
                      </div>
                      <span style={{ fontWeight: "bold", marginBottom: "5px" }}>
                        {employee.fullName}
                      </span>
                      <span style={{ fontSize: "12px", color: "#666" }}>
                        {employee.role}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Employee details modal */}
          {showEngagementModal && selectedEmployee && (
            <div className="sub-modal">
              <span
                className="close"
                onClick={() => setShowEngagementModal(false)}
              >
                &times;
              </span>
              <h2 style={h1style}>{selectedEmployee.fullName} Engagement</h2>

              {/* <img src={selectedEmployee.image} alt={selectedEmployee.name} style={{ width: '100px', borderRadius: '50%' }} /> */}

              <p className="engagement-text">
                The journey from engagement through the wedding and into the
                first years of marriage is a significant period in Noah’s life.
                As a manager, you have a critical role in supporting him during
                this transformative time, and doing so can yield substantial
                benefits for both Noah and the company.
              </p>

              <p className="engagement-text">
                From engagement onward, Noah will juggle wedding planning with
                work responsibilities, often leading to stress. By offering
                understanding and flexibility, you can help him manage stress
                and navigate his work commitments effectively.
              </p>

              <p className="engagement-text" style={{ fontWeight: "bold" }}>
                Don't wait for Noah to come to you. Proactively reach out,
                initiate a conversation, and work together to decide how best to
                support him during this time.
              </p>

              <div className="square-buttons-container">
                {Array(1)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className="square-button">
                      <img
                        src={arrows}
                        alt="Icon"
                        className="square-button-image"
                      />
                      <p style={{ fontWeight: "bold" }}>Flexible Work Hours</p>
                      <p
                        className="square-button-text"
                        style={{ fontSize: "12px" }}
                      >
                        Allow flexibility in Noah's schedule to attend
                        appointments, meet vendor and manage other tasks
                      </p>
                    </div>
                  ))}
                {/* _____ */}
                {Array(1)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className="square-button">
                      <img
                        src={workhome}
                        alt="Icon"
                        className="square-button-image"
                      />
                      <p style={{ fontWeight: "bold" }}>Remote Work Options</p>
                      <p
                        className="square-button-text"
                        style={{ fontSize: "12px" }}
                      >
                        Remote Work Options: Offer Noah the option to work from
                        home when needed
                      </p>
                    </div>
                  ))}
                {Array(1)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className="square-button">
                      <img
                        src={additionalTime}
                        alt="Icon"
                        className="square-button-image"
                      />
                      <p style={{ fontWeight: "bold" }}>Additional Time Off</p>
                      <p
                        className="square-button-text"
                        style={{ fontSize: "12px" }}
                      >
                        Provide extra leave days specifically for Noah’s wedding
                        preparation
                      </p>
                    </div>
                  ))}
                {Array(1)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className="square-button">
                      <img
                        src={finance}
                        alt="Icon"
                        className="square-button-image"
                      />
                      <p style={{ fontWeight: "bold" }}>
                        Financial Planning Assistance
                      </p>
                      <p
                        className="square-button-text"
                        style={{ fontSize: "12px" }}
                      >
                        Discussions about financial planning and benefits
                        related to marriage and offer Noah financial planning
                        workshops
                      </p>
                    </div>
                  ))}
                {Array(1)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className="square-button">
                      <img
                        src={Celebratory}
                        alt="Icon"
                        className="square-button-image"
                      />
                      <p style={{ fontWeight: "bold" }}>Celebratory Gestures</p>
                      <p
                        className="square-button-text"
                        style={{ fontSize: "12px" }}
                      >
                        Celebrate Noah’s engagement with a congratulatory email
                        or a small office celebration
                      </p>
                    </div>
                  ))}
                {Array(1)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className="square-button">
                      <img
                        src={gift}
                        alt="Icon"
                        className="square-button-image"
                      />
                      <p style={{ fontWeight: "bold" }}>Engagement Gift</p>
                      <p
                        className="square-button-text"
                        style={{ fontSize: "12px" }}
                      >
                        Celebrate Noah’s engagement with a small gift, showing
                        that the company values his personal milestones
                      </p>
                    </div>
                  ))}
                {Array(1)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className="square-button">
                      <img
                        src={finance}
                        alt="Icon"
                        className="square-button-image"
                      />
                      <p style={{ fontWeight: "bold" }}>Career Planning</p>
                      <p
                        className="square-button-text"
                        style={{ fontSize: "12px" }}
                      >
                        : Discuss career opportunities with Noah and how these
                        can contribute to his long-term goals
                      </p>
                    </div>
                  ))}
                {Array(1)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className="square-button">
                      <img
                        src={Temporary}
                        alt="Icon"
                        className="square-button-image"
                      />
                      <p style={{ fontWeight: "bold" }}>
                        Temporary Role Adjustments
                      </p>
                      <p
                        className="square-button-text"
                        style={{ fontSize: "12px" }}
                      >
                        Consider temporary adjustments to Noah’s role or
                        responsibilities to reduce workload and stress
                      </p>
                    </div>
                  ))}
                {Array(1)
                  .fill()
                  .map((_, index) => (
                    <div key={index} className="square-button">
                      <img
                        src={Sharing}
                        alt="Icon"
                        className="square-button-image"
                      />
                      <p style={{ fontWeight: "bold" }}>Resource Sharing</p>
                      <p
                        className="square-button-text"
                        style={{ fontSize: "12px" }}
                      >
                        Invite team members to share recommendations, including
                        trusted vendors and helpful planning tools
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Vacation Modal */}
          {showVacationModal && (
            <div className="sub-modal">
              <h2>{selectedEmployee.name}</h2>
              <span
                className="close"
                onClick={() => setShowVacationModal(false)}
              >
                &times;
              </span>
              <div
                style={{
                  width: "800px",
                  height: "500px",
                  overflowY: "scroll",
                  padding: "20px",
                  border: "1px solid #ccc",
                  textAlign: "center",
                }}
              >
                <h2 style={{ marginBottom: "20px" }}>Purpose</h2>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    onClick={() => setSelectedPurposeOfTrip("business trip")}
                    style={{
                      padding: "20px",
                      borderRadius: "10px",
                      border: `2px solid ${
                        selectedPurposeOfTrip === "business trip"
                          ? "green"
                          : "#ccc"
                      }`,
                      cursor: "pointer",
                      width: "150px",
                      textAlign: "center",
                    }}
                  >
                    Business
                  </div>
                  <div
                    onClick={() => setSelectedPurposeOfTrip("pleasure")}
                    style={{
                      padding: "20px",
                      borderRadius: "10px",
                      border: `2px solid ${
                        selectedPurposeOfTrip === "pleasure" ? "green" : "#ccc"
                      }`,
                      cursor: "pointer",
                      width: "150px",
                      textAlign: "center",
                    }}
                  >
                    Pleasure
                  </div>
                </div>

                <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>
                  When?
                </h2>
                <button
                  onClick={handleDateClick}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                >
                  {formatStartDate(selectedStartDate)}
                </button>
                <br />
                <p>To</p>
                {/* <p>.</p>        */}

                <button
                  onClick={handleEndDateClick}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                >
                  {formatEndDate(selectedEndDate)}
                </button>
                {/* 
-------------- */}
                {showStartDatePicker && (
                  <div style={{ marginTop: "20px" }}>
                    <DatePicker
                      selected={selectedStartDate}
                      onChange={handleDateChange}
                      inline
                    />
                  </div>
                )}
                {/* ________________ */}
                {showEndDatePicker && (
                  <div style={{ marginTop: "20px" }}>
                    <DatePicker
                      selected={selectedEndDate}
                      onChange={handleEndDateChange}
                      inline
                    />
                  </div>
                )}
                <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>
                  Where to?
                </h2>
                <Select
                  options={europeanCountries}
                  value={selectedCountry}
                  onChange={(option) => setSelectedCountry(option)}
                  placeholder="Select a country"
                  isClearable
                  isSearchable
                  styles={{
                    container: (provided) => ({
                      ...provided,
                      margin: "0 auto",
                      maxWidth: "300px",
                    }),
                    control: (provided) => ({
                      ...provided,
                      borderRadius: "5px",
                      borderColor: "#ccc",
                      boxShadow: "none",
                      "&:hover": {
                        borderColor: "#aaa",
                      },
                    }),
                    menu: (provided) => ({
                      ...provided,
                      borderRadius: "5px",
                    }),
                  }}
                />
                <button
                  onClick={updateVacation}
                  style={{
                    marginTop: "30px",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Confirm
                </button>

                {showModal && (
                  <div style={overlayStyle}>
                    <div style={modalContentStyle}>
                      <h2>Event Registration Successful</h2>
                      <p>
                        <strong>Purpose:</strong>{" "}
                        {selectedPurposeOfTrip === "business"
                          ? "Business"
                          : selectedPurposeOfTrip === "pleasure"
                          ? "Pleasure"
                          : "No reason selected"}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {formatStartDate(selectedStartDate)}
                      </p>
                      <p>
                        <strong>Date:</strong> {formatEndDate(selectedEndDate)}
                      </p>
                      <p>
                        <strong>Country:</strong>{" "}
                        {selectedCountry
                          ? selectedCountry.label
                          : "No country selected"}
                      </p>
                      <button
                        onClick={handleCloseModal}
                        style={{
                          marginTop: "20px",
                          padding: "10px 20px",
                          borderRadius: "5px",
                          border: "1px solid #ccc",
                          backgroundColor: "#f44336",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Sick Leave Modal  */}
          {showSickLeaveModal && (
            <div className="sub-modal">
              <span
                className="close"
                onClick={() => setShowSickLeaveModal(false)}
              >
                &times;
              </span>
              <div
                style={{
                  width: "800px",
                  height: "500px",
                  overflowY: "scroll",
                  padding: "20px",
                  border: "1px solid #ccc",
                  textAlign: "center",
                }}
              >
                <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>
                  {`Set ${selectedEmployee.fullName}'s sick leave dates`}
                </h2>
                <button
                  onClick={handleDateClick}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                >
                  {formatStartDate(selectedStartDate)}
                </button>
                <br />
                <p>Until</p>
                <button
                  onClick={handleEndDateClick}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                >
                  {formatEndDate(selectedEndDate)}
                </button>
                {}
                {showStartDatePicker && (
                  <div style={{ marginTop: "20px" }}>
                    <DatePicker
                      selected={selectedStartDate}
                      onChange={handleDateChange}
                      inline
                    />
                  </div>
                )}

                {showEndDatePicker && (
                  <div style={{ marginTop: "20px" }}>
                    <DatePicker
                      selected={selectedEndDate}
                      onChange={handleEndDateChange}
                      inline
                    />
                  </div>
                )}
                <button
                  onClick={updateSickLeave}
                  style={{
                    marginTop: "30px",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  confirm
                </button>
              </div>
            </div>
          )}

{/* child care  */}
{showChildcareIssues && (
  <div className="sub-modal">
    <h2>{selectedEmployee.name}</h2>
    <span
      className="close"
      onClick={() => setShowChildcareIssues(false)}
    >
      &times;
    </span>
    <div
      style={{
        width: "800px",
        height: "500px",
        overflowY: "scroll",
        padding: "20px",
        border: "1px solid #ccc",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Child Care Issue</h2>
      <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>When?</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <div>
          <label>From:</label>
          <DatePicker
            selected={selectedStartDate}
            onChange={handleDateChange}
            placeholderText="Select start date"
          />
        </div>
        <div>
          <label>To:</label>
          <DatePicker
            selected={selectedEndDate}
            onChange={handleEndDateChange}
            placeholderText="Select end date"
          />
        </div>
      </div>

      <button
        onClick={updateChildCareIssues}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          backgroundColor: "#4CAF50",
          color: "white",
          cursor: "pointer",
        }}
      >
        Confirm
      </button>

      {showModal && (
        <div style={overlayStyle}>
          <div style={modalContentStyle}>
            <h2>Event Registration Successful</h2>
            <p>
              <strong>From:</strong> {formatStartDate(selectedStartDate)}
            </p>
            <p>
              <strong>To:</strong> {formatEndDate(selectedEndDate)}
            </p>
            <button
              onClick={handleCloseModal}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                backgroundColor: "#f44336",
                color: "white",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  </div>
)}


        </div>
      </div>
    </div>
  );
}
