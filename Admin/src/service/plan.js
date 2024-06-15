import axios from "../setup/axios";

const addPlan = (plan) => {
  return axios.post(`/ca/plan`, plan);
};

const updatePlan = (planId, plan) => {
  return axios.put(`/ca/plan/${planId}`, plan);
};

const deletePlan = (planId) => {
  return axios.delete(`/ca/plan/${planId}`);
};
export { addPlan, updatePlan, deletePlan };
