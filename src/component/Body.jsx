import React from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Footer from "./Footer";
import {
  createBrowserRouter,
  Form,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import RegestrationForm from "./RegestrationForm";

const AppLayout = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col min-h-[85vh]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <RegestrationForm />,
      },
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

const Body = () => {
  return <RouterProvider router={appRouter} />;
};

export default Body;
