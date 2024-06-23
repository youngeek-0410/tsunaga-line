import { config as configV3 } from '@tamagui/config/v3';
import { createTamagui } from 'tamagui';
import { tokens } from './tokens';

const config = { ...configV3, tokens: tokens };
export const tamaguiConfig = createTamagui(config);
export default tamaguiConfig;
export type Conf = typeof tamaguiConfig;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
