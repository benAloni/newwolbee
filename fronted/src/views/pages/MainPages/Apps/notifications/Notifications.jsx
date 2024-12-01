import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Holidays from "date-holidays";
import ShowAllNotifications from "./mainNotifications/ShowAllNotifications";
import HeaderNotifications from "./mainNotifications/HeaderNotifications";
import ShowNewNotifications from "./mainNotifications/ShowNewNotifications";
import JohnStatistics from "../contacts/JohnStatistics";
import tom from "../../../../../imgs/avatar_2.JPG";
import employee2 from "../../../../../imgs/avatar_5.JPG";
import employee3 from "../../../../../imgs/avatar_6.JPG";
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
import { userProfile } from "../../../../../imgs";
import {
  fetchEmployeesNotifications,
  fetchEmployeesProfilePics,
  fetchNotifications,
} from "../../../../../services";
import staticNotificationsData from "./staticNotifications";
import { useQuery } from "@tanstack/react-query";
import NotificationsModals from "../../../../../components/Modals/Notifications/NotificationsModals";

const Notifications = () => {
  const navigate = useNavigate();
  const [homeMeetingModal, setHomeMeetingModal] = useState(false);
  const [employeeWorkRoutineModal, setEmployeeWorkRoutineModal] = useState(false);
  const [soccerGameModal, setSoccerGameModal] = useState(false);
  const [vacationModal, setVacationModal] = useState(false);


  const [viewOption, setViewOption] = useState("All");
  const [currentPage, setCurrentPage] = useState(0); // Track the current page
  const itemsPerPage = 10; // Number of notifications per page
  const [notifications, setNotifications] = useState([]);
  const staticNotifications = staticNotificationsData;
  const [countryCode, setCountryCode] = useState("IL");

  // Fetch notifications and employee data
  const fetchData = async () => {
    const [notifications, employeesNotifications] = await Promise.all([
      fetchNotifications(),
      getNotificationsWithEmployeesProfilePics(),
    ]);
    return [...notifications, ...employeesNotifications];
  };
  const getNotificationsWithEmployeesProfilePics = async () => {
    let employeesNotificationsWithProfilePics;
    try {
      const notifications = await fetchEmployeesNotifications();
      employeesNotificationsWithProfilePics = await Promise.all(
        notifications?.map(async (notification) => {
          const profilePicUrl = await fetchEmployeesProfilePics(
            notification.uid,
            notification.eventDetails.employeeId
          );
          return {
            ...notification,
            avatar: profilePicUrl || userProfile,
          };
        })
      );
      return employeesNotificationsWithProfilePics;
    } catch (error) {
      console.log("Error getting notifications :", error);
    }
  };
  const { data } = useQuery({
    queryKey: ["allNotificationsData"],
    queryFn: fetchData,
  });
  const fetchHolidaysAndGenerateNotifications = async () => {
    const currentYear = new Date().getFullYear();
    const today = new Date();

    // Fetch holidays based on country code for the current year
    const hd = new Holidays(countryCode);
    const holidayData = hd.getHolidays(currentYear);

    // Format holidays, adjusting to the next year if today's date has passed the holiday date
    const formattedHolidays = holidayData.map((holiday) => {
      const holidayDate = new Date(holiday.date);
      // If holiday has passed, set it to the same date in the next year
      if (holidayDate < today) {
        holidayDate.setFullYear(currentYear + 1);
      }
      return {
        name: holiday.name,
        date: holidayDate.toISOString().split("T")[0], // format as YYYY-MM-DD
      };
    });

    // Generate notifications when both data and holidays are available
    if (data && formattedHolidays.length > 0) {
      const eventNotifications = data.flatMap((event) => {
        const notifications = [];

        // Birthday Notification
        if (event.eventDetails?.type === "birthday") {
          notifications.push({
            _id: event._id,
            id: event.eventDetails.employeeId,
            priority: event.priority,
            message: event.title,
            link: "/events",
            read: false,
            viewed: false,
            dismissed: false,
            image: event.avatar,
            startDay: event.notificationCreatedAt,
            date: event.eventDetails.dateOfTheEvent,
            className: "birthday",
          });
        }

        // Vacation Notification
        if (event.eventDetails?.type === "vacation") {
          const vacationStartDate = new Date(event.notificationCreatedAt);
          vacationStartDate.setDate(vacationStartDate.getDate() - 1); //subtracting by one day cuz notificationCreatedAt is saved in mongo without time zone
          notifications.push({
            _id: event._id,
            id: event.eventDetails.employeeId,
            priority: event.priority,
            message: event.title,
            link: "/events",
            read: false,
            viewed: false,
            dismissed: false,
            image: event.avatar,
            startDay: vacationStartDate,
            date: event.eventDetails.dateOfTheEvent,
            className: "vacation",
          });
        }

        // Holiday Notification

        // formattedHolidays.forEach((holiday) => {
        //   if (event.title === holiday.name) {
        //     notifications.push({
        //       _id: event._id,
        //       priority: "Low",
        //       priorityNumber: 1,
        //       message: `${holiday.name} is coming up on ${new Date(
        //         holiday.date
        //       ).toLocaleDateString()}`,
        //       fullName: holiday.name,
        //       link: "/events",
        //       title: holiday.name,
        //       start: holiday.date,
        //       className: event.className,
        //       read: false,
        //       viewed: false,
        //       dismissed: false,
        //       startDay: today,
        //       description: event.description,
        //       underDescription: event.underDescription,
        //       options: event.options,
        //     });
        //   }
        // });

        return notifications;
      });
      setNotifications([...staticNotifications, ...eventNotifications]);
    }
  };
  // Combined useEffect to fetch holidays and generate notifications
  useEffect(() => {
    fetchHolidaysAndGenerateNotifications();
  }, [data, countryCode]);

  //John's Answer
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

  const closeSoccerGameModal = () => {
    setSoccerGameModal(false);
  };

  const closeVacationModal = () => {
    setVacationModal(false);
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
  const johnAnswer = {
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null); // Reset modal content when closing
  };

  const closeEmployeeWorkRoutineModal = () => {
    setEmployeeWorkRoutineModal(false);
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

  if (viewOption !== "New") {
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

  const [showPopup, setShowPopup] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const getNotificationId = (mongoId) => {
    const notification = notifications.find((val) => val._id === mongoId);       
    if (notification.className === "birthday") {
      navigate(`/get-a-birthday-present/${notification.id}`);
    } else if (
      notification.className === "bg-info" &&
      notification.options !== undefined
    ) {
      setShowPopup("bg-info");
      setModalContent(notification); 
      setModalOpen(true); 
    } else if (notification.className === "bg-pink") {
      navigate("/task-board", {
        state: { data: notification },
      });
    } else if (notification.className === "nicole's-meeting") {
      setModalContent(notification); 
      setHomeMeetingModal(true); 
    } else if (notification.className === "vacation") {
      setVacationModal(true);
    } else if (notification.className === "john's-work-routine") {
      setEmployeeWorkRoutineModal(true);
    } else if (notification.className === "soccer-game") {
      setSoccerGameModal(true);
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
        <HeaderNotifications
          setViewOption={setViewOption}
          displayedNotifications={displayedNotifications}
        />
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
      {viewOption === "New" && (
        <ShowNewNotifications
          notifications={notifications}
          getNotificationId={getNotificationId}
        />
      )}

      {viewOption === "All" && (
        <ShowAllNotifications
          getNotificationId={getNotificationId}
          displayedNotifications={displayedNotifications}
          notifications={notifications}
        />
      )}

      <ShowHolidaysNotifications
        modalOpen={modalOpen}
        modalContent={modalContent}
        closeModal={closeModal}
      />
      {/* employee work routine modal*/}
      <div style={rowStyle}>
        <NotificationsModals 
        employeeWorkRoutineModal={employeeWorkRoutineModal}
        closeEmployeeWorkRoutineModal={closeEmployeeWorkRoutineModal}
        openModalYes={openModalYes}
        openModalNo={openModalNo}
        />
      </div>

      {/* ------- John answer Yes---------- */}
      <div>
      {modalOpenYes && modalContentYes && (
        <NotificationsModals 
        modalOpenYes={modalOpenYes}
        openModalNo={openModalNo}
        openModalYes={openModalYes}
        modalContentYes={ modalContentYes}
        closeModalYes={closeModalYes}
       />
      )}        
      </div>

      {/* --------John answer no ---------- */}
      <div>
        {modalOpenNo && modalContentNo && (
          <NotificationsModals 
          modalOpenNo={modalOpenNo}
          openModalNo={openModalNo}
          openModalYes={openModalYes}
          modalContentNo={ modalContentNo}
          closeModalNo={closeModalNo}
          />
        )}
      </div>

      {/*home meeting modal */}
      {homeMeetingModal && modalContent && (
        <NotificationsModals 
        modalContent={modalContent}
        closeModal={closeModal}
        homeMeetingModal={homeMeetingModal}
        />
      )}

      {/* Soccer game modal}  */}

      {soccerGameModal && (
        <Modal onCancel={closeSoccerGameModal} open={soccerGameModal} footer={null}>
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: "20px",
                margin: "20px 0",
              }}
            >
              <div className="image-container" style={imageContainerStyle}>
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
                <h3 style={h5Style}>
                  Consider allowing them to leave a bit early on game day
                </h3>
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
                <h3 style={h5Style}>
                  Organize a small viewing event at the office
                </h3>
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
                <h3 style={h5Style}>
                  Leave a note wishing them and their team good luck
                </h3>
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
                <h3 style={h5Style}>
                  Decorate the office with their team's colors or flags to
                  create a festive atmosphere. But, make sure there are no fans
                  of the opposite team
                </h3>
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
                <h3 style={h5Style}>
                  Feature their enthusiasm on the company's social media
                  channels with a spotlight post or story
                </h3>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {/* {vacation modal}  */}
      <div>
        {vacationModal && (
          <Modal onCancel={closeVacationModal} open={vacationModal} footer={null}>
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
                  <h3>John's Trip: Recharge and Refresh!</h3>
                  John will be heading to Rome for an 8-day vacation in two
                  days. Let's ensure he relaxes and enjoys his time off by
                  reassuring him that everything at work is in good hands. Here
                  are some ways to help him feel confident leaving work behind{" "}
                  <br />
                  <br />
                  vacations are vital for employeesNotifications, offering a
                  break to recharge and prevent burnout. They boost morale,
                  increase productivity, and bring a fresh perspective.
                  Encouraging time off supports work-life balance and leads to a
                  more engaged and motivated team
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
                  style={johnAnswer}
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
                    <h4 style={{ fontSize: "24px", marginBottom: "10px" }}>
                      Have a Great vacation:
                    </h4>
                    <h5>
                      Send John a quick message wishing him a fantastic vacation
                    </h5>
                    <br />
                    <img
                      src={invitationcard}
                      alt="Project Seven"
                      style={jhonimgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={johnAnswer}
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
                    <h3
                      style={{
                        fontSize: "25px",
                        marginBottom: "28px",
                        marginTop: "10px",
                      }}
                    >
                      Airport Treats:
                    </h3>
                    <h5 style={{ marginBottom: "18px" }}>
                      Send John a voucher to use while he's waiting for his
                      flight
                    </h5>
                    <img
                      src={coffeeCup}
                      alt="Project Seven"
                      style={jhonimgStyle}
                    />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={johnAnswer}
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
                    <h3
                      style={{
                        fontSize: "25px",
                        marginBottom: "26px",
                        marginTop: "10px",
                      }}
                    >
                      Top Trip Tips:
                    </h3>
                    <h5 style={{ marginBottom: "21px" }}>
                      Give John some fantastic recommendations for his trip
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
                  style={johnAnswer}
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
                    <h3
                      style={{
                        fontSize: "25px",
                        marginBottom: "26px",
                        marginTop: "10px",
                      }}
                    >
                      Travel Kit:
                    </h3>
                    <h5 style={{ marginBottom: "38px" }}>
                      Prepare a travel kit for John to use on his trip
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
                  style={johnAnswer}
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
                    <h3
                      style={{
                        fontSize: "25px",
                        marginBottom: "26px",
                        marginTop: "10px",
                      }}
                    >
                      Warm Welcome:
                    </h3>
                    <h5 style={{ marginBottom: "21px" }}>
                      Plan a warm welcome for John when he arrives to his
                      destination
                    </h5>
                    <img src={sweet} alt="Project Seven" style={jhonimgStyle} />
                  </div>
                </div>
                <div
                  className="project-card"
                  style={johnAnswer}
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
                    <h2
                      style={{
                        fontSize: "25px",
                        marginBottom: "26px",
                        marginTop: "10px",
                      }}
                    >
                      vacation Album:
                    </h2>
                    <h5 style={{ marginBottom: "21px" }}>
                      Help John putting together his vacation album when he
                      returns
                    </h5>
                    <img src={album} alt="Project Seven" style={jhonimgStyle} />
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

export default Notifications;
