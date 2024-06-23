import { addEventListener, getInitialURL, parse } from 'expo-linking';
import { router } from 'expo-router';
import { useLayoutEffect } from 'react';

// /profile-link?uuid=

const isValidUurl = (path: string | null, username: string | string[] | undefined) => {
  return path === 'profile-link' && typeof username === 'string' ? true : false;
};

export const useProfileLinkRoute = () => {
  useLayoutEffect(() => {
    getInitialURL().then((url) => {
      if (url) {
        const { path, queryParams } = parse(url);
        const username = queryParams?.username;
        if (isValidUurl(path, username)) {
          //   router.push('/(app)/(tabs)/feed');
          router.push(`/(app)/(tabs)/friend/link/${username}`);
        }
      }
    });

    const handler = (event: { url: string }) => {
      const { path, queryParams } = parse(event.url);
      const username = queryParams?.username;
      if (isValidUurl(path, username)) {
        // router.push('/(app)/(tabs)/feed');
        router.push(`/(app)/(tabs)/friend/link/${username}`);
      }
    };
    addEventListener('url', handler);
  }, []);
};
