import type { ProfileRead } from '@/api/@types';
import { Check as CheckIcon } from '@tamagui/lucide-icons';
import { Avatar, Checkbox, Label, Text, XStack } from 'tamagui';

export const MemberCheckbox = ({
  profile,
  checked,
  onCheckedChange,
}: {
  profile: ProfileRead;
  checked: boolean;
  onCheckedChange: ({
    checked,
    profile,
  }: { checked: boolean | 'indeterminate'; profile: ProfileRead }) => void;
}) => {
  const { uuid: id, screenName, iconUrl } = profile;
  return (
    <XStack alignItems="center" justifyContent="space-between">
      <Label htmlFor={id} flex={1}>
        <XStack alignItems="center" gap={8}>
          <Avatar circular={true} size={48}>
            <Avatar.Image
              accessibilityLabel={screenName}
              src={
                iconUrl ??
                'https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80'
              }
            />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>
          <Text fontSize={16} fontWeight={'bold'}>
            {screenName}
          </Text>
        </XStack>
      </Label>
      <Checkbox
        id={id}
        checked={checked}
        size={'$5'}
        onCheckedChange={(checked) => {
          onCheckedChange({ checked, profile });
        }}
      >
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox>
    </XStack>
  );
};
