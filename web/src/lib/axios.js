import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://dev.weibo.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.token || '',
  },
});

export const setToken = (token) => {
  axiosInstance.defaults.headers.common.Authorization = token;
  localStorage.token = token;
};


export async function $axios(options) {
  let ret = {};
  try {
    this.toast = this.$createToast({
      txt: '加载中',
      type: 'loading',
      mask: true,
      time: 0,
    });
    this.toast.show();
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
    const statusText = (err.response.data && err.response.data.message) || '网络错误,请稍后再试';
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
