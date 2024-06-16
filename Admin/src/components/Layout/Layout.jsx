import { Outlet } from "react-router-dom";
import Sidebar from "../SideBar/SideBar";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Layout = () => {
  const admin = useSelector((state) => state.signature);
  if (!admin.key && !admin.cert) return <Navigate to={"/admin/login"} />;
  const location = useLocation();
  const path = location.pathname;
  const pathParts = path.split("/");
  const endPath = path.split("/").pop();
  switch (endPath) {
    case "dashboard":
      var header = "Trang chủ";
      break;
    case "orders":
      header = "Chi tiết yêu cầu";
      break;
    case "user":
      var header = "Danh sách người dùng";
      break;
    case "plan":
      var header = "Quản lý gói";
      break;
    case "certificate_list":
      var header = "Danh sách chứng chỉ số";
      break;
    case "histories":
      var header = "Lịch sử";
      break;
    default:
      if (pathParts[pathParts.length - 2] === "orders") {
        header = "Chi tiết yêu cầu";
      }
  }

  return (
    <Sidebar appBarText={header}>
      <Outlet />
    </Sidebar>
  );
};

export default Layout;
