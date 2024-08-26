import type { App } from 'vue';
import type { RouteRecordRaw, Router } from 'vue-router';

import { createRouter, createWebHistory } from 'vue-router/auto';
import { handleHotUpdate, routes } from 'vue-router/auto-routes';
import { setupLayouts } from 'virtual:generated-layouts';
import { setupGuards } from './guards';

const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes as RouteRecordRaw[])
});

setupGuards(router);

export { router };

export default function (app: App): void {
  app.use(router);
}

if (import.meta.hot) {
  handleHotUpdate(router);
}
