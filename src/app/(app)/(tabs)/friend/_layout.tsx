import { VerticalStackHeader } from '@/shared/components/Screen/VerticalStackHeader';
import { Stack, router } from 'expo-router';

export default function FriendLayout() {
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
      <Stack.Screen
        name="create"
        options={{
          title: 'フレンドプロフィール作成',
        }}
      />
      <Stack.Screen
        name="[profileId]/index"
        options={{
          title: 'フレンドプロフィール詳細',
        }}
      />
      <Stack.Screen
        name="[profileId]/edit"
        options={{
          title: 'フレンドプロフィール編集',
        }}
      />
      <Stack.Screen
        name="link/[username]"
        options={{
          gestureDirection: 'vertical',
          header: ({ options }) => (
            <VerticalStackHeader
              options={options}
              onClickCloseIcon={() => {
                router.replace('/(app)/(tabs)/friend');
              }}
            />
          ),
          title: 'リンク',
        }}
      />
    </Stack>
  );
}
