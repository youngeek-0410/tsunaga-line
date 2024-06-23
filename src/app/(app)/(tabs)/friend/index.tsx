import { FriendListItem } from '@/features/friend/list-friend/components/FriendListItem';
import { useAuthClientOF } from '@/fetcher/useOpenapiFetchClient';
import { FontAwesomeIcon } from '@/shared/components/Icon';
import { SecondaryColorButton } from '@/shared/components/common/Button';
import { useRouter } from 'expo-router';
import { FlatList } from 'react-native';
import { useQuery } from 'react-query';
import { Input, Spinner, YStack } from 'tamagui';

export default function Friend() {
  const router = useRouter();
  const client = useAuthClientOF();
  const { data: profiles, isLoading } = useQuery({
    queryKey: ['profiles'],
    queryFn: () => client.GET('/api/v1/profiles/').then((res) => res.data),
  });
  return (
    <YStack gap={16} mt={'$8'} px={16} flex={1}>
      <SecondaryColorButton
        icon={<FontAwesomeIcon name="plus" size={16} color={'white'} />}
        onPress={() => router.push('/friend/create')}
      >
        フレンドプロフィール新規作成
      </SecondaryColorButton>
      <Input placeholder="検索" />
      {profiles && !isLoading ? (
        <FlatList
          data={profiles?.items}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: profile }) => <FriendListItem props={profile} />}
          style={{ gap: 32 }}
        />
      ) : (
        <Spinner />
      )}
    </YStack>
  );
}
