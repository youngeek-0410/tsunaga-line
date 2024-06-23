import type { FC } from 'react';
import {
  Image,
  type ImageRequireSource,
  type ImageStyle,
  type ImageURISource,
  type StyleProp,
} from 'react-native';
import { useCalculateImageHeight } from '../hooks/useCalculateImageHeight';

// 流用元：https://zenn.dev/toshiyuki/articles/4791ccada2ba7e

const AutoHeightImage: FC<{
  source: ImageURISource | ImageRequireSource;
  width: number;
  style?: StyleProp<ImageStyle>;
}> = (props) => {
  const { source, style, width } = props;
  const height = useCalculateImageHeight(width, source);

  return <Image source={source} resizeMode="contain" style={[{ height, width }, style]} />;
};

export default AutoHeightImage;
