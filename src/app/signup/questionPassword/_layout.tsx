import { Stack } from 'expo-router';

export default function SignupPasswordLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: 'white' },
        headerShown: false,
      }}
    >
      <Stack.Screen name="[questionPassword]" />
    </Stack>
  );
}
