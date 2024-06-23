import type { ProfileRead } from '@/api/@types';
import { GrayButton } from '@/shared/components/common/Button';
import { useRouter } from 'expo-router/build/hooks';
import { Avatar, Text, XStack } from 'tamagui';

export const FriendListItem = ({ props }: { props: ProfileRead }) => {
  const { screenName, iconUrl, uuid } = props;
  const router = useRouter();
  return (
    <XStack
      justifyContent={'space-between'}
      marginTop={'$3'}
      alignItems="center"
      onPress={() => {
        router.push(`/friend/${uuid}`);
      }}
    >
      <XStack gap={8} alignItems="center">
        <Avatar circular={true} size={48}>
          <Avatar.Image src={iconUrl ?? ''} />
          <Avatar.Fallback backgroundColor={'$blue10'} />
        </Avatar>
        <Text fontSize={16} fontWeight={'bold'}>
          {screenName}
        </Text>
      </XStack>
      <GrayButton
        size={'$3'}
        onPress={() => {
          router.push(`/friend/${uuid}/edit`);
        }}
      >
        編集
      </GrayButton>
    </XStack>
  );
};
