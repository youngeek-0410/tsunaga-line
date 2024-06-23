import { MaterialCommunityIcons } from '@/shared/components/Icon';
import { useAuthClient } from '@/shared/hooks/useAuthClient';
import { useAspidaQuery } from '@aspida/react-query';
import QRCodeStyled from 'react-native-qrcode-styled';
import { Spinner, Text, View, XStack, YStack, getToken } from 'tamagui';

export default function ProfileShare() {
  const client = useAuthClient();
  const { data: me, isLoading } = useAspidaQuery(client.api.v1.profiles.me);

  return me && !isLoading ? (
    <YStack alignItems="center" justifyContent="center" flex={1} gap={16}>
      <View
        borderRadius={'$3'}
        backgroundColor={'white'}
        shadowColor={'black'}
        shadowOffset={{ width: 5, height: 5 }}
        shadowOpacity={0.1}
        shadowRadius={100}
        padding={30}
        height={300}
        width={250}
        alignItems="center"
        justifyContent="space-around"
      >
        <QRCodeStyled
          // Expo Go と buildしたときの条件分岐必要
          data={`exp://192.168.11.4:8081/--/profile-link?username=${me.linkedUser?.username}`}
          style={{ backgroundColor: 'white' }}
          pieceSize={5}
          pieceBorderRadius={4}
          isPiecesGlued={true}
          color={getToken('$secondary', 'color')}
          preserveAspectRatio="none"
        />
        <Text fontSize={24} fontWeight={'bold'}>
          {me.screenName}
        </Text>
      </View>
      <XStack justifyContent="space-between" width={250}>
        <YStack
          width={'40%'}
          p={8}
          borderRadius={'$3'}
          backgroundColor={'white'}
          shadowColor={'black'}
          shadowOffset={{ width: 5, height: 5 }}
          shadowOpacity={0.1}
          shadowRadius={100}
          alignItems="center"
          gap={4}
        >
          <MaterialCommunityIcons name="link-variant" color={'black'} size={32} />
          <Text fontSize={12}>リンクをコピー</Text>
        </YStack>
        <YStack
          width={'40%'}
          p={8}
          borderRadius={'$3'}
          backgroundColor={'white'}
          shadowColor={'black'}
          shadowOffset={{ width: 5, height: 5 }}
          shadowOpacity={0.1}
          shadowRadius={100}
          alignItems="center"
          gap={4}
        >
          <MaterialCommunityIcons name="qrcode-scan" color={'black'} size={32} />
          <Text fontSize={12}>QRスキャン</Text>
        </YStack>
      </XStack>
    </YStack>
  ) : (
    <Spinner />
  );
}
