import { useToken } from '@/features/auth/components/AuthenticationProvider';
import { SecondaryColorButton } from '@/shared/components/common/Button';
import { Redirect, useRouter } from 'expo-router';
import { Button, Text, YStack } from 'tamagui';

export default function Signup() {
  const router = useRouter();
  const { isLoading, token } = useToken();

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  if (token) {
    return <Redirect href={'/(app)'} />;
  }
  return (
    <YStack gap={48} flex={1} justifyContent="center" alignItems="center">
      <YStack gap={8} width={'85%'}>
        <SecondaryColorButton
          fontWeight={'bold'}
          fontSize={16}
          onPress={() => {
            router.push('/signup/questionName');
          }}
        >
          新しいアカウントを作成
        </SecondaryColorButton>
        <Button
          fontWeight={'bold'}
          fontSize={16}
          backgroundColor={'$colorTransparent'}
          color={'$secondary'}
          onPress={() => {
            router.push('/login');
          }}
        >
          ログイン
        </Button>
      </YStack>
    </YStack>
  );
}
