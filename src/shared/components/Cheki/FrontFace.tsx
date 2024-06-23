import { Dimensions } from 'react-native';
import { Stack, Text, YStack } from 'tamagui';
import AutoHeightImage from '../AutoHeightImage';

// FrontFace
type FrontFaceProps = {
  imageUri: string;
  caption: string;
  timeLabel: string;
  styleProps: {
    cardWidth: string;
  };
};

export const FrontFace = ({ imageUri, caption, timeLabel, styleProps }: FrontFaceProps) => {
  const windowW = Dimensions.get('window').width;
  return (
    <YStack
      width={styleProps.cardWidth}
      paddingVertical="$3"
      alignItems="center"
      backgroundColor={'white'}
    >
      {/*
        オリジナル画像のaspect ratioをいい感じに尊重したまま表示する方法がわからなかった
        AutoHeightImage： widthを指定すると、ランタイムで画像の高さを取得していい感じに表示するコンポーネント
      */}
      <AutoHeightImage source={{ uri: imageUri }} width={windowW * 0.8} />

      <Stack width={'100%'} paddingTop={'$2'} paddingHorizontal={'$3'} gap={'$1'}>
        <Text fontSize={16}>{caption}</Text>
        <Text fontSize={12} color={'$gray10'}>
          {timeLabel}
        </Text>
      </Stack>
    </YStack>
  );
};
