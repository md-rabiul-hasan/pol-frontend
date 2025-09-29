'use server'

import { apiBaseUrl } from '@utils/api';

export const login = async (email?: string, password?: string) => {
  return await apiBaseUrl.post(`/auth/login`, {
    email,
    password
  });
}

export const refreshAccessToken = async (refreshToken?: string) => {
  return await apiBaseUrl.post(`/auth/refresh-token`, {}, {
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  });
};