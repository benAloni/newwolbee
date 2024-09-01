import React, { useState,useEffect } from 'react';
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
import rings from '../../../imgs/rings.png';
import sick from '../../../imgs/sick.png';
import baby from '../../../imgs/baby.png';
import house from '../../../imgs/house.png';
import flight from '../../../imgs/flight.png';

import chase from '../../../imgs/chase.png';

import Temporary from '../../../imgs/Temporary.png';
import vacation from '../../../imgs/off.png'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import './popup.css'; // Import the CSS file for styling

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
  const [employee, setEvents] = useState([]);
// get notifications
const user = useSelector((state) => state.user.user);

  // Fetch data using React Query
  
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/getEmployees", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return []; 
    }
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['employeeData'],
    queryFn: fetchData,
    staleTime: 0,
    refetchInterval: 0,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data]);


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

  const events = [
    { id: 1, name: 'Engagement', imageUrl: rings, onClick: () => openSubModal('engagement') },
    { id: 2, name: 'Sick leave', imageUrl: sick, onClick: null },
    { id: 3, name: 'Vacation leave', imageUrl: vacation, onClick: () => openSubModal('vacation') },
    { id: 4, name: 'Personal Celebrations', imageUrl: gift, onClick: null },
    { id: 5, name: 'ChildcareIssues', imageUrl: chase, onClick: null },
    { id: 6, name: 'Pregnancy', imageUrl: baby, onClick: null },
    { id: 7, name: 'Housing Issues', imageUrl: house, onClick: null },
    { id: 8, name: 'Flight', imageUrl: flight, onClick: null },
  ];

  // const data1 = [
  //   { id: 1, image: Avatar_02, name: "Brad Jones", role: "UX/UI Designer", jobtitle: "Web Designer", department: "Development" },
  //   { id: 2, image: Avatar_01, name: "John Perkins", role: "Chief Scientist", jobtitle: "Web Developer", department: "Designing" },
  //   { id: 3, image: Avatar_03, name: "Lisa Robinson", role: "Data Analystr", jobtitle: "Android Developer", department: "Android" },
  //   { id: 4, image: Avatar_03, name: "Tom Hill", role: "Data Analyst", jobtitle: "Android Developer", department: "Android" },
  //   { id: 5, image: Avatar_03, name: "David Lee", role: "Product Manager", jobtitle: "Android Developer", department: "Android" },
  //   { id: 6, image: Avatar_03, name: "Nicole Miller", role: "UX/UI Designer", jobtitle: "Android Developer", department: "Android" },
  //   { id: 7, image: Avatar_03, name: "Sofia Garcia", role: "Business Development Manager", jobtitle: "Android Developer", department: "Android" },
  //   { id: 8, image: Avatar_03, name: "Emma Carter", role: "Research Engineer", jobtitle: "Android Developer", department: "Android" },
  //   { id: 9, image: Avatar_03, name: "Mark Morris", role: "Research Engineer", jobtitle: "Android Developer", department: "Android" },
  //   { id: 10, image: Avatar_03, name: "Josh Williams", role: "Data Analyst", jobtitle: "Android Developer", department: "Android" },
  //   { id: 11, image: Avatar_03, name: "Selena Ramos", role: "Data Analyst", jobtitle: "Android Developer", department: "Android" },
  //   { id: 12, image: Avatar_03, name: "Justin Smith", role: "Data Analyst", jobtitle: "Android Developer", department: "Android" },
  // ];

  


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

  const h1style = {
    textAlign: 'center',
    marginBottom: '20px',
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
        {
      `.modal {
      display: ${isOpen ? 'block' : 'none'};
      position: f;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0, 0, 0, 0.4);
   }` }
        
      </style>
      <div className="floatingButton" onClick={openModal}>
        +
      </div>
      <div className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="modal-content">
          <h1 style={h1style}>Please choose type of event</h1>
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <div className="button-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
      {events.map(event => (
        <button
          key={event.id}
          className="eventButton"
          onClick={event.onClick}
          style={{
            width: '150px',
            height: '150px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            cursor: event.onClick ? 'pointer' : 'default',
            backgroundColor: '#f9f9f9'
          }}
        >
          <img src={event.imageUrl} alt={event.name} style={{ marginBottom: '10px', width: '80px', height: '80px' }} />
          <span style={h1style}>{event.name}</span>
        </button>
      ))}
    </div>

          {/* Event modals */}
          {currentEventType && (
            <div className="sub-modal">
              <h2 style={h1style}>{currentEventType.charAt(0).toUpperCase() + currentEventType.slice(1)}</h2>
              <br />
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <div className="button-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', height: '500px' }}>
      {data.map(employee => (
        <div key={employee.id} onClick={() => handleEmployeeClick(employee)} style={{ cursor: 'pointer' }}>
         
          <div className="eventButton" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            height: '30%'
          }}>
            
            <img src={employee.imageUrl} alt={employee.name} style={{ marginBottom: '10px', width: '80px', height: '80px', borderRadius: '50%' }} />
            <span style={{ fontWeight: 'bold', marginBottom: '5px' }}>{employee.FullName}</span>
            <span style={{ fontSize: '12px', color: '#666' }}>{employee.Role}</span>
          </div>
        </div>
      ))}
    </div>
            </div>
          )}

          {/* Employee details modal */}
          {showEmployeeDetails && selectedEmployee && (
            <div className="sub-modal" >
             

           
              <span className="close" onClick={() => setShowEmployeeDetails(false)}>
                &times;
              </span>
              <h2 style={h1style}>{selectedEmployee.FullName} Engagement</h2>
            
              {/* <img src={selectedEmployee.image} alt={selectedEmployee.name} style={{ width: '100px', borderRadius: '50%' }} /> */}
              
              <p className="engagement-text">
  The journey from engagement through the wedding and into the first years of marriage is a
  significant period in Noah’s life. As a manager, you have a critical role in supporting him during this transformative time, and
  doing so can yield substantial benefits for both Noah and the company.
</p>

<p className="engagement-text">
  From engagement onward, Noah will juggle wedding planning with work responsibilities,
  often leading to stress. By offering understanding and flexibility, you can help him manage
  stress and navigate his work commitments effectively.
</p>

<p className="engagement-text" style={{ fontWeight: 'bold' }}>
  Don't wait for Noah to come to you. Proactively reach out, initiate a conversation, and work
  together to decide how best to support him during this time.
</p>



              <div className="square-buttons-container">
                {Array(1).fill().map((_, index) => (
                  <div key={index} className="square-button">
                    <img src={giftoff} alt="Icon" className="square-button-image" />
                    <p style={{ fontWeight: 'bold' }}>Flexible Work Hours</p>
                    <p className="square-button-text" style={{fontSize:'12px'}}>

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
                    <p style={{ fontWeight: 'bold' }}>Remote Work Options</p>
                    <p className="square-button-text" style={{fontSize:'12px'}}>Remote Work Options:

Offer Noah the option to
work from home when
needed</p>
                  </div>
                ))}
                {Array(1).fill().map((_, index) => (
                  <div key={index} className="square-button">
                    <img src={additionalTime} alt="Icon" className="square-button-image" />
                    <p style={{ fontWeight: 'bold' }}>Additional Time Off</p>
                    <p className="square-button-text" style={{fontSize:'12px'}}>
Provide extra leave days
specifically for Noah’s
wedding preparation</p>
                  </div>
                ))}
                {Array(1).fill().map((_, index) => (
                  <div key={index} className="square-button">
                    <img src={finance} alt="Icon" className="square-button-image" />
                    <p style={{ fontWeight: 'bold' }}>Financial Planning Assistance</p>
                    <p className="square-button-text" style={{fontSize:'12px'}}>

Discussions about financial
planning and benefits related
to marriage and offer Noah
financial planning workshops</p>
                  </div>
                ))}
                {Array(1).fill().map((_, index) => (
                  <div key={index} className="square-button">
                    <img src={Celebratory} alt="Icon" className="square-button-image" />
                    <p style={{ fontWeight: 'bold' }}>Celebratory Gestures</p>
                    <p className="square-button-text" style={{fontSize:'12px'}}>
Celebrate Noah’s
engagement with a
congratulatory email or a
small office celebration</p>
                  </div>
                ))}
                {Array(1).fill().map((_, index) => (
                  <div key={index} className="square-button">
                    <img src={gift} alt="Icon" className="square-button-image" />
                    <p style={{ fontWeight: 'bold' }}>Engagement Gift</p>
                    <p className="square-button-text" style={{fontSize:'12px'}}>

Celebrate Noah’s engagement
with a small gift, showing that
the company values his
personal milestones</p>
                  </div>
                ))}
                {Array(1).fill().map((_, index) => (
                  <div key={index} className="square-button">
                    <img src={finance} alt="Icon" className="square-button-image" />
                    <p style={{ fontWeight: 'bold' }}>Career Planning</p>
                    <p className="square-button-text" style={{fontSize:'12px'}}>:

Discuss career opportunities
with Noah and how these
can contribute to his
long-term goals</p>
                  </div>
                ))}
                {Array(1).fill().map((_, index) => (
                  <div key={index} className="square-button">
                    <img src={Temporary} alt="Icon" className="square-button-image" />
                    <p style={{ fontWeight: 'bold' }}>Temporary Role Adjustments</p>
                    <p className="square-button-text" style={{fontSize:'12px'}}>

Consider temporary
adjustments to Noah’s role or
responsibilities to reduce
workload and stress</p>
                  </div>
                ))}
                {Array(1).fill().map((_, index) => (
                  <div key={index} className="square-button">
                    <img src={Sharing} alt="Icon" className="square-button-image" />
                    <p style={{ fontWeight: 'bold' }}>Resource Sharing</p>
                    <p className="square-button-text" style={{fontSize:'12px'}}>

Invite team members to share
recommendations, including
trusted vendors and helpful
planning tools</p>
                  </div>
                ))}
              </div>
              

             
              
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

              <div style={{width:'800px', height: '500px', overflowY: 'scroll', padding: '20px', border: '1px solid #ccc', textAlign: 'center' }}>
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
