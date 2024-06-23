import { useMemberSelectionModal } from '@/features/createMemory/memberSelectionModal/MemberSelectionModal';
import { usePreviewModal } from '@/features/createMemory/previewModal/PreviewModal';
import { useSelectedMembers } from '@/features/createMemory/useSelectedMembers';
import { useCreateMemoryForm } from '@/forms/memory/create';
import { FontAwesomeIcon } from '@/shared/components/Icon';
import { MemberIcon } from '@/shared/components/MemberIcon';
import { RHFErrorMessage } from '@/shared/components/form/RHFErrorMessage';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { useCallback } from 'react';
import { Controller } from 'react-hook-form';
import { BackHandler, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  Image,
  Input,
  Label,
  ScrollView,
  Separator,
  Text,
  View,
  XStack,
  YStack,
} from 'tamagui';

export default function InfoInput() {
  // get photo URI from query params (passed from previous screen)
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();

  const {
    previewModal,
    isOpen: isPreviewModalOpen,
    setIsOpen: setPreviewModalOpen,
  } = usePreviewModal(false);

  const {
    memberSelectionModal,
    isOpen: isMemberSelectionModalOpen,
    setIsOpen: setMemberSelectionModalOpen,
  } = useMemberSelectionModal(false);

  useFocusEffect(
    useCallback(() => {
      const closeModal = () => {
        setPreviewModalOpen(false);
        setMemberSelectionModalOpen(false);
        return true;
      };

      // HACK: Androidの戻るボタンでモーダルを閉じる（モーダルにはtamaguiのSheetを使っているため）
      const handler =
        isPreviewModalOpen || isMemberSelectionModalOpen
          ? BackHandler.addEventListener('hardwareBackPress', closeModal)
          : null;
      return () => handler?.remove();
    }, [
      isPreviewModalOpen,
      setPreviewModalOpen,
      isMemberSelectionModalOpen,
      setMemberSelectionModalOpen,
    ]),
  );

  const { selectedMembers, updateSelectedMember, removeSelectedMember } = useSelectedMembers();
  const { control, formState, getValues } = useCreateMemoryForm();

  if (!photoUri) {
    return <Text color={'$red'}>no photo URI</Text>;
  }

  return (
    <SafeAreaView>
      {previewModal({
        caption: getValues('caption'),
        timeLabel: getValues('timeLabel'),
        imageUri: photoUri,
        members: selectedMembers,
      })}
      {memberSelectionModal({ selectedMembers, updateSelectedMember, removeSelectedMember })}
      {/* header */}
      <View flexDirection="row" alignItems="center" justifyContent="space-between">
        <Button onPress={() => router.back()}>
          <ArrowLeft size={16} />
        </Button>
        <Text fontSize={16}>思い出の情報を入力</Text>
        <Button>
          <Text
            fontSize={16}
            color={'$secondary'}
            fontWeight={'bold'}
            onPress={() => {
              Keyboard.dismiss(); // close keyboard
              if (!formState.isValid) {
                alert('入力内容を確認してください');
                return;
              }

              setPreviewModalOpen(true);
            }}
          >
            プレビュー
          </Text>
        </Button>
      </View>

      {/* body content */}
      <ScrollView>
        {/* Cheki Image */}
        <View
          alignSelf="center"
          width="95%"
          borderStyle="solid"
          borderWidth={10}
          borderColor="white"
          marginTop="$3"
        >
          <Image source={{ uri: photoUri }} style={{ width: '100%', aspectRatio: 1 }} />
        </View>

        <YStack gap="$4" width="90%" marginHorizontal="auto" marginTop="$4">
          {/* caption and context */}
          <YStack>
            <YStack>
              <Label htmlFor="caption">思い出のキャプション</Label>
              <Controller
                name="caption"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    nativeID="caption"
                    placeholder="ガリガリ君を食べるふたり"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
              <RHFErrorMessage name="caption" errors={formState.errors} />
            </YStack>
            <YStack>
              <Label htmlFor="time-label">いつの思い出？</Label>
              <Controller
                name="timeLabel"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    nativeID="time-label"
                    placeholder="2023大晦日"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                )}
              />
              <RHFErrorMessage name="timeLabel" errors={formState.errors} />
            </YStack>
          </YStack>
          {/* members selection */}
          <YStack gap="$2">
            <Separator marginVertical={8} borderColor={'$gray5'} borderWidth={1} />
            <XStack
              justifyContent="space-between"
              alignItems="flex-start"
              padding={8}
              onPress={() => setMemberSelectionModalOpen(true)}
            >
              <Text fontWeight={'bold'} fontSize={16}>
                思い出のメンバー
              </Text>
              <FontAwesomeIcon name="angle-right" size={16} />
            </XStack>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} overflow="visible">
              <XStack gap={16}>
                {selectedMembers.length === 0 ? (
                  <Text paddingLeft="$3">メンバーを選択してください</Text>
                ) : (
                  selectedMembers.map(({ uuid, screenName, iconUrl }) => (
                    <MemberIcon
                      key={uuid}
                      screenName={screenName}
                      iconUrl={
                        iconUrl ??
                        'https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80'
                      }
                    />
                  ))
                )}
              </XStack>
            </ScrollView>
            <Separator marginVertical={8} borderColor="$gray5" borderWidth={1} />
          </YStack>

          <View height="$12" />
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
