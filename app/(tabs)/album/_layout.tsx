import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { View, Text } from 'native-base';
import { SongHeader } from '../../../src/components/header';
import { GradientWrapper } from '@components';
import { COLORS } from '@global';

function InitialPage() {
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_right',
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
            <View flexDirection="row" alignItems="center">
              <MaterialIcons name="music-note" size={24} color="white" />
              <Text fontSize="xl" fontWeight={600} marginLeft={1}>
                MusicPlayer
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="[albumId]"
        options={({ route }: { route: { params?: { albumId?: string } } }) => ({
          title: '', //* Keep it empty as otherwise on return title appears, if remove totally then shows [albumId]
          headerTintColor: COLORS.white,
          headerTitle: () => <SongHeader albumId={route.params?.albumId!} />,
        })}
      />
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
