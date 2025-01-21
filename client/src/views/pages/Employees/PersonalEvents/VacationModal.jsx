import React, { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import Select from "react-select";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

const VacationModal = ({
  employeeName,
  selectedStartDate,
  selectedEndDate,
  selectedPurpose,
  selectedCountry,
  setSelectedStartDate,
  setSelectedEndDate,
  setSelectedPurpose,
  setSelectedCountry,
  updateVacation,
}) => {
  const [countryOptions, setCountryOptions] = useState([]);

  // Fetch countries dynamically when the component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countries = response.data.map((country) => ({
          value: country.cca2, // Use the country code (alpha-2)
          label: country.name.common, // Common name of the country
        }));

        // Sort countries alphabetically by country name
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

  return (
    <div className="sub-modal">
      <h2>{employeeName}</h2>
      <div
        style={{
          width: "800px",
          height: "500px",
          padding: "20px",
          textAlign: "center",
        }}
      >
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
                  : "3px solid #ccc", // Adding thickness to the border
              cursor: "pointer",
              width: "150px",
              textAlign: "center",
              transition: "border 0.3s ease", // Smooth transition effect for border change
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
                  : "3px solid #ccc", // Adding thickness to the border
              cursor: "pointer",
              width: "150px",
              textAlign: "center",
              transition: "border 0.3s ease", // Smooth transition effect for border change
            }}
          >
            Pleasure
          </div>
        </div>

        <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>When?</h2>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          <div style={{ width: "250px" }}>
            <ReactDatePicker
              selected={selectedStartDate}
              onChange={handleStartDateChange}
              dateFormat="yyyy/MM/dd" // Only display date without time
              minDate={new Date()} // Prevent selecting past dates
              className='form-control form-control-solid w-250px '
              placeholderText="Start Date"
            />
          </div>
          <div style={{ width: "250px" }}>
            <ReactDatePicker
              selected={selectedEndDate}
              onChange={handleEndDateChange}
              dateFormat="yyyy/MM/dd" // Only display date without time
              minDate={selectedStartDate} // Ensure end date is not before start date
              className='form-control form-control-solid w-250px '
              placeholderText="End Date"
            />
          </div>
        </div>

        <h2 style={{ marginTop: "30px", marginBottom: "10px" }}>Where to?</h2>
        <Select
          options={countryOptions} // Use the sorted list of countries
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

        <button
          onClick={() => {
            updateVacation(selectedStartDate, selectedEndDate);
          }}
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
      </div>
    </div>
  );
};

export default VacationModal;
