import React, { useState, useEffect } from "react";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Holidays from "date-holidays";

// Components
import DemoPizzaEvent from "./DemoPizzaEvent";
import ShowUpcomingEvents from "./ShowUpcomingEvents"
import Breadcrumbs from "../../../../../components/Breadcrumbs";

// CSS
import "react-datepicker/dist/react-datepicker.css";

const UpComingEvents = () => {
  const [userToken] = useState("your-user-token"); // Replace with actual token handling logic
  const [closestEvents, setClosestEvents] = useState([]); // State to hold 10 closest events
  const [countryCode, setCountryCode] = useState("IL");

  // Fetch function for notifications
  const fetchAllNotifications = async (token) => {
    const response = await axios.get('/api/notifications', {
      headers: {
        Authorization: `Bearer ${token}`, // Include token for authentication
      },
    });
    return response.data;
  };

  // React Query hook
  const { data, isLoading, error } = useQuery({
    queryKey: ['allNotificationsData'],
    queryFn: () => fetchAllNotifications(userToken),
    staleTime: 300000, // Cache data for 5 minutes
    refetchOnWindowFocus: false,
  });


 // Fetch holidays and generate notifications
 const fetchHolidaysAndGenerateNotifications = async () => {
    const currentYear = new Date().getFullYear();
    const today = new Date();

    // Initialize the Holidays library with the country code
    const hd = new Holidays(countryCode);
    const holidayData = hd.getHolidays(currentYear);

    // Format holidays
    const formattedHolidays = holidayData.map((holiday) => {
      const holidayDate = new Date(holiday.date);

      // Adjust year for past holidays
      if (holidayDate < today) {
        holidayDate.setFullYear(currentYear + 1);
      }

      return {
        title: holiday.name,
        start: holidayDate.toISOString(),
      };
    });

    return formattedHolidays;
  };

  useEffect(() => {
    const updateEvents = async () => {
      if (data && Array.isArray(data)) {
        const currentDate = new Date();
  
        // Adjust years for past events
        const updatedEvents = data.map((event) => {
          const eventDate = new Date(event.start);
          if (eventDate < currentDate) {
            eventDate.setFullYear(currentDate.getFullYear() + 1);
            return { ...event, start: eventDate.toISOString() };
          }
          return event;
        });
  
        // Fetch holidays and merge with updated events
        const holidays = await fetchHolidaysAndGenerateNotifications();
  
        // Combine events and holidays
        const allEvents = [...updatedEvents, ...holidays];
  
        // Remove duplicates based on title
        const uniqueEvents = allEvents.reduce((acc, current) => {
          const duplicate = acc.find((event) => event.title === current.title);
          if (!duplicate) {
            acc.push(current);
          }
          return acc;
        }, []);
  
        // Sort and slice to get the closest 10 events
        const sortedEvents = uniqueEvents
          .sort((a, b) => new Date(a.start) - new Date(b.start))
          .slice(0, 9);
  
        setClosestEvents(sortedEvents);
      }
    };
  
    updateEvents();
  }, [data, countryCode]);
  
  

  return (
    <>
      <div className="page-wrapper">
        <div className="content container-fluid">
          <Breadcrumbs maintitle="" />
          {isLoading && <div>Loading notifications...</div>}
          {error && <div>Error fetching notifications: {error.message}</div>}

          {/* Display closest 10 events */}
          <DemoPizzaEvent />
          <ShowUpcomingEvents closestEvents={closestEvents}/>
        </div>
      </div>
    </>
  );
};

export default UpComingEvents;
