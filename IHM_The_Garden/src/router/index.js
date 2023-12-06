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
      path: '/thread/',
      name: 'mainThread',
      component: () => import('../views/ThreadView.vue')
    },
    {
      path: '/thread/:username',
      name: 'threadWithUser',
      props: true,
      component: () => import('../views/ThreadView.vue')
    },
  ]
});

export default router;
