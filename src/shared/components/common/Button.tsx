import { Button, type GetProps, styled } from 'tamagui';

export const SecondaryColorButton = styled(Button, {
  name: 'SecondaryColorButton',
  color: 'white',
  backgroundColor: '$secondary',
  disabledStyle: {
    opacity: 0.5,
  },
});

export const GrayButton = styled(Button, {
  name: 'GrayButton',
  color: 'black',
  backgroundColor: '$gray3',
  disabledStyle: {
    opacity: 0.5,
  },
  fontWeight: 'bold',
});

export type SecondaryColorButtonProps = GetProps<typeof SecondaryColorButton>;
