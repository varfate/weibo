import Vue from 'vue';
import './cube-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import { $axios } from './lib/axios';

Vue.config.productionTip = false;

const vm = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

Vue.prototype.$axios = $axios.bind(vm);
