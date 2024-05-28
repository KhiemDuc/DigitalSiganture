import { Outlet } from "react-router-dom";
import Sidebar from "../SideBar/SideBar";

const Layout = () => {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
};

export default Layout;
