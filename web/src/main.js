import Vue from 'vue';
import './cube-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import { axiosInstance } from './lib/axios';

Vue.config.productionTip = false;

Vue.prototype.$axios = axiosInstance;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
