import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Report from "./pages/Report/Report";
import PrivateWrapper from "./components/Routes/PrivateWrapper";
import TagsManagement from "./pages/TagsManagement/TagsManagement";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ReportDetails from "./pages/ReportDetails/ReportDetails";
import CsvDetails from "./pages/CsvDetails/CsvDetails";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/forgot/password",
    element: <ForgotPassword />,
  },
  {
    element: <PrivateWrapper />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "report",
        element: <Report />,
      },
      {
        path: "report/details/:id",
        element: <ReportDetails />,
      },
      {
        path: "csv/details/:id",
        element: <CsvDetails />,
      },
      {
        path: "tagsmanagement",
        element: <TagsManagement />,
      },
    ],
  },
]);

export default Router;
