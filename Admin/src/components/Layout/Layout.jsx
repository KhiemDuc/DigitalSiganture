import { Outlet } from "react-router-dom";
import Sidebar from "../SideBar/SideBar";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;
  const endPath = path.split("/").pop();
  switch (endPath) {
    case "dashboard":
      var header = "Trang chủ";
      break;
    case "orders":
      var header = "Danh sách yêu cầu";
      break;
    case "user":
      var header = "Danh sách người dùng";
      break;
    case "plan":
      var header = "Quản lý gói";
      break;
    default:
      var header = "Trang chủ";
  }
  return (
    <Sidebar appBarText={header}>
      <Outlet />
    </Sidebar>
  );
};

export default Layout;
