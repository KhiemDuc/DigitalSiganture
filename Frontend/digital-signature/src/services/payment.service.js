import axios from "../setup/axios";

const getListPlan = () => {
  return axios.get("plan");
};

const getMySubCriptionPlan = () => {
  return axios.get("subscription");
};

const PaymentService = {
  getListPlan,
  getMySubCriptionPlan,
};
export default PaymentService;
