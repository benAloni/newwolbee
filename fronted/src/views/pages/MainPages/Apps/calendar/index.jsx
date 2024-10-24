import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid/index.js";
import timeGridPlugin from "@fullcalendar/timegrid/index.js";
import interactionPlugin from "@fullcalendar/interaction/index.js";
import rrulePlugin from "@fullcalendar/rrule";
import Hol from "./Hol";
import axios from "axios";
import CalendarModal from "../../../../../components/Modals/calendar/CalendarModal";
import CalendarEventsPopup from "../../../../../components/Modals/calendar/calendarEventsPopup";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import "./calen.css";

const Calendar = (props) => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [countryCode, setCountryCode] = useState("IL"); // Default country code
  const [countryHolidays, setCountryHolidays] = useState({}); // Store holidays by country
  const [showHolidays, setShowHolidays] = useState(false);
  const linkRef = useRef(null);
  const calendarRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  const fetchData = async () => {
    const [eventsResponse, foodHolidaysResponse, employeesResponse] =
      await Promise.all([
        axios.get(`${process.env.REACT_APP_SERVER_URI}/getEvents`, {
          headers: { Authorization: `Bearer ${user.token}` },
        }),
        axios.get(`${process.env.REACT_APP_SERVER_URI}/getFoodHoliday`, {
          headers: { Authorization: `Bearer ${user.token}` },
        }),
        axios.get(`${process.env.REACT_APP_SERVER_URI}/api/getEmployees`, {
          headers: { Authorization: `Bearer ${user.token}` },
        }),
      ]);

    return {
      events: eventsResponse.data,
      foodHolidays: foodHolidaysResponse.data, // Access data directly
      employees: employeesResponse.data, // Access data directly
    };
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["calendarData"],
    queryFn: fetchData,
    staleTime: 60000, // 60 seconds
    refetchInterval: 60000, // Refetch every 60 seconds
    refetchOnWindowFocus: true,
  });

  const addEventMutation = useMutation({
    mutationFn: async (newEvent) => {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URI}/addEvent`,
        newEvent,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["calendarData"]);
    },
  });

  const addEvent = (newEvent) => {
    addEventMutation.mutate(newEvent);
  };

  const handleCountryChange = (event) => {
    setCountryCode(event.target.value);
  };

  useEffect(() => {
    if (data && !isLoading) {
      const newEvents = data.events.map((val) => ({
        title: val.title,
        start: val.start,
        className: val.className || "default-class",
      }));

      const foodHolidayEvents = data.foodHolidays.map((val) => ({
        title: val.name,
        img: val.img,
        className: "bg-pink",
        rrule: {
          freq: "YEARLY",
          dtstart: val.date,
        },
      }));

      const employeeBirthdayEvents = data.employees.map((val) => ({
        title: `birthday ${val.FullName}`,
        className: "bg-purple",
        rrule: {
          freq: "YEARLY",
          dtstart: val.DataOfBirth,
        },
      }));
      const employeeVacationEvents = data.employees.flatMap((val) => {
        if (val.Vacation && val.Vacation.length > 0) {
          const vacation = val.Vacation[0];
          return [
            {
              title: `${val.FullName} flies to ${vacation.name}`,
              className: "bg-purple",
              start: vacation.startDate,
              end: vacation.startDate,
            },
            {
              title: `${val.FullName} back to Israel`,
              className: "bg-purple",
              start: vacation.endDate,
              end: vacation.endDate,
            },
          ];
        } else {
          return [];
        }
      });

      console.log(events);

      setEvents((prevEvents) => [
        ...employeeVacationEvents,
        ...newEvents,
        ...employeeBirthdayEvents,
        ...foodHolidayEvents,
        // Include existing holidays from countryHolidays state
        ...Object.values(countryHolidays).flat(),
      ]);

      setTimeout(() => {
        setShowHolidays(true);
      }, 20);
    }

    if (error) {
      console.error("Error fetching data", error);
      alert("Error fetching data");
    }
  }, [data, error, isLoading, countryCode, countryHolidays]);

  const handleHolidaysLoaded = useCallback(
    (holidays) => {
      const nationalHolidayEvents = holidays.map((holiday) => ({
        title: holiday.name,
        start: holiday.date,
        className: "bg-info",
        rrule: {
          freq: "YEARLY",
          dtstart: holiday.date,
        },
      }));

      setCountryHolidays({
        [countryCode]: nationalHolidayEvents, // Store holidays only for the selected country
      });

      setEvents((prevEvents) => [
        ...prevEvents.filter(
          (event) => !(event.className || "").includes("bg-info")
        ),
        ...nationalHolidayEvents,
      ]);
    },
    [countryCode]
  );

  useEffect(() => {
    // Clear holidays when the country changes
    setEvents((prevEvents) =>
      prevEvents.filter((event) => !(event.className || "").includes("bg-info"))
    );
  }, [countryCode]);

  const HolComponent = useMemo(
    () =>
      showHolidays && (
        <Hol
          countryCode={countryCode}
          onHolidaysLoaded={handleHolidaysLoaded}
        />
      ),
    [countryCode, handleHolidaysLoaded, showHolidays]
  );

  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <div className="page-header">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="page-title" style={{ display: "inline-block" }}>
                Calendar
              </h3>
              <div>
                <label htmlFor="country-select">Select Country: </label>
                <select
                  id="country-select"
                  value={countryCode}
                  onChange={handleCountryChange}
                >
                  <option value="IL">Israel</option>
                  <option value="US">United States</option>
                  <option value="RU">Russia</option>
                  <option value="JP">Japan</option>
                  <option value="CN">China</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                  <option value="UA">Ukraine</option>
                  <option value="GE">Georgia</option>
                  <option value="GB">United Kingdom</option>
                </select>
              </div>
            </div>
            <div className="col-auto float-end ms-auto">
              <Link
                to="#"
                className="btn add-btn"
                data-bs-toggle="modal"
                data-bs-target="#add_event"
                ref={linkRef}
              >
                <i className="fa-solid fa-plus" /> Add Event
              </Link>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="card mb-0">
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <FullCalendar
                      ref={calendarRef}
                      plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        rrulePlugin,
                      ]}
                      headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay",
                      }}
                      initialView="dayGridMonth"
                      editable={true}
                      selectable={true}
                      selectMirror={true}
                      dayMaxEvents={true}
                      weekends={true}
                      events={events}
                      eventClick={(arg) => {
                        setSelectedEvent(arg.event);
                        setShowModal(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {HolComponent}
      <CalendarModal
        addEvent={(event) => {
          addEvent(event);
          setShowModal(false);
        }}
      />
      <CalendarEventsPopup
        show={showModal}
        handleClose={() => setShowModal(false)}
        event={selectedEvent}
      />
    </div>
  );
};

export default Calendar;
