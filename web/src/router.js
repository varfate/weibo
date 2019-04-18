/*
 * @Description: Description
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-03-08 16:51:25
 * @LastEditTime: 2019-04-18 14:47:08
 */
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
