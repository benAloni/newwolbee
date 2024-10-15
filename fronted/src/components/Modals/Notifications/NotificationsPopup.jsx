import React, { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { auth } from '../../../firebase/firebaseConfig';

export default function NotificationsPopup() {
  const [events, setEvents] = useState([]);
  const [eventsTomorrow, setEventsTomorrow] = useState([]);

  const fetchData = async () => {
    const token = await auth.currentUser.getIdToken()
    const [AllNotification, employeesResponse] =
      await Promise.all([
        axios.get("https://newwolbee-l7cc.onrender.com/api/getAllNotifications", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("https://newwolbee-l7cc.onrender.com/api/getEmployees", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
  
      setEvents([...AllNotification.data, ...employeesResponse.data]);
      
    };

  const {error, isLoading } = useQuery({
    queryKey: ["AllNotificationsData"],
    queryFn: fetchData,
    staleTime: 0, // 3 minutes
    refetchInterval: 0, // 3 minutes
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (events.length > 0 && !isLoading) {
      const newEvents = events.map((val) => {
        // Check if DataOfBirth exists, and set title accordingly
        if (val.dateOfBirth) {
          return {
            title: `Happy Birthday ${val.fullName}`, 
            date: val.DataOfBirth,
            className: `Birthday`,
          };
        } else {
          return {
            title: val.title,
            date: val.start,
            className: val.className,
          };
        }
      });
  
      // Function to get events for tomorrow or 3 days before for Birthday events
      const getEventsForTomorrow = () => {
        const today = new Date();
  
        return newEvents.filter(event => {
          const eventDate = new Date(event.date);
          
          // If the event is a Birthday, check for 3 days before
          if (event.className === 'Birthday') {
            const threeDaysBefore = new Date(eventDate);
            threeDaysBefore.setDate(eventDate.getDate() - 3);
  
            // Show the event if today is between 3 days before and the event date
            return (
              today >= threeDaysBefore && today <= eventDate
            );
          }
  
          // Otherwise, check for tomorrow's events
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);
  
          const tomorrowMonth = tomorrow.getMonth() + 1; // Months are 0-based in JavaScript
          const tomorrowDate = tomorrow.getDate();
  
          return (
            eventDate.getDate() === tomorrowDate && 
            (eventDate.getMonth() + 1) === tomorrowMonth
          );
        });
      };
  
      const eventsForTomorrow = getEventsForTomorrow();
      console.log("Events for tomorrow:", eventsForTomorrow);
  
      setEventsTomorrow(eventsForTomorrow);
    }
  
    if (error) {
      console.error("Error fetching data:", error);
    }
  }, [events, isLoading, error]);
  
  

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
