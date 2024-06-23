import {
  FontAwesome5Icon,
  FontAwesomeIcon,
  MaterialCommunityIcons,
} from '@/shared/components/Icon';
import { XStack } from 'tamagui';

export const FooterMenu = () => {
  return (
    <XStack
      justifyContent="space-around"
      p={'$2'}
      mb={'$5'}
      borderTopWidth={'1px'}
      borderColor={'$gray4'}
    >
      <MaterialCommunityIcons name="home-variant-outline" size={24} />
      <FontAwesome5Icon name="fire-alt" size={24} />
      <FontAwesomeIcon name="flag-o" size={24} />
    </XStack>
  );
};
