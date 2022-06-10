import { createRouter, createWebHistory } from 'vue-router'
import adminHome from './admin_router/home'
import adminGenealogy from './admin_router/genealogy'
import adminSetting from './admin_router/setting'
const routes = [
    {
        path: '/',
        redirect: '/adminHome'
    },
    ...adminHome,
    ...adminGenealogy,
    ...adminSetting,

];

const router = createRouter({
  // 默认使用 history
  history: createWebHistory(),
  routes
});

export default router
