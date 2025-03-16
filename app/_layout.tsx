import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GradientWrapper } from '@components';
import { ThemeConfig } from '@configs';
import { PermissionContextProvider, usePermissionContext } from '@context';
import { useMusicManagerStore, useMusicPlayerStore } from '@store';

SplashScreen.preventAutoHideAsync();

function InitialPage() {
  const [loaded, error] = useFonts({
    Kegina: require('../assets/fonts/Kegina.otf'),
  });
  const restorePlayerState = useMusicPlayerStore(state => state.restorePlayerState);
  const restoreManagerState = useMusicManagerStore(state => state.restoreManagerState);
  const { mediaPermissionGranted } = usePermissionContext();

  useEffect(() => {
    const initialize = async () => {
      restorePlayerState();
      restoreManagerState();
      SplashScreen.hideAsync();
    };

    if (!mediaPermissionGranted) {
      return;
    }

    if (loaded || error) {
      initialize();
    }
  }, [loaded, error, restorePlayerState, restoreManagerState, mediaPermissionGranted]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayoutNav() {
  return (
    <SafeAreaProvider>
      <PermissionContextProvider>
        <NativeBaseProvider theme={ThemeConfig}>
          <GradientWrapper>
            <InitialPage />
          </GradientWrapper>
        </NativeBaseProvider>
      </PermissionContextProvider>
    </SafeAreaProvider>
  );
}
