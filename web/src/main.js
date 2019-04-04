import Vue from 'vue';
import './cube-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from './lib/axios';
import './styles/index.styl';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
