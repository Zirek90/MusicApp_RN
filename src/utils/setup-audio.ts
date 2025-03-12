import { Audio, InterruptionModeIOS, InterruptionModeAndroid } from 'expo-av';

export const setupAudio = async () => {
  try {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: InterruptionModeIOS.DoNotMix,
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
      shouldDuckAndroid: true,
    });
  } catch (error) {
    console.error('Error setting up audio:', error);
  }
};
