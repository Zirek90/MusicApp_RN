import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ColorValue, StatusBar, StyleSheet } from 'react-native';
import { COLORS } from '@global';

type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

const SCREEN_OPTIONS = {
  headerStyle: { backgroundColor: COLORS.background_secondary },
  headerTitleAlign: 'center',
  headerTintColor: COLORS.white,
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: COLORS.black_transparent_primary,
    marginHorizontal: 10,
    marginBottom: 5,
    borderRadius: 20,
    height: 60,
    borderTopWidth: 0,
    elevation: 15,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 5 },
  },
} as const;

function TabIcon({ name, color }: { name: IconName; color: ColorValue }) {
  return <MaterialCommunityIcons size={28} name={name} color={color as string} />;
}

const AlbumTabIcon = ({ color }: { color: ColorValue }) => (
  <TabIcon name="folder-music" color={color} />
);
const PlayerTabIcon = ({ color }: { color: ColorValue }) => (
  <TabIcon name="account-music" color={color} />
);
const SettingsTabIcon = ({ color }: { color: ColorValue }) => (
  <TabIcon name="heart-settings" color={color} />
);

const ALBUM_OPTIONS = { title: 'Albums', headerShown: false, tabBarIcon: AlbumTabIcon };
const PLAYER_OPTIONS = { title: 'Music Player', tabBarIcon: PlayerTabIcon };
const SETTINGS_OPTIONS = { title: 'Settings', tabBarIcon: SettingsTabIcon };

function InitialPage() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background_secondary} />

      <Tabs screenOptions={SCREEN_OPTIONS}>
        <Tabs.Screen name="album" options={ALBUM_OPTIONS} />
        <Tabs.Screen name="music-player" options={PLAYER_OPTIONS} />
        <Tabs.Screen name="settings" options={SETTINGS_OPTIONS} />
      </Tabs>
    </SafeAreaView>
  );
}

export default function RootLayout() {
  return <InitialPage />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
