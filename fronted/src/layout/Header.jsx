import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import notificationsData from "../assets/json/notifications";
import message from "../assets/json/message";
import {
  Avatar_02,
  Applogo,
  headerlogo,
  lnEnglish,
  lnFrench,
  lnGerman,
  lnSpanish,
} from "../routes/ImagePath";
import { FaRegBell, FaRegComment } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
// import i18n from "../../i18n";
import { userProfile } from "../imgs";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/firebaseConfig";
import { logout } from "../redux";
import { signOut } from "firebase/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import NotificationsPopup from "../components/Modals/Notifications/NotificationsPopup";
import { fetchUserProfilePic } from "../services";

const Header = () => {
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.user?.fullName);
  const user = useSelector((state) => state.auth?.user.uid);
  const handleLogout = () => {
    dispatch(logout());
    signOut(auth);
    queryClient.clear();
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };
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
  const [flagImage, setFlagImage] = useState(lnEnglish);
  const [isOpen, setIsOpen] = useState(false);
  const [dismissToggle, setDismissToggle] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState("");

  const notificationRef = useRef(null);

  const { data } = useQuery({
    queryKey: ["user-profile-pic"],
    queryFn: () => fetchUserProfilePic(user),
    enabled: !!user,
  });
  useEffect(() => {
    if (data) {
      setUserProfileImage(data);
    }
  }, [data]);

  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  //   setNotificationVisible(false);
  //   setDismissToggle(false);
  //   setFlagImage(false);
  // };

  const handleNotification = () => {
    setNotificationVisible(!notificationVisible);
    setFlagImage(false);
    setIsOpen(false);
    setDismissToggle(false);
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
      
    </div>
  );
};

export default Header;
