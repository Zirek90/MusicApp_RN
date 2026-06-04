import { useCallback } from 'react';
import * as Application from 'expo-application';
import * as Updates from 'expo-updates';
import { Pressable, StyleSheet, Text } from 'react-native';
import { GradientWrapper } from '@components';
import { typography } from '@configs';
import { COLORS } from '@global';

const SettingsPage = () => {
  const { isUpdateAvailable, isChecking, isDownloading } = Updates.useUpdates();

  const handleUpdate = useCallback(async () => {
    try {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch (error) {
      console.error(`Error updating app: ${error}`);
    }
  }, []);

  if (isChecking) {
    return (
      <GradientWrapper>
        <Text style={[typography.base, typography.md, styles.centered]}>
          Checking for updates...
        </Text>
      </GradientWrapper>
    );
  }

  return (
    <GradientWrapper>
      <Text style={[typography.base, typography.xxxl, styles.heading]}>Updates</Text>
      <Text style={[typography.base, typography.xl, styles.centered, styles.installed]}>
        Installed version: {Application.nativeApplicationVersion}
      </Text>
      {isUpdateAvailable && (
        <>
          <Text style={[typography.base, typography.xl, styles.centered, styles.available]}>
            Update available
          </Text>
          <Pressable onPress={handleUpdate} style={styles.button}>
            <Text style={[typography.base, typography.md, styles.buttonLabel]}>Update Now</Text>
          </Pressable>
        </>
      )}
      {isDownloading && (
        <Text style={[typography.base, typography.lg, styles.centered, styles.downloading]}>
          Downloading update. Please wait ...
        </Text>
      )}
    </GradientWrapper>
  );
};

const styles = StyleSheet.create({
  centered: { textAlign: 'center' },
  heading: {
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 4,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    borderStyle: 'dotted',
  },
  installed: { color: COLORS.green },
  available: { color: COLORS.red },
  downloading: { color: COLORS.yellow_primary },
  button: {
    alignSelf: 'center',
    marginVertical: 8,
    width: '50%',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.red,
    alignItems: 'center',
  },
  buttonLabel: { color: COLORS.white },
});

export default SettingsPage;
