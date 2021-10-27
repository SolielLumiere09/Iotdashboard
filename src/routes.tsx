import { Widgets } from "views/app/Widgets";
import Dashboard from "views/Examples/Dashboard.js";
import Icons from "views/Examples/Icons.js";
import Notifications from "views/Examples/Notifications.js";
import TableList from "views/Examples/TableList.js";
import Typography from "views/Examples/Typography.js";
import UserProfile from "views/Examples/UserProfile.js";


interface Routes {
    path: string
    name: string,
    rtlName: string,
    icon: string,
    component: JSX.Element | any,
    layout: string,
}

var routes : Routes[] = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    rtlName: "الرموز",
    icon: "tim-icons icon-atom",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: "tim-icons icon-bell-55",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Table List",
    rtlName: "قائمة الجدول",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    rtlName: "طباعة",
    icon: "tim-icons icon-align-center",
    component: Typography,
    layout: "/admin",
  },
  {
    path : '/Widgets',
    name : 'Widgets',
    rtlName : 'Omar Valdivia',
    icon : 'tim-icons icon-shape-star',
    component : Widgets,
    layout : '/admin'
  }
];
export default routes;