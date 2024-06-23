import { Stack } from 'expo-router';

export default function CreateMemoryLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackVisible: true,
        headerBackTitleVisible: false,
        headerTitleStyle: { fontSize: 16 },
        headerTintColor: '#000000',
        animationDuration: 80,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: false, contentStyle: { backgroundColor: 'black' } }}
      />
      <Stack.Screen
        name="info-input"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="member-select"
        options={{
          headerTitle: 'メンバー選択',
        }}
      />
    </Stack>
  );
}
