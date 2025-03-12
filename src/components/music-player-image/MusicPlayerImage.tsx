import { Image, StyleSheet } from 'react-native';

export function MusicPlayerImage() {
  return <Image source={require('../../assets/avatars/avatar_2.png')} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
  },
});
