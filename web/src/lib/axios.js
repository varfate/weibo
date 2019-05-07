/*
 * @Description: Axios
 * @Author: Fate
 * @LastEditors: Fate
 * @Date: 2019-03-15 18:37:11
 * @LastEditTime: 2019-05-06 18:53:38
 */
import axios from 'axios';
import { API_ROOT } from '@/config';

export const axiosInstance = axios.create({
  baseURL: API_ROOT,
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.token || '',
  },
});

export const setToken = (token) => {
  axiosInstance.defaults.headers.Authorization = token;
  localStorage.token = token;
};

export async function $axios(options, showToast = true) {
  let ret = {};
  try {
    this.toast = this.$createToast({
      txt: '加载中',
      type: 'loading',
      mask: true,
      time: 0,
    });
    if (showToast) this.toast.show();
    const response = await axiosInstance(options);
    this.toast.hide();
    const { statusText, status, data } = response;
    ret = {
      success: true,
      message: statusText,
      statusCode: status,
      total: +response.headers['X-Content-Record-Total'] || null,
      ...data,
    };
  } catch (err) {
    let statusText = (err.response.data && err.response.data.message) || '网络错误,请稍后再试';
    if (err.response && err.response.status === 401) {
      statusText = '请先登录';
      this.$router.push({ name: 'login' });
    }
    this.toast = this.$createToast({
      txt: statusText,
      type: 'error',
      time: 3000,
    });
    this.toast.show();
    ret = {
      success: false,
      message: statusText,
    };
  }
  return ret;
}
