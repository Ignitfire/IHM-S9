import { createRouter, createWebHistory } from 'vue-router';
import GardenView from '../views/GardenView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GardenView
    },
    {
      path: '/garden/:username',
      name: 'visitGarden',
      props: true,
      component: () => import('../views/GardenView.vue')
    },
    {
      path: '/chat/',
      name: 'mainChat',
      component: () => import('../views/ChatView.vue')
    },
    {
      path: '/chat/:username',
      name: 'chatWithUser',
      props: true,
      component: () => import('../views/ChatView.vue')
    },
  ]
});

export default router;
