import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import Select from "react-select";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { useUpdateVacation } from "../../../../services/api/useUpdateEvent";

const VacationModal = ({ employeeName, closeModal, selectedEmployee }) => {
  const [countryOptions, setCountryOptions] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const { updateVacation } = useUpdateVacation();

  const [showModal, setShowModal] = useState(true); // Modal visibility state

  // Fetch countries dynamically when the component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countries = response.data.map((country) => ({
          value: country.cca2, // Use the country code (alpha-2)
          label: country.name.common, // Common name of the country
        }));

        const sortedCountries = countries.sort((a, b) =>
          a.label.localeCompare(b.label)
        );

        setCountryOptions(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  // Handle start date change
  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  // Handle end date change
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
  };

  // Handle purpose selection
  const handlePurposeSelection = (purpose) => {
    setSelectedPurpose(purpose);
  };

  const handleSubmit = async () => {
    try {
      await updateVacation(
        selectedEmployee,
        selectedPurpose,
        selectedCountry,
        selectedStartDate,
        selectedEndDate
      );

      // Reset the form data after submission
      setSelectedStartDate(null);
      setSelectedEndDate(null);
      setSelectedPurpose(null);
      setSelectedCountry(null);
      closeModal();
    } catch (error) {
      console.error("Error updating vacation:", error);
    }
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    closeModal();
  };

  return (
    <Modal
      backdrop="static"
      keyboard={false}
      centered
      show={showModal}
      onHide={handleCloseModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Vacation for {selectedEmployee.fullName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>Where to?</h2>
          <Select
            options={countryOptions}
            value={selectedCountry}
            onChange={setSelectedCountry}
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

          <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>When?</h2>
          <div
            style={{ display: "flex", gap: "10px", justifyContent: "center" }}
          >
            <div style={{ width: "250px" }}>
              <ReactDatePicker
                selected={selectedStartDate}
                onChange={handleStartDateChange}
                dateFormat="yyyy/MM/dd"
                minDate={new Date()}
                className="form-control form-control-solid w-250px "
                placeholderText="Start Date"
              />
            </div>
            <div style={{ width: "250px" }}>
              <ReactDatePicker
                selected={selectedEndDate}
                onChange={handleEndDateChange}
                dateFormat="yyyy/MM/dd"
                minDate={selectedStartDate}
                className="form-control form-control-solid w-250px "
                placeholderText="End Date"
              />
            </div>
          </div>
          <br />
          <h2 style={{ marginBottom: "20px" }}>Purpose</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              flexWrap: "wrap",
            }}
          >
            <div
              onClick={() => handlePurposeSelection("business trip")}
              style={{
                padding: "20px",
                borderRadius: "10px",
                border:
                  selectedPurpose === "business trip"
                    ? "3px solid green"
                    : "3px solid #ccc",
                cursor: "pointer",
                width: "150px",
                textAlign: "center",
                transition: "border 0.3s ease",
              }}
            >
              Business
            </div>
            <div
              onClick={() => handlePurposeSelection("pleasure")}
              style={{
                padding: "20px",
                borderRadius: "10px",
                border:
                  selectedPurpose === "pleasure"
                    ? "3px solid green"
                    : "3px solid #ccc",
                cursor: "pointer",
                width: "150px",
                textAlign: "center",
                transition: "border 0.3s ease",
              }}
            >
              Pleasure
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Event
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VacationModal;
