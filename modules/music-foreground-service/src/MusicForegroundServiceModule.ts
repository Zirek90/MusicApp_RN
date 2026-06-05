import { NativeModule, requireOptionalNativeModule } from 'expo';
import { MusicForegroundServiceModuleEvents } from './MusicForegroundService.types';

declare class MusicForegroundServiceModule extends NativeModule<MusicForegroundServiceModuleEvents> {
  startService(title: string, content: string, avatarName: string): string;
  stopService(): string;
}

// Returns null on platforms/builds without the native module (e.g. iOS, Expo Go).
export default requireOptionalNativeModule<MusicForegroundServiceModule>('MusicForegroundService');
