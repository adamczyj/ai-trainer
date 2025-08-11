import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { logger } from '@src/utils/logger';
import { getTokenStore } from '@src/utils/tokenStore/index';
import { refreshAccessToken } from '@src/utils/tokenUtils';

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

async function ensureFreshAccessToken(): Promise<string> {
  const tokenStore = getTokenStore();
  const isExpired = await tokenStore.isAccessTokenExpired(5);
  if (!isExpired) {
    const token = await tokenStore.getAccessToken();
    if (!token) throw new Error('No access token available');
    return token;
  }

  if (!isRefreshing) {
    isRefreshing = true;
    logger.info('🔄 Access token expiring/expired. Refreshing...');
    refreshPromise = refreshAccessToken()
      .then((t) => {
        logger.info('✅ Access token refreshed');
        return t.access_token;
      })
      .catch((err) => {
        logger.error('❌ Token refresh failed', err);
        throw err;
      })
      .finally(() => {
        isRefreshing = false;
      });
  }

  const newToken = await refreshPromise!;
  return newToken;
}

export const stravaAxios: AxiosInstance = axios.create({});

// Request interceptor: attach token and proactively refresh if needed
stravaAxios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await ensureFreshAccessToken();
    const headers = (config.headers ?? (config.headers = {} as any)) as any;
    headers['Authorization'] = `Bearer ${token}`;
    return config;
  }
);

// Response interceptor: on 401, single-flight refresh and retry
stravaAxios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfigWithRetry = error.config || {};
    const status = error?.response?.status;

    if (status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const token = await ensureFreshAccessToken();
      const headers = (originalRequest.headers ?? (originalRequest.headers = {} as any)) as any;
      headers['Authorization'] = `Bearer ${token}`;
      return stravaAxios.request(originalRequest);
    } catch (refreshErr) {
      return Promise.reject(refreshErr);
    }
  }
);

export default stravaAxios;


