import tamaguiConfig from '@/config/tamagui.config';
import { AuthenticationProvider } from '@/features/auth/components/AuthenticationProvider';
import { useProfileLinkRoute } from '@/features/friend/link-friend/hooks/useLProfileLinkRoute';
import { Slot } from 'expo-router';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from 'react-query';
import { TamaguiProvider } from 'tamagui';
//import 'react-native-gesture-handler

const RootLayout = () => {
  const queryClient = new QueryClient();
  useProfileLinkRoute();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthenticationProvider>
        <TamaguiProvider config={tamaguiConfig}>
          <Slot />
        </TamaguiProvider>
      </AuthenticationProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
