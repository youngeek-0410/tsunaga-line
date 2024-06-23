import { IoniconsIcon } from '@/shared/components/Icon';
import type { NativeFile } from '@/shared/types/File';
import * as ImagePicker from 'expo-image-picker';
import type React from 'react';
import { Avatar, Circle, View } from 'tamagui';

type Props = {
  image: NativeFile;
  setImage: React.Dispatch<React.SetStateAction<NativeFile>>;
  profileIconUrl: string;
};

export const ProfileIconPicker = ({ image, setImage, profileIconUrl }: Props) => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const name = result.assets[0].fileName;
      const type = result.assets[0].mimeType;
      const uri = result.assets[0].uri;
      setImage({ name: name ?? 'profile-image', type: type ?? 'image/jpeg', uri: uri });
    }
  };

  return (
    <View pos={'relative'} onPress={pickImage}>
      <IoniconsIcon
        name="camera"
        size={24}
        style={{ position: 'absolute', right: 3, bottom: 14, zIndex: 4 }}
      />
      <Circle
        size={32}
        pos={'absolute'}
        borderWidth={1}
        right={0}
        bottom={10}
        zIndex={3}
        backgroundColor={'white'}
      />
      <Avatar circular={true} size={150}>
        <Avatar.Image src={image.uri.length !== 0 ? image.uri : profileIconUrl} />
        <Avatar.Fallback backgroundColor={'$blue10'} />
      </Avatar>
    </View>
  );
};
