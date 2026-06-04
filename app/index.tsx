import { Redirect } from 'expo-router';
import { GradientWrapper } from '@components';

const App = () => {
  return (
    <GradientWrapper>
      <Redirect href="/(tabs)/album" />
    </GradientWrapper>
  );
};

export default App;
