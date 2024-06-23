import { CreateQuestRequirementSheet } from '@/features/quest/create-quest/components/CreateQuestRequirementSheet';
import {
  type QuestRequirementForm,
  isValidQuestRequirements,
  questRequirementsFormAtom,
  selectedQuestRequirementsAtom,
} from '@/features/quest/create-quest/context/form-value';
import { useAuthClient } from '@/shared/hooks/useAuthClient';
import { Check as CheckIcon } from '@tamagui/lucide-icons';
import { router, useNavigation } from 'expo-router';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
  Button,
  Checkbox,
  type CheckedState,
  Input,
  Label,
  ScrollView,
  Text,
  View,
  XStack,
  YStack,
} from 'tamagui';

export default function SelectQuestRequirements() {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const client = useAuthClient();
  const createQuestRequirement = useMutation(client.api.v1.quest_requirements.$post, {
    onSuccess: () => {
      queryClient.invalidateQueries(client.api.v1.quest_requirements.mine.$path());
    },
  });
  const [selectedQuestRequeiremtns, setSelectedQuestRequirements] = useAtom(
    selectedQuestRequirementsAtom,
  );
  const [questRequirementsForm] = useAtom(questRequirementsFormAtom);
  const { setOptions } = useNavigation();
  const [isValid] = useAtom(isValidQuestRequirements);

  useEffect(() => {
    setOptions({
      headerRight: () => {
        return (
          <Text
            mr={8}
            width={36}
            fontSize={16}
            color={'$secondary'}
            opacity={isValid ? 1 : 0.5}
            fontWeight={'bold'}
            onPress={() => {
              isValid && router.back();
            }}
          >
            保存
          </Text>
        );
      },
    });
  }, [setOptions, isValid]);

  return (
    <View paddingHorizontal={32} paddingVertical={16} flex={1}>
      <YStack gap={32}>
        <YStack gap={16}>
          <Button
            color={'white'}
            backgroundColor={'$secondary'}
            onPress={() => {
              setIsOpen(true);
            }}
          >
            新しい達成条件作成
          </Button>
          <Input placeholder="検索" />
          <ScrollView showsVerticalScrollIndicator={false} height={'80%'}>
            {questRequirementsForm.map((questRequirement) => (
              <AchivementCheckbox
                key={questRequirement.value.uuid}
                questRequirement={questRequirement}
                onChecked={(checked) => {
                  const newSelectedQuestRequirements = new Map(selectedQuestRequeiremtns);
                  checked
                    ? newSelectedQuestRequirements.set(
                        questRequirement.value.uuid,
                        questRequirement.value.uuid,
                      )
                    : newSelectedQuestRequirements.delete(questRequirement.value.uuid);
                  setSelectedQuestRequirements(newSelectedQuestRequirements);
                }}
              />
            ))}
          </ScrollView>
        </YStack>
      </YStack>
      <CreateQuestRequirementSheet
        sheetProps={{
          open: isOpen,
          onOpenChange: setIsOpen,
          dismissOnSnapToBottom: true,
          dismissOnOverlayPress: true,
        }}
        onCreateQuestRequirement={(detail) => {
          createQuestRequirement.mutate({ body: { detail } });
        }}
      />
    </View>
  );
}

const AchivementCheckbox = ({
  questRequirement,
  onChecked,
}: { questRequirement: QuestRequirementForm; onChecked: (checked: CheckedState) => void }) => {
  return (
    <XStack alignItems="center" gap={16}>
      <Checkbox
        id={questRequirement.value.uuid}
        size={'$5'}
        onCheckedChange={onChecked}
        checked={questRequirement.selected}
      >
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox>
      <Label htmlFor={questRequirement.value.uuid}>
        <Text fontWeight={'bold'}>{questRequirement.value.detail}</Text>
      </Label>
    </XStack>
  );
};
