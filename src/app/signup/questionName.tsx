import { useSignupUsernameForm } from '@/forms/auth/signup';
import { SecondaryColorButton } from '@/shared/components/common/Button';
import { RHFErrorMessage } from '@/shared/components/form/RHFErrorMessage';
import { useRouter } from 'expo-router';
import { Controller } from 'react-hook-form';
import { Input, Text, YStack } from 'tamagui';

export default function QuestionName() {
  const router = useRouter();
  const {
    control,
    formState: { isValid, errors },
    getValues,
  } = useSignupUsernameForm();

  return (
    <YStack gap={16} alignItems="center" py={48} px={32}>
      <Text fontSize={16} fontWeight={'bold'}>
        ようこそ。あなたの名前はなんですか？英数字と- . _で入力してください！
      </Text>
      <RHFErrorMessage name="username" errors={errors} />
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="あなたの名前"
            placeholderTextColor="$gray5"
            fontWeight={'bold'}
            fontSize={48}
            backgroundColor={'$colorTransparent'}
            borderWidth={0}
            mt={64}
            autoFocus={true}
            height={80}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <SecondaryColorButton
        width={'100%'}
        mt={60}
        fontWeight={'bold'}
        onPress={() => {
          router.push(`/signup/questionEmail?username=${getValues('username')}`);
        }}
        disabled={!isValid}
      >
        次へ
      </SecondaryColorButton>
    </YStack>
  );
}
