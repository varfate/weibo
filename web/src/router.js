/*
 * @Description: Description
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-03-08 16:51:25
 * @LastEditTime: 2019-05-06 19:26:24
 */
import Vue from 'vue';
import Router from 'vue-router';
import { ROUTER_WHITELIST } from '@/config/index';
import store from '@/store/index';

Vue.use(Router);

const router = new Router({
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
    path: '/blog/compose',
    name: 'blogCompose',
    component: () => import('./pages/blog/compose'),
  }, {
    path: '/blogs',
    name: 'blogList',
    alias: '/',
    component: () => import('./pages/blog/list'),
  }, {
    path: '*',
    redirect: {
      name: 'blogList',
    },
  }],
});

router.beforeEach(async (to, from, next) => {
  if (ROUTER_WHITELIST.indexOf(to.path) > -1) {
    return next();
  }
  if (!localStorage.token) {
    return next('/auth/login');
  }
  if (!store.getters['session/isLogin']) {
    await store.dispatch('session/getSession');
    return next();
  }
  next();
});

export default router;
