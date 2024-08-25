import React, { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";

export default function NotificationsPopup() {
  const user = useSelector((state) => state.user.user);

  const [events, setEvents] = useState([]);
  const [day, setDay] = useState(1);
  const [eventsTomorrow, setEventsTomorrow] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/api/getAllNotifications", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["AllNotificationsData"],
    queryFn: fetchData,
    staleTime: 0, // 3 minutes
    refetchInterval: 0, // 3 minutes
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (data && !isLoading) {
      console.log("Data fetched:", data);
      const newEvents = data.map((val) => ({
        title: val.title,
        date: val.start,
        className: val.className,
      }));
      console.log("Parsed events:", newEvents);
  
      setEvents(newEvents);
  
      const getEventsForTomorrow = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const tomorrowMonth = tomorrow.getMonth() + day; // Months are 0-based in JavaScript
        const tomorrowDate = tomorrow.getDate();
  
        return newEvents.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate.getDate() === tomorrowDate && (eventDate.getMonth() + 1) === tomorrowMonth;
        });
      };
  
      const eventsForTomorrow = getEventsForTomorrow();
      console.log("Events for tomorrow:", eventsForTomorrow);
  
      setEventsTomorrow(eventsForTomorrow);
    }
  
    if (error) {
      console.error("Error fetching data:", error);
    }
  }, [data, isLoading, error]);
  

  return (
    <div>
      <ul className="notification-list">
        {eventsTomorrow.map((notification, index) => (
          <li key={index} className="notification-message">
            <div className="media d-flex" style={{ paddingLeft: "7px" }}>
              <div className="media-body">
                <p className="noti-details">
                  <span className="noti-title" style={{ color: "black" }}>
                    {notification.title}
                  </span>
                </p>
                <p className="noti-time">
                  <span className="notification-time">
                    Date: {new Date(notification.date).toLocaleDateString()}
                  </span>
                </p>
                <div style={{ display: "flex", gap: "10px", marginLeft: "100px" }}>
                  <button style={{ backgroundColor: "white", border: "none", color: "#FC133D", width: "110px" }}>
                    Mark as read
                  </button>
                  <button style={{ backgroundColor: "white", border: "none", color: "#FC133D" }}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
