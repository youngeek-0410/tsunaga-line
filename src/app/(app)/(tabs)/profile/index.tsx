import { useAuthClientOF } from '@/fetcher/useOpenapiFetchClient';
import { GrayButton } from '@/shared/components/common/Button';
import { router } from 'expo-router';
import { useQuery } from 'react-query';
import { Avatar, Spinner, Text, YStack } from 'tamagui';

export default function ProfileIndex() {
  const client = useAuthClientOF();
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profiles', 'me'],
    queryFn: () => client.GET('/api/v1/profiles/me/').then((res) => res.data),
  });
  return profile && !isLoading ? (
    <YStack px={32} mt={32} alignItems="center" gap={8} justifyContent="center" h={'50%'}>
      <Avatar circular={true} size={150}>
        <Avatar.Image src={profile.iconUrl ?? ''} />
        <Avatar.Fallback backgroundColor={'$blue10'} />
      </Avatar>
      <Text fontWeight={'bold'} fontSize={24}>
        {profile.screenName}
      </Text>
      <Text fontSize={16}>{profile.linkedUser?.username}</Text>
      <YStack gap={8}>
        <GrayButton
          size={'$3'}
          onPress={() => {
            router.push('/profile/edit');
          }}
        >
          プロフィール編集
        </GrayButton>
        <GrayButton
          size={'$3'}
          onPress={() => {
            router.push('/profile/share');
          }}
        >
          プロフィールシェア
        </GrayButton>
      </YStack>
    </YStack>
  ) : (
    <Spinner mt={50} />
  );
}
