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
