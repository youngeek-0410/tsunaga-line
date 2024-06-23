import { type ReactElement, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'tamagui';

type FlippableCardProps = {
  children: ReactElement[];
};

export const FlippableCard = ({ children: [FrontFace, BackFace, ..._] }: FlippableCardProps) => {
  const [animatedValue] = useState(new Animated.Value(0));
  let value = 0;

  animatedValue.addListener(({ value: v }) => {
    value = v;
  });

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  const flipCard = () => {
    if (value >= 90) {
      Animated.spring(animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  //   // fixme: style props for sync
  //   const styleProps = {
  //     cardWidth: '90%',
  //   };

  return (
    <View>
      <TouchableOpacity onPress={flipCard}>
        <Animated.View style={[flipCardStyles.flipCard, frontAnimatedStyle]}>
          {FrontFace}
        </Animated.View>
        <Animated.View
          style={[flipCardStyles.flipCard, flipCardStyles.flipCardBack, backAnimatedStyle]}
        >
          {BackFace}
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const flipCardStyles = StyleSheet.create({
  flipCard: {
    alignItems: 'center',
    justifyContent: 'center',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
  },
});
