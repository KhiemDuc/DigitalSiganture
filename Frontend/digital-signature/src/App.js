import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/home/LandingPage";
import SignIn from "./pages/sign_in/SignIn";
import SignUp from "./pages/sign_up/SignUp";
import Checkout from "./pages/checkout/Checkout";
import UserInfo from "./pages/user_info/UserInfo";
import RequestSignature from "./pages/request_sign/RequestSignature";
import { Provider } from "react-redux";
import { store } from "./redux/Store";
import PageNotFound from "./pages/page_not_found/PageNotFound";
import OTPVerifi from "./pages/otp_verifi/OtpVerifi";
import SearchUser from "./pages/search_user/SearchUser";
import NewPassword from "./pages/new_password/NewPassword";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/user_info/:id" element={<UserInfo />} />
          <Route path="/request_sign" element={<RequestSignature />} />
          <Route path="/forgot_password/search_user" element={<SearchUser />} />
          <Route
            path="/sign_up/otp_verifi/:tokenSignUp"
            element={<OTPVerifi otpHandle={"otp_signup"} />}
          />

          <Route
            path="/forgot_password/search_user/confirm/:tokenForgot"
            element={<OTPVerifi otpHandle={"otp_forgot_password"} />}
          />

          <Route path="*" element={<PageNotFound />} />
          <Route
            path="/forgot_password/new_password/:tokenForgot"
            element={<NewPassword />}
          />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
