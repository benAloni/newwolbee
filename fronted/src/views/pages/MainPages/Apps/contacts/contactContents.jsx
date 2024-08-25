import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import JohnStatistics from "./JohnStatistics";
import employee1 from "../../../../../imgs/avatar_4.JPG";
import employee2 from "../../../../../imgs/avatar_5.JPG";
import employee3 from "../../../../../imgs/avatar_6.JPG";
import employee4 from "../../../../../imgs/avatar_7.JPG";
import employee5 from "../../../../../imgs/avatar_8.JPG";
import employee6 from "../../../../../imgs/avatar_10.JPG";
import dismissIcon from "../../../../../imgs/dismissIcon.png";
import snoozeIcon from "../../../../../imgs/snoozeIcon.png";
// import employee1 from '../../../../../imgs/avatar_4.jpg';
// import employee2 from '../../../../../imgs/avatar_6.avif';
import { Modal, notification } from "antd";
import off from "../../../../../imgs/off.png";
import on from "../../../../../imgs/on.png";
import offgift from "../../../../../imgs/giftoff.png";
import "./modal.css";
import rescheduling from "../../../../../imgs/rescheduling.png";
import email from "../../../../../imgs/email.png";
import { TiPin } from "react-icons/ti";
import nicole from "../../../../../imgs/avatar_4.JPG";
import jacob from "../../../../../imgs/jacob.jpg";
import thankyou from "../../../../../imgs/thankyou.png";
import showAppreciation from "../../../../../imgs/showAppreciation.png";
import personalTime from "../../../../../imgs/personalTime.png";
import additionalTime from "../../../../../imgs/additionalTime.png";
import family from "../../../../../imgs/family.png";
import publicR from "../../../../../imgs/publicR.png";
import john from "../../../../../imgs/avatar_6.JPG";
import album from "../../../../../imgs/album.png";
import sweet from "../../../../../imgs/sweet.png";
import travelPillow from "../../../../../imgs/travelPillow.png";
import rating from "../../../../../imgs/rating.png";
import coffeeCup from "../../../../../imgs/coffeeCup.png";
import invitationcard from "../../../../../imgs/invitationcard.png";
const ContactContents = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalOpenTwo, setModalOpenTwo] = useState(false);
  const [modalOpenThree, setModalOpenThree] = useState(false);
  const [modalContentTwo, setModalContentTwo] = useState(null);
  const [modalContentThree, setModalContentThree] = useState(null);
  const [modalOpenfour, setModalOpenfour] = useState(false);
  const [modalOpenfive, setModalOpenfive] = useState(false);
  const [modalContentfour, setModalContentfour] = useState(null);
  const [modalContentfive, setModalContentfive] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      importance: "High",
      priorityNumber: 3,
      message: "Nicole's birthday is coming soon. Send her a gift!",
      link: "/departments",
      read: false,
      viewed: false,
      dismissed: false,
      image: nicole,
    },
    {
      id: 2,
      importance: "Medium",
      priorityNumber: 2,
      message:
        "Tomorrow is the international pizza day. View your options for spoiling your team!",
      link: "/task-board",
      read: false,
      dismissed: false,
      viewed: false,
    },
    {
      id: 3,
      importance: "High",
      priorityNumber: 3,
      message:
        "The Fourth of July celebration is in one month. Ensure there are food options for those with allergies and dietary preferences.",
      link: "/low-importance-notification",
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
      link: "#",
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
      read: false,
      viewed: false,
      dismissed: false,
    },
    {
      id: 8,
      importance: "High",
      priorityNumber: 3,
      message:
        "Dana is flying to rome tomorrow - lets make it a real vacation for her.",
      link: "/low-importance-notification",
      read: false,
      dismissed: false,
      viewed: false,
    },
  ]);

  //John Answer
  const [modalOpenNo, setModalOpenNo] = useState(false);
  const [modalOpenYes, setModalOpenYes] = useState(false);
  const [modalContentNo, setModalContentNo] = useState(null);
  const [modalContentYes, setModalContentYes] = useState(null);

  //-----------

  const [postponedNotifications, setPostponedNotifications] = useState([]);
  const [archivedNotifications, setArchivedNotifications] = useState([]);
  const [isPostponeBtnClicked, setIsPostponeBtnClicked] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [selectedSortingOption, setSelectedSortingOption] = useState(
    "Priority high - low"
  );
  const [hoveredNotificationId, setHoveredNotificationId] = useState(null);
  const [hoveredIcon, setHoveredIcon] = useState({
    snooze: null,
    dismiss: null,
  });
  const [viewOption, setViewOption] = useState("All");
  const navigate = useNavigate();
  //

  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [isNotificationVisible, setNotificationVisible] = useState(false);

  const toggleSelectNotification = (id) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((nid) => nid !== id) : [...prev, id]
    );
  };

  const deleteSelectedNotifications = () => {
    setNotifications((prev) =>
      prev.filter(
        (notification) => !selectedNotifications.includes(notification.id)
      )
    );
    setSelectedNotifications([]);
  };

  const deleteAllNotifications = () => {
    setNotifications([]);
    setSelectedNotifications([]);
  };

  const toggleNotificationVisibility = () => {
    setNotificationVisible(!isNotificationVisible);
  };

  const handleClick = () => {
    navigate("/task-board", { state: { fromContact: true } });
  };

  const openModalfour = (notification) => {
    setModalContentfour(notification);
    setModalOpenfour(true);
  };
  const closeModalfour = () => {
    setModalOpenfour(false);
  };
  const openModalfive = (notification) => {
    setModalContentfive(notification);
    setModalOpenfive(true);
  };
  const closeModalfive = () => {
    setModalOpenfive(false);
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
  const markAsViewed = (id, link) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, viewed: true }
          : notification
      )
    );
    navigate(link);
  };

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

  const markAsViewedAndArchive = (id) => {
    const notification = notifications.find((n) => n.id === id);
    if (notification) {
      setArchivedNotifications((prev) => [
        ...prev,
        { ...notification, viewed: true },
      ]);
      markAsViewed(id);
    }
  };

  const deleteNotification = (id) => {
    const notification = notifications.find((n) => n.id === id);
    if (notification) {
      // Add the dismissed notification to both archivedNotifications and notifications
      setArchivedNotifications((prev) => [
        ...prev,
        { ...notification, viewed: true },
      ]);
      setNotifications((prev) => [
        ...prev.map((notification) =>
          notification.id === id
            ? { ...notification, viewed: true, dismissed: true }
            : notification
        ),
      ]);
    }
  };

  const togglePostponeInput = (id) => {
    setIsPostponeBtnClicked((prev) => (prev === id ? false : id));
    setSelectedDateTime("");
  };

  const postponeNotification = (id, dateTime) => {
    const notification = notifications.find((n) => n.id === id);
    if (notification) {
      setPostponedNotifications((prev) => [
        ...prev,
        { ...notification, dateTime },
      ]);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
      setIsPostponeBtnClicked(false);
      setSelectedDateTime("");
    }
  };

  const enterHover = (id) => {
    setHoveredNotificationId(id);
  };

  const exitHover = () => {
    setHoveredNotificationId(null);
  };

  const openModal = (notification) => {
    setModalContent(notification);
    setModalOpen(true);
  };

  const openModalTwo = (notification) => {
    setModalContentTwo(notification);
    setModalOpenTwo(true);
  };
  const openModalThree = (notification) => {
    setModalContentThree(notification);
    setModalOpenThree(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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
  // ----------

  const notificationContainerStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
  };

  const notificationStyle = (notification) => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "15px",
    transition: "transform 0.2s ease-in-out",
    width: "70%",
    textAlign: "center",
    marginLeft: "170px",
    // backgroundColor: 'white',
    backgroundColor: notification.dismissed ? "#f2f2f2" : "white",
    transform:
      hoveredNotificationId === notification.id ? "scale(1.02)" : "scale(1)",
  });

  const ulStyle = {
    margin: 0,
    padding: 0,
    textAlign: "center", // Center align the text
    listStyleType: "none", // Remove bullet points
  };

  const listItemStyle = {
    listStyleType: "none",
  };

  const bodyDarkOverlayStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // כהות חצי שקופה
    zIndex: "999", // כדי שההכהות תהיה מעל כל התוכן האחר
    display: isNotificationVisible ? "block" : "none",
  };

  const importanceIndicatorStyle = (importance) => {
    let backgroundColor, color;

    switch (importance) {
      case "High":
        backgroundColor = "#FDE0E2";
        color = "#FE7373";
        break;
      case "Medium":
        backgroundColor = "papayawhip";
        color = "#ffb544";
        break;
      case "Low":
        backgroundColor = "#90ee90";
        color = "#50d250";
        break;
      default:
        backgroundColor = "black";
        color = "white";
        break;
    }

    return {
      width: "100px",
      height: "30px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: "bold",
      marginRight: "20px",
      fontSize: "14px",
      backgroundColor,
      color,
      borderRadius: "5px",
      position: "relative",
      bottom: "33px",
      right: "50px",
    };
  };

  const messageStyle = (id) => ({
    flexGrow: 1,
    textAlign: "left",
    position: "relative",
    right: "70px",
    paddingLeft: "20px",
    color: "black",
  });

  const postponedNotificationContainerStyle = {
    marginTop: "50px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    padding: "20px",
    width: "70%",
    marginLeft: "170px",
  };

  const postponeWindowStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "10px",
    position: "absolute",
    right: "-200px",
    width: "180px",
    height: "130px",
    backgroundColor: "white",
    padding: "10px",
    border: "1px solid black",
    borderRadius: "5px",
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "5px",
    left: "5px",
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  };
  const pinIconSize = 24;
  const tooltipStyle = {
    position: "absolute",
    backgroundColor: "#333",
    color: "#fff",
    padding: "5px",
    borderRadius: "3px",
    fontSize: "12px",
    visibility: "hidden",
    zIndex: 1,
    top: "40px", // adjust as needed for better positioning
    left: "50%",
    transform: "translateX(-50%)",
  };

  const showTooltipStyle = {
    visibility: "visible",
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (viewOption === "All") {
      return true;
    } else if (viewOption === "New") {
      return !notification.viewed;
    } else if (viewOption === "Archive") {
      return notification.viewed;
    }
    return true;
  });

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
        <div
          className="viewOptions"
          style={{
            display: "flex",
            justifyContent: "right",
            position: "relative",
            right: "260px",
            top: "5px",
          }}
        >
          <ul
            style={{
              listStyleType: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              gap: "30px",
              fontSize: "18px",
            }}
          >
            <li
              style={{ cursor: "pointer", transition: "background-color 0.3s" }}
              onClick={() => setViewOption("All")}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f7b500")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "initial")}
            >
              All
            </li>
            <li
              style={{ cursor: "pointer", transition: "background-color 0.3s" }}
              onClick={() => setViewOption("New")}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f7b500")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "initial")}
            >
              New
            </li>
            <li
              style={{ cursor: "pointer", transition: "background-color 0.3s" }}
              onClick={() => setViewOption("Archive")}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#f7b500")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "initial")}
            >
              Archive
            </li>
          </ul>
        </div>
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
      <br />
      {filteredNotifications.map((notification) => (
        <div
          key={notification.id}
          style={{
            ...notificationStyle(notification),
            backgroundColor: notification.dismissed ? "#f2f2f2" : "white",
          }}
        >
          <div style={importanceIndicatorStyle(notification.importance)}>
            {notification.importance}
          </div>
          <div
            onClick={() => {
              if (notification.id === 4) {
                openModal(notification);
              } else if (notification.id === 3) {
                openModalTwo(notification);
              } else if (notification.id === 6) {
                openModalThree(notification);
              } else if (notification.id === 7) {
                openModalfour(notification);
              } else if (notification.id === 8) {
                openModalfive(notification);
              } else if (notification.id === 2) {
                handleClick();
              } else {
                markAsViewed(notification.id, notification.link);
              }
            }}
            style={{ textDecoration: "none", width: "100%", cursor: "pointer" }}
          >
            <p
              onMouseOver={() => enterHover(notification.id)}
              onMouseOut={exitHover}
              style={{
                ...messageStyle(notification.id),
                color: notification.read ? "dimgray" : "black",
              }}
            >
              {notification.message}
            </p>
          </div>
          {notification.image ? (
            <img
              src={notification.image}
              alt="worker's image"
              style={{ borderRadius: "16px", marginRight: "20px" }}
              width={"35px"}
              height={"32px"}
            />
          ) : (
            <></>
          )}
          {/* Notification icons */}
          <div
            className="notificationIcons"
            style={{ display: "flex", gap: "20px" }}
          >
            {/* Snooze icon */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() =>
                setHoveredIcon({ ...hoveredIcon, snooze: notification.id })
              }
              onMouseLeave={() =>
                setHoveredIcon({ ...hoveredIcon, snooze: null })
              }
            >
              <img
                src={snoozeIcon}
                alt="snooze-icon"
                style={{ cursor: "pointer" }}
                width={"27px"}
                height={"27px"}
                onClick={() => togglePostponeInput(notification.id)}
              />
              <div
                style={{
                  ...tooltipStyle,
                  ...(hoveredIcon.snooze === notification.id
                    ? showTooltipStyle
                    : {}),
                }}
              >
                Snooze
              </div>
            </div>
            {/* Dismiss icon */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() =>
                setHoveredIcon({ ...hoveredIcon, dismiss: notification.id })
              }
              onMouseLeave={() =>
                setHoveredIcon({ ...hoveredIcon, dismiss: null })
              }
            >
              <img
                src={dismissIcon}
                alt="dismiss-icon"
                style={{ cursor: "pointer" }}
                width={"20px"}
                height={"20px"}
                onClick={() => deleteNotification(notification.id)}
              />
              <div
                style={{
                  ...tooltipStyle,
                  ...(hoveredIcon.dismiss === notification.id
                    ? showTooltipStyle
                    : {}),
                }}
              >
                Dismiss
              </div>
            </div>
          </div>
          {/* Postpone window */}
          {isPostponeBtnClicked === notification.id && (
            <div style={postponeWindowStyle}>
              <button
                style={closeButtonStyle}
                onClick={() => setIsPostponeBtnClicked(false)}
              >
                X
              </button>
              <input
                type="datetime-local"
                id={`datetime-${notification.id}`}
                style={{
                  padding: "5px",
                  borderRadius: "5px",
                  marginTop: "20px",
                }}
                value={selectedDateTime}
                onChange={(e) => setSelectedDateTime(e.target.value)}
              />
              {selectedDateTime && (
                <button
                  style={{
                    backgroundColor: "#FFC502",
                    border: "none",
                    borderRadius: "5px",
                    height: "30px",
                  }}
                  onClick={() =>
                    postponeNotification(notification.id, selectedDateTime)
                  }
                >
                  Confirm
                </button>
              )}{" "}
            </div>
          )}
        </div>
      ))}

      {/* Modal for notification John */}
      <div style={rowStyle}>
        {modalOpenThree && modalContentThree && (
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
      <div>
        {modalOpenTwo && modalContentTwo && (
          <Modal onCancel={closeModalTwo} visible={modalOpenTwo} footer={null}>
            <ul style={ulStyle}>
              <li style={listItemStyle}>
                <h2 style={{ width: "100%" }}>We are celebrating!</h2>
                <br />
                <h5>
                  {" "}
                  The annual Fourth of July celebration is just one month away!
                  Please keep in mind that some of your team members have
                  special food preferences. This is a wonderful opportunity to
                  show your appreciation by making sure they have their favorite
                  foods available.{" "}
                </h5>
                <br />
                <h5>You team has:</h5>
                <ul>
                  <li>Nicole is allergic to gluten and eggs</li>
                  <li>Lisa and Josh are vegetarian</li>
                  <li>Mark is Vegan</li>
                </ul>
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
                <a
                  href={`mailto:organizingteam@example.com?subject=Fourth%20of%20July%20Celebration&body=${encodeURIComponent(
                    `I hope this email finds you well. As we prepare for the upcoming Fourth of July celebration, I would like to ensure that we accommodate the special dietary needs of several of my team members. Here are the specific requirements:\n\n` +
                      `1. Gluten and Egg Allergy: One team member is allergic to both gluten and eggs.\n` +
                      `2. Vegetarian: Two team members are vegetarians.\n` +
                      `3. Vegan: One team member follows a vegan diet.\n\n` +
                      `I would appreciate it if the catering team could make the necessary arrangements to provide suitable meal options for these individuals. Ensuring everyone has appropriate food options will help make the event enjoyable for all attendees.\n\n` +
                      `If the catering team needs any additional information regarding specific dietary restrictions or preferences, please feel free to reach out to me. I am happy to provide any details to ensure the accommodations are accurate and satisfactory.\n\n` +
                      `Thank you in advance for your attention to this matter. Please let me know if you need any further details or assistance.\n\n` +
                      `Best regards,`
                  )}`}
                >
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
                    <div
                      className="image-container"
                      style={imageContainerStyle}
                    >
                      <img src={email} alt="Project Seven" style={imgStyle} />
                    </div>
                    <div
                      className="project-details"
                      style={projectDetailsTextStyle}
                    >
                      <h3 style={h3Style}>
                        Click here to email the organizing team.
                      </h3>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </Modal>
        )}
      </div>

      {modalOpen && modalContent && (
        <Modal onCancel={closeModal} visible={modalOpen} footer={null}>
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

      {modalOpenfour && modalContentfour && (
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
              <div className="image-container" style={imageContainerStyle}>
                <img src={employee1} alt="Project Seven" style={imgStyle} />
              </div>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h3Style}>Employee Name</h3>
              </div>
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
              <div className="image-container" style={imageContainerStyle}>
                <img src={employee2} alt="Project Seven" style={imgStyle} />
              </div>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h3Style}>Employee Name</h3>
              </div>
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
              <div className="image-container" style={imageContainerStyle}>
                <img src={employee3} alt="Project Seven" style={imgStyle} />
              </div>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h3Style}>Employee Name</h3>
              </div>
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
              <div className="image-container" style={imageContainerStyle}>
                <img src={employee4} alt="Project Seven" style={imgStyle} />
              </div>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h3Style}>Employee Name</h3>
              </div>
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
              <div className="image-container" style={imageContainerStyle}>
                <img src={employee5} alt="Project Seven" style={imgStyle} />
              </div>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h3Style}>Employee Name</h3>
              </div>
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
              <div className="image-container" style={imageContainerStyle}>
                <img src={employee6} alt="Project Seven" style={imgStyle} />
              </div>
              <div className="project-details" style={projectDetailsTextStyle}>
                <h3 style={h3Style}>Employee Name</h3>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {/* {Modal for notification 8}  */}
      <div>
        {modalOpenfive && modalContentfive && (
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
                  <h3>Dana's Trip: Recharge and Refresh!</h3>
                  Dana will be heading to Rome for an 8-day vacation in two
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
                    <h3 >Have a Great Vacation:</h3>
                    <h4>
                      Send Dana a quick message wishing her a fantastic vacation
                    </h4><br />
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
                    style={projectDetailsTextStyle}
                  >
                    <h3>Airport Treats:</h3>
                    <h4 style={h3Style}>
                      Send Dana a voucher to use while she's waiting for her
                      flight
                    </h4>
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
                    <h3>Top Trip Tips:</h3>
                    <h4 style={h3Style}>
                      Give Dana some fantastic recommendations for her trip
                    </h4>
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
                    <h3>Travel Kit:</h3>
                    <h4 style={h3Style}>
                      Prepare a travel kit for Dana to use on her trip
                    </h4>
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
                    <h3>Warm Welcome:</h3>
                    <h4 style={h3Style}>
                      Plan a warm welcome for Dana when she arrives at her
                      destination
                    </h4>
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
                    <h2>Vacation Album:</h2>
                    <h3 style={h3Style}>
                      Help Dana putting together her vacation album when she
                      returns
                    </h3>
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
