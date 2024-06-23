import { useAuthClientOF } from '@/fetcher/useOpenapiFetchClient';
import { useGlobalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { Avatar, Button, Spinner, Text, YStack } from 'tamagui';

export default function FriendProfileId() {
  const router = useRouter();
  const { setOptions } = useNavigation();
  const { profileId } = useGlobalSearchParams();

  const client = useAuthClientOF();
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', profileId],
    queryFn: () =>
      client
        .GET('/api/v1/profiles/{uuid}/', { params: { path: { uuid: profileId as string } } })
        .then((res) => res.data),
    enabled: !!profileId,
  });

  // navigatorのコンポーネントをScreen内で定義
  useEffect(() => {
    setOptions({
      title: profile ? profile?.screenName : '',
    });
  }, [setOptions, profile]);

  return profile && !isLoading ? (
    <YStack gap={32} alignItems="center">
      <YStack px={32} mt={32} alignItems="center" gap={16}>
        <Avatar circular={true} size={150}>
          <Avatar.Image src={profile.iconUrl ?? ''} />
          <Avatar.Fallback backgroundColor={'$blue10'} />
        </Avatar>
        <Text fontWeight={'bold'} color={profile.linkedUser ? '$secondary' : '$gray5'}>
          {profile.linkedUser ? profile.linkedUser.username : '未リンク'}
        </Text>
        <Button
          onPress={() => router.push(`/friend/${profileId}/edit`)}
          fontWeight={'bold'}
          size={'$3'}
        >
          プロフィールを編集
        </Button>
        <Text>{profile.memo}</Text>
      </YStack>
    </YStack>
  ) : (
    <Spinner />
  );
}
