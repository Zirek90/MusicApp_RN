import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { COLORS } from '@global';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  color: string;
  opacity?: number;
}) {
  return <MaterialCommunityIcons size={28} style={{ marginBottom: -3 }} {...props} />;
}

function InitialPage() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background_secondary} />

      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background_secondary,
          },
          headerTitleAlign: 'center',
          headerTintColor: COLORS.white,
          tabBarStyle: {
            backgroundColor: COLORS.black,
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
