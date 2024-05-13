import Login from "../../components/Login/Login";
import Dashboard from "../../components/DashBoard/DashBoard";
import Sidebar from "../../components/SideBar/SideBar";
import NotFound from "../../components/404NotFound/NotFound";

const privateRoutes = [];

const publicRoutes = [
  {
    path: "*",
    component: NotFound,
    sidebar: false,
  },
  {
    path: "/admin/login",
    component: Login,
    sidebar: false,
  },

  {
    path: "/admin/dashboard",
    component: Dashboard,
    text: "Dashboard",
    sidebar: true,
  },

  {
    path: "/admin/users_list",
    component: Dashboard,
    text: "Danh sách người dùng",
    sidebar: true,
  },
];

export { privateRoutes, publicRoutes };
