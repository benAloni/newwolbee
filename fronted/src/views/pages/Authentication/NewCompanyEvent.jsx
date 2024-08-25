import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Sidebar from '../../layout/Sidebar';
import Header from '../../layout/Header';
import PlanEvent from './PlanEvent';

// import './App.css';
// import hagalil from './hagalil.jpg'
// import buyMe from './buyMe.webp'
// import anastasia from './anastasia.jpg'
// import gehalim from './gehalim.jpg'
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
export default function NewCompanyEvent() {
    const [currentPopup, setCurrentPopup] = useState(0);
  
    const [selectedRangeBudget, setSelectedRangeBudget] = useState(50);
    const [selectedRangeEmployee, setSelectedRangeEmployee] = useState(1);
    const [selectedTheme, setSelectedTheme] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [createEvent,setCreateEvent] = useState([])
    
    const [tasks, setTasks] = useState([
      { id: 1, text: 'Confirm the venue booking and layout', completed: false },
      { id: 2, text: 'Arrange for yoga mats, sound system, and other equipment', completed: false },
      { id: 3, text: 'Prepare welcome kits with schedules, yoga benefits, and water bottles', completed: false },
      { id: 4, text: 'Set up the reception area with name tags and energy shakes', completed: false },
      { id: 5, text: 'Ensure the yoga space is ready with mats laid out', completed: false },
      { id: 6, text: 'Coordinate with the catering team for refreshment breaks and lunch', completed: false },
      { id: 7, text: 'Monitor the schedule and keep the event on track', completed: false },
      { id: 8, text: 'Prepare materials for the yoga workshop', completed: false },
      { id: 9, text: 'Collect feedback from participants', completed: false },
      { id: 10, text: 'Send thank you emails and follow-up materials', completed: false },
      { id: 11, text: 'Review the event and note areas for improvement', completed: false }
    ]);
  
    const toggleTaskCompletion = (taskId) => {
      setTasks(tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ));
    };
  
    const nextPopup = () => setCurrentPopup(currentPopup + 1);
    const prevPopup = () => setCurrentPopup(currentPopup - 1);
    const closePopup = () => setCurrentPopup(0);
  
    const handleRangeChangeBudget = (e) => setSelectedRangeBudget(e.target.value);
    const handleRangeChangeEmployee = (e) => setSelectedRangeEmployee(e.target.value);
  
    const handleThemeSelect = (theme) => {
      setSelectedTheme(theme);      
      nextPopup();
    };
  
    const handleLocationSelect = (location) => {
      setSelectedLocation(location);
      nextPopup();
    };
  
    const handleTimeSelect = (time) => {
      setSelectedTime(time);
      nextPopup();
    };

    const handleSubmitEvent = () => {
      const eventDetails = {
        budget: selectedRangeBudget,
        employees: selectedRangeEmployee,
        theme: selectedTheme,
        location: selectedLocation,
        time: selectedTime,
        tasks: tasks.filter(task => task.completed)
      };
      
      setCreateEvent([...createEvent, eventDetails]);
      closePopup();
    };
  
    const pieData = {
      labels: ['Morning', 'Noon', 'Evening'],
      datasets: [{
        label: 'Preferred Time',
        data: [62, 7, 31],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      }],
    };
  
    const pieDataLocation = {
      labels: ['On Site', 'Outside'],
      datasets: [{
        label: 'Preferred Time',
        data: [65, 35],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      }],
    };
  
    const pieOptions = {
      plugins: {
        datalabels: {
          formatter: (value, context) => {
            const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(2) + '%';
            return percentage;
          },
          color: 'black',
          font: {
            weight: 'bold',
            size: 24,
          },
        },
      },
    };
  
    return (
      <div className="page-wrapper">
        <div className="content container-fluid">
        <Sidebar></Sidebar>
 <Header></Header>
 <h1 style={{ textAlign: 'center', direction: 'rtl' }}>
    your company plan's
</h1>

        <button onClick={() => setCurrentPopup(1)}>Plan New Company Event</button>
        <PlanEvent createEvent={createEvent}/>

        {currentPopup !== 0 && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closePopup}>&times;</span>
  
              {currentPopup === 1 && (
                <>
                  <h1>Let's Plan!</h1>
                  <h2>When?</h2>
                  <div className="button-container">
                    <button className="eventButton" onClick={() => handleTimeSelect('This month')}>This month</button>
                    <button className="eventButton" onClick={() => handleTimeSelect('Choose special dates')}>Choose special dates</button>
                    <button className="eventButton" onClick={() => handleTimeSelect('Choose a range')}>Choose a range</button>
                    <button className="eventButton" onClick={() => handleTimeSelect('As soon as possible')}>As soon as possible</button>
                    <button className="eventButton" onClick={() => handleTimeSelect('Seasonal')}>Seasonal</button>
                    <button className="eventButton" onClick={() => handleTimeSelect('Help me decide')}>Help me decide</button>
                  </div>
                </>
              )}
  
              {currentPopup === 2 && (
                <>
                  <h1>Let's Plan!</h1>
                  <h2>Where?</h2>
                  <div className="button-container">
                    <button className="eventButton" onClick={() => handleLocationSelect('On site')}>On site</button>
                    <button className="eventButton" onClick={() => handleLocationSelect('Outside')}>Outside</button>
                    <button className="eventButton"  onClick={() => handleLocationSelect('Help me decide')}>Help me decide</button>
                  </div>
                  <button className="eventButton" onClick={prevPopup}>Back</button>
                </>
              )}
  
              {currentPopup === 3 && (
                <>
                  <h1>Budget</h1>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="50"
                      max="100000"
                      value={selectedRangeBudget}
                      onChange={handleRangeChangeBudget}
                      className="slider"
                    />
                    <div className="slider-value">{selectedRangeBudget} ₪</div>
                    <button className="eventButton" onClick={prevPopup}>Back</button>
                    <button className="eventButton" onClick={nextPopup}>Next</button>
                  </div>
                </>
              )}
  
              {currentPopup === 4 && (
                <>
                  <h1>How many employees</h1>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="1"
                      max="1000"
                      value={selectedRangeEmployee}
                      onChange={handleRangeChangeEmployee}
                      className="slider"
                    />
                    <div className="slider-value">{selectedRangeEmployee}</div>
                    <button className="eventButton" onClick={prevPopup}>Back</button>
                    <button className="eventButton" onClick={nextPopup}>Next</button>
                  </div>
                </>
              )}
  
              {currentPopup === 5 && (
                <>
                  <h1>Choose theme</h1>
                  <div className="button-container">
                    <button className="eventButton"  onClick={() => handleThemeSelect('Choose for me')}>Choose for me</button>
                    <button className="eventButton"  onClick={() => handleThemeSelect('Special date')}>Special date</button>
                    <button className="eventButton"  onClick={() => handleThemeSelect('Team building')}>Team building</button>
                    <button className="eventButton"  onClick={() => handleThemeSelect('Nature')}>Nature</button>
                    <button className="eventButton"  onClick={() => handleThemeSelect('Seasonal')}>Seasonal</button>
                    <button className="eventButton"  onClick={() => handleThemeSelect('Holiday')}>Holiday</button>
                    <button className="eventButton"  onClick={() => handleThemeSelect('Sport & Wellness')}>Sport & Wellness</button>
                    <button className="eventButton"  onClick={() => handleThemeSelect('Learning')}>Learning</button>
                    <button className="eventButton"  onClick={() => handleThemeSelect('Culinary')}>Culinary</button>
                  </div>
                  <button className="eventButton" onClick={prevPopup}>Back</button>
                </>
              )}
  
              {currentPopup === 6 && (
                <>
                  <h1>What your employee wish for</h1>
                  <h2>Preferred Location</h2>
                  <div className="popup">
                    <div className="popup-content">
                      <span className="close" onClick={closePopup}>&times;</span>
                      <Pie data={pieDataLocation} options={pieOptions} />
                      <button className="eventButton" onClick={prevPopup}>Back</button>
                      <button className="eventButton" onClick={nextPopup}>Next</button>
                    </div>
                  </div>
                </>
              )}
  
              {currentPopup === 7 && (
                <>
                  <h1>What your employee wish for</h1>
                  <h2>Preferred time</h2>
                  <div className="popup">
                    <div className="popup-content">
                      <span className="close" onClick={closePopup}>&times;</span>
                      <Pie data={pieData} options={pieOptions} />
                      <button className="eventButton" onClick={prevPopup}>Back</button>
                      <button className="eventButton" onClick={nextPopup}>Next</button>
                    </div>
                  </div>
                </>
              )}
  
  {currentPopup === 8 && (
                <>
                  <h1>What your employee wish for</h1>
                  <div className="button-container">
                    <button className="eventButton" onClick={nextPopup}>Engage & Inspire:<br /><br />A Day of Enlightening Talks</button>
                    <button className="eventButton" onClick={nextPopup}>Laugh It Up:<br /><br />A Day of Comedy and Relaxation</button>
                    <button className="eventButton" onClick={nextPopup}>Zen at Work:<br /><br />A Day of Yoga and Wellness</button>
                  </div>
                  <button className="eventButton" onClick={prevPopup}>Back</button>
                </>
              )}
  
  {currentPopup === 9 && (
                <>
                  <h1>Zen at work</h1>
                  <h2 style={{ textAlign: 'left' }}>A Day of yoga and wellness</h2>
                  <p style={{ textAlign: 'left' }}>Promote wellness, reduse stress, and foster team bonding through a day dedicated to yoga and mindfulness activities</p>
                  <div className="button-container">
                    <button className="eventButton" >Total estimated cost: <br/><br/>2500$</button>
                    <button className="eventButton" >Time needed for planning: <br/><br/>1 month</button>
                    <button className="eventButton" >Activity time: <br/><br/>4-6 hours</button>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <h2>Overview:</h2>
                    <p>The event is designed to enhance employee well-being and foster a sense of community through yoga and mindfulness
                      practices. Activities include both introductory and advanced yoga sessions, a welness workshop
                      and relaxation time.
                      </p>
                      <h3>Venue:</h3>
                      <p>Company premises or a local wellness center</p>
                      <h3>Key Element:</h3>
                      <ul>
                        <li>Welcome and registration 30 min</li>
                        <li>Opening a yoga session 1 hour</li>
                        <li>Refershment break 30 min</li>
                        <li>Workshop: "Benefits of yoga and midfulness" 1 hour</li>
                        <li>Lunch break 1 hour</li>
                        <li>Advanced yoga session 1 hour</li>
                        <li>Refershment break 30 min</li>
                        <li>Relaxation and closing session 30 min</li>
                      </ul>
                    <div className="button-container">
                    <button className="eventButton" onClick={nextPopup} >Keep Planing</button>
                    <button className="eventButton" >Show Me More Options</button>
                    
                  </div>
                  </div>
                  <button className="eventButton" onClick={prevPopup}>Back</button>
                </>
              )}
  
  {currentPopup === 10 && (
                <>
                  <h1>Zen at work
                    <br/><br/>
                    A day of yoga and wellness 
                  </h1>
                  
                  <div className="popup">
                    <div className="popup-content">
                      <span className="close" onClick={closePopup}>&times;</span>
  
                      <p>Promote wellness, reduce stress and foster team bonding through a day dedicated
                        to yoga and mindfulness activities.
                      </p>
                     
                      <button className="eventButton" onClick={() => setCurrentPopup(11)}>Detailed Schedule</button>
                      <button className="eventButton"  onClick={() => setCurrentPopup(13)}>Service Providers</button>
                      <button className="eventButton"  onClick={() => setCurrentPopup(12)}>To Do List</button>
                    </div>
                  </div>
  
                  <div>
                  <button className="eventButton" onClick={prevPopup}>Back</button>
                  <button className="eventButton"  onClick={() => setCurrentPopup(14)}>Next</button>
                  </div>
                </>
              )}
  
  {currentPopup === 11 && (
    <>
      <div  >
        <h1>Zen at Work: <br/><br/> A Day of Yoga and Wellness</h1>
        <div style={{ textAlign: 'left' }} className="popup-content">
          <h2>Welcome and Registration: 10:00 - 10:30</h2>
          <ul>
            <li>Set up reception desk with name tags.</li>
            <li>Provide energy shake for each attendee.</li>
            <li>Distribute a kit with daily schedule, yoga benefits, and a personal water bottle.</li>
          </ul>
  
          <h2>Opening Yoga Session: 10:30 - 11:30</h2>
          <ul>
            <li>Ensure yoga mats are laid out.</li>
            <li>Brief introduction to the session and instructor.</li>
            <li>Conduct a 60-minute beginner-friendly yoga session.</li>
          </ul>
  
          <h2>Refreshment Break: 11:30 - 12:00</h2>
          <ul>
            <li>Set up a snack station with healthy options.</li>
            <li>Provide water and herbal teas.</li>
            <li>Allow attendees to socialize and relax.</li>
          </ul>
  
          <h2>Workshop - "Benefits of Yoga and Mindfulness": 12:00 - 13:00</h2>
          <ul>
            <li>Prepare a presentation on the benefits of yoga and mindfulness.</li>
            <li>Engage attendees with interactive discussions.</li>
            <li>Provide handouts or digital materials for further reading.</li>
          </ul>
  
          <h2>Lunch Break: 13:00 - 14:00:</h2>
          <ul>
            <li>Arrange a catered healthy lunch.</li>
            <li>Set up seating areas for relaxed dining.</li>
            <li>Ensure a variety of dietary options are available.</li>
          </ul>
  
          <h2>Advanced Yoga Session: 14:00 - 15:00</h2>
          <ul>
            <li>Brief attendees on advanced techniques.</li>
            <li>Conduct a 60-minute advanced yoga session.</li>
            <li>Encourage participants to challenge themselves safely.</li>
          </ul>
  
          <h2>Refreshment Break: 15:00 - 15:30</h2>
          <ul>
            <li>Offer a selection of fresh fruits and light snacks.</li>
            <li>Provide water and smoothies.</li>
            <li>Allow time for relaxation and informal networking.</li>
          </ul>
  
          <h2>Relaxation and Closing Session: 15:30 - 16:00</h2>
          <ul>
            <li>Conduct a guided relaxation or meditation session.</li>
            <li>Summarize the day's activities and benefits.</li>
            <li>Provide closing remarks and thank attendees for participating.</li>
          </ul>
        </div>
        <button className="eventButton"  onClick={() => setCurrentPopup(10)}>Back</button>
        
      </div>
    </>
  )}
  
  {currentPopup === 12 && (
          <>
            <div className="popup-content">
              <h1>To-Do List: <br/><br/> Zen at Work</h1>
              <div className="popup-content">
                {tasks.map(task => (
                  <div style={{ textAlign: 'left' }} key={task.id}>
                    <label>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                      />
                      {task.text}
                    </label>
                  </div>
                ))}
              </div>
              <button className="eventButton"  onClick={() => setCurrentPopup(10)}>Back</button>
              <button className="eventButton"  onClick={() => setCurrentPopup(14)}>Next</button>
            </div>
          </>
        )}
  
  
  {currentPopup === 13 && (
                <>
                  <h1>
                  Service Providers
                  </h1>
                  
                  <div className="popup">
                    <div className="popup-content">
                      <span className="close" onClick={closePopup}>&times;</span>
  
                      <button className="eventButton">
                       <a href="https://buyme.co.il/supplier/752649?gad_source=1&gclid=CjwKCAjw2dG1BhB4EiwA998cqMdgg2DaU22LNJyQ8_l9ph-JTOH-8KEgS0xW8WOcn5gsUB2tuq-MbxoCs70QAvD_BwE" 
                       target="_blank" rel="noopener noreferrer">
                      <img src={''} alt="Buy Me Chef" />
            
                       </a>
                    </button>
  
                    <button className="eventButton">
                       <a href="https://shop.westgalil.org.il/" target="_blank" rel="noopener noreferrer">
                      <img src={''} alt="hagalil" style={{ width: '150px', height: '125px' }} />
            
                       </a>
                    </button>
  
                    <button className="eventButton">
                       <a href="https://www.anastasiatlv.co.il/?gad_source=1&gclid=CjwKCAjw2dG1BhB4EiwA998cqJOPO0z7jYmJ8YILCgokTEiDgFMBBzmN7tbohoK2Iw5YPN1BXlhsSRoCR-oQAvD_BwE"  
                       target="_blank" rel="noopener noreferrer">
    
                      <img src={''} alt="anastasia" style={{ width: '190px', height: '135px' }}  />
            
                       </a>
                    </button>
  
                    <button className="eventButton">
                       <a href="https://hagehalim.co.il/" target="_blank" rel="noopener noreferrer" >
                      <img src={''} alt="gehalim" style={{ width: '150px', height: '135px' }} />
            
                       </a>
                    </button>
                    <div>
                    <button className="eventButton"  onClick={() => setCurrentPopup(10)}>Back</button>
                    </div>
                    </div>
                  </div>
                </>
              )}
  
  {currentPopup === 14 && (
    <>
      <h1 style={{ textAlign: 'left' }}>Your Plan!</h1>
      <p style={{ textAlign: 'left' }}>Based on your preferences:</p>
      <p style={{ textAlign: 'left' }}>- Budget: {selectedRangeBudget} ₪</p>
      <p style={{ textAlign: 'left' }}>- Employees: {selectedRangeEmployee}</p>
      <p style={{ textAlign: 'left' }}>- Theme: {selectedTheme}</p>
      <p style={{ textAlign: 'left' }}>- Location: {selectedLocation}</p>
      <p style={{ textAlign: 'left' }}>- Time: {selectedTime}</p>
      <div className="button-container" style={{ textAlign: 'center' }}>
                    
        <button className="eventButton" onClick={() => setCurrentPopup(1)}>Keep Planning</button>
      </div>
      <button className="eventButton" onClick={handleSubmitEvent}>Submit Event</button>
      <button className="eventButton" onClick={prevPopup}>Back</button>
    </>
  )}
  
            </div>
          </div>
        )}
  
        <style>
          {`
            .modal {
              display: ${currentPopup !== 0 ? 'block' : 'none'};
              position: fixed;
              z-index: 1;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              overflow: auto;
              background-color: rgba(0, 0, 0, 0.4);
              animation: ${currentPopup !== 0 ? 'fadeIn 0.5s' : 'fadeOut 0.5s'};
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
              animation: ${currentPopup !== 0 ? 'slideIn 0.5s' : 'slideOut 0.5s'};
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
              margin-top:30px;
              gap:5px;
              margin:15px;
            }
  
            .eventButton:hover {
              background-color: #e0e0e0;
              transform: scale(1.05);
            }
  
            .slider-container {
              margin-top: 20px;
            }
  
            .slider-value {
              margin-top: 10px;
              font-size: 18px;
              font-weight: bold;
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
  
            .popup {
              display: flex;
              justify-content: center;
              align-items: center;
            }
  
            .popup-content {
              width: 100%;
              max-width: 600px;
            }
          `}
        </style>
      </div>
      </div>
    );
  }
  
