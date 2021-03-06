import { Dashboard } from "views/app/Dashboard";
import { Devices } from "views/app/Devices";
import { Map } from "views/app/Map";
import { Widgets } from "views/app/Widgets";

/*
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: "tim-icons icon-atom",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: "tim-icons icon-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
  // {
  //   path: "/user-profile",
  //   name: "User Profile",
  //   rtlName: "ملف تعريفي للمستخدم",
  //   icon: "tim-icons icon-single-02",
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   rtlName: "قائمة الجدول",
  //   icon: "tim-icons icon-puzzle-10",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: "tim-icons icon-align-center",
  //   component: Typography,
  //   layout: "/admin",
  // },

*/


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
    path : "/devices",
    name : "Devices",
    rtlName : 'Omar Valdivia',
    icon : "tim-icons icon-send",
    component : Devices,
    layout : '/admin'
  },
  {
    path : '/Widgets',
    name : 'Widgets',
    rtlName : 'Omar Valdivia',
    icon : 'tim-icons icon-bulb-63',
    component : Widgets,
    layout : '/admin'
  },
  {
    path: "/Maps",
    name: "Maps",
    rtlName: "Omar Valdivia",
    icon: "tim-icons icon-world",
    component: Map,
    layout: "/admin",
  }
];
export default routes;
