import { SecondaryColorButton } from '@/shared/components/common/Button';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Input, Label, Sheet, type SheetProps, YStack } from 'tamagui';

type Props = {
  sheetProps: SheetProps;
  onCreateQuestRequirement: (detai: string) => void;
};

export const CreateQuestRequirementSheet = ({ sheetProps, onCreateQuestRequirement }: Props) => {
  const [detail, setDetail] = useState('');
  return (
    <Sheet snapPoints={[30]} {...sheetProps} modal={true} moveOnKeyboardChange={true}>
      <Sheet.Handle />
      <Sheet.Frame paddingHorizontal={32} paddingVertical={16}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <YStack gap={32}>
            <YStack gap={16}>
              <YStack>
                <Label htmlFor="achivement-input" fontWeight={'bold'}>
                  達成条件
                </Label>
                <Input
                  id="achivement-input"
                  placeholder="同じアングルで撮る"
                  value={detail}
                  onChangeText={(text) => setDetail(text)}
                />
              </YStack>
              <SecondaryColorButton
                fontWeight={'bold'}
                disabled={detail.length === 0}
                onPress={() => {
                  onCreateQuestRequirement(detail);
                  setDetail('');
                }}
              >
                作成する
              </SecondaryColorButton>
            </YStack>
          </YStack>
        </KeyboardAvoidingView>
      </Sheet.Frame>
    </Sheet>
  );
};
