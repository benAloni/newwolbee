import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { auth } from '../../../firebase/firebaseConfig';
import { fetchEmployees, fetchNotifications } from '../../../services';


export default function NotificationsPopup() {
  const [events, setEvents] = useState([]);
  const [eventsTomorrow, setEventsTomorrow] = useState([]);
  const queryClient = useQueryClient()
  
  const fetchData = async () => {
    const [notifications, employees] =
      await Promise.all([
       fetchNotifications(),
        fetchEmployees(),
      ]);
  console.log(
    notifications
  );
  
      setEvents([...notifications, ...employees]);
      
    };

  const {data, error, isLoading } = useQuery({
    queryKey: ["allNotificationsData"],
    queryFn: fetchData,
    staleTime: 0, // 3 minutes
    refetchInterval: 0, // 3 minutes
    refetchOnWindowFocus: true,
  });  

  useEffect(() => {
    if (data && !isLoading) {
      const newEvents = data.flatMap((val) => {  
        const eventsArray = [];
         
        if (val.dateOfBirth) {
          eventsArray.push({
            title: `Happy Birthday ${val.fullName}`,
            date: val.dateOfBirth,
            className: `Birthday`,
          });
        }
  
        // Add the vacation event if vacation data exists
        if (val.vacation && val.vacation.length > 0) {
          eventsArray.push({
            title: `${val.fullName} fly to ${val.vacation[0].name}`,
            date: val.vacation[0].startDate,
            className: `vacation`,
          });
        }
  
        // If neither Birthday nor vacation exists, return the default event
        if (!val.dateOfBirth && !(val.vacation && val.vacation.length > 0)) {
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
          if (event.className === 'vacation') {
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
