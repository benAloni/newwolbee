import React from "react";
import ReactDOM from "react-dom/client";
import Approuter from "./routes/Approuter";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/css/line-awesome.min.css";
import "./assets/scss/main.scss";
import "./assets/css/material.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Approuter />
      </Provider>
    </QueryClientProvider>
  </>
);
