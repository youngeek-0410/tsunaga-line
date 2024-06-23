import { Stack, useSegments } from 'expo-router';
import { useMemo } from 'react';

export default function QuestLayout() {
  const segments = useSegments();
  const nestedQuestCreatePageOpened = useMemo(() => {
    return (
      segments.length > 4 &&
      segments[0] === '(app)' &&
      segments[1] === '(tabs)' &&
      segments[2] === 'quest' &&
      segments[3] === 'create'
    );
  }, [segments]);

  const nestedQuestAchivementPageOpened = useMemo(() => {
    return (
      segments.length > 4 &&
      segments[0] === '(app)' &&
      segments[1] === '(tabs)' &&
      segments[2] === 'quest' &&
      segments[3] !== 'create' &&
      segments[3] !== 'member-select'
    );
  }, [segments]);

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
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[questId]"
        options={{
          headerTitle: 'クエスト達成',
          contentStyle: { backgroundColor: 'white' },
          headerShown: nestedQuestAchivementPageOpened ? false : true,
        }}
      />
      <Stack.Screen
        name="member-select"
        options={{
          headerTitle: 'メンバー選択',
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          headerTitle: 'クエスト作成',
          headerShown: nestedQuestCreatePageOpened ? false : true,
        }}
      />
    </Stack>
  );
}
