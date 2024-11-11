import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AppContainer from "../Appcontainer";
import Login from "../../views/pages/Authentication/Login";
import Register from "../../views/pages/Authentication/Register";
import CreateAccount from "../../views/pages/Authentication/CreateAccount";
import ChangePassword from "../../views/pages/Authentication/ChangePassword";
import ForgotPassword from "../../views/pages/Authentication/ForgotPassword";
import SideBar from "../../layout/SideBar";
import { Navigate } from "react-router-dom";
import Department from "../../views/pages/Employees/Department";
import { SideBarData } from "../../layout/SideBarData";
import PopUp from "../../views/pages/Employees/PopUp";
import UserSettings from "../../views/pages/Authentication/UserSettings";
import MyDashboard from "../../views/pages/MainPages/Dashboard/AdminDashboard/MyDashboard";
import HrDashboard from "../../views/pages/MainPages/Dashboard/AdminDashboard/HrDashboard";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route path="/" element={<Login />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-account" element={<CreateAccount />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/myDashboard" element={<MyDashboard />} />
            <Route path="/hrDashboard" element={<HrDashboard />} />
            <Route path="/sidebar" element={<SideBar />} data={SideBarData} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/*" element={<AppContainer />} />
            <Route path="/settings" element={<UserSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
