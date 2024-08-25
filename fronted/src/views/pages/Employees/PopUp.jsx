import React, { useState } from 'react';
import { Avatar_01, Avatar_02, Avatar_03 } from '../../../Routes/ImagePath';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import women from '../../../imgs/WomanEvent.png';
import family from '../../../imgs/FamilyEvent.png';
import freinds from '../../../imgs/FreindsEvent.png';
import giftoff from '../../../imgs/giftoff.png';
import workhome from '../../../imgs/workhome.png';
import additionalTime from '../../../imgs/additionalTime.png';
import finance from '../../../imgs/finance.png';
import Celebratory from '../../../imgs/Celebratory.png';
import gift from '../../../imgs/gift.png';
import Sharing from '../../../imgs/Sharing.png';

import Temporary from '../../../imgs/Temporary.png';


export default function PopUp() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentEventType, setCurrentEventType] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const europeanCountries = [
    { value: 'albania', label: 'Albania' },
    { value: 'andorra', label: 'Andorra' },
    { value: 'armenia', label: 'Armenia' },
    { value: 'austria', label: 'Austria' },
    { value: 'azerbaijan', label: 'Azerbaijan' },
    { value: 'belgium', label: 'Belgium' },
    { value: 'bosnia', label: 'Bosnia and Herzegovina' },
    { value: 'bulgaria', label: 'Bulgaria' },
    { value: 'croatia', label: 'Croatia' },
    { value: 'cyprus', label: 'Cyprus' },
    { value: 'czech-republic', label: 'Czech Republic' },
    { value: 'denmark', label: 'Denmark' },
    { value: 'estonia', label: 'Estonia' },
    { value: 'finland', label: 'Finland' },
    { value: 'france', label: 'France' },
    { value: 'georgia', label: 'Georgia' },
    { value: 'germany', label: 'Germany' },
    { value: 'greece', label: 'Greece' },
    { value: 'hungary', label: 'Hungary' },
    { value: 'iceland', label: 'Iceland' },
    { value: 'ireland', label: 'Ireland' },
    { value: 'israel', label: 'israel' },
    { value: 'italy', label: 'Italy' },
    { value: 'kazakhstan', label: 'Kazakhstan' },
    { value: 'kosovo', label: 'Kosovo' },
    { value: 'latvia', label: 'Latvia' },
    { value: 'liechtenstein', label: 'Liechtenstein' },
    { value: 'lithuania', label: 'Lithuania' },
    { value: 'luxembourg', label: 'Luxembourg' },
    { value: 'malta', label: 'Malta' },
    { value: 'moldova', label: 'Moldova' },
    { value: 'monaco', label: 'Monaco' },
    { value: 'montenegro', label: 'Montenegro' },
    { value: 'netherlands', label: 'Netherlands' },
    { value: 'north-macedonia', label: 'North Macedonia' },
    { value: 'norway', label: 'Norway' },
    { value: 'poland', label: 'Poland' },
    { value: 'portugal', label: 'Portugal' },
    { value: 'romania', label: 'Romania' },
    { value: 'san-marino', label: 'San Marino' },
    { value: 'serbia', label: 'Serbia' },
    { value: 'slovakia', label: 'Slovakia' },
    { value: 'slovenia', label: 'Slovenia' },
    { value: 'spain', label: 'Spain' },
    { value: 'sweden', label: 'Sweden' },
    { value: 'switzerland', label: 'Switzerland' },
    { value: 'turkey', label: 'Turkey' },
    { value: 'ukraine', label: 'Ukraine' },
    { value: 'vatican', label: 'Vatican City' }
  ];

  const data = [
    { id: 1, image: Avatar_02, name: "John Doe", role: "Web Designer", jobtitle: "Web Designer", department: "Development" },
    { id: 2, image: Avatar_01, name: "Richard Miles", role: "Web Developer", jobtitle: "Web Developer", department: "Designing" },
    { id: 3, image: Avatar_03, name: "John Smith", role: "Android Developer", jobtitle: "Android Developer", department: "Android" },
    { id: 4, image: Avatar_03, name: "Ben Aloni", role: "Android Developer", jobtitle: "Android Developer", department: "Android" },
    { id: 5, image: Avatar_03, name: "Viki Haim Shimoni", role: "Android Developer", jobtitle: "Android Developer", department: "Android" },
    { id: 6, image: Avatar_03, name: "Ido Shimon", role: "Android Developer", jobtitle: "Android Developer", department: "Android" },
    { id: 7, image: Avatar_03, name: "Ofek Shimoni", role: "Android Developer", jobtitle: "Android Developer", department: "Android" },
    { id: 8, image: Avatar_03, name: "Matan Ben David", role: "Android Developer", jobtitle: "Android Developer", department: "Android" },
  ];

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setCurrentEventType(null);
    setSelectedEmployee(null);
    setShowEmployeeDetails(false);
    setShowNewModal(false);
  };

  const openSubModal = (eventType) => {
    setCurrentEventType(eventType);
    setShowEmployeeDetails(false);
    setShowNewModal(false);
  };

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    if (currentEventType === 'vacation') {
      setShowNewModal(true);
    } else if (currentEventType === 'engagement') {
      setShowEmployeeDetails(true);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleDateClick = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false); // Close the date picker after selection
  };

  const formatDate = (date) => {
    if (!date) return "Choose date";
    return date.toLocaleDateString('he-IL'); // Format date in Hebrew format
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
    display: showModal ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: showModal ? 1 : 0,
    transition: 'opacity 0.3s ease',
  };

  const modalContentStyle = {
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: 'white',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    transform: showModal ? 'translateY(0)' : 'translateY(-50px)',
    opacity: showModal ? 1 : 0,
    transition: 'transform 0.3s ease, opacity 0.3s ease',
    textAlign: 'center',
  };
  return (
    <div className="App">
      <style>
        {`
          .modal {
            display: ${isOpen ? 'block' : 'none'};
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.4);
          }

          .modal-content {
            position: relative;
            background-color: #ffffff;
            margin: 5% auto;
            padding: 40px;
            border: 1px solid #888;
            width: 90%;
            max-width: 900px;
            border-radius: 10px;
          }

          .close {
            position: absolute;
            top: 10px;
            right: 10px;
            color: #aaa;
            font-size: 32px;
            font-weight: bold;
            cursor: pointer;
          }

          .button-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 20px;
            margin-top: 20px;
          }

          .eventButton {
            padding: 20px;
            border-radius: 12px;
            border: 2px solid #ddd;
            background-color: #f0f0f0;
            color: #333;
            cursor: pointer;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s, transform 0.3s;
          }

          .eventButton:hover {
            background-color: #e0e0e0;
            transform: scale(1.05);
          }

          .sub-modal {
            display: block;
            position: fixed;
            z-index: 2;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 90%;
            max-width: 900px;
            background-color: #ffffff;
            padding: 30px;
            border: 1px solid #888;
            border-radius: 12px;
            overflow: auto;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .floatingButton {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: #FF902F;
            color: white;
            font-size: 36px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            border: none;
            z-index: 1000;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
          }

          @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          @keyframes slideOut {
            from { transform: translateY(0); opacity: 1; }
            to { transform: translateY(-50px); opacity: 0; }
          }
        `}
      </style>
      <div className="floatingButton" onClick={openModal}>
        +
      </div>
      <div className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <h1>Please choose type of event</h1>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <div className="button-container">
            <button className="eventButton" onClick={() => openSubModal('engagement')}>Engagement</button>
            <button className="eventButton" onClick={() => openSubModal('sickLeave')}>Sick leave</button>
            <button className="eventButton" onClick={() => openSubModal('vacation')}>Vacation</button>
            <button className="eventButton" onClick={() => openSubModal('renovation')}>Renovation</button>
            <button className="eventButton" onClick={() => openSubModal('pregnancy')}>Pregnancy</button>
            <button className="eventButton" onClick={() => openSubModal('anniversary')}>Anniversary</button>
            <button className="eventButton" onClick={() => openSubModal('carAccident')}>Car accident</button>
            <button className="eventButton" onClick={() => openSubModal('deathOfRelative')}>Death of a relative</button>
          </div>

          {/* Event modals */}
          {currentEventType && (
            <div className="sub-modal">
              <h2>{currentEventType.charAt(0).toUpperCase() + currentEventType.slice(1)}</h2>
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <div className="button-container">
                {data.map(employee => (
                  <div key={employee.id} onClick={() => handleEmployeeClick(employee)}>
                    <div className="eventButton">
                      {employee.name}<br/>
                      {employee.jobtitle}<br/>
                      {employee.id}<br/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Employee details modal */}
          {showEmployeeDetails && selectedEmployee && (
            <div className="sub-modal">
             

             <h2>{selectedEmployee.name}</h2>
              <span className="close" onClick={() => setShowEmployeeDetails(false)}>
                &times;
              </span>

              {/* <img src={selectedEmployee.image} alt={selectedEmployee.name} style={{ width: '100px', borderRadius: '50%' }} /> */}
              <p className="engagement-text">
                Engagement is a joyful and significant milestone in a couple's journey together. It marks the formal commitment of two individuals
                to marry and often involves a special proposal where one partner asks the other to spend their life together. This proposal is 
                usually accompanied by the giving of an engagement ring, symbolizing the promise of marriage.
                The engagement period is a time of excitement and anticipation, filled with planning and preparation for the upcoming wedding.
                During this time, couples may announce their engagement to family and friends, often celebrating with an engagement party.
                It is a period for building deeper connections, discussing future plans, and aligning life goals.
                Traditionally, engagements can vary in length, depending on personal preferences and cultural practices.
                Some may last a few months, while others can extend over several years. Regardless of the duration, 
                the engagement period is a special time for the couple to strengthen their bond and enjoy the prospect of their future life together.
                Engagements are celebrated differently around the world, with unique customs and traditions reflecting the rich diversity of cultures.
                From elaborate ceremonies to intimate gatherings, each engagement is a personal and meaningful expression of love and
              </p>
              <div className="square-buttons-container">
                {Array(1).fill().map((_, index) => (
                  <div key={index} className="square-button">
                    <img src={giftoff} alt="Icon" className="square-button-image" />
                    <p className="square-button-text" style={{fontSize:'12px'}}>Flexible Work Hours:

Allow flexibility in Noah's
schedule to attend
appointments, meet vendor
and manage other tasks</p>
                  </div>
                ))}
{/* _____ */}
{Array(1).fill().map((_, index) => (
                  <div key={index} className="square-button">
                    <img src={workhome} alt="Icon" className="square-button-image" />
                    <p className="square-button-text" style={{fontSize:'12px'}}>Remote Work Options:

Offer Noah the option to
work from home when
needed</p>
                  </div>
                ))}
                {Array(1).fill().map((_, index) => (
                  <div key={index} className="square-button">
                    <img src={additionalTime} alt="Icon" className="square-button-image" />
                    <p className="square-button-text" style={{fontSize:'12px'}}>Additional Time Off:
Provide extra leave days
specifically for Noah’s
wedding preparation</p>
                  </div>
                ))}
                {Array(1).fill().map((_, index) => (
                  <div key={index} className="square-button">
                    <img src={finance} alt="Icon" className="square-button-image" />
                    <p className="square-button-text" style={{fontSize:'12px'}}>Financial Planning Assistance:

Discussions about financial
planning and benefits related
to marriage and offer Noah
financial planning workshops</p>
                  </div>
                ))}
                {Array(1).fill().map((_, index) => (
                  <div key={index} className="square-button">
                    <img src={Celebratory} alt="Icon" className="square-button-image" />
                    <p className="square-button-text" style={{fontSize:'12px'}}>Celebratory Gestures:
Celebrate Noah’s
engagement with a
congratulatory email or a
small office celebration</p>
                  </div>
                ))}
                {Array(1).fill().map((_, index) => (
                  <div key={index} className="square-button">
                    <img src={gift} alt="Icon" className="square-button-image" />
                    <p className="square-button-text" style={{fontSize:'12px'}}>Engagement Gift:

Celebrate Noah’s engagement
with a small gift, showing that
the company values his
personal milestones</p>
                  </div>
                ))}
                {Array(1).fill().map((_, index) => (
                  <div key={index} className="square-button">
                    <img src={finance} alt="Icon" className="square-button-image" />
                    <p className="square-button-text" style={{fontSize:'12px'}}>Career Planning:

Discuss career opportunities
with Noah and how these
can contribute to his
long-term goals</p>
                  </div>
                ))}
                {Array(1).fill().map((_, index) => (
                  <div key={index} className="square-button">
                    <img src={Temporary} alt="Icon" className="square-button-image" />
                    <p className="square-button-text" style={{fontSize:'12px'}}>Temporary Role
Adjustments:

Consider temporary
adjustments to Noah’s role or
responsibilities to reduce
workload and stress</p>
                  </div>
                ))}
                {Array(1).fill().map((_, index) => (
                  <div key={index} className="square-button">
                    <img src={Sharing} alt="Icon" className="square-button-image" />
                    <p className="square-button-text" style={{fontSize:'12px'}}>Resource Sharing:

Invite team members to share
recommendations, including
trusted vendors and helpful
planning tools</p>
                  </div>
                ))}
              </div>
              

              <style>
                {`
                  .sub-modal {
                    overflow-y: auto; /* Enable vertical scroll if content overflows */
                    max-height: 80vh; /* Adjust height as needed */
                    padding: 20px;
                  }
    
                  .engagement-text {
                    text-align: center; /* Center align the text */
                    line-height: 1.8; /* Add spacing between lines */
                    margin: 20px 0; /* Add margin above and below the paragraph */
                  }
    
                  .square-buttons-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                    margin-top: 20px;
                    justify-content: center; /* Center align the buttons */
                  }
    
                  .square-button {
                    background-color: #f9f9f9;
                    border: 1px solid #ddd;
                    border-radius: 12px;
                    padding: 30px; /* Increased padding for larger buttons */
                    text-align: center;
                    cursor: pointer;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    transition: background-color 0.3s, transform 0.3s;
                    width: 200px; /* Adjust width for larger buttons */
                  }
    
                  .square-button:hover {
                    background-color: #e0e0e0;
                    transform: scale(1.05);
                  }
    
                  .square-button-image {
                    width: 60px; /* Adjust image size */
                    height: 60px; /* Adjust image size */
                    border-radius: 50%;
                    margin-bottom: 10px;
                  }
    
                  .square-button-text {
                    font-size: 18px; /* Adjust font size */
                    color: #333;
                    margin: 10px 0 0; /* Adjust margin for spacing */
                    line-height: 1.5; /* Add spacing between lines of text */
                    text-align: center; /* Center align the text */
                  }
                `}
              </style>
            </div>
          )}

          {/* New Modal for Vacation */}
          {showNewModal && (
            <div className="sub-modal">
              <h2>{selectedEmployee.name}</h2>
              <span className="close" onClick={() => setShowNewModal(false)}>
                &times;
              </span>
              {/* Add content for vacation modal here */}

              <div style={{ height: '450px', overflowY: 'scroll', padding: '20px', border: '1px solid #ccc', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '20px' }}>Purpose</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <div
          onClick={() => handleOptionClick('option1')}
          style={{
            padding: '20px',
            borderRadius: '10px',
            border: `2px solid ${selectedOption === 'option1' ? 'green' : '#ccc'}`,
            cursor: 'pointer',
            width: '150px',
            textAlign: 'center'
          }}
        >
          Business
        </div>
        <div
          onClick={() => handleOptionClick('option2')}
          style={{
            padding: '20px',
            borderRadius: '10px',
            border: `2px solid ${selectedOption === 'option2' ? 'green' : '#ccc'}`,
            cursor: 'pointer',
            width: '150px',
            textAlign: 'center'
          }}
        >
          Pleasure
        </div>
      </div>

      <h2 style={{ marginTop: '30px', marginBottom: '10px' }}>When?</h2>
      <button
        onClick={handleDateClick}
        style={{
          padding: '10px 20px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          cursor: 'pointer'
        }}
      >
        {formatDate(selectedDate)}
      </button>

      {showDatePicker && (
        <div style={{ marginTop: '20px' }}>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            inline
          />
        </div>
      )}

      <h2 style={{ marginTop: '30px', marginBottom: '10px' }}>Where to?</h2>
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
            margin: '0 auto',
            maxWidth: '300px'
          }),
          control: (provided) => ({
            ...provided,
            borderRadius: '5px',
            borderColor: '#ccc',
            boxShadow: 'none',
            '&:hover': {
              borderColor: '#aaa'
            }
          }),
          menu: (provided) => ({
            ...provided,
            borderRadius: '5px'
          })
        }}
      />

      <h2 style={{ marginTop: '30px', marginBottom: '10px' }}>With who?</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <div
          onClick={() => handleImageClick('image1')}
          style={{
            borderRadius: '10px',
            border: `2px solid ${selectedImage === 'image1' ? 'green' : '#ccc'}`,
            cursor: 'pointer',
            width: '100px',
            textAlign: 'center',
            padding: '10px'
          }}
        >
          <img
            src={women}
            alt="Image 1"
            style={{ borderRadius: '10px', width: '100%', height: 'auto' }}
          />
          <div style={{ marginTop: '10px' }}>
            {/* <span>Custom text 1</span> */}
          </div>
        </div>
        <div
          onClick={() => handleImageClick('image2')}
          style={{
            borderRadius: '10px',
            border: `2px solid ${selectedImage === 'image2' ? 'green' : '#ccc'}`,
            cursor: 'pointer',
            width: '100px',
            textAlign: 'center',
            padding: '10px'
          }}
        >
          <img
            src={family}
            alt="Image 2"
            style={{ borderRadius: '10px', width: '100%', height: 'auto' }}
          />
          <div style={{ marginTop: '10px' }}>
            {/* <span>Custom text 2</span> */}
          </div>
        </div>
        <div
          onClick={() => handleImageClick('image3')}
          style={{
            borderRadius: '10px',
            border: `2px solid ${selectedImage === 'image3' ? 'green' : '#ccc'}`,
            cursor: 'pointer',
            width: '100px',
            textAlign: 'center',
            padding: '10px'
          }}
        >
          <img
            src={freinds}
            alt="Image 3"
            style={{ borderRadius: '10px', width: '100%', height: 'auto' }}
          />
          <div style={{ marginTop: '10px' }}>
            {/* <span>Custom text 3</span> */}
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        style={{
          marginTop: '30px',
          padding: '10px 20px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          backgroundColor: '#4CAF50',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        Confirm
      </button>

      {showModal && (
        <div style={overlayStyle}>
          <div style={modalContentStyle}>
            <h2>Event Registration Successful</h2>
            <p><strong>Purpose:</strong> {selectedOption === 'option1' ? "Business" : selectedOption === 'option2' ? "Pleasure" : 'No reason selected'}</p>
            <p><strong>Date:</strong> {formatDate(selectedDate)}</p>
            <p><strong>Country:</strong> {selectedCountry ? selectedCountry.label : "No country selected"}</p>
            {/* <p><strong>With:</strong> {selectedImage ? `Image ${selectedImage.replace('image', '')}` : 'No image selected'}</p> */}
            <button
              onClick={handleCloseModal}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                backgroundColor: '#f44336',
                color: 'white',
                cursor: 'pointer'
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
