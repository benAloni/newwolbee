import React, { useState,useEffect,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

import ShowAllNotifications from "./mainNotifications/ShowAllNotifications";
import HeaderNottificatios from "./mainNotifications/HeaderNottificatios";
import ShowNewNotifications from "./mainNotifications/ShowNewNotifications";

import JohnStatistics from "./JohnStatistics";
import nicole from "../../../../../imgs/avatar_4.JPG";  
import jacob from "../../../../../imgs/jacob.jpg";
import john from "../../../../../imgs/avatar_6.JPG";
import tom from "../../../../../imgs/avatar_2.JPG";
import employee1 from "../../../../../imgs/avatar_4.JPG";
import employee2 from "../../../../../imgs/avatar_5.JPG";
import employee3 from "../../../../../imgs/avatar_6.JPG";
import employee4 from "../../../../../imgs/avatar_7.JPG";
import employee5 from "../../../../../imgs/avatar_8.JPG";
import employee6 from "../../../../../imgs/avatar_10.JPG";

// import employee1 from '../../../../../imgs/avatar_4.jpg';
// import employee2 from '../../../../../imgs/avatar_6.avif';
import { Modal, notification } from "antd";
import off from "../../../../../imgs/off.png";
import on from "../../../../../imgs/on.png";
import offgift from "../../../../../imgs/giftoff.png";
import "./modal.css";
import rescheduling from "../../../../../imgs/rescheduling.png";
import { TiPin } from "react-icons/ti";
import thankyou from "../../../../../imgs/thankyou.png";
import showAppreciation from "../../../../../imgs/showAppreciation.png";
import personalTime from "../../../../../imgs/personalTime.png";
import additionalTime from "../../../../../imgs/additionalTime.png";
import family from "../../../../../imgs/family.png";
import publicR from "../../../../../imgs/publicR.png";
import album from "../../../../../imgs/album.png";
import sweet from "../../../../../imgs/sweet.png";
import travelPillow from "../../../../../imgs/travelPillow.png";
import rating from "../../../../../imgs/rating.png";
import coffeeCup from "../../../../../imgs/coffeeCup.png";
import invitationcard from "../../../../../imgs/invitationcard.png";
import ShowHolidaysNotifications from "./mainNotifications/ShowNotifications/ShowHolidaysNotifications";

const ContactContents = () => {
  const navigate = useNavigate();

  const [modalOpenId4, setModalOpenId4] = useState(false);
  const [modalOpenTwo, setModalOpenTwo] = useState(false);
  const [modalOpenThree, setModalOpenThree] = useState(false);
  const [modalContentTwo, setModalContentTwo] = useState(null);
  const [modalContentThree, setModalContentThree] = useState(null);
  const [modalOpenfour, setModalOpenfour] = useState(false);
  const [modalOpenfive, setModalOpenfive] = useState(false);
  const [modalContentfour, setModalContentfour] = useState(null);

  const [viewOption, setViewOption] = useState("All");
  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const itemsPerPage = 10; // Number of notifications per page
    


  const [notifications, setNotifications] = useState([
    {
      id: 1,
      importance: "High",
      priorityNumber: 3,
      message: "Nicole's birthday is coming soon. Send her a gift!",
      fullName:'Nicole',
      link: "/de",
      className:"Birthday",
      read: false,
      viewed: false,
      dismissed: false,
      startDay: '2021-08-24',
      date: '1996-09-08',
      image: nicole,
    },
    {
      id: 2,
      importance: "Medium",
      priorityNumber: 2,
      message:
        "Tomorrow is the international pizza day. View your options for spoiling your team!",
        className:'bg-pink',
      link: "/task-board",
      date: '1996-09-08',
      read: false,
      dismissed: false,
      viewed: false,
    },
    {
      id: 3,
      importance: "High",
      priorityNumber: 3,
      fullName:'Fourth of July',
      message:
        "The Fourth of July celebration is in one month. Ensure there are food options for those with allergies and dietary preferences.",
      date: '2024-12-08',
      className:'bg-info',
      read: false,
      dismissed: false,
      viewed: false,
    },
    {
      id: 4,
      importance: "High",
      priorityNumber: 3,
      message: "Note! A meeting was arranged with Nicole when she is at home",
      link: "/departments",
      date: '1996-09-07',
      read: false,
      viewed: false,
      dismissed: false,
      image: nicole,
    },
    {
      id: 5,
      importance: "Medium",
      priorityNumber: 2,
      message:
        "Jacob used over 20 days of sick days in the last quarter. Let him know he has reached his limit.",
      date: '1996-09-07',
      read: false,
      viewed: false,
      dismissed: false,
      image: jacob,
    },
    {
      id: 6,
      importance: "Medium",
      priorityNumber: 2,
      message: "John's work routine has significantly changed.",
      link: "/departments",
      date: '1996-09-08',
      read: false,
      dismissed: false,
      viewed: false,
      image: john,
    },
    {
      id: 7,
      importance: "Low",
      priorityNumber: 1,
      message:
        "A Maccabi Tel-Aviv Soccer Game is coming up in a week. Wanna find out who from your workers is a fan of the team?",
      link: "/task-board",
      date: '1996-09-08',
      read: false,
      viewed: false,
      dismissed: false,
    },
    {
      id: 8,
      importance: "High",
      priorityNumber: 3,
      message:
        "john is flying to rome tomorrow - lets make it a real vacation for her.",
      link: "/low-importance-notification",
      date: '1996-09-06',
      read: false,
      dismissed: false,
      viewed: false,
      image: john,
    },
  ]);

      // get notifications
      const user = useSelector((state) => state.auth.user);
      const [events, setEvents] = useState([]);
    
      const fetchData = async () => {
        try {
          const [AllNotification, employeesResponse] = await Promise.all([
            axios.get(`${process.env.REACT_APP_SERVER_URI}/getAllNotifications`, {
              headers: { Authorization: `Bearer ${user.token}` },
            }),
            axios.get(`${process.env.REACT_APP_SERVER_URI}/getEmployees`, {
              headers: { Authorization: `Bearer ${user.token}` },
            }),
          ]);
          return [...AllNotification.data, ...employeesResponse.data];
        } catch (error) {
          console.error('Error fetching data:', error);
          return []; 
        }
      };
    
      // Use React Query to fetch data
      const { data, error, isLoading } = useQuery({
        queryKey: ['AllNotificationsData'],
        queryFn: fetchData,
        staleTime: 0, // Cache data for 1 minute
        refetchInterval: 0, // 3 minutes
        refetchOnWindowFocus: true, // Refetch when the window gains focus
      });
    
      useEffect(() => {
        if (data) {
          const filteredEvents = data.filter(event => event.title || event.DataOfBirth); // Filter out events without a title or DataOfBirth
          setEvents(filteredEvents);
          console.log(filteredEvents[68]); // Access the event at index 68 after filtering
        }
      }, [data]);
    
      
      useEffect(() => {    
        const eventNotifications = events.map((event, index) => {
          if (event.DataOfBirth ) {
            return {
              id: event._id, // Unique ID for each notification
              importance: "High",  // Default importance
              priorityNumber: 3,     // Default priority number
              message: `${event.FullName}'s birthday is coming soon. Send a gift!`,  // Customize the message
              link: "/events",  // Link to event details
              fullName:event.FullName,
              read: false,
              viewed: false,
              dismissed: false,
              image: event.image,  // Use event image if available
              startDay: event.StartDay,
              date: event.DataOfBirth,
              className: `Birthday`,
            };
          } else if (new Date(event.start) >= new Date()) {
            
            return {
              id: notifications.length + index + 1,
              importance: "Low",
              priorityNumber: 1,
              message: `${event.title} is happening on`,
              fullName: event.title,
              link: "/events",
              title: event.title,
              start: event.start,
              className: event.className,
              read: false,
              viewed: false,
              dismissed: false,
              date: event.start,
              image: event.image,
            };
          }
          else {
            // Event has passed, show with the next year
            const eventDate = new Date(event.start);
            const nextYear = new Date().getFullYear() + 1;
          
            // Adjust the event date to the next year
            const eventDateNextYear = new Date(eventDate.setFullYear(nextYear));
          
            return {
              id: notifications.length + index + 1,
              importance: "Low",
              priorityNumber: 1,
              message: `${event.title} is happening on ${eventDateNextYear.toLocaleDateString()}`,
              fullName: event.title,
              link: "/events",
              title: event.title,
              start: eventDateNextYear.toISOString(),
              className: event.className,
              read: false,
              viewed: false,
              dismissed: false,
              date: eventDateNextYear.toISOString(),
              image: event.image,
            };
          }
        });
        // Append the new notifications to the existing ones
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          ...eventNotifications,
        ]);
    
      }, [events]); // Dependency array includes events and getNotifications

  //John Answer
  const [modalOpenNo, setModalOpenNo] = useState(false);
  const [modalOpenYes, setModalOpenYes] = useState(false);
  const [modalContentNo, setModalContentNo] = useState(null);
  const [modalContentYes, setModalContentYes] = useState(null);

  //-----------

  const [archivedNotifications, setArchivedNotifications] = useState([]);
  const [isPostponeBtnClicked, setIsPostponeBtnClicked] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [selectedSortingOption, setSelectedSortingOption] = useState(
    "Priority high - low"
  );
  const [hoveredNotificationId, setHoveredNotificationId] = useState(null);

  //
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  
  const closeModalfour = () => {
    setModalOpenfour(false);
  };

  const closeModalfive = () => {
    setModalOpenfive(false);
  };

  const toggleNotificationVisibility = () => {
    setNotificationVisible(!isNotificationVisible);
  };

  const smallprojectCardStyle = {
    width: "250px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    textAlign: "center",
    transition: "transform 0.3s ease",
    padding: "20px",
    background: "#fff",
    margin: "10px",
    height: "300px",
  };
  const jhonAnswer = {
    width: "250px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: "40px",
    overflow: "hidden",
    textAlign: "center",
    transition: "transform 0.3s ease",
    padding: "18px",
    background: "#fff",
    margin: "10px",
    height: "280px",
    backgroundColor: "#F0F0F0",
  };

  const smallprojectCardStyle1 = {
    width: "250px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: "25px",
    overflow: "hidden",
    textAlign: "center",
    transition: "transform 0.3s ease",
    padding: "20px",
    background: "#D7DBDD",
    margin: "10px",
  };
  const verysmallprojectCardStyle = {
    width: "250px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    textAlign: "center",
    transition: "transform 0.3s ease",
    padding: "20px",
    background: "#fff",
    margin: "10px",
    height: "180px",
  };

  const checkboxStyle = {
    marginRight: "10px",
  };

  const buttonStyle = {
    marginBottom: "10px",
  };

  const fadeNotificationStyle = {
    marginLeft: "140px",
    width: "1000px",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "20px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    animation: isNotificationVisible ? "fadeIn 0.5s" : "fadeOut 0.5s",
    display: isNotificationVisible ? "flex" : "none",
    height: "550px",
    flexDirection: "row", // קו הכי חשוב בשורה זו
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap", // כדי שהקוביות ימשיכו להתפרסם בשורה חדשה כאשר מגיעים לסופה
    gap: "20px", // רווח בין הקוביות
    overflow: "auto", // גלילה אוטומטית במקרה שהתוכן חורג מגודל הדיב
  };

  const jhonimgStyle = {
    width: "80px",
    height: "80px",
  };

  const h4Style = {
    fontSize: "22px",
    margin: "10px 0",
  };

  const projectCardStyle = {
    width: "300px",
    boxSizing: "border-box",
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    textAlign: "center",
    transition: "transform 0.3s ease",
    padding: "20px",
    background: "#fff",
    margin: "10px", // Small margin between cards
  };

  const imageContainerStyle = {
    width: "100px",
    height: "100px",
    margin: "0 auto 10px",
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px solid #ddd",
  };

  const imgStyle = {
    width: "100%",
    height: "auto",
    borderRadius: "50%",
  };

  const projectDetailsTextStyle = {
    padding: "10px",
  };

  const rowStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  };

  const h3Style = {
    fontSize: "18px",
    margin: "10px 0",
  };
  const h5Style = {
    fontSize: "14px",
    margin: "4px 0",
  };

  const pStyle = {
    fontSize: "14px",
    color: "#555",
    margin: "5px 0",
  };

  const titlels = {
    flexDirection: "column", // שינוי פה גם
    alignItems: "center", // שינוי פה גם
    justifyContent: "center", // שינוי פה גם
    gap: "20px",
  };

  //

  // Sorting notifications based on the selected option
  if (selectedSortingOption === "A-Z") {
    notifications.sort((a, b) => a.message.localeCompare(b.message));
  } else if (selectedSortingOption === "Z-A") {
    notifications.sort((a, b) => b.message.localeCompare(a.message));
  } else if (selectedSortingOption === "Priority low - high") {
    notifications.sort((a, b) => a.priorityNumber - b.priorityNumber);
  } else {
    notifications.sort((a, b) => b.priorityNumber - a.priorityNumber);
  }

  // const markAsViewedAndArchive = (id) => {
  //   const notification = notifications.find((n) => n.id === id);
  //   if (notification) {
  //     setArchivedNotifications((prev) => [
  //       ...prev,
  //       { ...notification, viewed: true },
  //     ]);
  //     markAsViewed(id);
  //   }
  // };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null); // Reset modal content when closing
  };

  const closeModalTwo = () => {
    setModalOpenTwo(false);
  };
  const closeModalThree = () => {
    setModalOpenThree(false);
  };

  // jhon answer

  const openModalNo = (notification) => {
    setModalContentNo(notification);
    setModalOpenNo(true);
  };
  const openModalYes = (notification) => {
    setModalContentYes(notification);
    setModalOpenYes(true);
  };


  const closeModalNo = () => {
    setModalOpenNo(false);
  };
  const closeModalYes = () => {
    setModalOpenYes(false);
  };
  // ----------arrows---------
//  Calculate the notifications to be displayed on the current page
let displayedNotifications = [];

if (viewOption !== 'New') {
  displayedNotifications = notifications.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
}


// Handle clicking the next page button
const handleNextPage = () => {
  if ((currentPage + 1) * itemsPerPage < notifications.length) {
    setCurrentPage(currentPage + 1);
  }
};

// Handle clicking the previous page button
const handlePreviousPage = () => {
  if (currentPage > 0) {
    setCurrentPage(currentPage - 1);
  }
};

  //---------

  const notificationContainerStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  };


  const ulStyle = {
    margin: 0,
    padding: 0,
    textAlign: "center", // Center align the text
    listStyleType: "none", // Remove bullet points
  };

  const listItemStyle = {
    listStyleType: "none",
  };


  const [showPopup,setShowPopup] = useState('')

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const getNotificationId = (userId) => {
    const notification = notifications.find(val => val.id === userId);
    if (notification) {
      if (notification.className === "Birthday") {
        const encodedData = encodeURIComponent(JSON.stringify(notification));
        navigate(`/NotificationsBirth/${encodedData}`);
            } else if (notification.className === 'bg-info') {
              setShowPopup('bg-info')
              setModalContent(notification); // Pass the notification data as content
              setModalOpen(true); // Open the modal
            }else if (notification.className === 'bg-pink') {
              navigate('/task-board', {
                state: { data: notification }
              });
            }
            else if (notification.id === 4) {
              setModalContent(notification); // Pass the notification data as content
              setModalOpenId4(true); // Open the modal
            }
            else if (notification.id === 8) {
              setModalOpenfive(true);
            }
            else if (notification.id === 6) {
              setModalOpenThree(true);
            }
            else if (notification.id === 7) {
              setModalOpenfour(true);
            }
            else {
        alert('no Birthday');
      }
    }
  };


  return (
    <div style={notificationContainerStyle}>
      <div
        className="upperBarOptions"
        style={{
          display: "flex",
          justifyContent: "right",
          gap: "70px",
        }}
      >
<HeaderNottificatios setViewOption={setViewOption} displayedNotifications={displayedNotifications}/>
        <div
          className="filterDiv"
          style={{
            display: "flex",
            justifyContent: "right",
            position: "relative",
            right: "120px",
          }}
        >
          <label htmlFor="notificationFilter">
            Filter by:{" "}
            <select
              id="notificationFilter"
              style={{
                borderRadius: "5px",
                padding: "7px",
                backgroundColor: "#f7b500",
                border: "none",
                marginRight: "30px",
              }}
            >
              <option>Choose filter...</option>
              <option value="Employee name">Employee name</option>
              <option value="Event">Event</option>
            </select>
          </label>
        </div>
        <div
          className="notificationsSorting"
          style={{
            display: "flex",
            justifyContent: "right",
            position: "relative",
            right: "170px",
          }}
        >
          <label htmlFor="notificationSort">
            Sort by:{" "}
            <select
              id="notificationSort"
              style={{
                borderRadius: "5px",
                padding: "7px",
                backgroundColor: "#f7b500",
                border: "none",
                marginRight: "30px",
              }}
              onChange={(e) => setSelectedSortingOption(e.target.value)}
            >
              <option value="Priority high - low">Priority high - low</option>
              <option value="Priority low - high">Priority low - high</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
          </label>
        </div>
      </div>
      <br />
      <br />
                {/* Pagination Controls */}
                <div style={{ marginTop: "-40px" }}>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
              style={{
                background: currentPage === 0 ? "#f2f2f2" : "#FFA500", // light grey when disabled, orange otherwise
                color: currentPage === 0 ? "#aaa" : "white", // adjust text color for contrast
                border: "none",
                borderRadius: "5px",
                padding: "10px 20px",
                cursor: currentPage === 0 ? "not-allowed" : "pointer", // change cursor based on state
              }}
            >
              ⬅
            </button>
            <button
              onClick={handleNextPage}
              disabled={(currentPage + 1) * itemsPerPage >= notifications.length}
              style={{
                background:
                  (currentPage + 1) * itemsPerPage >= notifications.length
                    ? "#f2f2f2"
                    : "#FFA500", // light grey when disabled, orange otherwise
                color:
                  (currentPage + 1) * itemsPerPage >= notifications.length
                    ? "#aaa"
                    : "white", // adjust text color for contrast
                border: "none",
                borderRadius: "5px",
                padding: "10px 20px",
                cursor:
                  (currentPage + 1) * itemsPerPage >= notifications.length
                    ? "not-allowed"
                    : "pointer", // change cursor based on state
              }}
            >
              ➡
            </button>
          </div>
      <br />

      {/* Start new code */}

      {viewOption === 'All' && (
        <ShowAllNotifications getNotificationId={getNotificationId} displayedNotifications={displayedNotifications} />
      )}
      {viewOption === 'New' && (
        <ShowNewNotifications notifications={notifications} getNotificationId={getNotificationId} />
      )}

     <ShowHolidaysNotifications
     modalOpen={modalOpen}
     modalContent={modalContent}
     closeModal={closeModal}
   />
      {/* Modal for notification John */}
      <div style={rowStyle}>
        {modalOpenThree && (
          <Modal
            onCancel={closeModalThree}
            visible={modalOpenThree}
            footer={null}
          >
            <ul style={ulStyle}>
              <li style={listItemStyle}>
                <h2 style={{ width: "100%" }}>
                  John's work routine has significantly changed!
                </h2>
                <br />
                <h5>
                  {" "}
                  This month, john worked 140% of his regular hours, arriving at
                  the office at his usual <br />
                  time but departing much later than usual please review john's
                  work statistics below.{" "}
                </h5>
                <br />

                <div>
                  <JohnStatistics />
                </div>

                <br />
                <br />
                <br />

                <h5>Do you know the reason for the change ?</h5>

                <br />
              </li>
            </ul>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <div
                  onClick={openModalYes}
                  className="project-card"
                  style={smallprojectCardStyle1}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h1>YES</h1>
                    <h4>
                      This is due to <br /> work <br /> assignments
                    </h4>
                  </div>
                </div>
                <div
                  onClick={openModalNo}
                  className="project-card"
                  style={smallprojectCardStyle1}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h1>NO</h1>
                    <h4>
                      This is new to <br /> me
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>

      {/* ------- John answer Yes---------- */}

      <div>
        {modalOpenYes && modalContentYes && (
          <Modal onCancel={closeModalYes} visible={modalOpenYes} footer={null}>
            <ul style={ulStyle}>
              <li style={listItemStyle}>
                <h4
                  style={{
                    margin: "0",
                    padding: "0",
                    lineHeight: "1.6" /* Adjust line height for spacing */,
                    marginBottom: "1rem" /* Add space below the heading */,
                  }}
                >
                  John is currently working on a big project, and it’s crucial
                  to show our appreciation for the extra time he's putting in.
                  Talk to John to acknowledge his efforts and let him know that
                  you are aware of the change. Additionally, you can consider
                  the following actions:
                </h4>
                <br />
              </li>
            </ul>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <div
                  className="project-card"
                  style={jhonAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3 style={h4Style}>Show Appreciation</h3>
                    <h5>
                      talk to jhon and make sure he understands that you see his
                      work and that to appreciate it.
                    </h5>
                    <img
                      src={showAppreciation}
                      alt="Project Seven"
                      style={jhonimgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={jhonAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3>Additional time:</h3>
                    <h4 style={h3Style}>
                      Offer John vacation leave or compensatory time off for the
                      extra time he has worked.
                    </h4>
                    <img
                      src={additionalTime}
                      alt="Project Seven"
                      style={jhonimgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={jhonAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3>famliy :</h3>
                    <h4 style={h3Style}>
                      Send a small gesture to jhon's family to show
                      appreciation.
                    </h4>
                    <img
                      src={family}
                      alt="Project Seven"
                      style={jhonimgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={jhonAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3>personal time planning:</h3>
                    <h4 style={h3Style}>
                      talk to john and make sure he has enough personal personal
                      time during to project.
                    </h4>
                    <img
                      src={personalTime}
                      alt="Project Seven"
                      style={jhonimgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={jhonAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3>public recognition:</h3>
                    <h4 style={h3Style}>
                      acknowledge jhon's hard work in a team meeting or through
                      a wide email.
                    </h4>
                    <img
                      src={publicR}
                      alt="Project Seven"
                      style={jhonimgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={jhonAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h2>bonus or gift:</h2>
                    <h3 style={h3Style}>
                      provide a financial bonus or a thoughtful gift card as a
                      sign of appreciation.
                    </h3>
                    <img
                      src={thankyou}
                      alt="Project Seven"
                      style={jhonimgStyle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>

      {/* --------jhon answer no ---------- */}

      <div>
        {modalOpenNo && modalContentNo && (
          <Modal onCancel={closeModalNo} visible={modalOpenNo} footer={null}>
            <ul style={ulStyle}>
              <li style={listItemStyle}>
                <h4
                  style={{
                    margin: "0",
                    padding: "0",
                    lineHeight: "1.6" /* Adjust line height for spacing */,
                    marginBottom: "1rem" /* Add space below the heading */,
                  }}
                >
                  {" "}
                  First, it's important to understand why John is working so
                  many hours and whether it's due to his regular assignments, a
                  new temporary project or other personal issue. and it's
                  crucial to show our appreciation for the extra time he's
                  putting in. Talk to John to acknowledge his efforts and let
                  him know that you are aware of the change. Additionally, you
                  can consider the following actions
                </h4>
                <br />
              </li>
            </ul>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <div
                  className="project-card"
                  style={jhonAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3 style={h4Style}>Show Appreciation</h3>
                    <h5>
                      talk to jhon and make sure he understands that you see his
                      work and that to appreciate it.
                    </h5>
                    <img
                      src={showAppreciation}
                      alt="Project Seven"
                      style={jhonimgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={jhonAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3>Additional time:</h3>
                    <h4 style={h3Style}>
                      Offer John vacation leave or compensatory time off for the
                      extra time he has worked.
                    </h4>
                    <img
                      src={additionalTime}
                      alt="Project Seven"
                      style={jhonimgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={jhonAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3>famliy :</h3>
                    <h4 style={h3Style}>
                      Send a small gesture to jhon's family to show
                      appreciation.
                    </h4>
                    <img
                      src={family}
                      alt="Project Seven"
                      style={jhonimgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={jhonAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3>personal time planning:</h3>
                    <h4 style={h3Style}>
                      talk to john and make sure he has enough personal personal
                      time during to project.
                    </h4>
                    <img
                      src={personalTime}
                      alt="Project Seven"
                      style={jhonimgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={jhonAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3>public recognition:</h3>
                    <h4 style={h3Style}>
                      acknowledge jhon's hard work in a team meeting or through
                      a wide email.
                    </h4>
                    <img
                      src={publicR}
                      alt="Project Seven"
                      style={jhonimgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={jhonAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h2>bonus or gift:</h2>
                    <h3 style={h3Style}>
                      provide a financial bonus or a thoughtful gift card as a
                      sign of appreciation.
                    </h3>
                    <img
                      src={thankyou}
                      alt="Project Seven"
                      style={jhonimgStyle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>

      {/* Modal for notification 3 */}

      {modalOpenId4 && modalContent && (
        <Modal onCancel={closeModal} visible={modalOpenId4} footer={null}>
          <ul style={ulStyle}>
            <li style={listItemStyle}>
              <h2 style={{ width: "100%" }}>
                Nicole is home and she has an appointment with you
              </h2>
              <br />
              <h5>
                {" "}
                On Thursday, June 20, 2024, at 16:00, Nicole scheduled a meeting
                with Emma Carter regarding "Upgrading Security Systems." This
                time overlaps with Emma’s pre designated important personal
                time.{" "}
              </h5>
              <br />
              <Link to="#">
                <button onLoad={""}>see the meeting</button>
              </Link>
              <br />
              <br />
              <h6>
                Balancing work and personal life is vital for employee
                well-being and commitment. This situation is an opportunity to
                show Emma that you respect her personal time. Just by discussing
                this with her, you are already making a difference
              </h6>
              <br />

              <h4>Here are some things you can do to fix it</h4>
            </li>
          </ul>

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div
              className="project-card"
              style={smallprojectCardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Link to="/project/7">
                <div className="image-container" style={imageContainerStyle}>
                  <img
                    src={rescheduling}
                    alt="Project Seven"
                    style={imgStyle}
                  />
                </div>
                <div
                  className="project-details"
                  style={projectDetailsTextStyle}
                >
                  <h3 style={h3Style}>
                    Reschedule: Ask the organizer to change the meeting time and
                    inform Emma
                  </h3>
                </div>
              </Link>
            </div>

            <div
              className="project-card"
              style={smallprojectCardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Link to="/project/7">
                <div className="image-container" style={imageContainerStyle}>
                  <img src={on} alt="Project Seven" style={imgStyle} />
                </div>
                <div
                  className="project-details"
                  style={projectDetailsTextStyle}
                >
                  <h3 style={h3Style}>
                    Consult Emma: Check if Emma can attend despite the conflict
                  </h3>
                </div>
              </Link>
            </div>

            <div
              className="project-card"
              style={smallprojectCardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Link to="/project/7">
                <div className="image-container" style={imageContainerStyle}>
                  <img src={offgift} alt="Project Seven" style={imgStyle} />
                </div>
                <div
                  className="project-details"
                  style={projectDetailsTextStyle}
                >
                  <h3 style={h3Style}>
                    Explain Necessity: Inform Emma that the meeting is critical
                    and offer an alternative early leave if needed
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        </Modal>
      )}

      {/* {Modal for notification 6}  */}

      {modalOpenfour && (
        <Modal onCancel={closeModalfour} visible={modalOpenfour} footer={null}>
          <ul style={ulStyle}>
            <li style={listItemStyle}>
              <h2 style={{ width: "100%" }}>Maccabi Tel-Aviv soccer game </h2>
              <br />
              <h5>
                {" "}
                On Sunday, July 07, 2024, at 20:00, There's a Maccabi Tel-Aviv
                soccer game. Maybe we can arrange a meeting for all the team
                fans to watch the game together?
              </h5>
              <br />
              <br />
              <br />

              <h4>Here are the Maccabi Tel-Aviv fans</h4>
              <br></br>
            </li>
          </ul>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              height: "350px",
              overflow: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
<div style={{ 
  display: "flex", 
  justifyContent: "space-between", 
  alignItems: "center", 
  width: "100%",  
  padding: "20px", 
  margin: "20px 0"
}}><div className="image-container" style={imageContainerStyle}>
                <img src={tom} alt="Project Seven" style={imgStyle} />
              </div>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h3Style}>Tom</h3>
              </div>


              <div className="image-container" style={imageContainerStyle}>
                <img src={employee2} alt="Project Seven" style={imgStyle} />
              </div>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h3Style}>Brad</h3>
            </div>


              <div className="image-container" style={imageContainerStyle}>
                <img src={employee3} alt="Project Seven" style={imgStyle} />
              </div>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h3Style}>John</h3>
            </div>
            </div>

            <div
              className="project-card"
              style={verysmallprojectCardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
                <h4>Flexible Hours:</h4>
              {/* <div className="image-container" style={imageContainerStyle}>
                <img src={employee4} alt="Project Seven" style={imgStyle} />
              </div> */}
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h5Style}>Consider allowing them
                to leave a bit early on game day</h3>
              </div>
            </div>

            <div
              className="project-card"
              style={verysmallprojectCardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <h4>Team Viewing:</h4>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h5Style}>Organize a small viewing event at the office</h3>
              </div>
            </div>

            <div
              className="project-card"
              style={verysmallprojectCardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
<h4>Good Luck Note:</h4>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h5Style}>Leave a note wishing
                them and their team good luck</h3>
              </div>
            </div>
            <div
              className="project-card"
              style={verysmallprojectCardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
<h4>Snacks and a drink:</h4>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h5Style}>Build together with John a</h3>
              </div>
            </div>
            <div
              className="project-card"
              style={verysmallprojectCardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
<h4>Office Decorations: </h4>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h5Style}>Decorate the office with their team's colors or flags to create a festive
                atmosphere. But, make sure there are no fans of the opposite team</h3>
              </div>
            </div>
            <div
              className="project-card"
              style={verysmallprojectCardStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
<h4>Social Media Spotlight:</h4>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h5Style}>Feature their
enthusiasm on the
company's social media channels with a spotlight post or story</h3>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {/* {Modal for notification 8}  */}
      <div>
        {modalOpenfive && (
          <Modal
            onCancel={closeModalfive}
            visible={modalOpenfive}
            footer={null}
          >
            <ul style={ulStyle}>
              <li style={listItemStyle}>
                <h4
                  style={{
                    margin: "0",
                    padding: "0",
                    lineHeight: "1.6" /* Adjust line height for spacing */,
                    marginBottom: "1rem" /* Add space below the heading */,
                  }}
                >
                  <h3>john's Trip: Recharge and Refresh!</h3>
                  john will be heading to Rome for an 8-day vacation in two
                  days. Let's ensure she relaxes and enjoys her time off by
                  reassuring her that everything at work is in good hands. Here
                  are some ways to help her feel confident leaving work behind{" "}
                  <br />
                  <br />
                  Vacations are vital for employees, offering a break to
                  recharge and prevent burnout. They boost morale, increase
                  productivity, and bring a fresh perspective. Encouraging time
                  off supports work-life balance and leads to a more engaged and
                  motivated team
                </h4>
                <br />
              </li>
            </ul>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <div
                  className="project-card"
                  style={jhonAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
<h4 style={{ fontSize: "24px",marginBottom:'10px' }}>Have a Great Vacation:</h4>
<h5>
                      Send john a quick message wishing her a fantastic vacation
                    </h5><br />
                    <img
                      src={invitationcard}
                      alt="Project Seven"
                      style={jhonimgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={jhonAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle }
                  >
                    
                    <h3 style={{ fontSize: "25px",marginBottom:'28px', marginTop:'10px' }}>Airport Treats:</h3>
                    <h5 style={{marginBottom:'18px'}}>
                      Send john a voucher to use while she's waiting for her
                      flight
                    </h5 >
                    <img
                      src={coffeeCup}
                      alt="Project Seven"
                      style={jhonimgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={jhonAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3 style={{ fontSize: "25px",marginBottom:'26px', marginTop:'10px' }}>Top Trip Tips:</h3>
                    <h5 style={{marginBottom:'21px'}}>
                      Give john some fantastic recommendations for her trip
                    </h5>
                    <img
                      src={rating}
                      alt="Project Seven"
                      style={jhonimgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={jhonAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3 style={{ fontSize: "25px",marginBottom:'26px', marginTop:'10px' }}>Travel Kit:</h3>
                    <h5 style={{marginBottom:'38px'}}>
                      Prepare a travel kit for john to use on her trip
                    </h5>
                    <img
                      src={travelPillow}
                      alt="Project Seven"
                      style={jhonimgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={jhonAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h3 style={{ fontSize: "25px",marginBottom:'26px', marginTop:'10px' }}>Warm Welcome:</h3>
                    <h5 style={{marginBottom:'21px'}}>
                      Plan a warm welcome for john when she arrives at her
                      destination
                    </h5>
                    <img
                      src={sweet}
                      alt="Project Seven"
                      style={jhonimgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={jhonAnswer}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="project-details"
                    style={projectDetailsTextStyle}
                  >
                    <h2 style={{ fontSize: "25px",marginBottom:'26px', marginTop:'10px' }}>Vacation Album:</h2>
                    <h5 style={{marginBottom:'21px'}}>
                      Help john putting together her vacation album when she
                      returns
                    </h5>
                    <img
                      src={album}
                      alt="Project Seven"
                      style={jhonimgStyle}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default ContactContents;
