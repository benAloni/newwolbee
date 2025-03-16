import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Holidays from "date-holidays";
import ShowAllNotifications from "./mainNotifications/ShowAllNotifications";
import HeaderNotifications from "./mainNotifications/HeaderNotifications";
import ShowNewNotifications from "./mainNotifications/ShowNewNotifications";
import "./css/notifications.css";
import { useParams } from "react-router-dom";
import ShowHolidaysNotifications from "./mainNotifications/ShowNotifications/ShowHolidaysNotifications";
import staticNotificationsData from "./staticNotifications";
import NotificationsModals from "../../../../../components/Modals/Notifications/NotificationsModals";
import { getHolidaysFromApi } from "../../../../../services/api/holidaysDetails";
import { useGetNotificationsQuery } from "../../../../../services/queries/notificationsQuery";

const Notifications = () => {
  const navigate = useNavigate();
  const { numOfDaysPrior } = useParams();
  const daysPrior = numOfDaysPrior || "3";
  //-------Modals states--------------------------------------------
  const [homeMeetingModal, setHomeMeetingModal] = useState(false);
  const [employeeWorkRoutineModal, setEmployeeWorkRoutineModal] =
    useState(false);
  const [soccerGameModal, setSoccerGameModal] = useState(false);
  const [vacationModal, setVacationModal] = useState(false);
  //------------------------------------------------------------------
  const [viewOption, setViewOption] = useState("All");
  const [currentPage, setCurrentPage] = useState(0); //for tracking current page
  const itemsPerPage = 10;
  const [notifications, setNotifications] = useState(staticNotificationsData);
  const { data, isLoading, error } = useGetNotificationsQuery(daysPrior);
  const [employeeId, setEmployeeId] = useState(null);

  const generateNotifications = async (data) => {
    if (!data ) return [];
    const today = new Date();
    const formattedHolidays = await getHolidaysFromApi();

    let newNotifications = [];

    for (const event of data) {
      if (event.eventType === "Birthday") {
        newNotifications.push({
          ...event,
          _id: event.id,
          link: "/events",
          read: false,
          className: "birthday",
        });
      }
      if (event.eventType === "Vacation") {
        newNotifications.push({
          ...event,
          _id: event.id,
          link: "/events",
          read: false,
          className: "vacation",
        });
      }
    }

    setNotifications((prev) => [...prev, ...newNotifications]);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (data) {
        try {
          await generateNotifications(data);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    };

    fetchData();
  }, [data]);


  // Holiday Notification
  // if (formattedHolidays.length > 0) {
  //   formattedHolidays.forEach((holiday) => {
  //     if (event.title === holiday.name) {
  //       notifications.push({
  //         _id: event._id,
  //         priority: "Low",
  //         message: `${holiday.name} is coming up on ${new Date(
  //           holiday.date
  //         ).toLocaleDateString()}`,
  //         fullName: holiday.name,
  //         link: "/events",
  //         title: holiday.name,
  //         start: holiday.date,
  //         className: event.className,
  //         read: false,
  //         viewed: false,
  //         dismissed: false,
  //         startDay: today,
  //         description: event.description,
  //         underDescription: event.underDescription,
  //         options: event.options,
  //       });
  //     }
  //   });
  // }
  const [modalOpenNo, setModalOpenNo] = useState(false);
  const [modalOpenYes, setModalOpenYes] = useState(false);
  const [modalContentNo, setModalContentNo] = useState(null);
  const [modalContentYes, setModalContentYes] = useState(null);

  const [archivedNotifications, setArchivedNotifications] = useState([]);
  const [isPostponeBtnClicked, setIsPostponeBtnClicked] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  const [selectedSortingOption, setSelectedSortingOption] = useState(
    "Priority high - low"
  );
  const [isNotificationVisible, setNotificationVisible] = useState(false);

  const closeSoccerGameModal = () => {
    setSoccerGameModal(false);
  };

  const closeVacationModal = () => {
    setVacationModal(false);
  };

  const toggleNotificationVisibility = () => {
    setNotificationVisible(!isNotificationVisible);
  };

  const priorityOrder = { Low: 1, Medium: 2, High: 3 };
  // Sorting notifications based on the selected option
  if (selectedSortingOption === "A-Z") {
    notifications.sort((a, b) => a.message.localeCompare(b.message));
  } else if (selectedSortingOption === "Z-A") {
    notifications.sort((a, b) => b.message.localeCompare(a.message));
  } else if (selectedSortingOption === "Priority low - high") {
    notifications.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  } else {
    notifications.sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
    );
  }

  const closeModal = () => {
    setModalOpen(false);
    setModalContent(null);
  };

  const closeEmployeeWorkRoutineModal = () => {
    setEmployeeWorkRoutineModal(false);
  };

  const openModalNo = (notification) => {
    setModalContentNo(notification);
    setModalOpenNo(true);
  };
  const openModalYes = (notification) => {
    setModalContentYes(notification);
    setModalOpenYes(true);
  };

  const closeModalNo = () => {
    setModalOpenNo(false);
  };
  const closeModalYes = () => {
    setModalOpenYes(false);
  };

  let displayedNotifications = [];

  if (viewOption !== "New") {
    displayedNotifications = notifications.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
  }

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < notifications.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const [showPopup, setShowPopup] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const getNotificationId = (mongoId) => {
    const notification = notifications.find((val) => val._id === mongoId);
    const employeeMongoId = notification._id;
    setEmployeeId(employeeMongoId);
    if (notification.className === "birthday") {
      navigate(`/get-a-birthday-present/${notification.employeeId}`);
    } else if (
      notification.className === "bg-info" &&
      notification.options !== undefined
    ) {
      setShowPopup("bg-info");
      setModalContent(notification);
      setModalOpen(true);
    } else if (notification.className === "bg-pink") {
      navigate("/upcoming-events", {
        state: { data: notification },
      });
    } else if (notification.className === "nicole's-meeting") {
      setModalContent(notification);
      setHomeMeetingModal(true);
    } else if (notification.className === "vacation") {
      setVacationModal(true);
    } else if (notification.className === "john's-work-routine") {
      setEmployeeWorkRoutineModal(true);
    } else if (notification.className === "soccer-game") {
      setSoccerGameModal(true);
    }
  };

  return (
    <div className="notifications-wrapper">
      <div className="upper-bar">
        <HeaderNotifications setViewOption={setViewOption} />
        <div className="filter-container">
          <select className="filter-select">
            <option>Choose filter...</option>
            <option value="Employee name">Employee name</option>
            <option value="Event">Event</option>
          </select>
          <select
            className="sort-select"
            onChange={(e) => setSelectedSortingOption(e.target.value)}
          >
            <option value="Priority high - low">Priority high - low</option>
            <option value="Priority low - high">Priority low - high</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>
      </div>
      <div className="pagination-controls">
        <button onClick={handlePreviousPage} disabled={currentPage === 0}>
          ⬅
        </button>
        <button
          onClick={handleNextPage}
          disabled={(currentPage + 1) * itemsPerPage >= notifications.length}
        >
          ➡
        </button>
      </div>
      <div className="notifications-body">
        {viewOption === "New" ? (
          <ShowNewNotifications
            notifications={notifications}
            getNotificationId={getNotificationId}
          />
        ) : (
          <ShowAllNotifications
            getNotificationId={getNotificationId}
            displayedNotifications={displayedNotifications}
            notifications={notifications}
          />
        )}
      </div>

      <ShowHolidaysNotifications
        modalOpen={modalOpen}
        modalContent={modalContent}
        closeModal={closeModal}
      />

      <div className="modals-section">
        <NotificationsModals
          employeeWorkRoutineModal={employeeWorkRoutineModal}
          closeEmployeeWorkRoutineModal={closeEmployeeWorkRoutineModal}
          openModalYes={openModalYes}
          openModalNo={openModalNo}
        />
        {modalOpenYes && modalContentYes && (
          <NotificationsModals
            modalOpenYes={modalOpenYes}
            openModalNo={openModalNo}
            openModalYes={openModalYes}
            modalContentYes={modalContentYes}
            closeModalYes={closeModalYes}
          />
        )}
        {modalOpenNo && modalContentNo && (
          <NotificationsModals
            modalOpenNo={modalOpenNo}
            openModalNo={openModalNo}
            openModalYes={openModalYes}
            modalContentNo={modalContentNo}
            closeModalNo={closeModalNo}
          />
        )}
        {homeMeetingModal && modalContent && (
          <NotificationsModals
            modalContent={modalContent}
            closeModal={closeModal}
            homeMeetingModal={homeMeetingModal}
          />
        )}
        {soccerGameModal && (
          <NotificationsModals
            soccerGameModal={soccerGameModal}
            closeSoccerGameModal={closeSoccerGameModal}
          />
        )}
        {vacationModal && (
          <NotificationsModals
            employeeId={employeeId}
            vacationModal={vacationModal}
            closeVacationModal={closeVacationModal}
          />
        )}
      </div>
    </div>
  );
};

export default Notifications;
