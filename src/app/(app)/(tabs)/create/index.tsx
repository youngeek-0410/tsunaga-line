import { MaterialCommunityIcons } from '@/shared/components/Icon';
import { useIsFocused } from '@/shared/hooks/useIsFocused';
import { Camera, CameraType } from 'expo-camera/legacy';
import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Text } from 'react-native';
import { Button, View, XStack, YStack } from 'tamagui';

export default function App() {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const router = useRouter();

  // set camera instance (store Ref of Camera component)
  const [camera, setCamera] = useState<Camera | null>(null);

  const { isFocused } = useIsFocused();

  const toggleCameraType = useCallback(() => {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  }, []);

  if (!permission) {
    // Camera permissions are still loading
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View flex={1}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission}>Grant Permittion</Button>
      </View>
    );
  }

  return (
    <View width={'100%'} flex={1} alignItems="center" justifyContent="center">
      {
        isFocused && (
          <YStack gap="$5">
            <XStack width="95%" alignContent="flex-start">
              <Button
                unstyled={true}
                onPress={() => {
                  router.back();
                }}
              >
                <MaterialCommunityIcons size={50} name="close" color="white" />
              </Button>
            </XStack>

            <View alignSelf="center">
              {/* カメラ画面のアスペクト比 ration と、カメラ要素のアスペクト比を揃える */}
              <Camera
                type={type}
                ratio="1:1"
                style={{
                  width: '95%',
                  aspectRatio: '1',
                }}
                ref={(r) => {
                  setCamera(r);
                }}
              />
            </View>

            <XStack alignSelf="center" alignItems="center" gap="$7">
              {/* TODO: launch image picker */}
              <Button unstyled={true}>
                <MaterialCommunityIcons size={40} name="image" color={'white'} />
              </Button>

              {/* Shutter button */}
              <Button
                onPress={async () => {
                  // TODO: take photo
                  if (!camera) {
                    // unreachable
                    return null;
                  }
                  const picture = await camera.takePictureAsync();
                  router.navigate({
                    pathname: './create/info-input',
                    params: { photoUri: encodeURI(picture.uri) },
                  });
                }}
                unstyled={true}
              >
                <MaterialCommunityIcons size={100} name="circle-slice-8" color={'white'} />
              </Button>

              {/* toggle camera type (back/front) */}
              <Button onPress={toggleCameraType} unstyled={true}>
                <MaterialCommunityIcons size={40} name="autorenew" color={'white'} />
              </Button>
            </XStack>
          </YStack>
        )
      }
    </View>
  );
}
