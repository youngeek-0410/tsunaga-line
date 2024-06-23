import type { QuestRequirementForm } from '@/features/quest/create-quest/context/form-value';
import { Text, View } from 'tamagui';
export const QuestRequirementItem = ({
  questRequirement,
}: { questRequirement: QuestRequirementForm }) => {
  return (
    <View
      alignItems="center"
      paddingHorizontal={16}
      paddingVertical={10}
      borderWidth={2}
      borderColor={questRequirement.selected ? '$blue4' : '$gray5'}
      borderRadius={'$10'}
      backgroundColor={questRequirement.selected ? '$blue3' : 'white'}
    >
      <Text fontSize={14}>😎{questRequirement.value.detail}</Text>
    </View>
  );
};
