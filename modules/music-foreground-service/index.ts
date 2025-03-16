// Reexport the native module. On web, it will be resolved to MusicForegroundServiceModule.web.ts
// and on native platforms to MusicForegroundServiceModule.ts
export { default } from './src/MusicForegroundServiceModule';
export * from './src/MusicForegroundService.types';
