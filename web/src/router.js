import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/auth',
    name: 'auth',
    component: () => import('./pages/auth'),
    children: [{
      // 登录
      path: 'login',
      name: 'login',
      component: () => import('./pages/auth/login'),
    }, {
      // 注册
      path: 'register',
      name: 'register',
      alias: '/auth',
      component: () => import('./pages/auth/register'),
    }],
  }, {
    path: '/compose',
    name: 'compose',
    component: () => import('./pages/compose'),
  }, {
    path: '/blog',
    name: 'blog',
    component: () => import('./pages/blog'),
  }],
});
