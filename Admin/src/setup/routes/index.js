import Login from "../../components/Login/Login";
import Dashboard from "../../components/DashBoard/DashBoard";
import Sidebar from "../../components/SideBar/SideBar";
import NotFound from "../../components/404NotFound/NotFound";
import Orders from "../../components/Orders/Orders";
import OrderDetail from "../../components/OrderDetail/OrderDetail";
const privateRoutes = [];

const publicRoutes = [
  {
    path: "/admin/login",
    component: Login,
  },

  {
    path: "/admin/dashboard",
    component: Dashboard,
    text: "Dashboard",
  },

  {
    path: "/admin/users_list",
    component: Dashboard,
    text: "Danh sách người dùng",
  },
  {
    path: "/admin/orders",
    component: Orders,
  },
  {
    path: "admin/orders/:id",
    component: OrderDetail,
  },
];

export { privateRoutes, publicRoutes };
