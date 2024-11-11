import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { FaArrowLeft } from "react-icons/fa";
import HrServiceCompany from "../../../views/pages/Employees/Projects/HrServiceCompany";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
// import './App.css';
// import hagalil from './hagalil.jpg'
// import buyMe from './buyMe.webp'
// import anastasia from './anastasia.jpg'
// import gehalim from './gehalim.jpg'
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const CreateCompanyEventModal = ({
  onClose,
  show,
  currentModal,
  setCurrentModal,
  nextModal,
  prevModal,
}) => {
  // const [selectedTimeOptions, setSelectedTimeOptions] = useState({
  //   startingTime: null,
  //   endingTime: null,
  // });
  const [selectedTime, setSelectedTime] = useState("");
  // const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRangeBudget, setSelectedRangeBudget] = useState(50);
  const [selectedRangeEmployee, setSelectedRangeEmployee] = useState(1);
  const [selectedTheme, setSelectedTheme] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
    watch,
    control,
  } = useForm();
  const [tasks, setTasks] = useState([
    { id: 1, text: "Confirm the venue booking and layout", completed: false },
    {
      id: 2,
      text: "Arrange for yoga mats, sound system, and other equipment",
      completed: false,
    },
    {
      id: 3,
      text: "Prepare welcome kits with schedules, yoga benefits, and water bottles",
      completed: false,
    },
    {
      id: 4,
      text: "Set up the reception area with name tags and energy shakes",
      completed: false,
    },
    {
      id: 5,
      text: "Ensure the yoga space is ready with mats laid out",
      completed: false,
    },
    {
      id: 6,
      text: "Coordinate with the catering team for refreshment breaks and lunch",
      completed: false,
    },
    {
      id: 7,
      text: "Monitor the schedule and keep the event on track",
      completed: false,
    },
    {
      id: 8,
      text: "Prepare materials for the yoga workshop",
      completed: false,
    },
    { id: 9, text: "Collect feedback from participants", completed: false },
    {
      id: 10,
      text: "Send thank you emails and follow-up materials",
      completed: false,
    },
    {
      id: 11,
      text: "Review the event and note areas for improvement",
      completed: false,
    },
  ]);

  if (!show) return null;

  const styles = {
    button: {
      height: "20px",
      position: "absolute",
      top: "5px",
      left: "30px",
      background: "white",
      border: "none",
      cursor: "pointer",
      padding: 0,
    },
    icon: {
      fontSize: "16px",
      color: "#000",
    },
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleRangeChangeBudget = (e) => setSelectedRangeBudget(e.target.value);

  const handleRangeChangeEmployee = (e) =>
    setSelectedRangeEmployee(e.target.value);

  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    nextModal();
  };

  const handleSelectedTime = (time, name) => {
    setValue(name, time);
    const startingTime = watch("startingTime");
    const endingTime = watch("endingTime");
  };

  const handleDateChange = (date) => {
    setValue("selectedDate", date.toISOString());
  };
  const selectedLocation = watch("location");

  const handleLocationSelection = (location) => {
    setValue("location", location); // Update the selected location in the form
    nextModal();
  };

  const onSubmit = () => {
    // const eventDetails = {
    //   budget: selectedRangeBudget,
    //   employees: selectedRangeEmployee,
    //   theme: selectedTheme,
    //   location: selectedLocation,
    //   time: selectedTime,
    //   tasks: tasks.filter((task) => task.completed),
    // };
    // onClose();
  };

  const pieData = {
    labels: ["Morning", "Noon", "Evening"],
    datasets: [
      {
        label: "Preferred Time",
        data: [62, 7, 31],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieDataLocation = {
    labels: ["On Site", "Outside"],
    datasets: [
      {
        label: "Preferred Time",
        data: [65, 35],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data.reduce(
            (a, b) => a + b,
            0
          );
          const percentage = Math.round((value / total) * 100) + "%"; // עיגול למספר שלם
          return percentage;
        },
        color: "black",
        font: {
          weight: "bold",
          size: 24,
        },
      },
    },
  };

  const h1style = {
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "bold",
  };

  const h2style = {
    textAlign: "center",
  };
  const buttonStyle = {
    width: "300px",
    height: "60px",
    border: "3px solid ",
    borderRadius: "45px",
    transition: "all 0.3s",
    cursor: "pointer",
    backgroundColor: "white",
    fontSize: "1.2em",
    fontWeight: 550,
    fontFamily: "'Montserrat', sans-serif",
  };

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="modal">
          <div className="modal-content" style={{ width: "45%" }}>
            <span className="close" onClick={onClose}>
              &times;
            </span>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* {currentModal !== 1 && currentModal !== 2 && (
                <button
                  className="eventButton"
                  onClick={prevModal}
                  style={styles.button}
                  aria-label="חזרה למסך הקודם"
                >
                  <FaArrowLeft style={styles.icon} />
                </button>
              )} */}

              {currentModal === 1 && (
                <>
                  <h1 style={h1style}>Let's plan an event!</h1>
                  <h2 style={h2style}>When would you like the event to be?</h2>
                  <div className="button-container">
                    <button className="eventButton" onClick={() => nextModal()}>
                      This month
                    </button>
                    <button className="eventButton">
                      Choose special dates
                    </button>

                    <button className="eventButton">As soon as possible</button>

                    <button className="eventButton">Help me decide</button>
                  </div>
                </>
              )}
              {currentModal === 2 && (
                <div className="choose-date-modal">
                  <div>
                    <h1>Pick a date and time for your event</h1>
                    <div className="cal-icon">
                      <Controller
                        control={control}
                        name="date-input"
                        render={({ field }) => (
                          <DatePicker
                            placeholderText="Select a date"
                            onChange={(date) => field.onChange(date)}
                            selected={field.value}
                             dateFormat="dd-MM-yyyy"
                          />
                        )}
                      />                   
                    </div>
                    <div>
                      <label htmlFor="starting-time">Choose time</label>
                      <div>
                        <label>Starting:</label>
                        <input
                          type="time"
                          id="starting-time"
                          {...register("startingTime")}
                          onChange={(e) =>
                            handleSelectedTime(e.target.value, "startingTime")
                          }
                        />
                      </div>

                      <div>
                        <label>Ending:</label>
                        <input
                          type="time"
                          id="ending-time"
                          {...register("endingTime")}
                          onChange={(e) =>
                            handleSelectedTime(e.target.value, "endingTime")
                          }
                        />
                      </div>
                    </div>
                    <button onClick={() => prevModal()}>Close</button>
                    <button
                      onClick={() => {
                        nextModal();
                      }}
                    >
                      Set date & time
                    </button>
                  </div>
                </div>
              )}

              {currentModal === 3 && (
                <>
                  <h2 style={h1style}>Set the location</h2>
                  <h1 style={h2style}>
                    Where would you like the location of the event to be?
                  </h1>
                  <div className="button-container">
                    <button
                      className="eventButton"
                      {...register("onSite")}
                      onClick={() => nextModal()}
                    >
                      On site
                    </button>
                    <button
                      className="eventButton"
                      {...register("outside")}
                      onClick={() => nextModal()}
                    >
                      Outside
                    </button>
                    <button className="eventButton" onClick={() => nextModal()}>
                      Help me decide
                    </button>
                  </div>
                  <button className="eventButton" onClick={prevModal}>
                    Back
                  </button>
                </>
              )}

              {currentModal === 4 && (
                <>
                  <h1 style={h2style}>Number of guests</h1>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="1"
                      max="1000"
                      value={selectedRangeEmployee}
                      onChange={handleRangeChangeEmployee}
                      className="slider"
                      style={{
                        display: "block",
                        margin: "0 auto",
                      }}
                    />
                    <div style={h2style} className="slider-value">
                      {selectedRangeEmployee}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <button className="eventButton" onClick={prevModal}>
                        Back
                      </button>
                      <button className="eventButton" onClick={nextModal}>
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}
              {currentModal === 5 && (
                <>
                  <h1 style={h2style}>Budget</h1>
                  <div className="slider-container">
                    <input
                      type="range"
                      min="50"
                      max="100000"
                      value={selectedRangeBudget}
                      onChange={handleRangeChangeBudget}
                      className="slider"
                      style={{
                        display: "block",
                        margin: "0 auto", // Centers the input horizontally
                      }}
                    />
                    <div style={h2style} className="slider-value">
                      {selectedRangeBudget} ₪
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px", // Optional for spacing between buttons
                      }}
                    >
                      {/* <button className="eventButton" onClick={prevModal}>Back</button> */}
                      <button className="eventButton" onClick={nextModal}>
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}

              {currentModal === 6 && (
                <>
                  <h1 style={h2style}>Choose theme</h1>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <button
                      className="eventButton"
                      style={{ width: "100%" }}
                      onClick={() => handleThemeSelect("Choose for me")}
                    >
                      Choose for me
                    </button>
                  </div>
                  <div className="button-container">
                    <button
                      className="eventButton"
                      onClick={() => handleThemeSelect("Special date")}
                    >
                      Special date
                    </button>
                    <button
                      className="eventButton"
                      onClick={() => handleThemeSelect("Team building")}
                    >
                      Team building
                    </button>
                    <button
                      className="eventButton"
                      onClick={() => handleThemeSelect("Nature")}
                    >
                      Nature
                    </button>
                    <button
                      className="eventButton"
                      onClick={() => handleThemeSelect("Seasonal")}
                    >
                      Seasonal
                    </button>
                    <button
                      className="eventButton"
                      onClick={() => handleThemeSelect("Holiday")}
                    >
                      Holiday
                    </button>
                    <button
                      className="eventButton"
                      onClick={() => handleThemeSelect("Sport & Wellness")}
                    >
                      Sport & Wellness
                    </button>
                    <button
                      className="eventButton"
                      onClick={() => handleThemeSelect("Learning")}
                    >
                      Learning
                    </button>
                    <button
                      className="eventButton"
                      onClick={() => handleThemeSelect("Culinary")}
                    >
                      Culinary
                    </button>
                  </div>
                  {/* <button className="eventButton" onClick={prevModal}>Back</button> */}
                </>
              )}

              {currentModal === 7 && (
                <>
                  <h1 style={h1style}>What your employee wish for</h1>
                  <h2 style={h2style}>Preferred Location & Time</h2>
                  <br />
                  <div className="popup">
                    <div className="popup-content">
                      <span className="close" onClick={onClose}>
                        &times;
                      </span>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%", // גובה מלא של הקונטיינר כדי לאפשר מרכוז אנכי
                          flexDirection: "row", // סידור הגרפים מימין לשמאל
                        }}
                      >
                        <div
                          style={{
                            width: "50%",
                            height: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Pie data={pieDataLocation} options={pieOptions} />
                        </div>
                        <div
                          style={{
                            width: "50%",
                            height: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Pie data={pieData} options={pieOptions} />
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "10px", // Optional for spacing between buttons
                        }}
                      >
                        {/* <button className="eventButton" onClick={prevModal}>Back</button> */}
                        <button className="eventButton" onClick={nextModal}>
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* {currentModal === 7 && (
                <>
                  <h1>What your employee wish for</h1>
                  <h2>Preferred time</h2>
                  <div className="popup">
                    <div className="popup-content">
                      <span className="close" onClick={onClose}>&times;</span>
                      <Pie data={pieData} options={pieOptions} />
                      <button className="eventButton" onClick={prevModal}>Back</button>
                      <button className="eventButton" onClick={nextModal}>Next</button>
                    </div>
                  </div>
                </>
              )} */}

              {currentModal === 8 && (
                <>
                  <h1>What your employee wish for</h1>
                  <div className="button-container">
                    <button className="eventButton">
                      Engage & Inspire:
                      <br />
                      <br />A Day of Enlightening Talks
                    </button>
                    <button className="eventButton">
                      Laugh It Up:
                      <br />
                      <br />A Day of Comedy and Relaxation
                    </button>
                    <button className="eventButton" onClick={nextModal}>
                      Zen at Work:
                      <br />
                      <br />A Day of Yoga and Wellness
                    </button>
                  </div>
                  {/* <button className="eventButton" onClick={prevModal}>Back</button> */}
                </>
              )}

              {currentModal === 9 && (
                <>
                  <h1 style={h1style}>Zen at work</h1>
                  <h2 style={h2style}>A Day of yoga and wellness</h2>
                  <br />
                  <p style={{ textAlign: "center" }}>
                    Promote wellness, reduse stress, and foster team bonding
                    through a day dedicated to yoga and mindfulness activities
                  </p>
                  <div className="button-container">
                    <button className="eventButton">
                      Total estimated cost: <br />
                      <br />
                      2500$
                    </button>
                    <button className="eventButton">
                      Time needed for planning: <br />
                      <br />1 month
                    </button>
                    <button className="eventButton">
                      Activity time: <br />
                      <br />
                      4-6 hours
                    </button>
                  </div>
                  <br />
                  <div style={{ textAlign: "left" }}>
                    <h2>Overview</h2>
                    <hr />
                    <p>
                      The event is designed to enhance employee well-being and
                      foster a sense of community through yoga and mindfulness
                      practices. Activities include both introductory and
                      advanced yoga sessions, a welness workshop and relaxation
                      time.
                    </p>
                    <h3>Venue</h3>
                    <hr />
                    <p>Company premises or a local wellness center</p>
                    <h3>Key Element</h3>
                    <hr />
                    <ul style={{ listStyleType: "disc" }}>
                      <li>Welcome and registration 30 min</li>
                      <li>Opening a yoga session 1 hour</li>
                      <li>Refershment break 30 min</li>
                      <li>
                        Workshop: "Benefits of yoga and midfulness" 1 hour
                      </li>
                      <li>Lunch break 1 hour</li>
                      <li>Advanced yoga session 1 hour</li>
                      <li>Refershment break 30 min</li>
                      <li>Relaxation and closing session 30 min</li>
                    </ul>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px", // Optional for spacing between buttons
                      }}
                      className="button-container"
                    >
                      <button className="eventButton" onClick={nextModal}>
                        Keep Planing
                      </button>
                      <button className="eventButton">
                        Show Me More Options
                      </button>
                    </div>
                  </div>
                  {/* <button className="eventButton" onClick={prevModal}>Back</button> */}
                </>
              )}

              {currentModal === 10 && (
                <>
                  <h1 style={h1style}>Zen at work </h1>
                  <h2 style={h2style}> A day of yoga and wellness </h2>
                  <br />

                  <div className="popup">
                    <div className="popup-content">
                      <span className="close" onClick={onClose}>
                        &times;
                      </span>

                      <p style={{ textAlign: "center" }}>
                        Promote wellness, reduce stress and foster team bonding
                        through a day dedicated to yoga and mindfulness
                        activities.
                      </p>
                      <div style={{ display: "flex" }}>
                        <button
                          className="eventButton"
                          onClick={() => setCurrentModal(10)}
                        >
                          Detailed Schedule
                        </button>
                        <button
                          className="eventButton"
                          onClick={() => setCurrentModal(12)}
                        >
                          Service Providers
                        </button>
                        <button
                          className="eventButton"
                          onClick={() => setCurrentModal(11)}
                        >
                          To-Do List
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px", // Optional for spacing between buttons
                    }}
                  >
                    {/* <button className="eventButton" onClick={prevModal}>Back</button> */}
                    <button
                      className="eventButton"
                      onClick={() => setCurrentModal(13)}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {currentModal === 11 && (
                <>
                  <div>
                    <h1 style={h1style}>Zen at Work</h1>
                    <h2 style={h2style}>A Day of Yoga and Wellness</h2>
                    <br />
                    <h3>Detailed Schedule:</h3>
                    <br />
                    <div
                      style={{ textAlign: "left" }}
                      className="popup-content"
                    >
                      <h3>Welcome and Registration: 10:00 - 10:30</h3>
                      <hr />
                      <ul style={{ listStyleType: "disc" }}>
                        <li>Set up reception desk with name tags.</li>
                        <li>Provide energy shake for each attendee.</li>
                        <li>
                          Distribute a kit with daily schedule, yoga benefits,
                          and a personal water bottle.
                        </li>
                      </ul>
                      <br />
                      <h3>Opening Yoga Session: 10:30 - 11:30</h3>
                      <hr />
                      <ul style={{ listStyleType: "disc" }}>
                        <li>Ensure yoga mats are laid out.</li>
                        <li>
                          Brief introduction to the session and instructor.
                        </li>
                        <li>
                          Conduct a 60-minute beginner-friendly yoga session.
                        </li>
                      </ul>
                      <br />
                      <h3>Refreshment Break: 11:30 - 12:00</h3>
                      <hr />
                      <ul style={{ listStyleType: "disc" }}>
                        <li>Set up a snack station with healthy options.</li>
                        <li>Provide water and herbal teas.</li>
                        <li>Allow attendees to socialize and relax.</li>
                      </ul>
                      <br />
                      <h3>
                        Workshop - "Benefits of Yoga and Mindfulness": 12:00 -
                        13:00
                      </h3>
                      <hr />
                      <ul style={{ listStyleType: "disc" }}>
                        <li>
                          Prepare a presentation on the benefits of yoga and
                          mindfulness.
                        </li>
                        <li>Engage attendees with interactive discussions.</li>
                        <li>
                          Provide handouts or digital materials for further
                          reading.
                        </li>
                      </ul>
                      <br />
                      <h3>Lunch Break: 13:00 - 14:00:</h3>
                      <hr />
                      <ul style={{ listStyleType: "disc" }}>
                        <li>Arrange a catered healthy lunch.</li>
                        <li>Set up seating areas for relaxed dining.</li>
                        <li>
                          Ensure a variety of dietary options are available.
                        </li>
                      </ul>
                      <br />
                      <h3>Advanced Yoga Session: 14:00 - 15:00</h3>
                      <hr />
                      <ul style={{ listStyleType: "disc" }}>
                        <li>Brief attendees on advanced techniques.</li>
                        <li>Conduct a 60-minute advanced yoga session.</li>
                        <li>
                          Encourage participants to challenge themselves safely.
                        </li>
                      </ul>
                      <br />
                      <h3>Refreshment Break: 15:00 - 15:30</h3>
                      <hr />
                      <ul style={{ listStyleType: "disc" }}>
                        <li>
                          Offer a selection of fresh fruits and light snacks.
                        </li>
                        <li>Provide water and smoothies.</li>
                        <li>
                          Allow time for relaxation and informal networking.
                        </li>
                      </ul>
                      <br />

                      <h3>Relaxation and Closing Session: 15:30 - 16:00</h3>
                      <hr />
                      <ul style={{ listStyleType: "disc" }}>
                        <li>
                          Conduct a guided relaxation or meditation session.
                        </li>
                        <li>Summarize the day's activities and benefits.</li>
                        <li>
                          Provide closing remarks and thank attendees for
                          participating.
                        </li>
                      </ul>
                    </div>
                    {/* <button className="eventButton"  onClick={() => setcurrentModal(10)}>Back</button> */}
                  </div>
                </>
              )}

              {currentModal === 12 && (
                <>
                  <div className="popup-content">
                    <h1 style={h1style}>Zen at Work</h1>
                    <h2 style={h2style}>A Day of Yoga and Wellness</h2> <br />
                    <br />
                    <h3>To-Do List</h3>
                    <hr />
                    <div className="popup-content">
                      {tasks.map((task) => (
                        <div style={{ textAlign: "left" }} key={task.id}>
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px", // Optional for spacing between buttons
                      }}
                    >
                      {/* <button className="eventButton"  onClick={() => setcurrentModal(10)}>Back</button> */}
                      <button
                        className="eventButton"
                        onClick={() => setCurrentModal(13)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}

              {currentModal === 13 && (
                <>
                  <h1>Service Providers</h1>

                  <div className="popup">
                    <div className="popup-content">
                      <span className="close" onClick={onClose}>
                        &times;
                      </span>

                      <div style={{ marginLeft: "-90px" }}>
                        <HrServiceCompany></HrServiceCompany>
                      </div>
                      <div>
                        {/* <button className="eventButton"  onClick={() => setcurrentModal(10)}>Back</button> */}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {currentModal === 14 && (
                <>
                  <h1 style={h1style}>Your Plan!</h1>
                  <h2 style={h2style}>Based on your preferences</h2>
                  <hr />
                  <ul style={{ listStyleType: "disc", fontSize: "20px" }}>
                    <li>Budget: {selectedRangeBudget}₪</li>
                    <li>Employees: {selectedRangeEmployee}</li>
                    <li>Theme: {selectedTheme}</li>
                    <li>Location: {selectedLocation}</li>
                    <li>Time: {selectedTime}</li>
                  </ul>
                  <div
                    className="button-container"
                    style={{ textAlign: "center" }}
                  ></div>
                  <button
                    className="eventButton"
                    onClick={() => setCurrentModal(1)}
                  >
                    Keep Planning
                  </button>

                  <button
                    className="eventButton"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting ? "Submitting..." : "Submit event"}
                  </button>
                  {/* <button className="eventButton" onClick={prevModal}>Back</button> */}
                </>
              )}
            </form>
          </div>
        </div>

        <style>
          {`
            .modal {
              display: ${currentModal !== 0 ? "block" : "none"};
              position: fixed;
              z-index: 1;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              overflow: auto;
              background-color: rgba(0, 0, 0, 0.4);
              animation: ${currentModal !== 0 ? "fadeIn 0.5s" : "fadeOut 0.5s"};
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
              animation: ${
                currentModal !== 0 ? "slideIn 0.5s" : "slideOut 0.5s"
              };
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
        .choose-date-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Ensure modal appears on top */
  padding: 10px; /* Add some padding around the modal */
}

.choose-date-modal > div {
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  max-width: 600px; /* Set a max width for the modal */
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Subtle shadow for better visibility */
  text-align: center;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: bold;
}

.cal-icon {
  margin-bottom: 20px;
}

label {
  font-size: 1rem;
  margin-bottom: 10px;
  display: block;
  text-align: left;
  margin-left: 10px;
}

input[type="time"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  background-color: #f19f29;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 10px;
  width: 100%;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #d4881b; /* Darker shade on hover */
}

button:focus {
  outline: none;
}

@media (max-width: 600px) {
  .choose-date-modal > div {
    padding: 20px;
    width: 90%;
  }
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
};

export default CreateCompanyEventModal;
