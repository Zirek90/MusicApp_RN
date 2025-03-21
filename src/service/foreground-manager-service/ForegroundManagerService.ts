import { AppState } from 'react-native';
import MusicForegroundServiceModule from '../../../modules/music-foreground-service';

class ForegroundManager {
  private isServiceRunning = false;
  private albumName = '';
  private songName = '';
  private avatarName = '';

  constructor() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  private handleAppStateChange = async (nextAppState: string) => {
    if (nextAppState === 'background' && !this.isServiceRunning) {
      console.log('[ForegroundServiceManager] App in background, starting service...');
      MusicForegroundServiceModule.startService(this.songName, this.albumName, this.avatarName);
      this.isServiceRunning = true;
    } else if (nextAppState === 'active' && this.isServiceRunning) {
      console.log('[ForegroundServiceManager] App back in foreground, stopping service...');
      MusicForegroundServiceModule.stopService();
      this.isServiceRunning = false;
    }
  };

  stopService = async () => {
    if (this.isServiceRunning) {
      MusicForegroundServiceModule.stopService();
      this.isServiceRunning = false;
    }
  };

  updateSongData(title: string, content: string, avatarName: string) {
    this.songName = title;
    this.albumName = content;
    this.avatarName = avatarName;
  }
}

export const ForegroundServiceManager = new ForegroundManager();
