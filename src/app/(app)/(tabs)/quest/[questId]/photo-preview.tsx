import type { paths } from '@/fetcher/openapi-generated';
import { useAuthClientOF } from '@/fetcher/useOpenapiFetchClient';
import { FrontFace } from '@/shared/components/Cheki/FrontFace';
import { formatDate } from '@/shared/utils/formatDate';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import mime from 'mime';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Text } from 'tamagui';

type PostAchivementMemoryBody =
  paths['/api/v1/quest-achievement-memories/']['post']['requestBody']['content']['multipart/form-data'];

export default function PhotoPreview() {
  const { photoUri, questId } = useLocalSearchParams<{ photoUri: string; questId: string }>();
  const client = useAuthClientOF();
  const queryClient = useQueryClient();
  const quest = useQuery({
    queryKey: ['quest', questId as string],
    queryFn: () =>
      client
        .GET('/api/v1/quests/{uuid}/', {
          params: { path: { uuid: questId as string } },
        })
        .then((res) => res.data),
    enabled: !!questId,
  });
  const achiveQuest = useMutation(
    (body: PostAchivementMemoryBody) =>
      client.POST('/api/v1/quest-achievement-memories/', {
        body,
        bodySerializer: (body) => {
          const fd = new FormData();
          const uri = body.image;

          fd.append('image', {
            uri,
            name: uri.split('/').pop(),
            type: mime.getType(uri),
          } as any);
          fd.append('data', JSON.stringify(body.data));

          return fd;
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['memory', 'random'] });
        router.navigate({
          pathname: './achivement-animation',
          params: {
            photoUri: photoUri,
            originalMemoryImageUri: quest.data?.originMemory.imageUrl,
          },
        });
      },
      onError: (e) => {
        console.error(e);
      },
    },
  );

  const questAchivementMemoryFields = {
    caption: `${quest.data?.name}達成`,
    timeLabel: formatDate(new Date()),
  };
  const { setOptions } = useNavigation();
  // TODO: 共通化できそうやね
  useEffect(() => {
    setOptions({
      headerRight: () => {
        return (
          <Text
            fontSize={16}
            color={'$secondary'}
            opacity={photoUri && quest.data ? 1 : 0.5}
            fontWeight={'bold'}
            onPress={() => {
              if (photoUri && quest.data && !achiveQuest.isLoading) {
                achiveQuest.mutate({
                  image: photoUri,
                  data: {
                    questUuid: quest.data?.uuid,
                    achievedRequirementUuids: quest.data.requirements.map(
                      (requirement) => requirement.uuid,
                    ),
                    isPublic: true,
                    description: '',
                    caption: questAchivementMemoryFields.caption,
                    timeLabel: questAchivementMemoryFields.timeLabel,
                    memberProfiles: quest.data.originMemory.member_profiles.map(
                      (profile) => profile.uuid,
                    ),
                    // TODO：入力に対応
                    timestamp: null,
                    lat: null,
                    lng: null,
                  },
                });
              }
            }}
          >
            達成
          </Text>
        );
      },
    });
  }, [setOptions, photoUri, quest, achiveQuest, questAchivementMemoryFields]);

  if (!photoUri) {
    return <Text color={'$red'}>no photo URI</Text>;
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FrontFace
        imageUri={photoUri}
        caption={questAchivementMemoryFields.caption}
        timeLabel={questAchivementMemoryFields.timeLabel}
        styleProps={{ cardWidth: '90%' }}
      />
    </SafeAreaView>
  );
}
