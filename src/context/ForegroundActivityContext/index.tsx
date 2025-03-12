import { PropsWithChildren, createContext, useContext, useEffect, useCallback } from 'react';
import { AppState } from 'react-native';
import { SongStatus } from '@enums';
import { ForewardService } from '@service';

const ForeroundActivityContext = createContext({});

export const ForeroundActivityProvider = ({ children }: PropsWithChildren) => {
  // const activeAlbum = useAlbumStore(state => state.activeAlbum);
  // const currentSong = useMusicStore(state => state.currentSong);
  // const songDetails = useMusicStore(state => state.songDetails);
  // const { songStatus, index } = currentSong;

  // const handleForegroundServiceStart = useCallback(() => {
  //   if (songStatus !== SongStatus.PLAY) return;

  //   ForewardService.startTask(songDetails.title);
  // }, [songDetails, songStatus]);

  // useEffect(() => {
  //   if (!activeAlbum) return;
  //   const activeSong = activeAlbum.items[index];

  //   if (!activeSong || songStatus !== SongStatus.PLAY) return;

  //   //* to handle background song changes
  //   if (AppState.currentState === 'background') {
  //     ForewardService.updateTask(activeSong.filename);
  //   }
  // }, [activeAlbum, index, songStatus]);

  // useEffect(() => {
  //   const appStateListener = AppState.addEventListener('change', nextAppState => {
  //     if (nextAppState === 'background') {
  //       handleForegroundServiceStart();
  //     } else if (nextAppState === 'active') {
  //       ForewardService.stopTask();
  //     }
  //   });

  //   return () => {
  //     appStateListener.remove();
  //     ForewardService.removeTasks();
  //   };
  // }, [handleForegroundServiceStart]);

  return (
    <ForeroundActivityContext.Provider value={{}}>{children}</ForeroundActivityContext.Provider>
  );
};

export const useForeroundActivityContext = () => {
  // const state = useContext(ForeroundActivityContext);
  // if (state === null) {
  //   throw new Error('State is still null');
  // } else if (state === undefined) {
  //   throw new Error('Attempt to access from outside of context');
  // }
  // return state;
};
