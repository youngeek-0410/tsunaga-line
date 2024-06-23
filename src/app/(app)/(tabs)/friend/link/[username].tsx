import { LinkFriendListItem } from '@/features/friend/link-friend/components/LinkFriendListItem';
import { ErrorMessageText } from '@/shared/components/common/Text';
import { useAuthClient } from '@/shared/hooks/useAuthClient';
import { useAspidaQuery } from '@aspida/react-query';
import { useGlobalSearchParams } from 'expo-router';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { Avatar, Spinner, Text, YStack } from 'tamagui';
export default function Link() {
  const [errorMessage, setErrorMessage] = useState('');
  const client = useAuthClient();
  const { username } = useGlobalSearchParams();
  const { data: profiles, isLoading: isLoadingProfiles } = useAspidaQuery(client.api.v1.profiles);
  const { data: linkUser, isLoading: isLoadingLinkuser } = useAspidaQuery(
    client.api.v1.profiles._username(username as string),
  );
  return profiles && !isLoadingProfiles && linkUser && !isLoadingLinkuser ? (
    <YStack paddingHorizontal={32} pt={8} flex={1}>
      <YStack gap={8} alignItems="center">
        <Avatar circular={true} size={150}>
          <Avatar.Image src={linkUser.iconUrl ?? ''} />
          <Avatar.Fallback backgroundColor={'$blue10'} />
        </Avatar>
        <Text fontSize={24} fontWeight={'bold'}>
          {linkUser.screenName}
        </Text>
      </YStack>
      <ErrorMessageText>{errorMessage}</ErrorMessageText>
      <FlatList
        data={profiles.items}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: profile }) => (
          <LinkFriendListItem
            profile={profile}
            linkUsername={username as string}
            setErrorMessage={setErrorMessage}
          />
        )}
        style={{ gap: 32 }}
      />
    </YStack>
  ) : (
    <Spinner />
  );
}
