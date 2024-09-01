import React, { useState, useEffect } from "react";

import snoozeIcon from "../../../../../../imgs/snoozeIcon.png";
import dismissIcon from "../../../../../../imgs/dismissIcon.png";

export default function ShowNewNotifications({ notifications, getNotificationId }) {
  const [eventsNextWeek, setEventsNextWeek] = useState([]);

  const getEventsForNextWeek = () => {
    const today = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(today.getDate() + 7);
  
    return notifications
      .filter((event) => {
        const eventDate = new Date(event.date);
        const day = eventDate.getDate();
        const month = eventDate.toLocaleString("default", { month: "short" });
  
        // Logic for Birthday events
        if (event.className === "Birthday") {
          const twoWeeksBefore = new Date(eventDate);
          twoWeeksBefore.setDate(eventDate.getDate() - 14);
  
          const twoWeeksAfter3Days = new Date(twoWeeksBefore);
          twoWeeksAfter3Days.setDate(twoWeeksBefore.getDate() + 3);
  
          const oneWeekBefore = new Date(eventDate);
          oneWeekBefore.setDate(eventDate.getDate() - 7);
  
          const oneWeekAfter3Days = new Date(oneWeekBefore);
          oneWeekAfter3Days.setDate(oneWeekBefore.getDate() + 3);
  
          const oneDayBefore = new Date(eventDate);
          oneDayBefore.setDate(eventDate.getDate() - 1);
  
          if (today >= twoWeeksBefore && today <= twoWeeksAfter3Days) {
            event.priorityNumber = 1;
            event.importance = "Low";
            event.day = day;
            event.month = month;
            return true;
          }
  
          if (today >= oneWeekBefore && today <= oneWeekAfter3Days) {
            event.priorityNumber = 2;
            event.importance = "Medium";
            event.day = day;
            event.month = month;
            return true;
          }
  
          if (
            today.getDate() === oneDayBefore.getDate() &&
            today.getMonth() === oneDayBefore.getMonth() &&
            today.getFullYear() === oneDayBefore.getFullYear()
          ) {
            event.priorityNumber = 3;
            event.importance = "High";
            event.day = day;
            event.month = month;
            return true;
          }
  
          return false;
        }
  
        // Logic for other events (non-Birthday)
        const oneMonthBefore = new Date(eventDate);
        oneMonthBefore.setMonth(eventDate.getMonth() - 1);
  
        const oneMonthAfter3Days = new Date(oneMonthBefore);
        oneMonthAfter3Days.setDate(oneMonthBefore.getDate() + 3);
  
        const twoWeeksBefore = new Date(eventDate);
        twoWeeksBefore.setDate(eventDate.getDate() - 14);
  
        const twoWeeksAfter3Days = new Date(twoWeeksBefore);
        twoWeeksAfter3Days.setDate(twoWeeksBefore.getDate() + 3);
  
        const oneWeekBefore = new Date(eventDate);
        oneWeekBefore.setDate(eventDate.getDate() - 7);
  
        const oneWeekAfter3Days = new Date(oneWeekBefore);
        oneWeekAfter3Days.setDate(oneWeekBefore.getDate() + 3);
  
        const oneDayBefore = new Date(eventDate);
        oneDayBefore.setDate(eventDate.getDate() - 1);
  
        if (today >= oneMonthBefore && today <= oneMonthAfter3Days) {
          event.priorityNumber = 1;
          event.importance = "Low";
          event.day = day;
          event.month = month;
          return true;
        }
  
        if (today >= twoWeeksBefore && today <= twoWeeksAfter3Days) {
          event.priorityNumber = 2;
          event.importance = "Low";
          event.day = day;
          event.month = month;
          return true;
        }
  
        if (today >= oneWeekBefore && today <= oneWeekAfter3Days) {
          event.priorityNumber = 3;
          event.importance = "Medium";
          event.day = day;
          event.month = month;
          return true;
        }
  
        if (
          today.getDate() === oneDayBefore.getDate() &&
          today.getMonth() === oneDayBefore.getMonth() &&
          today.getFullYear() === oneDayBefore.getFullYear()
        ) {
          event.priorityNumber = 4;
          event.importance = "High";
          event.day = day;
          event.month = month;
          return true;
        }
  
        return false;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sorting the events by date
  };
  
  

  useEffect(() => {
    const eventsForNextWeek = getEventsForNextWeek();
    setEventsNextWeek(eventsForNextWeek);
  }, [notifications]);

  const togglePostponeInput = (id) => {
    // setIsPostponeBtnClicked((prev) => (prev === id ? false : id));
    // setSelectedDateTime("");
  };

  //css

  const [hoveredIcon, setHoveredIcon] = useState({
    snooze: null,
    dismiss: null,
  });

  const showTooltipStyle = {
    visibility: "visible",
  };

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
    backgroundColor: notification.dismissed ? "#f2f2f2" : "white",
  });

  const messageStyle = (id) => ({
    textAlign: "left",
    position: "relative",
    right: "70px",
    paddingLeft: "20px",
    color: "black",

  });
  

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

  return (
    <div style={{ display: 'flex' }}>  {/* Parent div with flexbox */}
      {/* First div containing the notifications */}
      <div style={{ width: '100%' }}>  {/* Adjust width as needed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {eventsNextWeek.map((notification) => (
          <div
            key={notification.id}
            onClick={() => getNotificationId(notification.id)}
            style={{
              ...notificationStyle(notification),
              backgroundColor: notification.dismissed ? "#f2f2f2" : "white",
            }}
          >
            <div style={importanceIndicatorStyle(notification.importance)}>
              {notification.importance}
            </div>
          <div
            style={{ textDecoration: "none", width: "100%", cursor: "pointer" }}
          >
            <p
              //   onMouseOver={() => enterHover(notification.id)}
              //   onMouseOut={exitHover}
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
          </div>
        ))}
      </div>
    </div>
    <div style={{ flex: 1 }}>
      {eventsNextWeek.map((event, index) => (
        <div
          key={index}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "5px",
            right:'150px',
            marginBottom: "30px",
            transition: "transform 0.2s ease-in-out",
            textAlign: "center",
          }}
        >
          <div>
            <h3 style={{ fontSize: "24px", color: "#333" }}>{event.day}</h3>
            <h4 style={{ fontSize: "20px", color: "#555" }}>{event.month}</h4>
          </div>
        </div>
      ))}
    </div>
  </div>
)}