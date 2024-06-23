import type { paths } from '@/fetcher/openapi-generated';
import { useAuthClientOF } from '@/fetcher/useOpenapiFetchClient';
import { BackFace } from '@/shared/components/Cheki/BackFace';
import { FrontFace } from '@/shared/components/Cheki/FrontFace';
import { FlippableCard } from '@/shared/components/FlippableCard';
import { MaterialCommunityIcons } from '@/shared/components/Icon';
import { ArrowLeft } from '@tamagui/lucide-icons';
import { router } from 'expo-router';
import mime from 'mime';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { Button, Sheet, Text, XStack } from 'tamagui';

export const usePreviewModal = (initialIsOpen = false) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  const previewModal = (memoryInfo: MemoryInfo) => (
    <PreviewModal isOpen={isOpen} setIsOpen={setIsOpen} memoryInfo={memoryInfo} />
  );

  return { isOpen, setIsOpen, previewModal };
};

type MemoryInfo = {
  imageUri: string;
  caption: string;
  timeLabel: string;
  members: {
    uuid: string;
    screenName: string;
    iconUrl?: string | null | undefined;
  }[];
};

type PreviewModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  memoryInfo: MemoryInfo;
};

type PostImageMemoryBody =
  paths['/api/v1/image-memories/']['post']['requestBody']['content']['multipart/form-data'];

const PreviewModal = ({ isOpen, setIsOpen, memoryInfo }: PreviewModalProps) => {
  const { imageUri: photoUri, caption, timeLabel, members } = memoryInfo;
  const client = useAuthClientOF();

  const createMemory = useMutation(
    (body: PostImageMemoryBody) =>
      client.POST('/api/v1/image-memories/', {
        body,
        bodySerializer: (body) => {
          const fd = new FormData();

          const uri = body.image;

          fd.append('image', {
            uri,
            name: uri.split('/').pop(),
            type: mime.getType(uri),
          } as any);

          fd.append('data', JSON.stringify(body.data));

          return fd;
        },
      }),
    {
      onSuccess: () => {
        alert('投稿しました！');
        router.back();
        router.replace('/feed');
      },
      onError: (e) => {
        console.error(e);
      },
    },
  );

  return (
    <Sheet
      snapPoints={[92, 50]}
      open={isOpen}
      onOpenChange={setIsOpen}
      modal={true}
      dismissOnSnapToBottom={true} // 下にスワイプで閉じる
    >
      <Sheet.Overlay />
      <Sheet.Handle />
      <Sheet.Frame paddingHorizontal="$2" paddingVertical={16} backgroundColor="$gray2">
        {/* Cross button */}
        <XStack paddingHorizontal="$3" alignItems="center">
          <Button
            unstyled={true}
            onPress={() => {
              setIsOpen(false);
            }}
          >
            <MaterialCommunityIcons size={36} name="close" color="black" />
          </Button>
        </XStack>

        {/* ChekiCard preview */}
        <FlippableCard>
          <FrontFace
            {...{ caption, timeLabel, styleProps: { cardWidth: '90%' } }}
            imageUri={photoUri}
          />
          <BackFace {...{ members }} />
        </FlippableCard>

        <XStack padding="$4" justifyContent="space-between">
          {/* Back Button */}
          <Button
            icon={<ArrowLeft size={16} />}
            onPress={() => {
              setIsOpen(false);
            }}
          >
            <Text>もどる</Text>
          </Button>
          <Button
            backgroundColor="$secondary"
            onPress={async () => {
              createMemory.mutate({
                image: photoUri,
                data: {
                  caption,
                  timeLabel,
                  memberProfiles: members.map(({ uuid }) => uuid),
                  description: '',
                },
              });
            }}
          >
            <Text fontWeight="bold" color="white">
              投稿する！
            </Text>
          </Button>
        </XStack>
      </Sheet.Frame>
    </Sheet>
  );
};
