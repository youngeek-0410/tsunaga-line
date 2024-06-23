import {
  FontAwesome5Icon,
  FontAwesomeIcon,
  MaterialCommunityIcons,
} from '@/shared/components/Icon';
import { Tabs, useSegments } from 'expo-router';
import { useMemo } from 'react';

export default function TabLayout() {
  const segments = useSegments();

  const nestedQuestPageOpened = useMemo(() => {
    return (
      segments.length > 3 &&
      segments[0] === '(app)' &&
      segments[1] === '(tabs)' &&
      segments[2] === 'quest'
    );
  }, [segments]);

  const nestedProfilePageOpened = useMemo(() => {
    return (
      segments.length > 3 &&
      segments[0] === '(app)' &&
      segments[1] === '(tabs)' &&
      segments[2] === 'profile'
    );
  }, [segments]);

  return (
    <Tabs
      initialRouteName="memory"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name="memory"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={28} name="home-variant-outline" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="hot"
        options={{
          title: 'Hot',
          tabBarIcon: ({ color }) => <FontAwesome5Icon size={28} name="fire-alt" color={color} />,
          tabBarStyle: { display: 'none' },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'create',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={28} name="camera-iris" color={color} />
          ),
          tabBarStyle: { display: 'none' },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="quest"
        options={{
          title: 'Quest',
          tabBarIcon: ({ color }) => <FontAwesomeIcon size={28} name="flag-o" color={color} />,
          headerShown: false,
          tabBarStyle: nestedQuestPageOpened ? { display: 'none' } : {},
        }}
      />
      <Tabs.Screen
        name="friend"
        options={{
          title: 'Friend',
          tabBarIcon: ({ color }) => (
            <FontAwesome5Icon name="user-friends" color={color} size={28} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome5Icon name="user-alt" color={color} size={28} />,
          headerShown: false,
          tabBarStyle: nestedProfilePageOpened ? { display: 'none' } : {},
        }}
      />
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}
