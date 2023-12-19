import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import Router from "./Router";
import "./index.css";
import { ThemeProvider } from "@mui/material";
import { theme } from "./components/Theme/Theme";
import { Provider } from "react-redux";
import { store } from "./RTKQuery/store";
import "./components/fonts/A-Space_Light_Demo.otf";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={Router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
