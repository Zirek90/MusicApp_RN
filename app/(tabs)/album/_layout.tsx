import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SongHeader } from '../../../src/components/header';
import { GradientWrapper } from '@components';
import { typography } from '@configs';
import { COLORS } from '@global';

const SCREEN_OPTIONS = {
  animation: 'slide_from_right',
  headerShadowVisible: false,
  headerStyle: { backgroundColor: COLORS.black },
} as const;

function AlbumsHeaderTitle() {
  return (
    <View style={styles.headerTitle}>
      <MaterialIcons name="music-note" size={24} color={COLORS.white} />
      <Text style={[typography.base, typography.xl, typography.semibold, styles.headerLabel]}>
        MusicPlayer
      </Text>
    </View>
  );
}

const ALBUMS_OPTIONS = { title: 'Albums', headerTitle: AlbumsHeaderTitle };

const albumDetailsOptions = ({ route }: { route: { params?: { albumId?: string } } }) => ({
  title: '',
  headerTintColor: COLORS.white,
  headerTitle: () => <SongHeader albumId={route.params?.albumId} />,
});

function InitialPage() {
  return (
    <Stack screenOptions={SCREEN_OPTIONS}>
      <Stack.Screen name="index" options={ALBUMS_OPTIONS} />
      <Stack.Screen name="[albumId]" options={albumDetailsOptions} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <GradientWrapper>
      <InitialPage />
    </GradientWrapper>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLabel: {
    marginLeft: 4,
  },
});
