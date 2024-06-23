import { Stack } from 'expo-router';

export default function MemoryTabLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackVisible: true,
        headerBackTitleVisible: false,
        headerTitleStyle: { fontSize: 16 },
        headerTintColor: '#000000',
      }}
    >
      <Stack.Screen name="feed" />
      <Stack.Screen name="[imageMemoryId]" options={{ headerTitle: '投稿' }} />
    </Stack>
  );
}
