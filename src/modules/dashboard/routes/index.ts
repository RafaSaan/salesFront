import type { RouteRecordRaw } from 'vue-router';
import DashboardView from '../views/DashboardView.vue';
import ProductsView from '../views/ProductsView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    beforeEnter: (to, from, next) => {
      const prefix = `grp_token_${import.meta.env.VITE_FOLDER_PATH}`.replace('/', '_')
      if (sessionStorage.getItem(prefix)) {
        next();
      } else {
        next('/login');
      }
    },
    children: [
      { path: 'products', name:'dashboard.products', component: ProductsView }
    ]
  },
];

export default routes