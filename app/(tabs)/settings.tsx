import { BackgroundWrapper } from '@components';
import { Heading, Text, Stack } from 'native-base';
import * as Application from 'expo-application';

const SettingsPage = () => {
  return (
    <BackgroundWrapper>
      <Heading textAlign="center">App name: {Application.applicationName}</Heading>
      <Stack alignItems="center" p={5}>
        <Text>App version: {Application.applicationId}</Text>
        <Text>Build version: {Application.nativeBuildVersion}</Text>
      </Stack>
    </BackgroundWrapper>
  );
};

export default SettingsPage;
