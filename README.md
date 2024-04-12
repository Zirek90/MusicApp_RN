## Foreground Service requires prebuild to modify manifest

1. npx expo prebuild
2. node node_modules/@supersami/rn-foreground-service/postinstall.js
3. npx expo run:android

## IF ANDROID DOESN'T WORK

# error: path may not be null or empty string. path='null'

https://github.com/expo/expo/issues/22584#issuecomment-1635872980

# supersami notificationBuilder error

inside NotificationBuilder.java create color for R.drawable.redbox_top_border_background
