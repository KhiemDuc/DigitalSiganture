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
import RequestSignature from "./../pages/request_sign/RequestSignature";
import StudentVerify from "../components/StudentVerify/StudentVerify";
import { otpHandle } from "../pages/otp_verifi/OtpVerifi";
import PricingPage from "../pages/pricing/PricingPage";
import MyPlan from "../pages/my_plan/MyPlan";
import CheckCertificatePage from "../pages/check_certificate/CheckCertificatePage";
import CreateKey from "../pages/create_key/CreateKey";
import MyRequest from "./../pages/my_request/index";
import CreataDigitalSignature from "../pages/create_digital_signature/CreateDigitalSignature";
import ExtendCertificate from "../pages/extend_certificate/ExtendCertificate";

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

    {
      path: "pricing",
      element: <PricingPage />,
    },
    {
      path: "certificate/check",
      element: <CheckCertificatePage />,
    },
    {
      path: "/certificate/create_key",
      element: <CreateKey />,
    },
    {
      path: "/certificate/create_digital_signature",
      element: <CreataDigitalSignature />,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/home",
          element: <LandingPage />,
        },
        {
          path: "/checkout/:id",
          element: <Checkout />,
        },
        {
          path: "/user_info/:id",
          element: <UserInfo />,
        },
        {
          path: "/subscription/student_verify/",
          element: <StudentVerify />,
        },
        {
          path: "/subscription/my_subscription/",
          element: <MyPlan />,
        },
        {
          path: "/otp_student_verify/:tokenStudentVerify",
          element: (
            <OTPVerifi otpHandle={otpHandle.OTP_SUBSCRIPTION_STUDNET_VERIFY} />
          ),
        },
        {
          path: "/my_plan",
          element: <MyPlan />,
        },
        {
          path: "/certificate/my_request",
          element: <MyRequest />,
        },
        {
          path: "/certificate/request",
          element: <RequestSignature />,
        },
        {
          path: "/certificate/extend",
          element: <ExtendCertificate />,
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
      element: <OTPVerifi otpHandle={otpHandle.OTP_SIGNUP} />,
    },
    {
      path: "/forgot_password/search_user",
      element: <SearchUser />,
    },

    {
      path: "/forgot_password/search_user/confirm/:tokenForgot",
      element: <OTPVerifi otpHandle={otpHandle.OTP_FORGOT_PASSWORD} />,
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
