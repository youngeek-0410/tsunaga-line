import type { ProfileRead } from '@/api/@types';
import { SecondaryColorButton } from '@/shared/components/common/Button';
import { useAuthClient } from '@/shared/hooks/useAuthClient';
import type { AxiosError } from 'axios';
import { useRouter } from 'expo-router/build/hooks';
import type React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Avatar, Text, XStack } from 'tamagui';

type Props = {
  profile: ProfileRead;
  linkUsername: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

export const LinkFriendListItem = ({ profile, linkUsername, setErrorMessage }: Props) => {
  const { screenName, iconUrl, uuid } = profile;
  const router = useRouter();

  const client = useAuthClient();
  const queryClient = useQueryClient();
  const linkUser = useMutation(client.api.v1.profiles._uuid(uuid).link.$patch, {
    onSuccess: () => {
      queryClient.invalidateQueries(client.api.v1.profiles.$path());
      queryClient.invalidateQueries(client.api.v1.profiles._uuid(uuid).$path());
      router.replace('/friend');
    },
    onError: (_: AxiosError) => {
      setErrorMessage('エラーが発生しました。もう一度お試しください。');
    },
  });
  return (
    <XStack justifyContent={'space-between'} marginTop={'$3'} alignItems="center">
      <XStack gap={8} alignItems="center">
        <Avatar circular={true} size={48}>
          <Avatar.Image src={iconUrl ?? ''} />
          <Avatar.Fallback backgroundColor={'$blue10'} />
        </Avatar>
        <Text fontSize={16} fontWeight={'bold'}>
          {screenName}
        </Text>
      </XStack>
      <SecondaryColorButton
        size={'$3'}
        onPress={() => {
          linkUser.mutate({ body: { linkUserUsername: linkUsername } });
        }}
        fontWeight={'bold'}
      >
        リンク
      </SecondaryColorButton>
    </XStack>
  );
};
