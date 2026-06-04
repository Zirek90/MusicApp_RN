import AsyncStorage from '@react-native-async-storage/async-storage';
import { Album, CurrentSong } from '@types';

const STORAGE_KEYS = ['currentSong', 'songProgress', 'activeAlbumId'] as const;

type StorageKey = (typeof STORAGE_KEYS)[number];
type StorageValue = Album['albumId'] | CurrentSong | number;

export const StorageService = {
  get: async (key: StorageKey) => {
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
      const result = await AsyncStorage.multiGet(STORAGE_KEYS);

      return result.reduce(
        (acc, [key, value]) => {
          acc[key as StorageKey] = value ? JSON.parse(value) : null;
          return acc;
        },
        {} as Record<StorageKey, StorageValue | null>,
      );
    } catch (error) {
      console.error('Error retrieving all storage values', error);
      return null;
    }
  },
  set: async (key: StorageKey, value: StorageValue) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item in storage: ${key}`, error);
    }
  },
  remove: async (key: StorageKey) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from storage: ${key}`, error);
    }
  },
};
