import { FilmFrameCard } from '@/features/quest/achive/components/FilmFrameCard';
import { SecondaryColorButton } from '@/shared/components/common/Button';
import { useRouter } from 'expo-router';
import { Dimensions, ScrollView } from 'react-native';
import { YStack } from 'tamagui';

export default function Index() {
  const router = useRouter();
  const windowW = Dimensions.get('window').width;
  return (
    <ScrollView>
      <YStack gap={32}>
        <SecondaryColorButton
          onPress={() => {
            router.navigate('/signup');
          }}
        >
          サインアップ
        </SecondaryColorButton>
        <SecondaryColorButton
          onPress={() => {
            router.navigate('/login');
          }}
        >
          ログイン
        </SecondaryColorButton>
        <FilmFrameCard
          alignItems="center"
          justifyContent="space-between"
          source={{ uri: 'https://i.postimg.cc/7L9PVQJL/image-9.png' }}
          styleProps={{ imageWidth: windowW * 0.7 }}
        />
      </YStack>
    </ScrollView>
  );
}
