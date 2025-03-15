import { PropsWithChildren } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { COLORS } from '@global';

export function GradientWrapper({ children }: PropsWithChildren) {
  return (
    <LinearGradient
      style={styles.container}
      colors={[
        COLORS.gradient_background_primary,
        COLORS.gradient_background_secondary,
        COLORS.gradient_background_primary,
      ]}>
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
