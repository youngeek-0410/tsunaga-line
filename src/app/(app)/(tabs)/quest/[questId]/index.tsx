import type { QuestRead } from '@/api/@types';
import { QuestAchievementRequirementItem } from '@/features/quest/update-quest/components/QuestAchivementRequirementItem';
import { BackFace } from '@/shared/components/Cheki/BackFace';
import { FrontFace } from '@/shared/components/Cheki/FrontFace';
import { FlippableCard } from '@/shared/components/FlippableCard';
import { FontAwesomeIcon } from '@/shared/components/Icon';
import { MemberIcon } from '@/shared/components/MemberIcon';
import { useAuthClient } from '@/shared/hooks/useAuthClient';
import { withFetchingState } from '@/shared/utils/hoc/withFetchingState';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { useQuery } from 'react-query';
import { Button, ScrollView, Separator, Text, View, XStack, YStack } from 'tamagui';

const QuestDetailWrapper = ({ quest }: { quest: QuestRead }) => {
  const router = useRouter();
  const globalPram = useGlobalSearchParams();
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View paddingVertical={8} paddingHorizontal={16}>
        <YStack p={16} gap={24}>
          <XStack alignItems="center" gap={16}>
            <FontAwesomeIcon name="flag-o" size={24} />
            <Text fontWeight={'bold'} fontSize={16}>
              {quest.name}
            </Text>
          </XStack>
          <YStack gap={4}>
            {quest.requirements.map((requirement) => (
              <QuestAchievementRequirementItem key={requirement.uuid} detail={requirement.detail} />
            ))}
          </YStack>
          <YStack>
            <Text fontSize={12}>未来につなげる思い出</Text>
            <FlippableCard>
              <FrontFace
                {...quest.originMemory}
                imageUri={quest.originMemory.imageUrl}
                styleProps={{ cardWidth: '100%' }}
              />
              <BackFace {...quest.originMemory} members={quest.originMemory.member_profiles} />
              <View />
            </FlippableCard>
          </YStack>
        </YStack>
        <YStack gap={4}>
          <Separator marginVertical={8} borderColor={'$gray5'} borderWidth={1} />
          <XStack
            justifyContent="space-between"
            alignItems="flex-start"
            // onPress={() => {
            //   router.push('/quest/member-select');
            // }}
          >
            <Text fontWeight={'bold'} fontSize={16}>
              メンバー
            </Text>
            <FontAwesomeIcon name="angle-right" size={16} />
          </XStack>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} overflow="visible">
            <XStack gap={16}>
              {quest.originMemory.member_profiles.map((profile) => (
                <MemberIcon
                  key={profile.uuid}
                  screenName={profile.screenName}
                  iconUrl={profile.iconUrl ?? ''}
                />
              ))}
            </XStack>
          </ScrollView>
          <Separator marginVertical={8} borderColor={'$gray5'} borderWidth={1} />
        </YStack>
        <Button
          color={'white'}
          backgroundColor={'$secondary'}
          fontWeight={'bold'}
          mt={16}
          onPress={() => router.push(`/quest/${globalPram.questId}/take-photo`)}
        >
          達成する
        </Button>
      </View>
    </ScrollView>
  );
};

export default function QuestDetail() {
  const globalPram = useGlobalSearchParams();
  const questId = globalPram.questId;
  const client = useAuthClient();
  const {
    data: quest,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['quest', questId],
    queryFn: () =>
      client.api.v1.quests
        ._uuid(questId as string)
        .$get()
        .then((res) => res),
  });

  const QuestDetailWithLoadingState = withFetchingState<{ quest: QuestRead }>(QuestDetailWrapper);

  return (
    <QuestDetailWithLoadingState
      data={{ quest: quest as QuestRead }}
      isLoading={isLoading}
      error={error}
    />
  );
}
