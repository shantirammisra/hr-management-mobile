import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { secureStorage } from '../storage/secureStorage';

const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'https://hr-management-mobile.vercel.app/api/v1';

// eslint-disable-next-line import/no-named-as-default-member
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: Number(process.env.EXPO_PUBLIC_API_TIMEOUT_MS) || 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await secureStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // In a real app, dispatch token refresh or clear session
      await secureStorage.removeItem('access_token');
    }
    return Promise.reject(error);
  }
);
