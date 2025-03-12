import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { SongHeader } from '../../../src/components/header/song-header';
import { COLORS } from '@global';

function InitialPage() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: COLORS.black,
        },
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Albums',

          headerTitle: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialIcons name="music-note" size={24} color="white" />
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 8 }}>
                MusicPlayer
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="[albumId]"
        options={({ route }: { route: { params?: { albumId?: string } } }) => ({
          title: 'Songs',
          headerBackButtonMenuEnabled: true,
          headerTintColor: COLORS.white,
          headerTitle: () => <SongHeader albumId={route.params?.albumId!} />,
        })}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return <InitialPage />;
}
