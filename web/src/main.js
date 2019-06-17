/*
 * @Description: 入口函数
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-03-08 16:51:25
 * @LastEditTime: 2019-05-17 15:27:17
 */
import Vue from 'vue';
import './cube-ui';
import App from './App.vue';
import router from './router';
import store from './store/index';
import { $axios } from './lib/axios';

Vue.config.productionTip = false;

const vm = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

Vue.prototype.$axios = $axios.bind(vm);
