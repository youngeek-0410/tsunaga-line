import api from '@/api/$api';
import { useToken } from '@/features/auth/components/AuthenticationProvider';
import { useSignupPasswordForm } from '@/forms/auth/signup';
import { axiosClient } from '@/lib/axios/client';
import { SecondaryColorButton } from '@/shared/components/common/Button';
import { RHFErrorMessage } from '@/shared/components/form/RHFErrorMessage';
import aspida from '@aspida/axios';
import { useGlobalSearchParams } from 'expo-router';
import { Controller } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Input, Text, YStack } from 'tamagui';

export default function QuestionPassword() {
  const { username, email } = useGlobalSearchParams();
  const {
    control,
    formState: { isValid, errors },
    getValues,
  } = useSignupPasswordForm();
  const { signIn } = useToken();

  const client = api(aspida(axiosClient));
  const postUser = (body: { username: string; password: string; email: string }) => {
    return client.api.v1.users.$post({ body });
  };
  const mutation = useMutation(postUser, {
    onSuccess: () => {
      signIn({ username: username as string, password: getValues('password') });
    },
    onError: () => {
      alert('エラーが発生しました');
    },
  });
  return (
    <YStack gap={16} alignItems="center" py={48} px={32}>
      <Text fontSize={32}>つながりん</Text>
      <Text fontSize={16} fontWeight={'bold'}>
        最後はパスワードを作りましょう。あともう少しです。頑張りましょう！
      </Text>
      <RHFErrorMessage name="password" errors={errors} />
      <RHFErrorMessage name="verificationPassword" errors={errors} />
      <YStack mt={64} alignItems="center">
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="パスワード"
              placeholderTextColor="$gray5"
              fontWeight={'bold'}
              fontSize={48}
              backgroundColor={'$colorTransparent'}
              borderWidth={0}
              autoFocus={true}
              height={80}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              textContentType="password"
            />
          )}
        />
        <Controller
          control={control}
          name="verificationPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="もう一度入力"
              placeholderTextColor="$gray5"
              fontWeight={'bold'}
              fontSize={48}
              backgroundColor={'$colorTransparent'}
              borderWidth={0}
              mt={64}
              height={80}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              textContentType="password"
            />
          )}
        />
      </YStack>
      <SecondaryColorButton
        width={'100%'}
        fontWeight={'bold'}
        onPress={() => {
          //router.push('/(tabs)/feed');
          mutation.mutate({
            username: username as string,
            email: email as string,
            password: getValues('password'),
          });
        }}
        mt={32}
        disabled={!isValid}
      >
        つながりんの世界に飛び込む
      </SecondaryColorButton>
    </YStack>
  );
}
