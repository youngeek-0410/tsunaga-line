import { useAuthClient } from '@/shared/hooks/useAuthClient';
import { useAspidaQuery } from '@aspida/react-query';
import { useRouter } from 'expo-router';
import { FlatList } from 'react-native';
import { Image, Input, Spinner, Text, View, YStack } from 'tamagui';

export default function Quest() {
  const client = useAuthClient();
  const { data: quests, isLoading } = useAspidaQuery(client.api.v1.quests);

  return quests && !isLoading ? (
    <YStack flex={1} justifyContent="flex-start" mt="$8" px="$3">
      <Input placeholder="検索" mb={16} />
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={quests.items}
        renderItem={({ item: quest, index }) => {
          if (index === 0) {
            return <CreateQuestItem />;
          }
          if (quests.items.length - 1 === index && quests.items.length % 2 !== 0) {
            return (
              <>
                <QuestListItem
                  uri={quest.originMemory.imageUrl}
                  title={quest.name}
                  uuid={quest.uuid}
                />
                <View flex={1} margin={'$0.75'} bg={'$colorTransparent'} />
              </>
            );
          }
          return (
            <QuestListItem uri={quest.originMemory.imageUrl} title={quest.name} uuid={quest.uuid} />
          );
        }}
      />
    </YStack>
  ) : (
    <Spinner mt="$8" />
  );
}

const CreateQuestItem = () => {
  const router = useRouter();
  return (
    <View
      flex={1}
      margin={'$0.75'}
      aspectRatio={1}
      borderRadius={'$4'}
      pos={'relative'}
      onPress={() => {
        router.push('/quest/create');
      }}
      // borderStyle="dashed"
      // borderWidth={1}
      // borderColor={'$gray7'}
      backgroundColor={'$secondary'}
      opacity={0.5}
    >
      <Text pos={'absolute'} color={'white'} fontWeight={'bold'} fontSize={16} bottom={3} p="$2">
        新しく作る
      </Text>
    </View>
  );
};

const QuestListItem = ({ uri, title, uuid }: { uri: string; title: string; uuid: string }) => {
  const router = useRouter();
  return (
    <View
      flex={1}
      margin={'$0.75'}
      aspectRatio={1}
      borderRadius={'$4'}
      pos={'relative'}
      onPress={() => {
        router.push(`/quest/${uuid}`);
      }}
    >
      <Image
        flex={1}
        aspectRatio={1}
        source={{
          uri: uri,
        }}
        borderRadius={'$4'}
      />
      <Text pos={'absolute'} color={'white'} fontWeight={'bold'} fontSize={16} bottom={3} p="$2">
        {title}
      </Text>
    </View>
  );
};
