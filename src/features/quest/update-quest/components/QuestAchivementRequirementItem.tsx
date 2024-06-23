import { IoniconsIcon } from '@/shared/components/Icon';
import { Text, XStack } from 'tamagui';
export const QuestAchievementRequirementItem = ({ detail }: { detail: string }) => {
  return (
    <XStack alignItems="center">
      <IoniconsIcon name="checkmark-circle" size={20} />
      <Text fontWeight={'bold'} fontSize={14}>
        {detail}
      </Text>
    </XStack>
  );
};
