import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PaymentService from "../services/payment.service";
import { useLocation } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [myPlan, setMyPlan] = useState({});
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/subscription/student_verify")
      PaymentService.getMySubCriptionPlan()
        .then((response) => {
          setMyPlan(response.data.data.plan);
        })
        .catch((error) => console.log(error));
  }, []);

  if (
    location.pathname === "/subscription/student_verify" &&
    myPlan?.description === "Gói dành cho sinh viên trường Đại học Thăng Long"
  ) {
    return <Navigate to="/" />;
  }
  // Check if the user is authenticated
  if (!isLoggedIn) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/sign_in" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};
