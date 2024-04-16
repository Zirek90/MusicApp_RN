import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { NativeBaseProvider } from 'native-base';
import {
  AlbumsContextProvider,
  MusicContextProvider,
  PermissionContextProvider,
  ForeroundActivityProvider,
  BackgroundProvider,
} from '@context';
import { ThemeConfig } from '@configs';
import { useEffect } from 'react';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Kegina: require('../assets/fonts/Kegina.otf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <BackgroundProvider>
      <PermissionContextProvider>
        <AlbumsContextProvider>
          <MusicContextProvider>
            <ForeroundActivityProvider>
              <NativeBaseProvider theme={ThemeConfig}>
                <RootLayoutNav />
              </NativeBaseProvider>
            </ForeroundActivityProvider>
          </MusicContextProvider>
        </AlbumsContextProvider>
      </PermissionContextProvider>
    </BackgroundProvider>
  );
}

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
