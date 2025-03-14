import { useEffect } from 'react';
import * as Application from 'expo-application';
import * as Updates from 'expo-updates';
import { Text } from 'native-base';
import { BackgroundWrapper } from '@components';

const SettingsPage = () => {
  useEffect(() => {
    const onFetchUpdateAsync = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();

        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        console.error(`Error fetching latest Expo update: ${error}`);
      }
    };
    onFetchUpdateAsync();
  }, []);

  return (
    <BackgroundWrapper>
      <Text textAlign="center">Build version: {Application.nativeBuildVersion}</Text>
    </BackgroundWrapper>
  );
};

export default SettingsPage;
