import axios from "../setup/axios";

const getListPlan = () => {
  return axios.get("plan");
};

const getMySubCriptionPlan = () => {
  return axios.get("subscription");
};

const subscriptionStudent = (studentInfo) => {
  return axios.post("subscription/student", studentInfo);
};

const verifySubscriptionStudent = (otp, token) => {
  return axios.post(
    "subscription/student/verify",
    {
      otp,
    },
    {
      headers: {
        token,
      },
    }
  );
};

const cancelmySubscriptionPlan = () => {
  return axios.delete("subscription");
};

const PaymentService = {
  getListPlan,
  getMySubCriptionPlan,
  subscriptionStudent,
  verifySubscriptionStudent,
  cancelmySubscriptionPlan,
};
export default PaymentService;
