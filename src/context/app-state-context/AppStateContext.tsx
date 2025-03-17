import { useEffect, useState, ReactNode } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { ForegroundServiceManager } from '@service';

export const AppStateContextProvider = ({ children }: { children: ReactNode }) => {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState === 'active' && nextAppState.match(/inactive|background/)) {
        console.log('App is going to background...');
      }

      if (nextAppState === 'background') {
        setTimeout(() => {
          if (AppState.currentState === 'background') {
            console.log('App fully closed. Stopping service...');
            ForegroundServiceManager.stopService();
          }
        }, 3000);
      }

      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription.remove();
  }, [appState]);

  return <>{children}</>;
};
