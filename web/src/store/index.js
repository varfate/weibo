/*
 * @Description: Description
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-04-22 12:13:47
 * @LastEditTime: 2019-04-30 18:56:26
 */
import Vue from 'vue';
import Vuex from 'vuex';
import session from './modules/session';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    session,
  },
  strict: debug,
});
