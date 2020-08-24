import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Explore from './views/Explore.vue'
import LogIn from './views/LogIn.vue'
import Review from './views/Review.vue'
import Repos from "./views/Repos.vue"
import MyTasks from "./views/MyTasks.vue"
import AdminDashboard from "./views/AdminDashboard.vue"
import Learn from "./views/Learn.vue"
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/explore',
      name: 'explore',
      component: Explore,
      props: (route) => ({
        ...route.params
      })
    },
    {
      path: '/login/:token',
      name: 'login',
      component: LogIn,
      props: true
    },
    {
      path: '/review',
      name: 'review',
      component: Review
    },
    {
      path: "/repos",
      name: "repos",
      component: Repos
    },
    {
      path: "/myTasks",
      name: "mytasks",
      component: MyTasks
    },
    {
      path: "/adminDash",
      name: "admindash",
      component: AdminDashboard
    },
    {
      path: "/learn",
      name: "learn",
      component: Learn
    }

  ]
})