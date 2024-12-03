import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import snoozeIcon from "../../../../../../imgs/snoozeIcon.png";
import dismissIcon from "../../../../../../imgs/dismissIcon.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployeeNotification } from "../../../../../../services/api/notifications";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function ShowAllNotifications({
  displayedNotifications,
  getNotificationId,
  notifications,
}) {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const [postponedNotifications, setPostponedNotifications] = useState([]);
  const [archivedNotifications, setArchivedNotifications] = useState([]);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [hoveredNotificationId, setHoveredNotificationId] = useState(null);
  const [isPostponeBtnClicked, setIsPostponeBtnClicked] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState("")
  const queryClient = useQueryClient();
  const today = new Date().toLocaleDateString("en-GB");

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

  const postponeNotification = (id, date) => {
    const notification = notifications?.find((n) => n.id === id);
    if (notification) {
      setPostponedNotifications((prev) => [
        ...prev,
        { ...notification, date },
      ]);
      setNotification((prev) => prev.filter((n) => n.id !== id));
      setIsPostponeBtnClicked(false);
      setSelectedDate("");
    }
  };
  const handleDatePickerSelect = (date) => {
    const eventDateForShow = new Date(date)    
    eventDateForShow.setDate(eventDateForShow.getDate())
    setSelectedDate(eventDateForShow)   
    const eventDate = new Date(date)  
    eventDate.setDate(eventDate.getDate()+1)   
    setDate(eventDate)
  }
  const togglePostponeInput = (id) => {
    setIsPostponeBtnClicked((prev) => (prev === id ? false : id));
    setSelectedDate("");
    setShowDatePicker(false);
  };

  const enterHover = (id) => {
    setHoveredNotificationId(id);
  };

  const exitHover = () => {
    setHoveredNotificationId(null);
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

  const deleteNotification = async (id) => {
    const notification = { ...notifications.find((n) => n._id === id) };
    if (notification) {
      const updatedData = {
        id: notification._id,
        hasBeenDismissed: true,
        hasBeenHandled: notification.hasBeenHandled,
        notificationDueDate: notification.notificationDueDate,
      };
      await updateEmployeeNotification(updatedData);
    }
  };
  
  const snoozeNotification = async (id, eventDate) => {
    const notification = { ...notifications.find((n) => n._id === id) };
    if (notification) {     
      const updatedData = {
        id: notification._id,
        hasBeenDismissed: notification.hasBeenDismissed,
        hasBeenHandled: notification.hasBeenHandled,
        notificationDueDate: eventDate,
      };
      await updateEmployeeNotification(updatedData);
      setIsPostponeBtnClicked(false);
    }
  };
  const deleteNotificationMutation = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries(["allNotificationsData"]);
    },
  });
  const snoozeNotificationMutation = useMutation({
    mutationFn: snoozeNotification,
    onSuccess: () => {
      queryClient.invalidateQueries(["allNotificationsData"]);
    },
  });

  const calculateReminderDate = (eventDate, daysBefore) => {
    const dateOfTheEvent = new Date(eventDate);
    dateOfTheEvent.setDate(dateOfTheEvent.getDate() - daysBefore);
    return dateOfTheEvent;
  };
  const deleteAllNotifications = () => {
    setNotification([]);
    setSelectedNotifications([]);
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

  const showTooltipStyle = {
    visibility: "visible",
  };

  const [hoveredIcon, setHoveredIcon] = useState({
    snooze: null,
    dismiss: null,
  });

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
      hoveredNotificationId === notification._id ? "scale(1.02)" : "scale(1)",
  });
  const datePickerStyle = {
    padding: "5px",
    borderRadius: "5px",
    marginTop: "20px",
    marginLeft: "20px",
    display: "block",
    width: "250px",
  };
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
    <div style={{ display: "flex" }}>
      {/* First div containing the notifications */}
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {displayedNotifications.map((notification) => (
            <div
              key={notification._id}
              style={{
                ...notificationStyle(notification),
                backgroundColor: notification.dismissed ? "#f2f2f2" : "white",
              }}
            >
              <div style={priorityIndicatorStyle(notification.priority)}>
                {notification.priority}
              </div>
              <div
                onClick={() => getNotificationId(notification._id)}
                style={{
                  textDecoration: "none",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                <p
                  onMouseOver={() => enterHover(notification._id)}
                  onMouseOut={exitHover}
                  style={{
                    ...messageStyle(notification._id),
                    color: notification.read ? "dimgray" : "black",
                  }}
                >
                  {notification.message}
                </p>
              </div>
              {notification.image && (
                <img
                  src={notification.image}
                  alt="employee's image"
                  style={{ borderRadius: "16px", marginRight: "20px" }}
                  width={"35px"}
                  height={"32px"}
                />
              )}
              <div
                className="notificationIcons"
                style={{ display: "flex", gap: "20px" }}
              >
                {/* Snooze and dismiss icons */}
                <div
                  style={{ position: "relative" }}
                  onMouseEnter={() =>
                    setHoveredIcon({ ...hoveredIcon, snooze: notification._id })
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
                    onClick={() => togglePostponeInput(notification._id)}
                  />
                  <div
                    style={{
                      ...tooltipStyle,
                      ...(hoveredIcon.snooze === notification._id
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
                    setHoveredIcon({
                      ...hoveredIcon,
                      dismiss: notification._id,
                    })
                  }
                  onMouseLeave={() =>
                    setHoveredIcon({ ...hoveredIcon, dismiss: null })
                  }
                >
                  <div
                    onClick={() => {
                      deleteNotification(notification._id);
                      deleteNotificationMutation.mutate();
                    }}
                  >
                    <img
                      src={dismissIcon}
                      alt="dismiss-icon"
                      style={{ cursor: "pointer" }}
                      width={"20px"}
                      height={"20px"}
                    />
                    <div
                      style={{
                        ...tooltipStyle,
                        ...(hoveredIcon.dismiss === notification._id
                          ? showTooltipStyle
                          : {}),
                      }}
                    >
                      Dismiss
                    </div>
                  </div>
                </div>
              </div>
              {/* Postpone window */}
              {isPostponeBtnClicked === notification._id && (
                <div>
                  <select
                    id={`reminder-select-${notification._id}`}
                    style={{
                      padding: "5px",
                      borderRadius: "5px",
                      marginLeft: "20px",
                    }}
                    value={selectedDate === "custom" ? "custom" : ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "custom") {
                        setShowDatePicker(true);
                      } else {
                        const reminderDate = calculateReminderDate(
                          notification.date,
                          value
                        );
                        setSelectedDate(reminderDate);
                        setDate(reminderDate)
                      }
                    }}
                  >
                    <option value="" disabled>
                      Choose a date for your reminder
                    </option>
                    <option value="1">Remind me 1 day before the event</option>
                    <option value="3">Remind me 3 days before the event</option>
                    <option value="custom">Custom date</option>
                  </select>
                  {showDatePicker && (
                    <DatePicker
                      type="date"
                      placeholderText={today}
                      selected={selectedDate}
                      onChange={handleDatePickerSelect}
                      dateFormat="dd/MM/yyyy"
                      id={`date-${notification._id}`}
                      //styling ain't working for date picker
                      style={datePickerStyle}
                    />
                  )}
                  {date && (
                    <button
                      style={{
                        backgroundColor: "#FFC502",
                        border: "none",
                        borderRadius: "5px",
                        height: "30px",
                        marginTop: "10px",
                      }}
                      onClick={() => {
                        snoozeNotification(notification._id, date);
                        snoozeNotificationMutation.mutate();
                        postponeNotification(notification._id, date);
                      }}
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
      <div style={{ flex: 1 }}>
        {displayedNotifications.map((notification, index) => {
          const { day, month } = formatDate(notification.startDay);
          return (
            <div
              key={index}
              style={{
                position: "relative",
                display: "flex",
                right: "300px",
                flexDirection: "column", // Stack day and month vertically
                alignItems: "center", // Center the content
                justifyContent: "center", // Center the content vertically
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
