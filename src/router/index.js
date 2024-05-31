// index.js
import { createRouter, createWebHistory } from "vue-router";
import BlankLayout from "../components/layouts/BlankLayout.vue"; 
import Attendance from "@/components/Attendance/Attendance.vue";
import UserProfile from "@/components/Profile/UserProfile.vue";
import Mydesk from "@/components/Mydesk/Mydesk.vue";
import Leave from "@/components/Leave/Leave.vue";
import Holiday from "@/components/Holiday/Holiday.vue";
import Payroll from "@/components/Payroll/Payroll.vue";
import Signup from "../views/user/Sigup.vue";
import Login from "../views/user/Login.vue";
import Home from "@/components/Home/Home.vue";

// ADMIN
import Create_user from "@/components/Home/Create_user.vue";
import PersonalDetails from "@/components/Home/PersonalDetails.vue";
import LeaveStatus from "@/components/Home/LeaveStatus.vue";
import User_attendance from "@/components/Home/User_attendance.vue";
import Userlist from "@/components/Home/Userlist.vue";

const routes = [
  {
    path: "/",
    component: Login,
    name: "Login",
    meta: { layout: BlankLayout } // Use BlankLayout for Login
  },
  {
    path: "/home",
    component: Home,
    name: "Home",
  },
  {
    path: "/attendance",
    component: Attendance,
    name: "Attendance",
  },
  {
    path: "/profile",
    component: UserProfile,
    name: "UserProfile",
  },
  {
    path: "/desk",
    component: Mydesk,
    name: "Mydesk",
  },
  {
    path: "/leave",
    component: Leave,
    name: "Leave",
  },
  {
    path: "/holiday",
    component: Holiday,
    name: "Holiday",
  },
  {
    path: "/payroll",
    component: Payroll,
    name: "Payroll",
  },
  ,
  {
    path: "/userlist",                        // ADMIN 
    component: Userlist,
    name: "Userlist",
  },
  {
    path: "/createuser",                // ADMIN 
    component: Create_user,
    name: "Create_user",
  },
  {
    path: "/personaldetails",           // ADMIN 
    component: PersonalDetails,
    name: "PersonalDetails",
  },
  {
    path: "/leavestatus",               // ADMIN 
    component: LeaveStatus,
    name: "LeaveStatus",
  },
  {
    path: "/userAttendance",           // ADMIN 
    component: User_attendance,
    name: "User_attendance",
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Check if the route has a specified layout, if yes, set it
  if (to.meta.layout) {
    to.meta.layout = BlankLayout;
  } else {
    // Remove the layout for other pages
    delete to.meta.layout;
  }
  next();
});

export default router;
