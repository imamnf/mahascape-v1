import type { Router } from 'vue-router';

export function setupGuards(router: Router) {
  router.beforeEach((to, _from, next) => {
    const isLoggedIn = ref(localStorage.getItem('isLoggedIn'));

    if (isLoggedIn.value === 'true' && to.path === '/sign-in') {
      router.back();
    } else if (isLoggedIn.value !== 'true' && to.path !== '/sign-in') {
      next({
        path: '/sign-in',
        query: { ...to.query, to: to.fullPath !== '/dashboard' ? to.path : undefined }
      });
    } else {
      next();
    }
  });
}
