import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";
import NewItem from '@/views/NewItem.vue';

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
  },
  {
    path: '/signup',
    component: Signup,
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
