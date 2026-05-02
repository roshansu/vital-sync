import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {

  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("userData"));
    console.log("user", user)
  } catch (err) {
    console.log(err)
    console.error("Invalid userData in localStorage");
  }

if (!user) {
  console.log("not user")
  return <Navigate to="/"  />;
}

  if (!user?.token || !user) {
    return <Navigate to="/login" />;
  }


  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};


export default  ProtectedRoute