import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Profile.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue")
  },
  {
    path: "/signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Signup.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue")
  },
  {
    path: "/meetups",
    name: "Meetups",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MeetUp.vue")
  },
  {
    path: "/meetups/new",
    name: "CreateMeetups",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MeetUpNew.vue")
  },
  {
    path: "/meetups/:id",
    name: "ViewMeetups",
    props: true,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MeetUpSingle.vue")
  },
  {
    path: "/organize",
    name: "Organize",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/OrganizeMeetUps.vue")
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
