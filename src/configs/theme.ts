import { StyleSheet } from 'react-native';
import { COLORS } from '@global';

export const FONT_FAMILY = 'PlayfairDisplay';

export const typography = StyleSheet.create({
  base: { color: COLORS.white, fontFamily: FONT_FAMILY },
  xs: { fontSize: 12 },
  sm: { fontSize: 14 },
  md: { fontSize: 16 },
  lg: { fontSize: 18 },
  xl: { fontSize: 20 },
  xxl: { fontSize: 24 },
  xxxl: { fontSize: 30 },
  semibold: { fontWeight: '600' },
  bold: { fontWeight: '700' },
});
