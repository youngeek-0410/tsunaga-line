import { FilmFrameCard } from '@/features/quest/achive/components/FilmFrameCard';
import { SecondaryColorButton } from '@/shared/components/common/Button';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { MotiView } from 'moti';
import { Dimensions, SafeAreaView } from 'react-native';
import { Text } from 'tamagui';

export default function Hot() {
  const windowW = Dimensions.get('window').width;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* fourth animation */}
      <MotiView
        from={{ transform: [{ translateY: 0 }], opacity: 1 }}
        animate={{ transform: [{ translateY: 3000 }], opacity: 0.3 }}
        transition={{
          type: 'timing',
          delay: 5000,
          duration: 2000,
          opacity: { type: 'spring', delay: 6000 },
        }}
      >
        {/* third animation */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ type: 'timing', delay: 4000, duration: 800 }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <FilmFrameCard
              key={i.toString()}
              alignItems="center"
              justifyContent="space-between"
              source={{ uri: 'https://i.postimg.cc/7L9PVQJL/image-9.png' }}
              styleProps={{ imageWidth: windowW * 0.7 }}
            />
          ))}
        </MotiView>
        {/* first animation */}
        <MotiView
          from={{ transform: [{ translateY: -500 }], opacity: 0 }}
          animate={{ transform: [{ translateY: 0 }], opacity: 1 }}
          transition={{
            type: 'timing',
            duration: 2000,
            transform: { type: 'timing', delay: 2000, duration: 1000 },
          }}
        >
          <FilmFrameCard
            alignItems="center"
            justifyContent="space-between"
            source={{ uri: 'https://i.postimg.cc/7L9PVQJL/image-9.png' }}
            styleProps={{ imageWidth: windowW * 0.7 }}
          />
        </MotiView>
        {/* second animation */}
        {/* third animation */}
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ type: 'timing', delay: 4000, duration: 800 }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <FilmFrameCard
              key={i.toString()}
              alignItems="center"
              justifyContent="space-between"
              source={{ uri: 'https://i.postimg.cc/7L9PVQJL/image-9.png' }}
              styleProps={{ imageWidth: windowW * 0.7 }}
            />
          ))}
        </MotiView>
      </MotiView>
      {/* fifth animation */}
      <MotiView
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: '30%',
          zIndex: 3,
          width: windowW * 0.8,
          height: windowW,
          padding: 32,
          backgroundColor: 'white',
          borderRadius: 10,
        }}
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          type: 'timing',
          delay: 7000,
          duration: 800,
        }}
      >
        <Text fontWeight={'bold'}>また一つ思い出がつながりました！</Text>
        <LottieView
          autoPlay={true}
          loop={true}
          style={{ width: windowW * 0.5, height: windowW * 0.5 }}
          source={{
            uri: 'https://lottie.host/fea7c684-00cb-4360-827e-2c9187f5b7de/qrl9fupLXF.json',
          }}
        />
        <SecondaryColorButton
          w={'100%'}
          fontWeight={'bold'}
          onPress={() => {
            router.push('/(app)/(tabs)/memory');
          }}
        >
          ホームに戻る
        </SecondaryColorButton>
      </MotiView>
    </SafeAreaView>
  );
}
