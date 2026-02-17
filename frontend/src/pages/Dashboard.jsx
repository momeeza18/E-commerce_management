import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar user={user} />

      <div className="flex-grow-1">
        <header className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom bg-light">
          <h3 className="m-0 fw-bold">Dashboard</h3>
          <span className="fw-semibold">
            Logged in as: { user?.role}
          </span>
        </header>
        <div className="p-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
