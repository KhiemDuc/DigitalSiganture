import axios from "axios";

const instance = axios.create({
  baseURL: "https://provinces-api.onrender.com/api/",
  // timeout: 5000,
});

const getListProvinces = () => {
  return instance.get("p/");
};

const getAllDistrictsFromProvince = (provinceid) => {
  return instance.get(`p/${provinceid}?depth=2`);
};

const getAllWardsFromDistrict = (districtid) => {
  return instance.get(`d/${districtid}?depth=2`);
};

const ProvinceAPI = {
  getListProvinces,
  getAllDistrictsFromProvince,
  getAllWardsFromDistrict,
};

export default ProvinceAPI;
