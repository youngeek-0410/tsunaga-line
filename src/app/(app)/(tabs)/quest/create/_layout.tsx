import { VerticalStackHeader } from '@/shared/components/Screen/VerticalStackHeader';
import { Stack, router } from 'expo-router';
import { Provider } from 'jotai';
import { Text } from 'tamagui';
export default function QuestCreateLayout() {
  return (
    <Provider>
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
          name="select-memory"
          options={{
            title: '未来につなげる思い出',
            gestureDirection: 'vertical',
            animationDuration: 350,
            header: ({ options }) => (
              <VerticalStackHeader options={options} onClickCloseIcon={() => router.back()} />
            ),
          }}
        />
        <Stack.Screen
          name="select-quest-requirements"
          options={{
            title: '達成条件',
            gestureDirection: 'vertical',
            animationDuration: 350,
            headerRight: () => <Text width={36}>保存aaaaaaa</Text>,
            header: ({ options }) => (
              <VerticalStackHeader options={options} onClickCloseIcon={() => router.back()} />
            ),
          }}
        />
      </Stack>
    </Provider>
  );
}
