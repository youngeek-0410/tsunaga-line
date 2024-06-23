import { QuestRequirementItem } from '@/features/quest/create-quest/components/QuestRequirementItem';
import {
  isValidQuestRequirements,
  questRequirementsAtom,
  questRequirementsFormAtom,
  selectedMemory,
} from '@/features/quest/create-quest/context/form-value';
import { FrontFace } from '@/shared/components/Cheki/FrontFace';
import { FontAwesomeIcon, MaterialCommunityIcons } from '@/shared/components/Icon';
import { SecondaryColorButton } from '@/shared/components/common/Button';
import { useAfterInteractions } from '@/shared/hooks/useAfterInteractions';
import { useAuthClient } from '@/shared/hooks/useAuthClient';
import { useAspidaQuery } from '@aspida/react-query';
import { useRouter } from 'expo-router';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { useMutation, useQueryClient } from 'react-query';
import { Input, Label, ScrollView, Separator, Spinner, Text, View, XStack, YStack } from 'tamagui';

export default function QuestCreate() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const client = useAuthClient();
  const { data: questRequirementsSuggest } = useAspidaQuery(
    client.api.v1.quest_requirements.suggest,
  );
  const createQuest = useMutation(client.api.v1.quests.post, {
    onSuccess: () => {
      queryClient.invalidateQueries(client.api.v1.quests.$path());
      router.replace('/quest');
    },
  });
  const { data: questRequirementsMine } = useAspidaQuery(client.api.v1.quest_requirements.mine);
  const [_, setQuestRequirements] = useAtom(questRequirementsAtom);
  const [questRequirementsForm] = useAtom(questRequirementsFormAtom);
  // yabai
  useEffect(() => {
    const newQuestRequirements = questRequirementsSuggest?.concat(
      questRequirementsMine?.items ?? [],
    );
    setQuestRequirements(newQuestRequirements ?? []);
  }, [questRequirementsSuggest, questRequirementsMine, setQuestRequirements]);
  const [memory] = useAtom(selectedMemory);
  const [name, setName] = useState('');
  const [isValid] = useAtom(isValidQuestRequirements);

  const isEndTransition = useAfterInteractions();
  return isEndTransition ? (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View paddingHorizontal={16}>
          <YStack p={16} gap={16}>
            <YStack gap={4}>
              <Label fontWeight={'bold'} fontSize={16} htmlFor="name">
                未来につなげる思い出
              </Label>
              <TouchableOpacity
                onPress={() => {
                  router.push('/quest/create/select-memory');
                }}
              >
                {memory ? (
                  <View alignItems="center">
                    <FrontFace
                      styleProps={{ cardWidth: '100%' }}
                      imageUri={memory.imageUrl}
                      timeLabel={memory.timeLabel}
                      caption={memory.caption}
                    />
                  </View>
                ) : (
                  <View
                    alignSelf="center"
                    backgroundColor={'white'}
                    h={150}
                    w={200}
                    borderRadius={'$3'}
                  >
                    <MaterialCommunityIcons name="gesture-tap" size={32} />
                  </View>
                )}
              </TouchableOpacity>
            </YStack>
            <YStack>
              <Label fontWeight={'bold'} fontSize={16} htmlFor="name">
                クエスト名
              </Label>
              <Input
                placeholder="仲ちゃん"
                id="name"
                value={name}
                onChangeText={(text) => setName(text)}
              />
            </YStack>
          </YStack>
          <YStack gap={4}>
            <Separator marginVertical={8} borderColor={'$gray5'} borderWidth={1} />
            <XStack
              justifyContent="space-between"
              alignItems="flex-start"
              onPress={() => {
                router.push('/quest/create/select-quest-requirements');
              }}
            >
              <Text fontWeight={'bold'} fontSize={16}>
                達成条件
              </Text>
              <FontAwesomeIcon name="angle-right" size={16} />
            </XStack>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} overflow="visible">
              <XStack gap={16}>
                {questRequirementsForm.map((questRequirement) => (
                  <QuestRequirementItem
                    key={questRequirement.value.uuid}
                    questRequirement={questRequirement}
                  />
                ))}
              </XStack>
            </ScrollView>
            <Separator marginVertical={8} borderColor={'$gray5'} borderWidth={1} />
          </YStack>
          <SecondaryColorButton
            fontWeight={'bold'}
            mt={16}
            onPress={() => {
              if (memory && name && isValid) {
                createQuest.mutate({
                  body: {
                    originMemoryUuid: memory.uuid,
                    name: name,
                    requirementUuids: questRequirementsForm
                      .filter((qrf) => qrf.selected)
                      .map((qr) => qr.value.uuid),
                  },
                });
              }
            }}
            disabled={!(memory && name && isValid)}
          >
            作成する
          </SecondaryColorButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  ) : (
    <Spinner />
  );
}
