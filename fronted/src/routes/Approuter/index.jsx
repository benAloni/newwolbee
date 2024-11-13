import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import AppContainer from "../Appcontainer";
import Login from "../../views/pages/Authentication/Login";
import Register from "../../views/pages/Authentication/Register";
import CreateAccount from "../../views/pages/Authentication/CreateAccount";
import ChangePassword from "../../views/pages/Authentication/ChangePassword";
import ForgotPassword from "../../views/pages/Authentication/ForgotPassword";
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
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/*" element={<AppContainer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
