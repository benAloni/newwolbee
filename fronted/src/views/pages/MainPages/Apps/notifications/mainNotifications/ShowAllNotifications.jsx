import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import snoozeIcon from "../../../../../../imgs/snoozeIcon.png";
import dismissIcon from "../../../../../../imgs/dismissIcon.png";

export default function ShowAllNotifications({ displayedNotifications, getNotificationId, notifications }) {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null)
  const [postponedNotifications, setPostponedNotifications] = useState([]);
  const [archivedNotifications, setArchivedNotifications] = useState([]);

  const [modalContent, setModalContent] = useState(null);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [isNotificationVisible, setNotificationVisible] = useState(false);
  const [modalOpenfour, setModalOpenfour] = useState(false);
  const [modalOpenfive, setModalOpenfive] = useState(false);
  const [modalContentfour, setModalContentfour] = useState(null);
  const [modalContentfive, setModalContentfive] = useState(null);
  const [hoveredNotificationId, setHoveredNotificationId] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenTwo, setModalOpenTwo] = useState(false);
  const [modalOpenThree, setModalOpenThree] = useState(false);
  const [modalContentTwo, setModalContentTwo] = useState(null);
  const [modalContentThree, setModalContentThree] = useState(null);

  const [isPostponeBtnClicked, setIsPostponeBtnClicked] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState("");


  const markAsViewed = (id, link) => {
    setNotification((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, viewed: true }
          : notification
      )
    );
    navigate(link);
  };

  const messageStyle = (id) => ({
    textAlign: "left",
    position: "relative",
    right: "70px",
    paddingLeft: "20px",
    color: "black",

  });

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

  const showTooltipStyle = {
    visibility: "visible",
  };

  const [hoveredIcon, setHoveredIcon] = useState({
    snooze: null,
    dismiss: null,
  });

  const postponeNotification = (id, dateTime) => {
    const notification = notifications?.find((n) => n.id === id);
    if (notification) {
      setPostponedNotifications((prev) => [
        ...prev,
        { ...notification, dateTime },
      ]);
      setNotification((prev) => prev.filter((n) => n.id !== id));
      setIsPostponeBtnClicked(false);
      setSelectedDateTime("");
    }
  };

  const togglePostponeInput = (id) => {
    setIsPostponeBtnClicked((prev) => (prev === id ? false : id));
    setSelectedDateTime("");
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

  const toggleSelectNotification = (id) => {
    setSelectedNotifications((prev) =>
      prev.includes(id) ? prev.filter((nid) => nid !== id) : [...prev, id]
    );
  };

  const deleteSelectedNotifications = () => {
    setNotification((prev) =>
      prev.filter(
        (notification) => !selectedNotifications.includes(notification.id)
      )
    );
    setSelectedNotifications([]);
  };

  const deleteNotification = (id) => {
    const notification = notifications?.find((n) => n.id === id);
    if (notification) {
      // Add the dismissed notification to both archivedNotifications and notifications
      setArchivedNotifications((prev) => [
        ...prev,
        { ...notification, viewed: true },
      ]);
      setNotification((prev) => [
        ...prev.map((notification) =>
          notification.id === id
            ? { ...notification, viewed: true, dismissed: true }
            : notification
        ),
      ]);
    }
  };

  const deleteAllNotifications = () => {
    setNotification([]);
    setSelectedNotifications([]);
  };

  const handleClick = () => {
    navigate("/task-board", { state: { fromContact: true } });
  };

  const openModalfour = (notification) => {
    setModalContentfour(notification);
    setModalOpenfour(true);
  };

  const openModalfive = (notification) => {
    setModalContentfive(notification);
    setModalOpenfive(true);
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

  const priorityIndicatorStyle = (priority) => {
    let backgroundColor, color;

    switch (priority) {
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

  const formatDate = (dateString) => {    
    const date = new Date(dateString);
    const day = date.getDate(); // Gets the day of the month
    const month = date.toLocaleString("default", { month: "short" }); // Gets the short month name (e.g., "Sep")

    return { day, month };
  };

  return (
    <div style={{ display: 'flex' }}>  
      {/* First div containing the notifications */}
      <div style={{ width: '100%', }}>  
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {displayedNotifications.map((notification) => (          
          <div
            key={notification.id}
            onClick={() => getNotificationId(notification.id)}

            style={{
              ...notificationStyle(notification),
              backgroundColor: notification.dismissed ? "#f2f2f2" : "white",
            }}
          >
            <div style={priorityIndicatorStyle(notification.priority)}>
              {notification.priority}
            </div>
            <div
              onClick={() => {
                // your onClick logic here
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
            ) : null}
            <div
              className="notificationIcons"
              style={{ display: "flex", gap: "20px" }}
            >
              {/* Snooze and dismiss icons */}
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
                )}
              </div>
            )}
          </div>
        ))}
        </div>
      </div>
      
      {/* Second div containing the date and month */}
      <div style={{ flex: 1}}>  
        {displayedNotifications.map((notification, index) => {
          const { day, month } = formatDate(notification.startDay);
          return (
            <div
              key={index}
              style={{
                position: "relative",
                display: "flex",
                right:'300px',
                flexDirection: "column",  // Stack day and month vertically
                alignItems: "center",      // Center the content
                justifyContent: "center",  // Center the content vertically
                marginBottom: "23px",
                transition: "transform 0.2s ease-in-out",
                textAlign: "center",
              }}
            >
              <span style={{ fontSize: "24px", color: "#333" }}>{day}</span>
              <span style={{ fontSize: "20px", color: "#555" }}>{month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}  