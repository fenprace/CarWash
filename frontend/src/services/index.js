import axios from 'axios';

import store from '../redux/store';

const service = axios.create({
  baseURL: 'http://gabrielndavid.live/api',
  // baseURL: 'http://localhost:3001',
});

service.interceptors.request.use(config => {
  const { token } = store.getState();

  if (token) config.headers.common['Authorization'] = `Bearer ${token}`;

  return config;
});

service.interceptors.response.use(
  response => response.data,
  error => {
    const { response } = error;
    if (!response) return Promise.reject(error);

    const { data } = response;
    if (!data || !data.message) return Promise.reject(error);
    return Promise.reject(new Error(data.message));
  }
);

export default service;