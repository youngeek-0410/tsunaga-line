import { useCalculateImageHeight } from '@/shared/hooks/useCalculateImageHeight';
import { Image, type ImageRequireSource, type ImageURISource } from 'react-native';
import { View, type ViewProps, XStack, YStack } from 'tamagui';

type Props = ViewProps & {
  source: ImageURISource | ImageRequireSource;
  styleProps: {
    imageWidth: number;
  };
};

export const FilmFrameCard = ({ source, styleProps, ...rest }: Props) => {
  const imageHeight = useCalculateImageHeight(styleProps.imageWidth, source);
  return (
    <View {...rest}>
      <XStack
        width={styleProps.imageWidth * 1.2}
        // imageHeightが存在しない場合，16:9ベースのFilmCardを生成
        height={imageHeight ? imageHeight * 1.1 : (styleProps.imageWidth / 16) * 9 * 1.1}
        alignItems="center"
        justifyContent="space-between"
        paddingHorizontal={5}
        backgroundColor={'black'}
      >
        {/* left perforation */}
        <YStack gap={10} justifyContent="space-between" height={'100%'} paddingVertical={5}>
          {Array.from({ length: 8 }).map((_, i) => (
            <View key={i.toString()} width={14} height={10} bg="white" borderRadius={3} />
          ))}
        </YStack>
        <Image
          source={source}
          width={styleProps.imageWidth}
          height={imageHeight}
          style={{ borderRadius: 5 }}
        />
        {/* right perforation */}
        <YStack gap={10} justifyContent="space-between" height={'100%'} paddingVertical={5}>
          {Array.from({ length: 8 }).map((_, i) => (
            <View key={(i + 8).toString()} width={14} height={10} bg="white" borderRadius={3} />
          ))}
        </YStack>
      </XStack>
    </View>
  );
};
