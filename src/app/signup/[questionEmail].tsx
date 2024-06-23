import { useSignupEmailForm } from '@/forms/auth/signup';
import { SecondaryColorButton } from '@/shared/components/common/Button';
import { RHFErrorMessage } from '@/shared/components/form/RHFErrorMessage';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import { Controller } from 'react-hook-form';
import { Input, Text, YStack } from 'tamagui';

export default function QuestionUsername() {
  const router = useRouter();
  const { questionEmail, username } = useGlobalSearchParams();
  const {
    control,
    getValues,
    formState: { errors, isValid },
  } = useSignupEmailForm();

  return (
    <YStack gap={16} alignItems="center" py={48} px={32}>
      <Text fontSize={16} fontWeight={'bold'}>
        次はメールアドレスを入力しましょう！これは{questionEmail}
        さんを識別すためのものです。
      </Text>
      <RHFErrorMessage name="email" errors={errors} />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="メール"
            placeholderTextColor="$gray5"
            fontWeight={'bold'}
            fontSize={48}
            backgroundColor={'$colorTransparent'}
            borderWidth={0}
            mt={64}
            autoFocus={true}
            height={80}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            textContentType="emailAddress"
          />
        )}
      />
      <SecondaryColorButton
        width={'100%'}
        mt={60}
        fontWeight={'bold'}
        onPress={() => {
          router.push(`/signup/questionPassword?username=${username}&email=${getValues('email')}`);
        }}
        disabled={!isValid}
      >
        次へ
      </SecondaryColorButton>
    </YStack>
  );
}
