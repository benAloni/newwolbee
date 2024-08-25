import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import notificationsData from "../../assets/json/notifications";
import message from "../../assets/json/message";
import {
  Avatar_02,
  Applogo,
  headerlogo,
  lnEnglish,
  lnFrench,
  lnGerman,
  lnSpanish,
} from "../../Routes/ImagePath";
import { FaRegBell, FaRegComment } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import manager from "../../imgs/managerProfilePic.jpg";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase/firebaseConfig";
import { logout } from "../../features/userSlice";
import { signOut } from "firebase/auth";
import NotificationsPopup from "../../components/modelpopup/Notifications/NotificationsPopup";

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = (() => {
    // Dispatch the logout action
    dispatch(logout());
    
    // Sign out from authentication
    signOut(auth);
    
    // Clear browser cache
    if ('caches' in window) {
        caches.keys().then((names) => {
            names.forEach(name => {
                caches.delete(name);
            });
        });
    }

    // Clear localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();
    
    // Navigate to the home page
    navigate("/");
})
  const initialNotifications = notificationsData.notifications.map(
    (notification) => ({
      ...notification,
      read: false, // Initialize read status as false
    })
  );

  const datas = message.message;
  const [notifications, setNotifications] = useState(initialNotifications);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [flag, setFlag] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const [flagImage, setFlagImage] = useState(lnEnglish);
  const notificationRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setNotificationVisible(false);
    setProfile(false);
    setFlag(false);
  };

  const handleNotification = () => {
    setNotificationVisible(!notificationVisible);
    setFlag(false);
    setIsOpen(false);
    setProfile(false);
  };

  const handleProfile = () => {
    setProfile(!profile);
    setNotificationVisible(false);
    setFlag(false);
    setIsOpen(false);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setFlagImage(
      lng === "en"
        ? lnEnglish
        : lng === "fr"
        ? lnFrench
        : lng === "es"
        ? lnSpanish
        : lnGerman
    );
  };


  const notificationNav = (key) => {
    const notification = notifications.find(
      (notification) => notification.id === key
    );
    if (notification) {
      if (notification.link.startsWith("http")) {
        // If the link is an external URL, use window.location.href
        window.location.href = notification.link;
      } else {
        // If the link is an internal route, use navigate
        navigate(notification.link);
      }
    }
  };

  const markAsRead = (event, id) => {
    event.stopPropagation(); // Prevent event propagation to avoid closing the dropdown
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, read: !notification.read }
          : notification
      )
    );
  };

  const deleteNotification = (event, id) => {
    event.stopPropagation(); // Prevent event propagation to avoid closing the dropdown
    setNotifications(
      notifications.filter((notification) => notification.id !== id)
    );
  };

  const clearAllNotifications = (event) => {
    event.stopPropagation(); // Prevent event propagation to avoid closing the dropdown
    setNotifications([]);
  };

  const location = useLocation();
  let pathname = location.pathname;

  const Credencial = localStorage.getItem("credencial");
  const Value = JSON.parse(Credencial);
  const UserName = Value?.email?.split("@")[0];
  const ProfileName = UserName?.charAt(0).toUpperCase() + UserName?.slice(1);

  const { t, i18n } = useTranslation();

  // Close notification when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationRef]);

  return (
    <div className="header" style={{ right: "0px" }}>
      <div className="header-left">
        <Link to="/admin-dashboard" className="logo">
          <img
            src={Applogo}
            alt="img"
            style={{ height: "42px", marginTop: "-12px" }}
          />
        </Link>
        <Link to="/admin-dashboard" className="logo2">
          <img src={Applogo} width={40} height={40} alt="img" />
        </Link>
      </div>
      {/* <Link id="toggle_btn" to="#" style={{ display: pathname.includes("tasks") ? "none" : pathname.includes("compose") ? "none" : "" }}>
        <span className="bar-icon">
          <span />
          <span />
          <span />
        </span>
      </Link> */}
      <div className="page-title-box" style={{ marginTop: "5px" }}>
        <h4>
          {" "}
          Hi{" "}
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            {" "}
            {ProfileName ? `${ProfileName}` : "Admin"}{" "}
          </span>
          welcome back to wolbee{" "}
        </h4>
      </div>
      <Link
        id="mobile_btn"
        className="mobile_btn"
        to="#"
        onClick={() => document.body.classList.toggle("slide-nav")}
      >
        <i className="fa fa-bars" />
      </Link>
      <ul className="nav user-menu">
        <li className="nav-item">
          <div className="top-nav-search">
            <Link to="#" className="responsive-search">
              <i className="fa fa-search" />
            </Link>
            <form>
              <input
                className="form-control"
                type="text"
                placeholder="Search here"
              />
              <button className="btn" type="submit">
                <i className="fa fa-search" />
              </button>
            </form>
          </div>
        </li>
        <li className="nav-item dropdown has-arrow flag-nav">
          <Link
            className="nav-link dropdown-toggle"
            data-bs-toggle="dropdown"
            to="#"
            role="button"
          >
            <img src={flagImage} alt="Flag" height="20" /> {t(i18n.language)}
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link
              to="#"
              className="dropdown-item"
              onClick={() => changeLanguage("en")}
            >
              <img src={lnEnglish} alt="Flag" height="16" /> English
            </Link>
            <Link
              to="#"
              className="dropdown-item"
              onClick={() => changeLanguage("fr")}
            >
              <img src={lnFrench} alt="Flag" height="16" /> French
            </Link>
            <Link
              to="#"
              className="dropdown-item"
              onClick={() => changeLanguage("es")}
            >
              <img src={lnSpanish} alt="Flag" height="16" /> Spanish
            </Link>
            <Link
              to="#"
              className="dropdown-item"
              onClick={() => changeLanguage("de")}
            >
              <img src={lnGerman} alt="Flag" height="16" /> German
            </Link>
          </div>
        </li>
        <li className="nav-item dropdown">
          <Link
            to="/contacts"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
            onClick={handleNotification}
          >
            <i>
              <FaRegBell />
            </i>{" "}
            <span className="badge badge-pill">{notifications.length}</span>
          </Link>
          <div
            ref={notificationRef}
            className={`dropdown-menu dropdown-menu-end notifications ${
              notificationVisible ? "show" : ""
            }`}
          >
            <div className="topnav-dropdown-header">
              <span className="notification-title">Notifications</span>
              <Link
                to="#"
                onClick={clearAllNotifications}
                className="clear-noti"
              >
                {" "}
                Clear All{" "}
              </Link>
            </div>
            <div className="noti-content">
            <NotificationsPopup/>
            </div>
            <div
              className="topnav-dropdown-footer"
              style={{ lineHeight: "42px" }}
            >
              <Link to="/contacts">View all Notifications</Link>
            </div>
          </div>
        </li>
        {/* <li className={`nav-item dropdown ${isOpen ? "show" : ""}`}>
          <Link to="#" className="dropdown-toggle nav-link" data-bs-toggle="dropdown" onClick={toggleDropdown}>
            <i><FaRegComment /></i> <span className="badge badge-pill">8</span>
          </Link>
          <div className={`dropdown-menu dropdown-menu-end notifications ${isOpen ? "show" : ""}`}>
            <div className="topnav-dropdown-header">
              <span className="notification-title">Messages</span>
              <Link to="#" className="clear-noti"> Clear All </Link>
            </div> */}
        {/* <div className="noti-content">
              <ul className="notification-list">
                {datas.map((value, index) => (
                  <li className="notification-message" key={index}>
                    <Link onClick={() => localStorage.setItem("minheight", "true")} to="#">
                      <div className="list-item">
                        <div className="list-left">
                          <span className="avatar">
                            <img alt="" src={value.image} />
                          </span>
                        </div>
                        <div className="list-body">
                          <span className="message-author">{value.name}</span>
                          <span className="message-time">{value.time}</span>
                          <div className="clearfix" />
                          <span className="message-content">{value.contents}</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}
        {/* <div className="topnav-dropdown-footer">
              <Link onClick={() => localStorage.setItem("minheight", "true")} to="#">View all Messages</Link>
            </div>
          </div>
        </li> */}
        <li className="nav-item dropdown has-arrow main-drop">
          <Link
            to="#"
            className="dropdown-toggle nav-link"
            data-bs-toggle="dropdown"
            onClick={handleProfile}
          >
            <span className="user-img me-1">
              <img src={manager} alt="img" />
              <span className="status online" />
            </span>
            <span>{ProfileName ? `${ProfileName}` : "Admin"}</span>
          </Link>
          <div
            className={`dropdown-menu dropdown-menu-end ${
              profile ? "show" : ""
            }`}
          >
            <Link className="dropdown-item" to="/admin-dashboard">
              My Profile
            </Link>
            <Link className="dropdown-item" to="/settings">
              Settings
            </Link>
            <button className="dropdown-item" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </li>
      </ul>
      <div className="dropdown mobile-user-menu">
        <Link
          to="#"
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa fa-ellipsis-v" />
        </Link>
        <div className="dropdown-menu dropdown-menu-end dropdown-menu-right">
          <Link className="dropdown-item" to="/admin-dashboard">
            My Profile
          </Link>
          <Link className="dropdown-item" to="/settings">
            Settings
          </Link>
          <button className="dropdown-item" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;

// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// /* eslint-disable react/no-unescaped-entities */

// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import notifications from "../../assets/json/notifications";
// import message from "../../assets/json/message";
// import {
//   Applogo,
//   Avatar_02,
//   headerlogo,
//   lnEnglish,
//   lnFrench,
//   lnGerman,
//   lnSpanish,
// } from "../../Routes/ImagePath";

// import { FaRegBell, FaRegComment } from "react-icons/fa";
// import { useLocation } from "react-router-dom/dist";
// import { useTranslation } from "react-i18next";
// import i18n from "../../i18n";

// const Header = (props) => {
//   const data = notifications.notifications;
//   const datas = message.message;
//   const [notification, setNotifications] = useState(false);
//   const [flag, setflag] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [profile, setProfile] = useState(false);
//   const [flagImage, setFlagImage] = useState(lnEnglish);

//   const handlesidebar = () => {
//     document.body.classList.toggle("mini-sidebar");
//   };
//   const onMenuClik = () => {
//     document.body.classList.toggle("slide-nav");
//   };

//   const themes = localStorage.getItem("theme");

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//     setNotifications(false);
//     setProfile(false);
//     setflag(false);
//   };

//   // const handleFlags = () => {
//   //   setflag(!flag);
//   //   setIsOpen(false);
//   //   setNotifications(false);
//   //   setProfile(false);
//   // };
//   const handleNotification = () => {
//     setNotifications(!notification);
//     setflag(false);
//     setIsOpen(false);
//     setProfile(false);
//   };
//   const handleProfile = () => {
//     setProfile(!profile);
//     setNotifications(false);
//     setflag(false);
//     setIsOpen(false);
//   };

//   const location = useLocation();
//   let pathname = location.pathname;
//   // const { value } = useSelector((state) => state.user);
//   const Credencial = localStorage.getItem("credencial");
//   const Value = JSON.parse(Credencial);
//   const UserName = Value?.email?.split("@")[0];
//   const ProfileName = UserName?.charAt(0).toUpperCase() + UserName?.slice(1);

//   const { t, i18n } = useTranslation();

//   const changeLanguage = (lng) => {
//     // Debugging statement
//     i18n.changeLanguage(lng);
//     setFlagImage(
//       lng === "en"
//         ? lnEnglish
//         : lng === "fr"
//           ? lnFrench
//           : lng === "es"
//             ? lnSpanish
//             : lnGerman
//     );
//   };

//   return (
//     <div className="header" style={{ right: "0px" }}>
//       {/* Logo */}
//       <div className="header-left">
//         <Link to="/admin-dashboard" className="logo">
//           <img src={headerlogo}  alt="img" />
//         </Link>
//         <Link to="/admin-dashboard" className="logo2">
//           <img src={Applogo} width={40} height={40} alt="img" />
//         </Link>
//       </div>
//       {/* /Logo */}
//       <Link
//         id="toggle_btn"
//         to="#"
//         style={{
//           display: pathname.includes("tasks")
//             ? "none"
//             : pathname.includes("compose")
//               ? "none"
//               : "",
//         }}
//         onClick={handlesidebar}
//       >
//         <span className="bar-icon">
//           <span />
//           <span />
//           <span />
//         </span>
//       </Link>
//       {/* Header Title */}
//       <div className="page-title-box">
//         <h3>Dreams Technologies</h3>
//       </div>
//       {/* /Header Title */}
//       <Link
//         id="mobile_btn"
//         className="mobile_btn"
//         to="#"
//         onClick={() => onMenuClik()}
//       >
//         <i className="fa fa-bars" />
//       </Link>
//       {/* Header Menu */}
//       <ul className="nav user-menu">
//         {/* Search */}
//         <li className="nav-item">
//           <div className="top-nav-search">
//             <Link to="#" className="responsive-search">
//               <i className="fa fa-search" />
//             </Link>
//             <form>
//               <input
//                 className="form-control"
//                 type="text"
//                 placeholder="Search here"
//               />
//               <button className="btn" type="submit">
//                 <i className="fa fa-search" />
//               </button>
//             </form>
//           </div>
//         </li>
//         {/* /Search */}
//         {/* Flag */}

//         <li className="nav-item dropdown has-arrow flag-nav">
//           <Link
//             className="nav-link dropdown-toggle"
//             data-bs-toggle="dropdown"
//             to="#"
//             role="button"
//           >
//             <img src={flagImage} alt="Flag" height="20" /> {t(i18n.language)}
//           </Link>
//           <div className="dropdown-menu dropdown-menu-right">
//             <Link
//               to="#"
//               className="dropdown-item"
//               onClick={() => changeLanguage("en")}
//             >
//               <img src={lnEnglish} alt="Flag" height="16" /> English
//             </Link>
//             <Link
//               to="#"
//               className="dropdown-item"
//               onClick={() => changeLanguage("fr")}
//             >
//               <img src={lnFrench} alt="Flag" height="16" /> French
//             </Link>
//             <Link
//               to="#"
//               className="dropdown-item"
//               onClick={() => changeLanguage("es")}
//             >
//               <img src={lnSpanish} alt="Flag" height="16" /> Spanish
//             </Link>
//             <Link
//               to="#"
//               className="dropdown-item"
//               onClick={() => changeLanguage("de")}
//             >
//               <img src={lnGerman} alt="Flag" height="16" /> German
//             </Link>
//           </div>
//         </li>
//         {/* /Flag */}
//         {/* Notifications */}
//         <li className="nav-item dropdown">
//           <Link
//             to="/contacts"
//             className="dropdown-toggle nav-link"
//             data-bs-toggle="dropdown"
//             onClick={handleNotification}
//           >
//             <i>
//               <FaRegBell />
//             </i>{" "}
//             <span className="badge badge-pill">3</span>
//           </Link>
//           <div
//             className={`dropdown-menu dropdown-menu-end notifications ${notification ? "show" : ""
//               }`}
//           >
//             <div className="topnav-dropdown-header">
//               <span className="notification-title">Notifications</span>
//               <Link
//                 to="#"
//                 onClick={() => setNotifications(false)}
//                 className="clear-noti"
//               >
//                 {" "}
//                 Clear All{" "}
//               </Link>
//             </div>
//             <div className="noti-content">
//               <ul className="notification-list">
//                 {data.map((val, index) => {
//                   return (
//                     <li className="notification-message" key={index}>
//                       <Link
//                         onClick={() =>
//                           localStorage.setItem("minheight", "true")
//                         }
//                         to="/app/administrator/activities"
//                       >
//                         <div className="media d-flex">
//                           <span className="avatar flex-shrink-0">
//                             <img alt="" src={val.image} />
//                           </span>
//                           <div className="media-body">
//                             <p className="noti-details">
//                               {/* <span className="noti-title">{val.name}</span>{" "}
//                               {val.contents}{" "} */}
//                               <span className="noti-title">
//                                 {val.contents_2}
//                               </span>
//                             </p>
//                             <p className="noti-time">
//                               <span className="notification-time">
//                                 {val.time}
//                               </span>
//                             </p>
//                           </div>
//                         </div>
//                       </Link>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//             <div className="topnav-dropdown-footer">
//               <Link
//                 onClick={() => localStorage.setItem("minheight", "true")}
//                 to="/contacts"
//               >
//                 View all Notifications
//               </Link>
//             </div>
//           </div>
//         </li>
//         {/* /Notifications */}
//         {/* Message Notifications */}
//         <li className={`nav-item dropdown ${isOpen ? "show" : ""}`}>
//           <Link
//             to="#"
//             className="dropdown-toggle nav-link"
//             data-bs-toggle="dropdown"
//             onClick={toggleDropdown}
//           >
//             <i>
//               <FaRegComment />
//             </i>{" "}
//             <span className="badge badge-pill">8</span>
//           </Link>
//           <div
//             className={`dropdown-menu dropdown-menu-end notifications ${isOpen ? "show" : ""
//               }`}
//           >
//             <div className="topnav-dropdown-header">
//               <span className="notification-title">Messages</span>
//               <Link to="#" className="clear-noti">
//                 {" "}
//                 Clear All{" "}
//               </Link>
//             </div>
//             <div className="noti-content">
//               <ul className="notification-list">
//                 {datas.map((value, index) => {
//                   return (
//                     <li className="notification-message" key={index}>
//                       <Link
//                         onClick={() =>
//                           localStorage.setItem("minheight", "true")
//                         }
//                         to="/conversation/chat"
//                       >
//                         <div className="list-item">
//                           <div className="list-left">
//                             <span className="avatar">
//                               <img alt="" src={value.image} />
//                             </span>
//                           </div>
//                           <div className="list-body">
//                             <span className="message-author">{value.name}</span>
//                             <span className="message-time">{value.time}</span>
//                             <div className="clearfix" />
//                             <span className="message-content">
//                               {value.contents}
//                             </span>
//                           </div>
//                         </div>
//                       </Link>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//             <div className="topnav-dropdown-footer">
//               <Link
//                 onClick={() => localStorage.setItem("minheight", "true")}
//                 to="/conversation/chat"
//               >
//                 View all Messages
//               </Link>
//             </div>
//           </div>
//         </li>
//         {/* /Message Notifications */}
//         <li className="nav-item dropdown has-arrow main-drop">
//           <Link
//             to="#"
//             className="dropdown-toggle nav-link"
//             data-bs-toggle="dropdown"
//             onClick={handleProfile}
//           >
//             {" "}
//             <span className="user-img me-1">
//               <img src={Avatar_02} alt="img" />
//               <span className="status online" />
//             </span>
//             <span>{ProfileName ? `${ProfileName}` : "Admin"}</span>
//           </Link>
//           <div
//             className={`dropdown-menu dropdown-menu-end ${profile ? "show" : ""
//               }`}
//           >
//             <Link className="dropdown-item" to="/profile">
//               My Profile
//             </Link>
//             <Link className="dropdown-item" to="/settings/companysetting">
//               Settings
//             </Link>
//             <Link className="dropdown-item" to="/">
//               Logout
//             </Link>
//           </div>
//         </li>
//       </ul>
//       {/* /Header Menu */}
//       {/* Mobile Menu */}
//       <div className="dropdown mobile-user-menu">
//         <Link
//           to="#"
//           className="nav-link dropdown-toggle"
//           data-bs-toggle="dropdown"
//           aria-expanded="false"
//         >
//           <i className="fa fa-ellipsis-v" />
//         </Link>
//         <div className="dropdown-menu dropdown-menu-end dropdown-menu-right">
//           <Link className="dropdown-item" to="/profile">
//             My Profile
//           </Link>
//           <Link className="dropdown-item" to="/settings/companysetting">
//             Settings
//           </Link>
//           <Link className="dropdown-item" to="/login">
//             Logout
//           </Link>
//         </div>
//       </div>
//       {/* /Mobile Menu */}
//     </div>
//   );
// };

// export default Header;
