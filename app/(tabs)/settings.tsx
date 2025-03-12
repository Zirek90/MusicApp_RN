import * as Application from 'expo-application';
import { Heading, Text } from 'native-base';
import { BackgroundWrapper } from '@components';

const SettingsPage = () => {
  return (
    <BackgroundWrapper>
      <Heading my={2} textAlign="center">
        App name: {Application.applicationName}
      </Heading>
      <Text textAlign="center">Build version: {Application.nativeBuildVersion}</Text>
    </BackgroundWrapper>
  );
};

export default SettingsPage;
