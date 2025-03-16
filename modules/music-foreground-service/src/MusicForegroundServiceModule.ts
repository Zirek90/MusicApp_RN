import { NativeModule, requireNativeModule } from 'expo';
import { MusicForegroundServiceModuleEvents } from './MusicForegroundService.types';

declare class MusicForegroundServiceModule extends NativeModule<MusicForegroundServiceModuleEvents> {
  startService(title: string, content: string): string;
  stopService(): string;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<MusicForegroundServiceModule>('MusicForegroundService');
