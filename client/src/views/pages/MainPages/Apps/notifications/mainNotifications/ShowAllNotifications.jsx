import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import snoozeIcon from "../../../../../../imgs/snoozeIcon.png";
import dismissIcon from "../../../../../../imgs/dismissIcon.png";
import DatePicker from "react-datepicker";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployeeNotification } from "../../../../../../services/api/notifications";
import "react-datepicker/dist/react-datepicker.css";
import "../css/showallnotification.css";

const ShowAllNotifications = ({
  displayedNotifications,
  getNotificationId,
  notifications,
}) => {
  const navigate = useNavigate();
  const [hoveredIcon, setHoveredIcon] = useState({
    snooze: null,
    dismiss: null,
  });
  const [isPostponeBtnClicked, setIsPostponeBtnClicked] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const queryClient = useQueryClient();

  // Move notification to archive
  const archiveNotification = async (id, reminderDate) => {
    try {
      const notification = notifications.find((n) => n._id === id);
      if (notification) {
        const updatedData = {
          id: notification._id,
          dismissed: false,
          handled:notification.handled,
          reminderDate,
          archived: true,
        };
        await updateEmployeeNotification(updatedData);
      }
    } catch (error) {
      console.error("Error archiving notification:", error);
    }
  };

  // React Query Mutations
  const archiveNotificationMutation = useMutation({
    mutationFn: archiveNotification,
    onSuccess: () => {
      queryClient.invalidateQueries(["allNotificationsData"]);
    },
  });

  const handleDatePickerSelect = (date) => {
    setSelectedDate(date);
  };

  const togglePostponeInput = (id) => {
    setIsPostponeBtnClicked((prev) => (prev === id ? false : id));
  };

  return (
    <div className="notifications-container">
      {displayedNotifications.map((notification) => (
        <div
          key={notification._id}
          className={`notification-item ${
            notification.dismissed ? "dismissed" : ""
          }`}
        >
          <div className={`priority-indicator ${notification.priority}`}>
            {notification.priority}
          </div>
          <div
            onClick={() => getNotificationId(notification._id)}
            className="notification-message"
          >
            <p>{notification.message}</p>
          </div>
          <div className="notification-date">
            <span>{new Date(notification.createdAt).toLocaleDateString('en-GB')}</span>
          </div>
          {notification.imageUrl && (
            <img
              src={notification.imageUrl}
              alt="employee"
              className="notification-image"
            />
          )}
          <div className="notification-icons">
            {/* Snooze Button */}
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
                onClick={() => togglePostponeInput(notification._id)}
              />
              {isPostponeBtnClicked === notification._id && (
                <div className="postpone-container">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDatePickerSelect}
                    dateFormat="dd/MM/yyyy"
                    className="custom-datepicker"
                    calendarClassName="custom-calendar"
                    popperPlacement="bottom-start"
                    portalId="root"
                  />

                  <button
                    className="postpone-confirm-btn"
                    onClick={() => {
                      archiveNotificationMutation.mutate({
                        id: notification._id,
                        reminderDate: selectedDate,
                      });
                      setIsPostponeBtnClicked(false);
                    }}
                  >
                    Confirm
                  </button>
                </div>
              )}
            </div>
            {/* Delete Button */}
            <div
              className="icon-container"
              onClick={() =>
                archiveNotificationMutation.mutate({ id: notification._id })
              }
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
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowAllNotifications;
