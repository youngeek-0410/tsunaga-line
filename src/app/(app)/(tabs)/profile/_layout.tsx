import { VerticalStackHeader } from '@/shared/components/Screen/VerticalStackHeader';
import { Stack, router } from 'expo-router';

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackVisible: true,
        headerBackTitleVisible: false,
        headerTitleStyle: { fontSize: 16 },
        headerTintColor: '#000000',
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="edit" options={{ headerTitle: 'プロフィール編集' }} />
      <Stack.Screen
        name="share"
        options={{
          gestureDirection: 'vertical',
          header: ({ options }) => (
            <VerticalStackHeader
              options={options}
              onClickCloseIcon={() => {
                router.back();
              }}
            />
          ),
        }}
      />
    </Stack>
  );
}
