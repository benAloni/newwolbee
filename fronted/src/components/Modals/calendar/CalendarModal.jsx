import React, { useEffect, useState } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Holidays from "date-holidays";


const CalendarModal = ({ addEvent }) => {
  const queryClient = useQueryClient();

  const location = useLocation();
  const neweventName = location.state?.eventName;
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState(neweventName);
  const [category, setCategory] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


//add new event
const addEventMutation = useMutation({
  mutationFn: async ({ eventName, selectedDate, category }) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URI}/addEvent`,
      {
        eventData: {
          title: eventName,
          start: selectedDate.toISOString(), // Convert to ISO string if needed
          className: category.value,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return response.data;
  },
  onSuccess: (savedEvent) => {
    // Update the events list in the cache
    queryClient.setQueryData(["calendarData"], (oldData) => {
      return {
        ...oldData,
        events: [
          ...oldData.events,
          {
            title: savedEvent.title,
            start: savedEvent.start,
            className: savedEvent.className,
          },
        ],
      };
    });

    // Also trigger the notification mutation after adding the event
    addNotificationMutation.mutate(savedEvent);
  },
  onError: (error) => {
    console.error("Error adding event:", error);
  },
});

// Mutation for adding a notification
const addNotificationMutation = useMutation({
  mutationFn: async (eventData) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URI}/addAllNotifications`,
      { notificationsData: [eventData] }, // Wrap eventData in an array
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    return response.data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["calendarData"]);
  },
  onError: (error) => {
    console.error("Error adding notification:", error);
  },
});


const handleSubmit = (e) => {
  e.preventDefault();
  if (eventName && selectedDate && category) {
    const eventData = {
      eventName,
      selectedDate,
      category,
    };

    addEventMutation.mutate(eventData);

    // Clear form fields
    setEventName("");
    setSelectedDate(null);
    setCategory(null);
  }
};

  const selectActive = [
    { label: "Danger", value: "bg-danger" },
    { label: "Success", value: "bg-success" },
    { label: "Purple", value: "bg-purple" },
    { label: "Primary", value: "bg-primary" },
    { label: "FoodHolidays", value: "bg-pink" },
    { label: "Holidays", value: "bg-info" },
    { label: "Inverse", value: "bg-inverse" },
    { label: "Orange", value: "bg-orange" },
    { label: "Brown", value: "bg-brown" },
    { label: "Teal", value: "bg-teal" },
    { label: "Warning", value: "bg-warning" },
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#ff9b44" : "#fff",
      color: state.isFocused ? "#fff" : "#000",
      "&:hover": {
        backgroundColor: "#ff9b44",
      },
    }),
  };

  //holidays test
  const [hol, setHol] = useState([]);

  useEffect(() => {
    const logHolidaysForAllCountries = () => {
      const hd = new Holidays();
      const countries = hd.getCountries();
      const allHolidays = [];
      const seenHolidays = new Set();

      Object.keys(countries).forEach((countryCode) => {
        hd.init(countryCode);
        const holidays = hd.getHolidays(new Date().getFullYear());

        holidays.forEach((holiday) => {
          const holidayKey = `${holiday.name}-${holiday.date}`;

          // Check if the holiday name is in English and has a date
          if (
            holiday.name &&
            holiday.name.trim() !== "" &&
            holiday.date &&
            !seenHolidays.has(holidayKey)
          ) {
            seenHolidays.add(holidayKey);
            allHolidays.push({
              country: countries[countryCode],
              countryCode: countryCode,
              name: holiday.name,
              date: holiday.date,
            });
          }
        });
      });

      setHol(allHolidays); // Update the state with the filtered list of holidays
    };

    logHolidaysForAllCountries();
  }, []);
  return (
    <>
      <div id="add_event" className="modal custom-modal fade" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Event</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Event Name <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-block mb-3">
                  <label className="col-form-label">
                    Event Date{" "}
                    <span className="text-danger">for {eventName}</span>
                  </label>
                  <div className="cal-icon">
                    <DatePicker
                      className="form-control w-100"
                      selected={selectedDate}
                      onChange={handleDateChange}
                      dateFormat="dd-MM-yyyy HH:mm"
                      showTimeSelect
                      required
                    />
                  </div>
                </div>
                <div className="input-block mb-3">
                  <label className="control-label col-form-label">
                    Category
                  </label>
                  <Select
                    options={selectActive}
                    value={category}
                    onChange={setCategory}
                    placeholder="Select Category"
                    styles={customStyles}
                    required
                  />
                </div>
                <div className="submit-section">
                  <button className="btn btn-primary submit-btn" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CalendarModal;
