import { config as configV3 } from '@tamagui/config/v3';
import { createTokens } from 'tamagui';
import { gray } from './colorPalette/gray';

const tamaguiTokensColor = configV3.tokens.color;

const color = {
  ...tamaguiTokensColor,
  ...gray,
  secondary: '#7F9CF5',
};

// color以外も定義しないと型エラー出る
export const tokens = createTokens({
  ...configV3.tokens,
  color: { ...tamaguiTokensColor, ...color },
});
