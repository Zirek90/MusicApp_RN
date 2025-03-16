import AsyncStorage from '@react-native-async-storage/async-storage';
import { Album, CurrentSong } from '@types';

type StorageKeys = 'currentSong' | 'songProgress' | 'activeAlbumId';
type StorageValues = Album['albumId'] | CurrentSong | number;

export const StorageService = {
  get: async (key: StorageKeys) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting item from storage: ${key}`, error);
      return null;
    }
  },
  getAll: async () => {
    try {
      const keys: StorageKeys[] = ['currentSong', 'songProgress', 'activeAlbumId'];
      const result = await AsyncStorage.multiGet(keys);

      const output = result.reduce(
        (acc, [key, value]) => {
          acc[key as StorageKeys] = value ? JSON.parse(value) : null;
          return acc;
        },
        {} as Record<StorageKeys, StorageValues | null>,
      );

      return output;
    } catch (error) {
      console.error('Error retrieving all storage values', error);
      return null;
    }
  },
  set: async (key: string, value: Album['albumId'] | CurrentSong | number) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item in storage: ${key}`, error);
    }
  },
  remove: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from storage: ${key}`, error);
    }
  },
};
