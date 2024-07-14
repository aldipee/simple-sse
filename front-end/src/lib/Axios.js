import axios from 'axios';

import { LOCAL_STORAGE_CONSTANT } from '../constant/local-storage.constant';
import { ENV_CONFIG } from '../config/env';
let instance;

const MOCK_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjkxMmMzZDllYzBiNWZmNWJjMmFlNjMiLCJpYXQiOjE3MjA5NjgzMjEsImV4cCI6MTcyMDk4NjMyMSwidHlwZSI6ImFjY2VzcyJ9.pSuDnBSmAlXrvpoA_hCrDJ9SyoTEDbkkMdiyinAKqj8';

function makeAxiosIntance() {
  if (instance) return instance;

  instance = axios.create({
    baseURL: ENV_CONFIG.endpoint.API_ENDPOINT,
  });

  return instance;
}

const axiosInstance = makeAxiosIntance();

axiosInstance.interceptors.request.use(
  (config) => {
    const currentToken = getLocalStorageAccessToken();
    if (getLocalStorageAccessToken()) {
      config.headers.Authorization = `Bearer ${currentToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setAuthHeaderToken = (token) => {
  axiosInstance.defaults.headers.common['Authorization'] = token;
};

export const getLocalStorageAccessToken = () => {
  return localStorage.getItem(LOCAL_STORAGE_CONSTANT.ACCESS_TOKEN);
};
export const setLocalStorageAccessToken = (token) => {
  localStorage.setItem(LOCAL_STORAGE_CONSTANT.ACCESS_TOKEN, token);
};

export const removeAuthHeaderToken = () => {
  delete axiosInstance.defaults.headers.common['Authorization'];
};

export default axiosInstance;
