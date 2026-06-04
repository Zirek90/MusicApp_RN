# MusicPlayer

Android-focused music player built with Expo (SDK 56), React Native 0.85 and React 19.

> iOS is not supported: the native foreground-service module is implemented only for Android.

## Requirements

- Node `>= 20.19.4` (the repo is developed on Node 22 — `nvm use 22`).
- This project uses the public npm registry. A project-level `.npmrc` pins `registry=https://registry.npmjs.org/`.

## Launch

1. `npm install`
2. `npm run prebuild` (Android)
3. `npm run android`

## Scripts

- `npm test` — unit tests (jest-expo)
- `npm run lint` / `npm run lint:fix` — ESLint 9 (flat config)
- `npm run format` / `npm run format:fix` — Prettier
- `npm run build:android` — EAS preview build

## Over-the-air updates: code signing

OTA updates are delivered through `expo-updates`. To prevent a malicious server from
serving a forged update, sign updates with a code-signing certificate. Generate and
configure it once:

```sh
npx expo-updates codesigning:generate \
  --key-output-directory keys \
  --certificate-output-directory certs \
  --certificate-validity-duration-years 10 \
  --certificate-common-name "MusicPlayer"

npx expo-updates codesigning:configure \
  --certificate-input-directory certs \
  --key-input-directory keys
```

`codesigning:configure` adds `codeSigningCertificate` and `codeSigningMetadata` to the
`updates` block in `app.json`. Keep the private key in `keys/` out of version control;
only the certificate is bundled into the app.

## Notes

- Audio playback uses `expo-audio` (the old `expo-av` was removed in SDK 55).
- Media-library scanning uses the `expo-media-library/legacy` API, which still exposes
  synchronous asset metadata. Migrating to the new class-based `Query`/`Asset` API is a
  possible future follow-up.
