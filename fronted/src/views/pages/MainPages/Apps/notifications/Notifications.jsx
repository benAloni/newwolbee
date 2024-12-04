import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Holidays from "date-holidays";
import ShowAllNotifications from "./mainNotifications/ShowAllNotifications";
import HeaderNotifications from "./mainNotifications/HeaderNotifications";
import ShowNewNotifications from "./mainNotifications/ShowNewNotifications";
import "./modal.css";
import ShowHolidaysNotifications from "./mainNotifications/ShowNotifications/ShowHolidaysNotifications";
import { userProfile } from "../../../../../imgs";
import {
  fetchEmployeesNotifications,
  fetchEmployeesProfilePics,
  fetchNotifications,
} from "../../../../../services";
import staticNotificationsData from "./staticNotifications";
import { useQuery } from "@tanstack/react-query";
import NotificationsModals from "../../../../../components/Modals/Notifications/NotificationsModals";
import { getHolidaysFromApi } from "../../../../../services/api/holidaysDetails";

const Notifications = () => {
  const navigate = useNavigate();
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
  const [notifications, setNotifications] = useState([]);
  const staticNotifications = staticNotificationsData;
  const [employeeId, setEmployeeId] = useState(null);

  const fetchData = async () => {
    const [notifications, employeesNotifications] = await Promise.all([
      fetchNotifications(),
      getNotificationsWithEmployeesProfilePics(),
    ]);
    return [...notifications, ...employeesNotifications];
  };
  const getNotificationsWithEmployeesProfilePics = async () => {
    let employeesNotificationsWithProfilePics;
    try {
      const notifications = await fetchEmployeesNotifications();
      employeesNotificationsWithProfilePics = await Promise.all(
        notifications?.map(async (notification) => {
          const profilePicUrl = await fetchEmployeesProfilePics(
            notification.uid,
            notification.eventDetails.employeeId
          );
          return {
            ...notification,
            avatar: profilePicUrl || userProfile,
          };
        })
      );
      return employeesNotificationsWithProfilePics;
    } catch (error) {
      console.log("Error getting notifications :", error);
    }
  };
  const { data } = useQuery({
    queryKey: ["allNotificationsData"],
    queryFn: fetchData,
  });
  const fetchHolidaysAndGenerateNotifications = async (data) => {
    const today = new Date();
    const formattedHolidays = await getHolidaysFromApi();

    const eventNotifications = data.flatMap((event) => {
      const notifications = [];
      // Birthday Notification
      if (event.eventDetails?.type === "birthday") {        
        notifications.push({
          _id: event._id,
          id: event.eventDetails.employeeId,
          priority: event.priority,
          message: event.title,
          link: "/events",
          read: false,
          notificationDueDate: event.notificationDueDate,
          hasBeenHandled: event.hasBeenHandled,
          hasBeenDismissed: event.hasBeenDismissed,
          image: event.avatar,
          startDay: event.notificationCreatedAt,
          date: event.eventDetails.dateOfTheEvent,
          className: "birthday",
        });
      }
      // Vacation Notification
      if (event.eventDetails?.type === "vacation") {
        const vacationStartDate = new Date(event.notificationCreatedAt);
        vacationStartDate.setDate(vacationStartDate.getDate() - 1); //subtracting by one day cuz notificationCreatedAt is saved in mongo without time zone
        notifications.push({
          _id: event._id,
          id: event.eventDetails.employeeId,
          priority: event.priority,
          message: event.title,
          link: "/events",
          read: false,
          notificationDueDate: event.notificationDueDate,
          hasBeenHandled: event.hasBeenHandled,
          hasBeenDismissed: event.hasBeenDismissed,
          image: event.avatar,
          startDay: vacationStartDate,
          date: event.eventDetails.dateOfTheEvent,
          className: "vacation",
        });
      }
      // Holiday Notification
      if (formattedHolidays.length > 0) {
        formattedHolidays.forEach((holiday) => {
          if (event.title === holiday.name) {
            notifications.push({
              _id: event._id,
              priority: "Low",
              message: `${holiday.name} is coming up on ${new Date(
                holiday.date
              ).toLocaleDateString()}`,
              fullName: holiday.name,
              link: "/events",
              title: holiday.name,
              start: holiday.date,
              className: event.className,
              read: false,
              viewed: false,
              dismissed: false,
              startDay: today,
              description: event.description,
              underDescription: event.underDescription,
              options: event.options,
            });
          }
        });
      }
      // if(event.uid){
      //   notifications.push({
      //     _id: event._id,
      //     // id: event.eventDetails.employeeId,
      //     // priority: event.priority,
      //     message: event.title,
      //     link: "/events",
      //     read: false,
      //     // notificationDueDate: event.notificationDueDate,
      //     hasBeenHandled: false,
      //     hasBeenDismissed: false,
      //     image: event.avatar,
      //     startDay: event.start,
      //     // date: event.eventDetails.dateOfTheEvent,
      //     // className: "birthday",
      //   });
      // }

      return notifications;
    });
    setNotifications([...staticNotifications, ...eventNotifications]);
  };

  useEffect(() => {
    if (data) {
      fetchHolidaysAndGenerateNotifications(data);
    }
  }, [data]);

  //John's work routine answer---------------------------------------
  const [modalOpenNo, setModalOpenNo] = useState(false);
  const [modalOpenYes, setModalOpenYes] = useState(false);
  const [modalContentNo, setModalContentNo] = useState(null);
  const [modalContentYes, setModalContentYes] = useState(null);
  //-----------------------------------------------------------------

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

  const rowStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
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

  //John's work routine answer--------------
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
  // --------------------------------------
  //  Calculate the notifications to be displayed on the current page
  let displayedNotifications = [];

  if (viewOption !== "New") {
    displayedNotifications = notifications.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
  }

  // Handle clicking the next page button
  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < notifications.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle clicking the previous page button
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  //---------

  const [showPopup, setShowPopup] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const getNotificationId = (mongoId) => {
    const notification = notifications.find((val) => val._id === mongoId);
    const employeeMongoId = notification._id;
    setEmployeeId(employeeMongoId);
    if (notification.className === "birthday") {
      navigate(`/get-a-birthday-present/${notification.id}`);
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
    <div style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
      <div
        className="upperBarOptions"
        style={{
          display: "flex",
          justifyContent: "right",
          gap: "70px",
        }}
      >
        <HeaderNotifications
          setViewOption={setViewOption}
          displayedNotifications={displayedNotifications}
        />
        <div
          className="filterDiv"
          style={{
            display: "flex",
            justifyContent: "right",
            position: "relative",
            right: "120px",
          }}
        >
          <label htmlFor="notificationFilter">
            Filter by:{" "}
            <select
              id="notificationFilter"
              style={{
                borderRadius: "5px",
                padding: "7px",
                backgroundColor: "#f7b500",
                border: "none",
                marginRight: "30px",
              }}
            >
              <option>Choose filter...</option>
              <option value="Employee name">Employee name</option>
              <option value="Event">Event</option>
            </select>
          </label>
        </div>
        <div
          className="notificationsSorting"
          style={{
            display: "flex",
            justifyContent: "right",
            position: "relative",
            right: "170px",
          }}
        >
          <label htmlFor="notificationSort">
            Sort by:{" "}
            <select
              id="notificationSort"
              style={{
                borderRadius: "5px",
                padding: "7px",
                backgroundColor: "#f7b500",
                border: "none",
                marginRight: "30px",
              }}
              onChange={(e) => setSelectedSortingOption(e.target.value)}
            >
              <option value="Priority high - low">Priority high - low</option>
              <option value="Priority low - high">Priority low - high</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
          </label>
        </div>
      </div>
      <br />
      <br />
      {/* Pagination Controls */}
      <div style={{ marginTop: "-40px" }}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          style={{
            background: currentPage === 0 ? "#f2f2f2" : "#FFA500", // light grey when disabled, orange otherwise
            color: currentPage === 0 ? "#aaa" : "white", // adjust text color for contrast
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            cursor: currentPage === 0 ? "not-allowed" : "pointer", // change cursor based on state
          }}
        >
          ⬅
        </button>
        <button
          onClick={handleNextPage}
          disabled={(currentPage + 1) * itemsPerPage >= notifications.length}
          style={{
            background:
              (currentPage + 1) * itemsPerPage >= notifications.length
                ? "#f2f2f2"
                : "#FFA500", // light grey when disabled, orange otherwise
            color:
              (currentPage + 1) * itemsPerPage >= notifications.length
                ? "#aaa"
                : "white", // adjust text color for contrast
            border: "none",
            borderRadius: "5px",
            padding: "10px 20px",
            cursor:
              (currentPage + 1) * itemsPerPage >= notifications.length
                ? "not-allowed"
                : "pointer", // change cursor based on state
          }}
        >
          ➡
        </button>
      </div>
      <br />
      {viewOption === "New" && (
        <ShowNewNotifications
          notifications={notifications}
          getNotificationId={getNotificationId}
        />
      )}

      {viewOption === "All" && (
        <ShowAllNotifications
          getNotificationId={getNotificationId}
          displayedNotifications={displayedNotifications}
          notifications={notifications}
        />
      )}

      <ShowHolidaysNotifications
        modalOpen={modalOpen}
        modalContent={modalContent}
        closeModal={closeModal}
      />

      {/* Modals options: */}

      {/* employee work routine modal*/}
      <div style={rowStyle}>
        <NotificationsModals
          employeeWorkRoutineModal={employeeWorkRoutineModal}
          closeEmployeeWorkRoutineModal={closeEmployeeWorkRoutineModal}
          openModalYes={openModalYes}
          openModalNo={openModalNo}
        />
      </div>

      {/* ------- John answer Yes---------- */}
      <div>
        {modalOpenYes && modalContentYes && (
          <NotificationsModals
            modalOpenYes={modalOpenYes}
            openModalNo={openModalNo}
            openModalYes={openModalYes}
            modalContentYes={modalContentYes}
            closeModalYes={closeModalYes}
          />
        )}
      </div>

      {/* --------John answer no ---------- */}
      <div>
        {modalOpenNo && modalContentNo && (
          <NotificationsModals
            modalOpenNo={modalOpenNo}
            openModalNo={openModalNo}
            openModalYes={openModalYes}
            modalContentNo={modalContentNo}
            closeModalNo={closeModalNo}
          />
        )}
      </div>

      {/*home meeting modal */}
      {homeMeetingModal && modalContent && (
        <NotificationsModals
          modalContent={modalContent}
          closeModal={closeModal}
          homeMeetingModal={homeMeetingModal}
        />
      )}

      {/* Soccer game modal}  */}

      {soccerGameModal && (
        <NotificationsModals
          soccerGameModal={soccerGameModal}
          closeSoccerGameModal={closeSoccerGameModal}
        />
      )}
      {/* {vacation modal}  */}
      <div>
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
