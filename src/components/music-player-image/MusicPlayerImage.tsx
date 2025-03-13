import React from 'react';
import { Box, Image } from 'native-base';
import { StyleSheet } from 'react-native';
import { COLORS } from '@global';

export function MusicPlayerImage() {
  return (
    <Box>
      <Image
        alt="album-image"
        source={require('../../assets/avatars/avatar_2.png')}
        style={styles.image}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: COLORS.gray_secondary,
  },
});
