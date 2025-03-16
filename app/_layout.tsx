import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GradientWrapper } from '@components';
import { ThemeConfig } from '@configs';
import { PermissionContextProvider } from '@context';
import { useMusicManagerStore, useMusicPlayerStore } from '@store';

SplashScreen.preventAutoHideAsync();
// TODO figure out how to set custom splash screen, for now it is taken from icon

function InitialPage() {
  const [loaded, error] = useFonts({
    PlayfairDisplay: require('../assets/fonts/PlayfairDisplay.ttf'),
  });
  const restorePlayerState = useMusicPlayerStore(state => state.restorePlayerState);
  const restoreManagerState = useMusicManagerStore(state => state.restoreManagerState);

  useEffect(() => {
    const initialize = async () => {
      restorePlayerState();
      restoreManagerState();
      SplashScreen.hideAsync();
    };

    if (loaded || error) {
      initialize();
    }
  }, [loaded, error, restorePlayerState, restoreManagerState]);

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
