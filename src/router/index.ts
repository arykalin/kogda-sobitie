import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from "@/views/Login.vue";
import NewItem from '@/views/NewItem.vue';
import Profile from "@/views/Profile.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/new',
    name: 'NewItem',
    component: NewItem
  },
  {
    path: '/login',
    component: Login,
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
