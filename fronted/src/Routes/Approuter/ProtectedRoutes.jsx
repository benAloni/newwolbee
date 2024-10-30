import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { UNKNOWN_USER_STATE } from "../../redux/features/auth/authSlice";
import Loading from "../../views/layout/Loading";

const ProtectedRoutes = () => {
  const { user } = useAuth();
  if (user === UNKNOWN_USER_STATE ) {
    return <Loading />;
  }

  return user ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoutes;


