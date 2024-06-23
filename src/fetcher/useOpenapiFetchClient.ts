import { useToken } from '@/features/auth/components/AuthenticationProvider';
import createClient from 'openapi-fetch';
import type { paths } from './openapi-generated';

// Authenticated client (openapi-fetch version)
export const useAuthClientOF = () => {
  const { token } = useToken();
  if (token == null) {
    throw new Error('useAuthClientOF: Cannnot get token from useToken hook');
  }

  const client = createClient<paths>({
    baseUrl: process.env.EXPO_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return client;
};

// export const client = createClient<paths>({ baseUrl: process.env.EXPO_PUBLIC_API_URL });

// const onRequest: Middleware = {
//   onRequest(req, _) {
//     const { token } = useToken();
//     if (token == null) {
//       throw new Error('useAuthClientOF: Cannnot get token from useToken hook');
//     }
//     req.headers.set('Authorization', `Bearer ${token}`);
//     return req;
//   },
// };

// client.use(onRequest);
