import { useLoginStore } from '@/store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const loginStore = useLoginStore();
  if (!loginStore.isLoggedIn && to.path !== '/login' && to.path !== '/register') {
    console.log('未登入，導向登入頁面');
    return navigateTo('/login');
  }
  else if (loginStore.isLoggedIn && (to.path === '/login' || to.path === '/register')) {
    console.log('已登入，導向首頁');
    return navigateTo('/');
  }
});
