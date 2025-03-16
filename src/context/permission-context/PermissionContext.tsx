import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import * as Notifications from 'expo-notifications';
interface PermissionContextState {
  mediaPermissionGranted: boolean;
  notificationPermissionGranted: boolean;
}

const PermissionContext = createContext<PermissionContextState>({
  mediaPermissionGranted: false,
  notificationPermissionGranted: false,
});

export const PermissionContextProvider = ({ children }: PropsWithChildren) => {
  const [mediaPermissionGranted, setMediaPermissionGranted] = useState(false);
  const [notificationPermissionGranted, setNotificationPermissionGranted] = useState(false);

  useEffect(() => {
    const getPermission = async () => {
      const mediaPermission = await MediaLibrary.requestPermissionsAsync();
      const notificationPermission = await Notifications.requestPermissionsAsync();

      setMediaPermissionGranted(mediaPermission.granted);
      setNotificationPermissionGranted(notificationPermission.granted);
    };
    getPermission();
  }, []);

  return (
    <PermissionContext.Provider
      value={{
        mediaPermissionGranted,
        notificationPermissionGranted,
      }}>
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissionContext = () => {
  const state = useContext(PermissionContext);
  if (state === undefined) {
    throw new Error('Attempt to access from outside of context');
  }
  return state;
};
