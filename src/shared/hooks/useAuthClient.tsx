import api from '@/api/$api';
import { useToken } from '@/features/auth/components/AuthenticationProvider';
import aspida from '@aspida/axios';
import axios from 'axios';

export const useAuthClient = () => {
  const { token } = useToken();

  if (!token) {
    throw new Error('useAuthClient: Cannnot get token from useToken hook');
  }

  const axiosInstanceWithAuth = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return api(aspida(axiosInstanceWithAuth));
};
