import { useFocusEffect } from 'expo-router';
import { useState } from 'react';

export const useIsFocused = () => {
  const [isFocused, setIsFocused] = useState(false);
  useFocusEffect(() => {
    setIsFocused(true);
    return () => setIsFocused(false);
  });
  return { isFocused };
};
