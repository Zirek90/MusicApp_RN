package expo.modules.musicforegroundservice

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

class MusicForegroundService : Service() {
  private val channel_id = "music_channel_id"
    override fun onCreate() {
        super.onCreate()
        try {
          createNotificationChannel()
          val notification = createNotification()

          startForeground(1, notification)
        } catch (e: Exception) {
          Log.e("MusicForegroundService", "Error starting foreground service", e)
        }
      }

    private fun createNotification(): android.app.Notification {
      Log.e("MusicForegroundService", "Service started")

      val iconResId = android.R.drawable.ic_notification_overlay 

      return NotificationCompat.Builder(this, channel_id)
          .setContentTitle("Music Player")
          .setContentText("Song detail here")
          .setSmallIcon(iconResId) // TODO figure out how to pass icon from RN
          .setPriority(NotificationCompat.PRIORITY_HIGH)
          // .setContentIntent(pendingIntent)
          .build()
  }

    private fun createNotificationChannel() {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
        val channelName = "Music Service"
        val channelDescription = "Music player notifications"

        val channel = NotificationChannel(channel_id, channelName, NotificationManager.IMPORTANCE_HIGH)
        channel.description = channelDescription

        val notificationManager = getSystemService(NotificationManager::class.java)
        notificationManager?.createNotificationChannel(channel)
      }
  }

    override fun onDestroy() {
      Log.e("MusicForegroundService", "Service stopped")
    }

    override fun onBind(intent: Intent?): IBinder? {
      return null // TODO add binding later in next version of buttons
  }
  }