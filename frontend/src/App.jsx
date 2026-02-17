import React from "react";
import "./App.css";
import Login from "./components/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ChangenewPassword from "./components/ChangePassword";
import StoreList from "./pages/StorePages/StoreList";
import ProtectedRoute from "./pages/ProtectedRoutes/ProtectedRoute";
import CreateStore from "./pages/StorePages/CreateStore";
import UsersList from "./pages/UsersPages/UsersList";
import CreateUser from "./pages/UsersPages/CreateUser";
import HomePage from "./pages/ProfilePages/HomePage";
import Error from "./pages/ErrorPage/Error";

function App() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" replace /> : <Login />}
        />
        <Route
          path="/changePassword"
          element={
            user?.forceResetPassword === true ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <ProtectedRoute
                element={<ChangenewPassword />}
                roles={["manager"]}
              />
            )
          }
        />
        <Route
          path="/dashboard"
          element={<ProtectedRoute element={<Dashboard />} />}
        >
          <Route
            index
            element={
              <ProtectedRoute
                element={<HomePage />}
                roles={["super admin", "manager"]}
              />
            }
          />
          <Route
            path="/dashboard/stores"
            element={
              <ProtectedRoute element={<StoreList />} roles={["super admin"]} />
            }
          />
          <Route
            path="/dashboard/createStore"
            element={
              <ProtectedRoute
                element={<CreateStore />}
                roles={["super admin"]}
              />
            }
          />
          <Route
            path="/dashboard/users"
            element={
              <ProtectedRoute element={<UsersList />} roles={["super admin"]} />
            }
          />
          <Route
            path="/dashboard/createUser"
            element={
              <ProtectedRoute
                element={<CreateUser />}
                roles={["super admin"]}
              />
            }
          />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
