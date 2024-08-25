// src/Hol.jsx
import React, { useState, useEffect } from "react";
import Holidays from "date-holidays";

const Hol = ({ countryCode, onHolidaysLoaded }) => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
//countryCode
  useEffect(() => {
    const fetchHolidays = () => {
      const hd = new Holidays(countryCode);
      const holidays = hd.getHolidays(new Date().getFullYear());      

      const filteredHolidays = holidays.flatMap(holiday => {
        const holidayDates = holiday.start && holiday.end 
          ? generateDateRange(holiday.start, holiday.end)
          : [formatDate(holiday.date)];

        // Filter out holidays with the term "נאצים"
        if (holiday.name.includes("נאצים")) {
          return []; // Exclude this holiday
        }

        return holidayDates.map(date => ({
          name: holiday.name,
          date: date,
        }));
      });

      onHolidaysLoaded(filteredHolidays); // Pass filtered holidays to parent component
      setHolidays(filteredHolidays);
      setLoading(false);
    };

    fetchHolidays();
  }, [countryCode, onHolidaysLoaded]);

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const generateDateRange = (startDate, endDate) => {
    const dates = new Set();
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      dates.add(formatDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return Array.from(dates);
  };

  if (loading) return <p>Loading...</p>;

  return null; // No need to render anything here
};

export default Hol;
