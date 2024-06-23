import type React from 'react';
import { Spinner, Text } from 'tamagui';

export const withFetchingState = <T,>(Component: React.ComponentType<T>) => {
  const f = ({ isLoading, data, error }: { isLoading: boolean; data: T; error: unknown }) => {
    if (isLoading) {
      return <Spinner />;
    }
    if (error) {
      return <Text>Error</Text>;
    }
    if (!data) {
      return <Text>No contents</Text>;
    }

    return <Component {...data} />;
  };
  return f;
};
