import { Navigate } from "react-router-dom";

export const ProtectRouteForuser = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("users")) || null;

  if (user?.role === "user") {
    return children;
  }

  return <Navigate to="/login" />;
};
