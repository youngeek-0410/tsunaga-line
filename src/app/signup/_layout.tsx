import { Stack } from 'expo-router';

export default function SignupLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: 'white' },
        headerShown: false,
      }}
      initialRouteName="questionName"
    >
      <Stack.Screen name="questionName" />
      <Stack.Screen name="[questionEmail]" />
      <Stack.Screen name="questionPassword" />
    </Stack>
  );
}
