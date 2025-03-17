import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet } from 'react-native';
import { COLORS } from '@global';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
  opacity?: number;
}) {
  return <MaterialCommunityIcons size={28} {...props} />;
}

function InitialPage() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background_secondary} />

      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background_secondary,
          },
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
        }}>
        <Tabs.Screen
          name="album"
          options={{
            title: 'Albums',
            headerShown: false,
            tabBarIcon: ({ color }) => <TabBarIcon name="folder-music" color={color} />,
          }}
        />
        <Tabs.Screen
          name="music-player"
          options={{
            title: 'Music Player',
            tabBarIcon: ({ color }) => <TabBarIcon name="account-music" color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <TabBarIcon name="heart-settings" color={color} />,
          }}
        />
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
