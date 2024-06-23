import { selectedMemory } from '@/features/quest/create-quest/context/form-value';
import { FrontFace } from '@/shared/components/Cheki/FrontFace';
import { useAuthClient } from '@/shared/hooks/useAuthClient';
import { useAspidaQuery } from '@aspida/react-query';
import { router } from 'expo-router';
import { useAtom } from 'jotai';
import { FlatList, TouchableOpacity } from 'react-native';
import { Spinner, View, YStack } from 'tamagui';

export default function SelectMemory() {
  const client = useAuthClient();
  const { data: memories, isLoading } = useAspidaQuery(client.api.v1.memories.chronological);
  const [_, setMemory] = useAtom(selectedMemory);

  return memories && !isLoading ? (
    <YStack flex={1}>
      <FlatList
        data={memories.items}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setMemory(item);
              router.back();
            }}
          >
            <View alignItems="center">
              <FrontFace
                styleProps={{ cardWidth: '90%' }}
                imageUri={item.imageUrl}
                timeLabel={item.timeLabel}
                caption={item.caption}
              />
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListFooterComponent={() => <View style={{ height: 20 }} />}
      />
    </YStack>
  ) : (
    <Spinner />
  );
}
