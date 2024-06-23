import { BackFace } from '@/shared/components/Cheki/BackFace';
import { FrontFace } from '@/shared/components/Cheki/FrontFace';
import { FlippableCard } from '@/shared/components/FlippableCard';
import { MaterialCommunityIcons } from '@/shared/components/Icon';
import { useAuthClient } from '@/shared/hooks/useAuthClient';
import { useFocusEffect, useNavigation } from 'expo-router';
import { FlatList } from 'react-native';
import { useQuery } from 'react-query';
import { Button, Spinner, Text, View, YStack } from 'tamagui';

export default function Feed() {
  const navigation = useNavigation();
  useFocusEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          unstyled={true}
          onPress={() => {
            refetch();
          }}
          paddingRight="$3"
        >
          <MaterialCommunityIcons size={24} name="reload" />
        </Button>
      ),
    });
  });

  const client = useAuthClient();

  const { data, isLoading, isFetching, isFetched, error, refetch } = useQuery({
    queryKey: ['memory', 'random'],
    queryFn: () => {
      return client.api.v1.memories.random.$get().then((data) => data.items);
    },
  });

  return (
    <YStack flex={1}>
      {isLoading || (isFetching && isFetched) ? (
        <YStack padding="$3" alignItems="center">
          <Spinner size="large" color="$orange10" />
        </YStack>
      ) : error ? (
        <Text>Error occured.</Text>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => {
            switch (item.memoryType) {
              case 'image-memory':
                return <ImageMemoryChekiCard {...(item as unknown as ImageMemory)} />;
              case 'quest-achievement-memory':
                return <QuestAchievementMemoryChekiCard {...(item as QuestAchievementMemory)} />;
              default:
                return null;
            }
          }}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          ListFooterComponent={() => <View style={{ height: 20 }} />}
        />
      )}
    </YStack>
  );
}

type ImageMemory = {
  memoryType: 'image-memory';
  uuid: string;
  imageUrl: string;
  caption: string;
  timeLabel: string;
  timestamp: string;
  member_profiles: [
    {
      uuid: string;
      screenName: string;
      iconUrl: string | null | undefined;
      owner: {
        username: string;
      };
    },
  ];
};

const ImageMemoryChekiCard = (props: ImageMemory) => {
  const { imageUrl, caption, timeLabel, member_profiles } = props;

  const frontFaceArgs = {
    imageUri: imageUrl,
    caption,
    timeLabel,
    styleProps: { cardWidth: '90%' },
  };

  const backFaceArgs = {
    uuid: props.uuid,
    members: member_profiles,
  };

  return (
    <FlippableCard>
      <FrontFace {...frontFaceArgs} />
      <BackFace {...backFaceArgs} />
    </FlippableCard>
  );
};

type QuestAchievementMemory = {
  memoryType: 'quest-achievement-memory';
  uuid: string;
  quest: Quest;
  caption: string;
  imageUrl: string;
  achieved_requirements: AchievementRequirement[];
  timeLabel: string;
  timestamp: string;
  member_profiles: MemberProfile[];
  isPublic: boolean;
  description: string;
};

type Quest = {
  uuid: string;
  name: string;
  originMemory: OriginMemory;
  requirements: Requirement[];
};

type MemoryType = 'quest-achievement-memory' | 'image-memory';

type OriginMemory = {
  memoryType: MemoryType;
  uuid: string;
  imageUrl: string;
  caption: string;
  timeLabel: string;
  timestamp: string;
  member_profiles: MemberProfile[];
  isPublic: boolean;
  description: string;
};

type Requirement = {
  uuid: string;
  detail: string;
};

type AchievementRequirement = {
  uuid: string;
  detail: string;
};

type MemberProfile = {
  uuid: string;
  screenName: string;
  iconUrl: string;
  owner: {
    username: string;
  };
};

const QuestAchievementMemoryChekiCard = (props: QuestAchievementMemory) => {
  const { imageUrl, caption, timeLabel, member_profiles } = props;

  const frontFaceArgs = {
    imageUri: imageUrl,
    caption,
    timeLabel,
    styleProps: { cardWidth: '90%' },
  };

  const backFaceArgs = {
    uuid: props.uuid,
    members: member_profiles,
  };

  return (
    <FlippableCard>
      <FrontFace {...frontFaceArgs} />
      <BackFace {...backFaceArgs} />
    </FlippableCard>
  );
};
