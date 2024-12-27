import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { UNKNOWN_USER_STATE } from "../../redux/features/auth/authSlice";

const PublicRoutes = () => {
  const { user } = useAuth();

  if (user === UNKNOWN_USER_STATE || user === null || !user.role) {
    return <Outlet/>;
    
  } else {
    if(user.role === "manager"){
        return <Navigate to={"/adminDashboard"}/>
    } else if(user.role === "otherUser"){
        return <Navigate to={"/hrDashboard"}/>
    }
  }
};
export default PublicRoutes;
