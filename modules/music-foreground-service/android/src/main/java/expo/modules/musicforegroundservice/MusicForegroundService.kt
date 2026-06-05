package expo.modules.musicforegroundservice

import android.app.PendingIntent
import android.app.Service
import android.content.Intent
import android.os.IBinder
import android.util.Log
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import androidx.core.app.NotificationCompat
import android.os.Build
import androidx.core.content.ContextCompat
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import java.io.IOException

class MusicForegroundService : Service() {
  private val channel_id = "music_channel_id"
    override fun onCreate() {
        super.onCreate()
        createNotificationChannel()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
      val title = intent?.getStringExtra("title") ?: "Music Player"
      val content = intent?.getStringExtra("content") ?: "No song playing"
      val imageName = intent?.getStringExtra("imageName") ?: "avatar_1.png"

      try {
        startForeground(1, createNotification(title, content, imageName))
      } catch (e: Exception) {
        Log.e("MusicForegroundService", "Error starting foreground service", e)
      }

      return START_STICKY
    }

    private fun getBitmapFromAssets(fileName: String): Bitmap? {
      return try {
          val assetManager = assets
          val inputStream = assetManager.open(fileName)
          BitmapFactory.decodeStream(inputStream)
      } catch (e: IOException) {
          Log.e("MusicForegroundService", "Error loading image: $fileName", e)
          null
      }
  }

    private fun createNotification(title: String, content: String,  imageName: String): android.app.Notification {
      val iconResId = getBitmapFromAssets(imageName)

      val launchIntent = packageManager.getLaunchIntentForPackage(packageName)?.apply {
        flags = Intent.FLAG_ACTIVITY_SINGLE_TOP or Intent.FLAG_ACTIVITY_CLEAR_TOP
      }
      val contentIntent = PendingIntent.getActivity(
        this,
        0,
        launchIntent,
        PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT,
      )

      return NotificationCompat.Builder(this, channel_id)
          .setContentTitle(title)
          .setContentText(content)
          .setSmallIcon(applicationInfo.icon)
          .setLargeIcon(iconResId)
          .setContentIntent(contentIntent)
          .setPriority(NotificationCompat.PRIORITY_HIGH)
          .setVibrate(longArrayOf(0))
          .setDefaults(Notification.DEFAULT_SOUND)
          .build()
    }

    private fun createNotificationChannel() {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        val channelName = "Music Service"
        val channelDescription = "Music player notifications"

        val channel = NotificationChannel(channel_id, channelName, NotificationManager.IMPORTANCE_LOW).apply {
          description = channelDescription
          enableVibration(false)  
          vibrationPattern = longArrayOf(0) 
      }

        val notificationManager = getSystemService(NotificationManager::class.java)
        notificationManager?.createNotificationChannel(channel)
      }
    }

    override fun onTaskRemoved(rootIntent: Intent?) {
      Log.e("MusicForegroundService", "App is closed. Stopping service...")
      stopSelf()
      super.onTaskRemoved(rootIntent)
    }

    override fun onDestroy() {
      Log.e("MusicForegroundService", "Service stopped")
      stopForeground(true) 
      super.onDestroy()
    }

    override fun onBind(intent: Intent?): IBinder? {
      return null // TODO add binding later in next version of buttons
  }
}