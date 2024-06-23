import type { ProfileRead } from '@/api/@types';
import { IoniconsIcon } from '@/shared/components/Icon';
import { Avatar, Circle, Text, YStack, getToken } from 'tamagui';

type SelectedMemberIconProps = {
  profile: ProfileRead;
  onRemove: (id: string) => void;
};

export const SelectedMemberIcon = ({ profile, onRemove }: SelectedMemberIconProps) => {
  return (
    <YStack alignItems="center" pos={'relative'}>
      <IoniconsIcon
        name="close-outline"
        size={16}
        color={getToken('$gray7', 'color')}
        style={{ position: 'absolute', top: 2, right: 1, zIndex: 2 }}
        onPress={() => onRemove(profile.uuid)}
      />
      <Circle
        size={20}
        pos={'absolute'}
        backgroundColor={'$gray1'}
        top={0}
        right={0}
        zIndex={1}
        opacity={0.8}
      />
      <Avatar circular={true} size={48}>
        <Avatar.Image
          accessibilityLabel="Cam"
          src={
            profile.iconUrl ??
            'https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80'
          }
        />
        <Avatar.Fallback backgroundColor="$blue10" />
      </Avatar>
      <Text fontSize={12}>{profile.screenName}</Text>
    </YStack>
  );
};
