import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import notificationsData from "../assets/json/notifications";

import { userProfile } from "../imgs";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/firebaseConfig";
import { logout } from "../redux";
import { signOut } from "firebase/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserProfilePic } from "../services";

const Header = () => {
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useSelector((state) => state.auth.user?.fullName);
  const uid = useSelector((state) => state.auth?.user.uid);
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

  const [userProfileImage, setUserProfileImage] = useState("");

  const { data } = useQuery({
    queryKey: ["user-profile-pic"],
    queryFn: () => fetchUserProfilePic(uid),
    enabled: !!uid,
  });
  useEffect(() => {
    if (data) {
      setUserProfileImage(data);
    }
  }, [data]);

  return <div className="header" style={{ right: "0px" }}></div>;
};

export default Header;
