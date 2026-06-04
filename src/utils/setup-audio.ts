import { AudioModule } from 'expo-audio';

export const setupAudio = async () => {
  try {
    await AudioModule.setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      interruptionMode: 'doNotMix',
      interruptionModeAndroid: 'doNotMix',
      shouldRouteThroughEarpiece: false,
    });
  } catch (error) {
    console.error('Error setting up audio:', error);
  }
};
