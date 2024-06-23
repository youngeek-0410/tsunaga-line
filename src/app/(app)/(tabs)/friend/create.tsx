import type { paths } from '@/fetcher/openapi-generated';
import { useAuthClientOF } from '@/fetcher/useOpenapiFetchClient';
import { useCreateProfileForm } from '@/forms/profile/create';
import { ErrorMessageText } from '@/shared/components/common/Text';
import { ProfileIconPicker } from '@/shared/components/form/ProfileIconPicker';
import { RHFErrorMessage } from '@/shared/components/form/RHFErrorMessage';
import type { NativeFile } from '@/shared/types/File';
import { useNavigation, useRouter } from 'expo-router';
import mime from 'mime';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useMutation, useQueryClient } from 'react-query';
import { Input, Label, Text, TextArea, YStack } from 'tamagui';

type PostProfileBody =
  paths['/api/v1/profiles/']['post']['requestBody']['content']['multipart/form-data'];

export default function FriendCreate() {
  const router = useRouter();
  const [image, setImage] = useState<NativeFile>({ name: '', type: '', uri: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const { setOptions } = useNavigation();
  const {
    control,
    formState: { errors, isValid },
    getValues,
  } = useCreateProfileForm();

  const client = useAuthClientOF();
  const queryClient = useQueryClient();
  const createProfile = useMutation(
    (body: PostProfileBody) =>
      client.POST('/api/v1/profiles/', {
        body,
        bodySerializer: (body) => {
          const fd = new FormData();
          const uri = body.icon;
          const data = JSON.stringify(body.data);

          if (uri) {
            fd.append('icon', {
              uri,
              name: uri?.split('/').pop(),
              type: mime.getType(uri as string),
            } as any);
          }
          fd.append('data', data);

          return fd;
        },
      }),
    {
      onSuccess: () => {
        // TODO: キャッシュキーをいい感じにまとめておきたい
        queryClient.invalidateQueries(['profiles']);
        router.back();
      },
      onError: () => {
        setErrorMessage('エラーが発生しました。もう一度お試しください。');
      },
    },
  );
  useEffect(() => {
    setOptions({
      headerRight: () => {
        return (
          <Text
            fontSize={16}
            color={'$secondary'}
            opacity={isValid ? 1 : 0.5}
            fontWeight={'bold'}
            onPress={() => {
              if (isValid) {
                createProfile.mutate({
                  data: {
                    screenName: getValues('screenName'),
                    memo: getValues('memo'),
                  },
                  icon: image.uri,
                });
              }
            }}
          >
            保存
          </Text>
        );
      },
    });
  }, [setOptions, createProfile, getValues, isValid, image]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <YStack px={32} mt={32} alignItems="center" gap={8}>
        <ProfileIconPicker image={image} setImage={setImage} profileIconUrl="" />
        {errorMessage && <ErrorMessageText>{errorMessage}</ErrorMessageText>}
        <YStack width={'100%'}>
          <Label fontSize={16} fontWeight={'bold'} htmlFor="name">
            名前
          </Label>
          <Controller
            name="screenName"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                id="name"
                placeholder="なかちゃん"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <RHFErrorMessage name="screenName" errors={errors} />
        </YStack>
        <YStack width={'100%'}>
          <Label fontSize={16} fontWeight={'bold'} htmlFor="memo">
            メモ
          </Label>
          <Controller
            name="memo"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextArea
                id="memo"
                placeholder="彼はギークです"
                numberOfLines={10}
                size={'$4'}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </YStack>
      </YStack>
    </TouchableWithoutFeedback>
  );
}
