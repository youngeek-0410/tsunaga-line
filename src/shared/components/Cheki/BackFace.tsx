import { router } from 'expo-router';
import { Avatar, Button, Stack, Text, XStack } from 'tamagui';

type BackFaceProps = {
  uuid: string | undefined;
  members: Member[];
};

type Member = {
  uuid: string;
  screenName: string;
  iconUrl?: string | null | undefined;
};

export const BackFace = ({ uuid, members }: BackFaceProps) => {
  return (
    <Stack padding="$5" width={'90%'} height={'100%'} backgroundColor={'white'}>
      <Stack gap="$3" position="relative">
        <Text fontSize="$6">思い出のメンバー</Text>

        {/* TODO: Overflow handling */}
        {/* Members List */}
        <Stack gap="$3">
          {members.map((member) => {
            const iconUrl =
              member.iconUrl ??
              'https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80';
            // member
            return (
              <XStack gap="$2" key={member.uuid} alignItems="center">
                <Avatar circular={true} size="$3">
                  <Avatar.Image accessibilityLabel="Cam" src={iconUrl} />
                  <Avatar.Fallback backgroundColor="$blue10" />
                </Avatar>
                <Text fontSize="$5">{member.screenName}</Text>
              </XStack>
            );
          })}
        </Stack>
      </Stack>

      {/* 詳細 */}
      <Button
        onPress={() => {
          router.navigate(`/(app)/(tabs)/memory/${uuid}`);
        }}
        position="absolute"
        right="$4"
        bottom="$4"
      >
        <Text>詳細を見る</Text>
      </Button>
    </Stack>
  );
};
