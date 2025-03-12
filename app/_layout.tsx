import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeConfig } from '@configs';
import { PermissionContextProvider, BackgroundProvider } from '@context';

SplashScreen.preventAutoHideAsync();

function InitialPage() {
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
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayoutNav() {
  return (
    <SafeAreaProvider>
      <BackgroundProvider>
        <PermissionContextProvider>
          <NativeBaseProvider theme={ThemeConfig}>
            <InitialPage />
          </NativeBaseProvider>
        </PermissionContextProvider>
      </BackgroundProvider>
    </SafeAreaProvider>
  );
}
