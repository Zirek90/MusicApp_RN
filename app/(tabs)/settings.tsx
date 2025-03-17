import * as Application from 'expo-application';
import * as Updates from 'expo-updates';
import { Button, Text } from 'native-base';
import { GradientWrapper } from '@components';
import { COLORS } from '@global';

const SettingsPage = () => {
  const { isUpdateAvailable, isChecking, isDownloading } = Updates.useUpdates();

  const handleUpdate = async () => {
    try {
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch (error) {
      console.error(`Error updating app: ${error}`);
    }
  };

  if (isChecking) {
    return (
      <GradientWrapper>
        <Text textAlign="center">Checking for updates...</Text>
      </GradientWrapper>
    );
  }

  return (
    <GradientWrapper>
      <Text
        fontSize="3xl"
        textAlign="center"
        mb={5}
        borderBottomColor={COLORS.white}
        borderBottomWidth={1}
        pb={1}
        borderStyle="dotted">
        Updates
      </Text>
      <Text fontSize="xl" textAlign="center" color="green.400">
        Installed version: {Application.nativeApplicationVersion}
      </Text>
      {isUpdateAvailable && (
        <>
          <Text fontSize="xl" textAlign="center" color="red.500">
            Update available
          </Text>
          <Button alignSelf="center" onPress={handleUpdate} my={2} w="50%" colorScheme="red">
            <Text>Update Now</Text>
          </Button>
        </>
      )}
      {isDownloading && (
        <Text fontSize="lg" textAlign="center" color="yellow.500">
          Downloading update. Please wait ...
        </Text>
      )}
    </GradientWrapper>
  );
};

export default SettingsPage;
