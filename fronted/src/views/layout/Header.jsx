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
import defultprofile from "../../imgs/DefultProfile.png";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase/firebaseConfig";
import { logout } from "../../features/userSlice";
import { signOut } from "firebase/auth";
import { useQueryClient } from '@tanstack/react-query';
import NotificationsPopup from "../../components/modelpopup/Notifications/NotificationsPopup";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // הייבוא הנכון
import { app } from '../../firebase/firebaseConfig'; // ייבוא app
const Header = (props) => {
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = (() => {
    // Dispatch the logout action
    dispatch(logout());
    
    // Sign out from authentication
    signOut(auth);
    
    // Clear browser cache
    queryClient.clear();

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
  const [profileName, setProfileName] = useState('');
const [profilePicURL, setProfilePicURL] = useState(null);
  const storage = getStorage(app); // הגדרת משתנה storage

  useEffect(() => {
    const fetchProfilePic = async () => {
      const user = auth.currentUser;
      if (user) {
        const storedProfilePicURL = localStorage.getItem("profilePic");
        if (storedProfilePicURL) {
          setProfilePicURL(storedProfilePicURL); // השתמש ב-URL שנשמר ב-LocalStorage
        } else {
          // אם לא נמצא URL ב-LocalStorage, שלוף אותו מ-Firebase Storage
          const storageRef = ref(storage, `profilePictures/${user.uid}/profilePic`);
          try {
            const url = await getDownloadURL(storageRef);
            setProfilePicURL(url);
            localStorage.setItem("profilePic", url); // שמור את ה-URL ב-LocalStorage
          } catch (error) {
            console.error('שגיאה בשליפת תמונת פרופיל:', error);
          }
        }
      }
    };
  
    fetchProfilePic();
  }, [storage]);


  useEffect(() => {
    const user = auth.currentUser; // קבלת המשתמש המחובר
    if (user) {
      const name = user.displayName || "Admin"; // במידה ואין שם, ייכתב Admin
      setProfileName(name);
    }
  }, []);


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
        Hi{" "}
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>
          {profileName ? `${profileName}` : "Admin"}
        </span>{" "}
        welcome back to wolbee
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
          {/* <div className="top-nav-search">
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
          </div> */}
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
            <img src={profilePicURL || defultprofile} alt="Profile" />
              <span className="status online" />
            </span>
            <span> {profileName ? `${profileName}` : "Admin"}</span>
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

