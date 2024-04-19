import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./protectRoutes";
import { useSelector } from "react-redux";
import SignIn from "../pages/sign_in/SignIn";
import SignUp from "../pages/sign_up/SignUp";
import LandingPage from "../pages/home/LandingPage";
import PageNotFound from "../pages/page_not_found/PageNotFound";
import NewPassword from "../pages/new_password/NewPassword";
import OTPVerifi from "../pages/otp_verifi/OtpVerifi";
import UserInfo from "../pages/user_info/UserInfo";
import Checkout from "../pages/checkout/Checkout";
import SearchUser from "../pages/search_user/SearchUser";

const Routes = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/home",
      element: <LandingPage />,
    },
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/checkout/:id",
          element: <Checkout />,
        },
        {
          path: "/user_info/:id",
          element: <UserInfo />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/sign_in",
      element: <SignIn />,
    },
    {
      path: "/sign_up",
      element: <SignUp />,
    },
    {
      path: "/sign_up/otp_verifi/:tokenSignUp",
      element: <OTPVerifi otpHandle={"otp_signup"} />,
    },
    {
      path: "/forgot_password/search_user",
      element: <SearchUser />,
    },

    {
      path: "/forgot_password/search_user/confirm/:tokenForgot",
      element: <OTPVerifi otpHandle={"otp_forgot_password"} />,
    },
    {
      path: "/forgot_password/new_password/:tokenNewPass",
      element: <NewPassword />,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!isLoggedIn ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
