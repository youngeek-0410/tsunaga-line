import { MaterialCommunityIcons } from '@/shared/components/Icon';
import { useAuthClient } from '@/shared/hooks/useAuthClient';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { Button, Input, ScrollView, Sheet, Spinner, Text, XStack, YStack } from 'tamagui';
import { MemberCheckbox } from '../MemberCheckbox';
import { SelectedMemberIcon } from '../SelectedMemberIcon';
import type { useSelectedMembers } from '../useSelectedMembers';

export const useMemberSelectionModal = (initialIsOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const memberSelectionModal = (selectedMembersStuff: ReturnType<typeof useSelectedMembers>) => (
    <MemberSelectionModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      selectedMembersStuff={selectedMembersStuff}
    />
  );

  return { isOpen, setIsOpen, memberSelectionModal };
};

const useSearchProfiles = (defaultQuery = '') => {
  const [query, setQuery] = useState(defaultQuery);

  const client = useAuthClient();
  const {
    isLoading,
    isError,
    error,
    data: result,
  } = useQuery({
    queryKey: ['profiles', query],
    queryFn: () => {
      return client.api.v1.profiles.$get({ query: { q: query } }).then((data) => data.items);
    },
    keepPreviousData: true,
  });

  return { isLoading, isError, error, result, onChangeQuery: setQuery };
};

type MemberSelectionModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  selectedMembersStuff: ReturnType<typeof useSelectedMembers>;
};

const MemberSelectionModal = ({
  isOpen,
  setIsOpen,
  selectedMembersStuff: { selectedMembers, updateSelectedMember, removeSelectedMember },
}: MemberSelectionModalProps) => {
  const { isLoading, isError, error, result, onChangeQuery } = useSearchProfiles();

  return (
    <Sheet
      snapPoints={[92]}
      open={isOpen}
      onOpenChange={setIsOpen}
      modal={true}
      dismissOnSnapToBottom={true}
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame paddingHorizontal="$2" paddingVertical={16} backgroundColor="$gray2">
        <YStack gap="$3">
          <XStack paddingHorizontal="$3" justifyContent="space-between" alignItems="center">
            <Text>メンバーを選択</Text>
            {/* Close Button */}
            <Button
              unstyled={true}
              onPress={() => {
                setIsOpen(false);
              }}
            >
              <MaterialCommunityIcons size={36} name="close" color="black" />
            </Button>
          </XStack>

          <Input placeholder="検索" onChangeText={onChangeQuery} />
          {isError ? (
            <YStack alignSelf="center">
              <Text color={'red'}>Error Occuered: {error}</Text>
            </YStack>
          ) : isLoading || result == null ? (
            <YStack alignSelf="center">
              <Spinner size="large" color="$orange10" />
            </YStack>
          ) : (
            <YStack px={'$3'} mb={50} flexGrow={1}>
              <ScrollView overflow="visible" horizontal={true}>
                <XStack gap={16} alignItems="center">
                  {selectedMembers.length === 0 ? (
                    <Text paddingLeft="$3">メンバーを選択してください</Text>
                  ) : (
                    selectedMembers.map((memeber) => (
                      <SelectedMemberIcon
                        key={memeber.uuid}
                        profile={memeber}
                        onRemove={removeSelectedMember}
                      />
                    ))
                  )}
                </XStack>
              </ScrollView>
              <YStack gap={8} height={'75%'}>
                <Text>検索結果</Text>
                <Sheet.ScrollView>
                  <YStack gap={16} paddingTop={16} paddingRight="$3">
                    {result.length === 0 && <Text>該当するユーザーが見つかりませんでした</Text>}
                    {result.map((profile) => (
                      <MemberCheckbox
                        key={profile.uuid}
                        profile={profile}
                        checked={selectedMembers.some((m) => m.uuid === profile.uuid)}
                        onCheckedChange={updateSelectedMember}
                      />
                    ))}
                  </YStack>
                </Sheet.ScrollView>
              </YStack>
            </YStack>
          )}
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
};
