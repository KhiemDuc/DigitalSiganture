import Dashboard from "../../components/DashBoard/DashBoard";
import NotFound from "../../components/404NotFound/NotFound";
import Orders from "../../components/Orders/Orders";
import OrderDetail from "../../components/OrderDetail/OrderDetail";
import UserList from "../../components/User/User";
import Plan from "../../components/Plan/Plan";
import CertiList from "../../components/CertificateList/CertiList";
import History from "../../components/History/History";
const privateRoutes = [];

const publicRoutes = [
  {
    path: "/admin/dashboard",
    component: Dashboard,
    text: "Dashboard",
  },
  {
    path: "/admin/orders",
    component: Orders,
  },
  {
    path: "/admin/orders/:id",
    component: OrderDetail,
  },
  {
    path: "/admin/user",
    component: UserList,
  },
  {
    path: "/admin/plan",
    component: Plan,
  },
  {
    path: "*",
    component: NotFound,
  },
  {
    path: "/admin/certificate_list",
    component: CertiList,
  },
  {
    path: "/admin/histories",
    component: History,
  },
];

export { privateRoutes, publicRoutes };
