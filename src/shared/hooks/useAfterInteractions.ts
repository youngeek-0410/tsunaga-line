import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

export const useAfterInteractions = () => {
  const [isEndTransition, setIsEndTransition] = useState(false);
  useFocusEffect(
    useCallback(() => {
      // Transitionを終えてから遷移するやつはうまくいかなかった．
      setTimeout(() => setIsEndTransition(true), 50);
    }, []),
  );

  return isEndTransition;
};
