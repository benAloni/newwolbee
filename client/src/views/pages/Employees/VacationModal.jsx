import React from 'react';
import DatePickerWrapper from './DatePickerWrapper';
import Select from 'react-select';

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
  const countryOptions = [
    { value: 'USA', label: 'United States' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'FR', label: 'France' },
    { value: 'DE', label: 'Germany' },
    // Add more countries as needed
  ];

  return (
    <div className="sub-modal">
      <h2>{employeeName}</h2>
      <div
        style={{
          width: '800px',
          height: '500px',
          overflowY: 'scroll',
          padding: '20px',
          border: '1px solid #ccc',
          textAlign: 'center',
        }}
      >
        <h2 style={{ marginBottom: '20px' }}>Purpose</h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
          }}
        >
          <div
            onClick={() => setSelectedPurpose('business trip')}
            style={{
              padding: '20px',
              borderRadius: '10px',
              border: `2px solid ${
                selectedPurpose === 'business trip' ? 'green' : '#ccc'
              }`,
              cursor: 'pointer',
              width: '150px',
              textAlign: 'center',
            }}
          >
            Business
          </div>
          <div
            onClick={() => setSelectedPurpose('pleasure')}
            style={{
              padding: '20px',
              borderRadius: '10px',
              border: `2px solid ${
                selectedPurpose === 'pleasure' ? 'green' : '#ccc'
              }`,
              cursor: 'pointer',
              width: '150px',
              textAlign: 'center',
            }}
          >
            Pleasure
          </div>
        </div>

        <h2 style={{ marginTop: '30px', marginBottom: '10px' }}>When?</h2>
        <DatePickerWrapper
          selectedDate={selectedStartDate}
          onChange={setSelectedStartDate}
          label="Start Date"
        />
        <p>To</p>
        <DatePickerWrapper
          selectedDate={selectedEndDate}
          onChange={setSelectedEndDate}
          label="End Date"
        />

        <h2 style={{ marginTop: '30px', marginBottom: '10px' }}>Where to?</h2>
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
              margin: '0 auto',
              maxWidth: '300px',
            }),
            control: (provided) => ({
              ...provided,
              borderRadius: '5px',
              borderColor: '#ccc',
              boxShadow: 'none',
              '&:hover': {
                borderColor: '#aaa',
              },
            }),
            menu: (provided) => ({
              ...provided,
              borderRadius: '5px',
            }),
          }}
        />

        <button
          onClick={updateVacation}
          style={{
            marginTop: '30px',
            padding: '10px 20px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            backgroundColor: '#4CAF50',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default VacationModal;
