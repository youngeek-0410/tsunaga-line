import { useToken } from '@/features/auth/components/AuthenticationProvider';
import { Redirect, Stack } from 'expo-router';
import 'react-native-reanimated';
import { Text } from 'tamagui';

const AppRootLayout = () => {
  const { token, isLoading } = useToken();

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (!token) {
    return <Redirect href={'/signup'} />;
  }
  return (
    <Stack
      screenOptions={{
        headerBackVisible: true,
        headerBackTitleVisible: false,
        headerTitleStyle: { fontSize: 16 },
        headerTintColor: '#000000',
      }}
    >
      <Stack.Screen name={'(tabs)'} options={{ headerShown: false }} />
    </Stack>
  );
};

export default AppRootLayout;
