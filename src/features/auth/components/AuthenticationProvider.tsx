import api from '@/api/$api';
import { axiosFormClient } from '@/lib/axios/client';
import aspida from '@aspida/axios';
import { useRouter } from 'expo-router';
import React from 'react';
import { useMutation } from 'react-query';
import { useStorageState } from '../hooks/useStorageState';

const AuthContext = React.createContext<{
  signIn: (body: { username: string; password: string }) => void;
  signOut: () => void;
  token?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  token: null,
  isLoading: false,
});

export function useToken() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function AuthenticationProvider(props: React.PropsWithChildren) {
  const [[isLoading, token], setToken] = useStorageState('token');
  const router = useRouter();

  const client = api(aspida(axiosFormClient));
  const postLogin = (body: { username: string; password: string }) => {
    return client.api.v1.login.access_token.$post({ body });
  };
  const mutation = useMutation(postLogin, {
    onSuccess: (data) => {
      setToken(data.access_token);
      router.navigate('/(app)');
    },
    onError: () => {
      router.navigate('/');
    },
  });
  return (
    <AuthContext.Provider
      value={{
        signIn: (body: { username: string; password: string }) => {
          // Perform sign-in logic here
          mutation.mutate(body);
        },
        signOut: () => {
          setToken(null);
        },
        token,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
