import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userData"));

  // If already logged in → block login page
  if (user?.token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRoute;