import { Stack } from 'expo-router';
import { Provider } from 'jotai';
export default function QuestAchivementLayout() {
  return (
    <Provider>
      <Stack
        screenOptions={{
          headerBackVisible: true,
          headerBackTitleVisible: false,
          headerTitleStyle: { fontSize: 16 },
          headerTintColor: '#000000',
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="take-photo"
          options={{ headerShown: false, contentStyle: { backgroundColor: 'black' } }}
        />
        <Stack.Screen name="photo-preview" options={{ title: 'プレビュー' }} />
        <Stack.Screen name="achivement-animation" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
