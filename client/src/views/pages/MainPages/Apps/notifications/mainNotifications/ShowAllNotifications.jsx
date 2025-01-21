// ShowAllNotifications.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import snoozeIcon from "../../../../../../imgs/snoozeIcon.png";
import dismissIcon from "../../../../../../imgs/dismissIcon.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployeeNotification } from "../../../../../../services/api/notifications";
import "../css/showallnotification.css";

const ShowAllNotifications = ({
  displayedNotifications,
  getNotificationId,
  notifications,
}) => {
  const navigate = useNavigate();
  const [hoveredNotificationId, setHoveredNotificationId] = useState(null);
  const [hoveredIcon, setHoveredIcon] = useState({ snooze: null, dismiss: null });
  const queryClient = useQueryClient();

  const deleteNotification = async (id) => {
    const notification = notifications?.find((n) => n._id === id);
    if (notification) {
      const updatedData = {
        id: notification._id,
        hasBeenDismissed: true,
        hasBeenHandled: notification.hasBeenHandled,
        reminderDate: notification.reminderDate,
      };
      await updateEmployeeNotification(updatedData);
    }
  };

  const deleteNotificationMutation = useMutation({
    mutationFn: deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries(["allNotificationsData"]);
    },
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    return { day, month };
  };

  return (
    <div className="notifications-container">
      {displayedNotifications.map((notification) => (
        <div
          key={notification._id}
          className={`notification-item ${notification.dismissed ? "dismissed" : ""}`}
        >
          <div className={`priority-indicator ${notification.priority}`}>{
            notification.priority
          }</div>
          <div
            onClick={() => getNotificationId(notification._id)}
            className="notification-message"
          >
            <p>{notification.message}</p>
          </div>
          <div className="notification-date">
            <i className="fa fa-clock-o" aria-hidden="true"></i>
            <span>{new Date(notification.date).toLocaleString()}</span>
          </div>
          {notification.image && (
            <img
              src={notification.image}
              alt="employee"
              className="notification-image"
            />
          )}
          <div className="notification-icons">
            <div
              className="icon-container"
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
                className="icon snooze-icon"
              />
            </div>
            <div
              className="icon-container"
              onMouseEnter={() =>
                setHoveredIcon({ ...hoveredIcon, dismiss: notification._id })
              }
              onMouseLeave={() =>
                setHoveredIcon({ ...hoveredIcon, dismiss: null })
              }
            >
              <img
                src={dismissIcon}
                alt="dismiss-icon"
                className="icon dismiss-icon"
                onClick={() => deleteNotificationMutation.mutate(notification._id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowAllNotifications;
