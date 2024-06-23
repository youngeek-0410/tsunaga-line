import type { paths } from '@/fetcher/openapi-generated';
import { useAuthClientOF } from '@/fetcher/useOpenapiFetchClient';
import { useUpdateProfileForm } from '@/forms/profile/edit';
import { ErrorMessageText } from '@/shared/components/common/Text';
import { ProfileIconPicker } from '@/shared/components/form/ProfileIconPicker';
import { RHFErrorMessage } from '@/shared/components/form/RHFErrorMessage';
import type { NativeFile } from '@/shared/types/File';
import { useGlobalSearchParams, useNavigation, useRouter } from 'expo-router';
import mime from 'mime';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Input, Label, Spinner, Text, TextArea, YStack } from 'tamagui';

type PutProfileBody =
  paths['/api/v1/profiles/{uuid}/']['put']['requestBody']['content']['application/json'];

export default function FriendProfileId() {
  const router = useRouter();
  const { setOptions } = useNavigation();
  const { profileId } = useGlobalSearchParams();
  const [errorMessage, setErrorMessage] = useState('');

  const client = useAuthClientOF();
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', profileId],
    queryFn: () =>
      client
        .GET('/api/v1/profiles/{uuid}/', { params: { path: { uuid: profileId as string } } })
        .then((res) => res.data),
    enabled: !!profileId,
  });

  const [image, setImage] = useState<NativeFile>({ name: '', type: '', uri: '' });
  const {
    control,
    formState: { errors },
    getValues,
  } = useUpdateProfileForm({
    screenName: profile?.screenName as string,
    memo: profile?.memo as string,
  });

  const queryClient = useQueryClient();
  const updateProfile = useMutation(
    (body: PutProfileBody) =>
      client.PUT('/api/v1/profiles/{uuid}/', {
        body,
        params: { path: { uuid: profileId as string } },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['profiles']);
        queryClient.invalidateQueries(['profile', profileId]);
      },
      onError: () => {
        setErrorMessage('エラーが発生しました。もう一度お試しください。');
      },
    },
  );
  const uploadIcon = useMutation(
    (body: { icon: string }) =>
      client.PUT('/api/v1/profiles/{uuid}/icon/', {
        params: { path: { uuid: profileId as string } },
        body,
        bodySerializer: (body) => {
          const fd = new FormData();
          const uri = body?.icon;

          fd.append('icon', {
            uri,
            name: uri?.split('/').pop(),
            type: mime.getType(uri as string),
          } as any);

          return fd;
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['profiles']);
        queryClient.invalidateQueries(['profile', profileId]);
      },
      onError: () => {
        setErrorMessage('エラーが発生しました。もう一度お試しください。');
      },
    },
  );

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
              updateProfile.mutate({
                screenName: getValues('screenName'),
                memo: getValues('memo'),
                linkUserUsername: profile?.linkedUser?.username,
              });
              if (image.uri.length !== 0) {
                uploadIcon.mutate({ icon: image.uri });
              }
              router.back();
            }}
          >
            保存
          </Text>
        );
      },
    });
  }, [setOptions, updateProfile, getValues, profile, image, uploadIcon, router]);

  return profile && !isLoading ? (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <YStack px={32} mt={32} alignItems="center" gap={8}>
        <ProfileIconPicker
          image={image}
          setImage={setImage}
          profileIconUrl={profile.iconUrl ?? ''}
        />
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
                defaultValue={profile.screenName}
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
                defaultValue={profile.memo ?? undefined}
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
  ) : (
    <Spinner />
  );
}
