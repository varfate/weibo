import Vue from 'vue';
import Router from 'vue-router';
import HomeWelcome from './pages/home/welcome.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeWelcome,
    }, {
      path: '/goods',
      name: 'goods',
      component: () => import('./pages/goods/list.vue'),
    }, {
      path: '/sign',
      name: 'sign',
      component: () => import('./pages/sign'),
      children: [{
        // 登录
        path: 'signUp',
        name: 'signUp',
        component: () => import('./pages/sign/signUp'),
      }, {
        // 注册
        path: 'signIn',
        name: 'signIn',
        alias: '/sign',
        component: () => import('./pages/sign/signIn'),
      }],
    },
  ],
});
