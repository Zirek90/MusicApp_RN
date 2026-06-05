import { AppState } from 'react-native';
import MusicForegroundServiceModule from '../../../modules/music-foreground-service';

class ForegroundManager {
  private isServiceRunning = false;
  private albumName = '';
  private songName = '';
  private avatarName = '';
  private isPlaying = false;

  constructor() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  private handleAppStateChange = async (nextAppState: string) => {
    if (!MusicForegroundServiceModule) return;

    if (nextAppState === 'background' && this.isPlaying && !this.isServiceRunning) {
      MusicForegroundServiceModule.startService(this.songName, this.albumName, this.avatarName);
      this.isServiceRunning = true;
    } else if (nextAppState === 'active' && this.isServiceRunning) {
      MusicForegroundServiceModule.stopService();
      this.isServiceRunning = false;
    }
  };

  stopService = async () => {
    if (MusicForegroundServiceModule && this.isServiceRunning) {
      MusicForegroundServiceModule.stopService();
      this.isServiceRunning = false;
    }
  };

  updateIsPlaying(isPlaying: boolean) {
    this.isPlaying = isPlaying;
  }

  updateSongData(title: string, content: string, avatarName: string) {
    this.songName = title;
    this.albumName = content;
    this.avatarName = avatarName;

    if (MusicForegroundServiceModule && this.isServiceRunning) {
      MusicForegroundServiceModule.startService(title, content, avatarName);
    }
  }
}

export const ForegroundServiceManager = new ForegroundManager();
