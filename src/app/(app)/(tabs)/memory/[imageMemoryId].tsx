import type { components } from '@/fetcher/openapi-generated';
import { useAuthClientOF } from '@/fetcher/useOpenapiFetchClient';
import AutoHeightImage from '@/shared/components/AutoHeightImage';
import { withFetchingState } from '@/shared/utils/hoc/withFetchingState';
import { useLocalSearchParams } from 'expo-router';
import { Dimensions } from 'react-native';
import { useQuery } from 'react-query';
import { Avatar, ScrollView, Stack, Text, XStack, YStack } from 'tamagui';

type MemoryDetailResponse =
  // paths['/api/v1/memories/{uuid}/']['get']['responses']['200']['content']['application/json'];
  components['schemas']['ImageMemoryRead'];

const ImageMemoryPresenter = ({ memory }: { memory: MemoryDetailResponse }) => (
  <ScrollView width="100%" gap="$4">
    <YStack>
      <AutoHeightImage source={{ uri: memory.imageUrl }} width={Dimensions.get('window').width} />
      <YStack padding="$3" gap="$2">
        <Text fontSize="$6" fontWeight="bold">
          {memory.caption}
        </Text>
        <Text>{memory.timeLabel}</Text>
      </YStack>
    </YStack>

    {/* members */}
    <Stack padding="$3" gap="$2" paddingLeft="$5">
      <Text paddingBottom="$2">思い出のメンバー</Text>
      {memory.member_profiles.map((member) => {
        const iconUrl =
          member.iconUrl ??
          'https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80';
        // member
        return (
          <XStack gap="$2" key={member.uuid} alignItems="center">
            <Avatar circular={true} size="$3">
              <Avatar.Image accessibilityLabel="Cam" src={iconUrl} />
              <Avatar.Fallback backgroundColor="$blue10" />
            </Avatar>
            <Text fontSize="$5">{member.screenName}</Text>
          </XStack>
        );
      })}
    </Stack>
  </ScrollView>
);

export default function MemoryDetailScreen() {
  const { imageMemoryId } = useLocalSearchParams<{ imageMemoryId: string }>();
  const client = useAuthClientOF();

  const { data, isLoading, error } = useQuery({
    queryKey: ['image-memory', imageMemoryId],
    queryFn: () => {
      return client
        .GET('/api/v1/memories/{uuid}/', {
          params: { path: { uuid: imageMemoryId as string } },
        })
        .then((data) => data.data);
    },
  });

  const MemoryDetail = withFetchingState<{ memory: MemoryDetailResponse }>(ImageMemoryPresenter);

  return (
    <MemoryDetail
      data={{ memory: data as MemoryDetailResponse }}
      isLoading={isLoading}
      error={error}
    />
  );
}
