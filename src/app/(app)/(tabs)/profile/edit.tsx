import type { paths } from '@/fetcher/openapi-generated';
import { useAuthClientOF } from '@/fetcher/useOpenapiFetchClient';
import { useUpdateProfileForm } from '@/forms/profile/edit';
import { ErrorMessageText } from '@/shared/components/common/Text';
import { ProfileIconPicker } from '@/shared/components/form/ProfileIconPicker';
import { RHFErrorMessage } from '@/shared/components/form/RHFErrorMessage';
import type { NativeFile } from '@/shared/types/File';
import { router, useNavigation } from 'expo-router';
import mime from 'mime';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Input, Label, Spinner, Text, YStack } from 'tamagui';

type PutProfileBody =
  paths['/api/v1/profiles/{uuid}/']['put']['requestBody']['content']['application/json'];

export default function ProfileEdit() {
  const [errorMessage, setErrorMessage] = useState('');
  const [image, setImage] = useState<NativeFile>({ name: '', type: '', uri: '' });

  const client = useAuthClientOF();
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profiles', 'me'],
    queryFn: () => client.GET('/api/v1/profiles/me/').then((res) => res.data),
  });
  const queryClient = useQueryClient();
  const updateProfile = useMutation(
    (body: PutProfileBody) =>
      client.PUT('/api/v1/profiles/{uuid}/', {
        params: { path: { uuid: profile?.uuid as string } },
        body,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['profiles', 'me']);
      },
      onError: () => {
        setErrorMessage('エラーが発生しました。もう一度お試しください。');
      },
    },
  );
  const updateProfileIcon = useMutation(
    (body: { icon: string }) =>
      client.PUT('/api/v1/profiles/{uuid}/icon/', {
        params: { path: { uuid: profile?.uuid as string } },
        body,
        bodySerializer: (body) => {
          const fd = new FormData();
          const uri = body?.icon;

          if (uri) {
            fd.append('icon', { uri, name: uri.split('/').pop(), type: mime.getType(uri) } as any);
          }

          return fd;
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['profiles', 'me']);
      },
      onError: () => {
        setErrorMessage('エラーが発生しました。もう一度お試しください。');
      },
    },
  );

  const {
    control,
    formState: { errors },
    getValues,
  } = useUpdateProfileForm({ screenName: profile?.screenName as string });

  const { setOptions } = useNavigation();
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
                linkUserUsername: profile?.linkedUser?.username,
              });
              if (image.uri.length !== 0) {
                updateProfileIcon.mutate({ icon: image.uri });
              }
              router.back();
            }}
          >
            保存
          </Text>
        );
      },
    });
  }, [setOptions, updateProfile, getValues, profile, image, updateProfileIcon]);

  return profile && !isLoading ? (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <YStack px={32} mt={32} alignItems="center" gap={8} justifyContent="center" h={'50%'}>
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
                defaultValue={profile.screenName}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <RHFErrorMessage name="screenName" errors={errors} />
        </YStack>
      </YStack>
    </TouchableWithoutFeedback>
  ) : (
    <Spinner mt={50} />
  );
}
