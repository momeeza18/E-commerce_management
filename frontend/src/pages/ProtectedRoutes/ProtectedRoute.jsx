import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ element, roles }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  if (!token)
    return <Navigate to="/login" state={{ from: location }} replace />;

  if (
    user?.role === "manager" &&
    user?.forceResetPassword === false &&
    location.pathname !== "/changePassword"
  ) {
    return <Navigate to="/changePassword" replace />;
  }

  if (roles && !roles.includes(user?.role)) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
