/*
 * @Description: Description
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-04-22 12:14:21
 * @LastEditTime: 2019-05-06 19:16:49
 */
import { axiosInstance } from '@/lib/axios';

const initState = {
  user: null,
};

const getters = {
  isLogin: state => !!state.user,
};

const actions = {
  async getSession({ commit }) {
    const ret = await axiosInstance({
      method: 'GET',
      url: '/session',
    });
    const user = ret.data.data || null;
    commit('setSession', user);
  },
};

const mutations = {
  setSession(state, user) {
    state.user = user;
  },
};

export default {
  namespaced: true,
  state: initState,
  getters,
  actions,
  mutations,
};
