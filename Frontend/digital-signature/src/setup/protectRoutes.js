import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  // Check if the user is authenticated
  if (!isLoggedIn) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/sign_in" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
