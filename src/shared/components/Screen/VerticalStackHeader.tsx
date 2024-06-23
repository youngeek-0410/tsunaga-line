import { IoniconsIcon } from '@/shared/components/Icon';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { Text, View, XStack } from 'tamagui';

type Props = {
  onClickCloseIcon: () => void;
  // expo-routerのoptionsの型定義が見つからず．．．
  options: any;
};

export const VerticalStackHeader = ({ onClickCloseIcon, options }: Props) => {
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <XStack alignItems="center" justifyContent="space-between">
        <TouchableOpacity onPress={onClickCloseIcon}>
          <IoniconsIcon name="close" color={'black'} size={36} />
        </TouchableOpacity>
        {options.title && (
          <Text fontSize={16} fontWeight={'bold'}>
            {options.title}
          </Text>
        )}
        {options.headerRight ? options.headerRight() : options.title && <View width={36} />}
      </XStack>
    </SafeAreaView>
  );
};
