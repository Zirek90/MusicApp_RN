# Foreground Service requires prebuild to modify manifest

## FOR ANDROID

1. npm run prebuild
2. node postinstall.js
3. npm run:android

In postinstall we can change colors of foreground service if we wish

# IF ANDROID DOESN'T WORK

## error: path may not be null or empty string. path='null'

https://github.com/expo/expo/issues/22584#issuecomment-1635872980

## supersami notificationBuilder error

inside NotificationBuilder.java create color for R.drawable.redbox_top_border_background

---

# Alternatively to postinstall, we can find config of supersami foreground-service here however it might miss certein parts:

- node_modules/@supersami/rn-foreground-service/postinstall.js
