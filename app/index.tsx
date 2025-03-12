import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import * as Updates from 'expo-updates';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'In React 18, SSRProvider is not necessary and is a noop. You can remove it from your app.',
]);

const App = () => {
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

  return <Redirect href="/(tabs)/album" />;
};

export default App;
