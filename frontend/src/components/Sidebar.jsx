import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ user }) => {
  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  return (
    <div
      className="d-flex flex-column justify-content-between text-white p-4 sidebar"
      style={{ width: "260px", minHeight: "100vh", background: "#14598d" }}
    >
      <div>
        <h2 className="fs-3 fw-bold mb-4 border-bottom">E-commerce</h2>

        <nav className="d-flex flex-column gap-2 sidebar">
          <Link
            to="/dashboard"
            className="text-white text-decoration-none p-2 rounded"
          >
            Home
          </Link>
          {user.role === "super admin" ? (
            <>
              <Link
                to="/dashboard/stores"
                className="text-white text-decoration-none p-2 rounded"
              >
                Stores
              </Link>
              <Link
                to="/dashboard/users"
                className="text-white text-decoration-none p-2 rounded"
              >
                Users
              </Link>
              <Link
                to="/dashboard/createStore"
                className="text-white text-decoration-none p-2 rounded"
              >
                Create Store
              </Link>
              <Link
                to="/dashboard/createUser"
                className="text-white text-decoration-none p-2 rounded"
              >
                Create User
              </Link>
            </>
          ) : (
            <Link
              to="/dashboard/storeDetails"
              className="text-white text-decoration-none p-2 rounded"
            >
              My Store
            </Link>
          )}
        </nav>
      </div>
      <button className="btn btn-danger fw-bold mb-4" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
