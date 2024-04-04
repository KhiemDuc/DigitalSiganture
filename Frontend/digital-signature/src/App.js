import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/home/LandingPage";
import SignIn from "./pages/sign_in/SignIn";
import SignUp from "./pages/sign_up/SignUp";
import Checkout from "./pages/checkout/Checkout";
import UserInfo from "./pages/user_info/UserInfo";
import RequestSignature from "./pages/request_sign/RequestSignature";
import ForgotPassword from "./pages/forgot_password/ForgotPass";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import PageNotFound from "./pages/page_not_found/PageNotFound";
import OTPVerifi from "./pages/otp_verifi/OtpVerifi";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/user_info" element={<UserInfo />} />
          <Route path="/request_sign" element={<RequestSignature />} />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/otp_verifi" element={<OTPVerifi />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
