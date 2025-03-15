import { useEffect, useState } from 'react';
import * as Updates from 'expo-updates';
import { Button, Text } from 'native-base';
import { BackgroundWrapper } from '@components';

const SettingsPage = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        setUpdateAvailable(update.isAvailable);
      } catch (error) {
        console.error(`Error checking for updates: ${error}`);
      } finally {
        setChecking(false);
      }
    };

    checkForUpdates();
  }, []);

  const handleUpdate = async () => {
    try {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch (error) {
      console.error(`Error updating app: ${error}`);
    }
  };

  if (checking) {
    return (
      <BackgroundWrapper>
        <Text textAlign="center">Checking for updates...</Text>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper>
      {updateAvailable ? (
        <>
          <Text fontSize="2xl" textAlign="center" color="red.500">
            Update available
          </Text>
          <Button onPress={handleUpdate} mt={2} colorScheme="red">
            <Text>Update Now</Text>
          </Button>
        </>
      ) : (
        <Text fontSize="2xl" textAlign="center" color="green.500">
          Current version
        </Text>
      )}
    </BackgroundWrapper>
  );
};

export default SettingsPage;
