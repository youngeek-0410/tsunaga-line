import { IoniconsIcon } from '@/shared/components/Icon';
import { useAfterInteractions } from '@/shared/hooks/useAfterInteractions';
import { Check as CheckIcon } from '@tamagui/lucide-icons';
import { useNavigation, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Checkbox,
  Circle,
  Input,
  Label,
  ScrollView,
  Sheet,
  Text,
  XStack,
  YStack,
  getToken,
} from 'tamagui';

export default function MemberSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const { setOptions } = useNavigation();
  const router = useRouter();
  const isAfterInteractions = useAfterInteractions();

  // navigatorのコンポーネントをScreen内で定義
  useEffect(() => {
    setOptions({
      headerRight: () => {
        return (
          <Text
            fontSize={16}
            color={'$secondary'}
            fontWeight={'bold'}
            onPress={() => {
              router.back();
            }}
          >
            保存
          </Text>
        );
      },
    });
  }, [setOptions, router]);

  return (
    <>
      {isAfterInteractions ? (
        <YStack px={24} mt={16} gap={24} flexGrow={1}>
          <Input placeholder="検索" />
          <Button backgroundColor={'$secondary'} onPress={() => setIsOpen(true)} color={'white'}>
            新しいプロフィールを作成する
          </Button>
          <ScrollView overflow="visible" horizontal={true}>
            <XStack gap={16}>
              {[...Array(5)].map(() => (
                // eslint-disable-next-line react/jsx-key
                <SelectedMemberIcon />
              ))}
            </XStack>
          </ScrollView>
          <YStack gap={8} height={'68%'}>
            <Text>メンバープロフィール</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
              <YStack gap={16}>
                {[...Array(10)].map((_, i) => (
                  // eslint-disable-next-line react/jsx-key
                  <MemberCheckbox id={String(i)} />
                ))}
              </YStack>
            </ScrollView>
          </YStack>
        </YStack>
      ) : (
        <Text>Loading</Text>
      )}
      <Sheet
        snapPoints={[85, 50]}
        open={isOpen}
        forceRemoveScrollEnabled={isOpen}
        onOpenChange={setIsOpen}
        dismissOnSnapToBottom={true}
      >
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame p={16}>
          <YStack gap={32}>
            <YStack>
              <Label fontWeight={'bold'}>名前</Label>
              <Input placeholder="仲ちゃん" />
            </YStack>
            <Button
              fontSize={16}
              fontWeight={'bold'}
              backgroundColor={'$secondary'}
              color={'white'}
              onPress={() => {
                setIsOpen(false);
              }}
            >
              作成する
            </Button>
          </YStack>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}

const MemberCheckbox = ({ id }: { id: string }) => {
  return (
    <XStack alignItems="center" justifyContent="space-between">
      <Label htmlFor={id} flex={1}>
        <XStack alignItems="center" gap={8}>
          <Avatar circular={true} size={48}>
            <Avatar.Image
              accessibilityLabel="Cam"
              src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
            />
            <Avatar.Fallback backgroundColor="$blue10" />
          </Avatar>
          <Text fontSize={16} fontWeight={'bold'}>
            仲ちゃん
          </Text>
        </XStack>
      </Label>
      <Checkbox id={id} size={'$5'}>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox>
    </XStack>
  );
};

const SelectedMemberIcon = () => {
  return (
    <YStack alignItems="center" pos={'relative'}>
      <IoniconsIcon
        name="close-outline"
        size={16}
        color={getToken('$gray7', 'color')}
        style={{ position: 'absolute', top: 2, right: 1, zIndex: 2 }}
      />
      <Circle
        size={20}
        pos={'absolute'}
        backgroundColor={'$gray1'}
        top={0}
        right={0}
        zIndex={1}
        opacity={0.8}
      />
      <Avatar circular={true} size={48}>
        <Avatar.Image
          accessibilityLabel="Cam"
          src="https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80"
        />
        <Avatar.Fallback backgroundColor="$blue10" />
      </Avatar>
      <Text fontSize={12}>仲ちゃん</Text>
    </YStack>
  );
};
