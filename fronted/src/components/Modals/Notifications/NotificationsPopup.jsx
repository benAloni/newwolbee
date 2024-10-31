import React, { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { auth } from '../../../firebase/firebaseConfig';


export default function NotificationsPopup() {
  const user = useSelector((state) => state.auth?.user);

  const [events, setEvents] = useState([]);
  const [eventsTomorrow, setEventsTomorrow] = useState([]);

  const fetchData = async () => {
    const token = await auth.currentUser.getIdToken()
    const [AllNotification, employeesResponse] =
      await Promise.all([
        axios.get(`${process.env.REACT_APP_SERVER_URI}/getAllNotifications`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${process.env.REACT_APP_SERVER_URI}/getEmployees`, {
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
      const newEvents = events.flatMap((val) => {  
        const eventsArray = [];
  
        // Always add the birthday event if DataOfBirth exists
        if (val.DataOfBirth) {
          eventsArray.push({
            title: `Happy Birthday ${val.FullName}`, // Assuming employees have FullName
            date: val.DataOfBirth,
            className: `Birthday`,
          });
        }
  
        // Add the vacation event if Vacation data exists
        if (val.Vacation && val.Vacation.length > 0) {
          eventsArray.push({
            title: `${val.FullName} fly to ${val.Vacation[0].name}`,
            date: val.Vacation[0].startDate,
            className: `Vacation`,
          });
        }
  
        // If neither Birthday nor Vacation exists, return the default event
        if (!val.DataOfBirth && !(val.Vacation && val.Vacation.length > 0)) {
          eventsArray.push({
            title: val.title,
            date: val.start,
            className: val.className,
          });
        }
  
        return eventsArray;
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
          if (event.className === 'Vacation') {
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
