// index.js
import { createRouter, createWebHistory } from "vue-router";
import BlankLayout from "../components/layouts/BlankLayout.vue"; 
import Home from "@/components/Attendance/Attendance.vue";
import UserProfile from "@/components/Profile/UserProfile.vue";
import Mydesk from "@/components/Mydesk/Mydesk.vue";
import Leave from "@/components/Leave/Leave.vue";
import Holiday from "@/components/Holiday/Holiday.vue";
import Payroll from "@/components/Payroll/Payroll.vue";
import Signup from "../views/user/Sigup.vue";
import Login from "../views/user/Login.vue";
import Timer from "@/components/Timer.vue";

const routes = [
  {
    path: "/",
    component: Signup,
    name: "Signup",
    meta: { layout: BlankLayout } // Use BlankLayout for Signup
  },
  {
    path: "/login",
    component: Login,
    name: "Login",
    meta: { layout: BlankLayout } // Use BlankLayout for Login
  },
  {
    path: "/attendance",
    component: Home,
    name: "Home",
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
  {
    path: "/timer",
    component: Timer,
    name: "Timer",
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
