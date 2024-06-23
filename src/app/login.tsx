import { useToken } from '@/features/auth/components/AuthenticationProvider';
import { useLoginForm } from '@/forms/auth/login';
import { SecondaryColorButton } from '@/shared/components/common/Button';
import { RHFErrorMessage } from '@/shared/components/form/RHFErrorMessage';
import { Controller } from 'react-hook-form';
import { Form, Input, Label, Spinner, Text, YStack } from 'tamagui';

export default function Login() {
  const {
    control,
    formState: { errors, isValid, isSubmitting, isLoading, isSubmitted },
    handleSubmit,
  } = useLoginForm();
  const { signIn } = useToken();

  const onSubmit = ({ username, password }: { username: string; password: string }) => {
    signIn({ username: username, password: password });
  };

  console.log('isSubmitting', isSubmitting);
  console.log('isLoading', isLoading);
  console.log('isSubmitted', isSubmitted);
  return (
    <Form
      gap={48}
      flex={1}
      justifyContent="center"
      alignItems="center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <YStack gap={8} width={'85%'}>
        <YStack>
          <Label htmlFor="username" fontWeight={'bold'}>
            ユーザ名
          </Label>
          <Controller
            name="username"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                id="username"
                placeholder="daiki"
                placeholderTextColor={'$gray5'}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <RHFErrorMessage name="username" errors={errors} />
        </YStack>
        <YStack>
          <Label htmlFor="password" fontWeight={'bold'}>
            パスワード
          </Label>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                id="password"
                placeholder="hogehoge"
                textContentType="password"
                placeholderTextColor={'$gray5'}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <RHFErrorMessage name="password" errors={errors} />
        </YStack>
      </YStack>
      <Form.Trigger width={'85%'} asChild={true}>
        <SecondaryColorButton
          fontWeight={'bold'}
          fontSize={16}
          disabled={!isValid}
          icon={isSubmitting || isSubmitted ? <Spinner /> : undefined}
        >
          ログイン
        </SecondaryColorButton>
      </Form.Trigger>
    </Form>
  );
}
