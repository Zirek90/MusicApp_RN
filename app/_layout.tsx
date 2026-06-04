import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GradientWrapper } from '@components';
import { PermissionContextProvider } from '@context';
import { useMusicManagerStore, useMusicPlayerStore } from '@store';

SplashScreen.preventAutoHideAsync();

const FONTS = { PlayfairDisplay: require('../assets/fonts/PlayfairDisplay.ttf') };
const STACK_OPTIONS = { headerShown: false };

function InitialPage() {
  const [loaded, error] = useFonts(FONTS);
  const restorePlayerState = useMusicPlayerStore(state => state.restorePlayerState);
  const restoreManagerState = useMusicManagerStore(state => state.restoreManagerState);

  useEffect(() => {
    if (!loaded && !error) return;
    restorePlayerState();
    restoreManagerState();
    SplashScreen.hideAsync();
  }, [loaded, error, restorePlayerState, restoreManagerState]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack screenOptions={STACK_OPTIONS}>
      <Stack.Screen name="(tabs)" options={STACK_OPTIONS} />
    </Stack>
  );
}

export default function RootLayoutNav() {
  return (
    <SafeAreaProvider>
      <PermissionContextProvider>
        <GradientWrapper>
          <InitialPage />
        </GradientWrapper>
      </PermissionContextProvider>
    </SafeAreaProvider>
  );
}
