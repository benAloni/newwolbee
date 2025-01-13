import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { SideBar, Header } from "../../../layout";
import CreateCompanyEventModal from "../../../components/Modals/companyEvents/CreateCompanyEventModal";
import { fetchCompanyEvents } from "../../../services";
import { useQuery } from "@tanstack/react-query";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function CompanyEvents() {
  const [show, setShow] = useState(false);
  const [currentModal, setCurrentModal] = useState(1);

  const { data: companyEvents, isLoading } = useQuery({
    queryKey: ["companyEvents"],
    queryFn: fetchCompanyEvents,
  });
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setCurrentModal(1);
    setShow(true);
  };

  const nextModal = () => setCurrentModal((prev) => prev + 1);
  const prevModal = () => setCurrentModal((prev) => (prev > 1 ? prev - 1 : 1));
  return (
    <div className="page-wrapper">
      <div className="content container-fluid">
        <SideBar />
        <Header />
        <h1 style={{ textAlign: "center", direction: "rtl" }}>
          Company's events
        </h1>
        <button className="plan-event-button" onClick={handleShow}>
          Plan a new company event
        </button>
        <br />
        <br />
        <br />
        <div className="event-container">
          {companyEvents?.map((event, index) => (
            <div key={index} className="event-card">
              <h2>{event.title}</h2>
              <p>
                <strong>Due Date:</strong>{" "}
                {new Date(event.dueDate).toLocaleDateString("en-GB")}
              </p>
              <p>
                <strong>Theme:</strong> {event.eventTheme}
              </p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Number Of Guests:</strong> {event.numberOfGuests}
              </p>
              <p>
                <strong>Budget:</strong> {event.budget}₪
              </p>
              <p>
                <strong>Time:</strong>
                {event.time.map((time, index) => (
                  <span key={index}>
                    <p>Starts At: {time.startsAt}</p>
                    <p>Ends At: {time.endsAt}</p>
                  </span>
                ))}
              </p>
              <h3>Completed Tasks: No Completed</h3>
            </div>
          ))}
        </div>
        <CreateCompanyEventModal
          show={show}
          onClose={handleClose}
          currentModal={currentModal}
          setCurrentModal={setCurrentModal}
          nextModal={nextModal}
          prevModal={prevModal}
        />
      </div>
      <style>
        {`
          .plan-event-button {
               width: 300px;
            height: 60px;
            border: 3px solid #F19F29;
            border-radius: 45px;
            transition: all 0.3s ease-in-out;
            cursor: pointer;
            background-color: white;
            font-size: 1.2em;
            font-weight: 550;
            font-family: 'Montserrat', sans-serif;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            position: absolute;
            top: 120px;
            right: 20px;
          }

          .plan-event-button:hover {
            background-color: #F19F29;
            color: white;
            box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
            transform: scale(1.05);
          }

          .event-container {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
            margin-top: 20px;
          }

          .event-card {
            border: 1px solid #ccc;
            padding: 20px;
            border-radius: 8px;
            width: 250px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            background-color: #fff;
          }
        `}
      </style>
    </div>
  );
}
