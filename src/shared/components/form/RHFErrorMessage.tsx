import { ErrorMessage } from '@hookform/error-message';
import { Text } from 'tamagui';

type FormErrorProps = {
  name: string;
  errors: any;
};

export const RHFErrorMessage = ({ name, errors }: FormErrorProps) => {
  return (
    <ErrorMessage
      name={name}
      errors={errors}
      render={({ message }) => (
        <Text color={'red'} fontSize={16}>
          {message}
        </Text>
      )}
    />
  );
};
