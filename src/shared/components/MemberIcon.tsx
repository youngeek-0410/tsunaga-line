import { Avatar, Text, YStack } from 'tamagui';

export const MemberIcon = ({ screenName, iconUrl }: { screenName: string; iconUrl: string }) => {
  return (
    <YStack alignItems="center">
      <Avatar circular={true} size={48}>
        <Avatar.Image accessibilityLabel={screenName} src={iconUrl} />
        <Avatar.Fallback backgroundColor="$blue10" />
      </Avatar>
      <Text fontSize={12}>{screenName}</Text>
    </YStack>
  );
};
