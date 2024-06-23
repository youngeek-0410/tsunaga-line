import { useEffect, useState } from 'react';
import { Image, type ImageRequireSource, type ImageURISource } from 'react-native';

export const useCalculateImageHeight = (
  width: number,
  source: ImageURISource | ImageRequireSource,
) => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if (typeof source === 'number') {
      const originalSize = Image.resolveAssetSource(source);
      const newHeight = (width * originalSize.height) / originalSize.width;
      setHeight(newHeight);
    } else if (source?.uri) {
      Image.getSize(source.uri, (originalWidth, originalHeight) => {
        const newHeight = (width * originalHeight) / originalWidth;
        setHeight(newHeight);
      });
    }
  }, [source, width]);

  return height;
};
