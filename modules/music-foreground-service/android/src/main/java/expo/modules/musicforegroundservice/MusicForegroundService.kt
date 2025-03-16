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
          val notification = createNotification("Music Player", "No song playing")

          startForeground(1, notification)
        } catch (e: Exception) {
          Log.e("MusicForegroundService", "Error starting foreground service", e)
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
      val title = intent?.getStringExtra("title")
      val content = intent?.getStringExtra("content")

      if (title != null && content != null) {
          updateNotification(title, content)
      }

      return START_STICKY
    }

    private fun createNotification(title: String, content: String): android.app.Notification {
      Log.e("MusicForegroundService", "Service started")
      val iconResId = android.R.drawable.ic_notification_overlay 

      return NotificationCompat.Builder(this, channel_id)
          .setContentTitle(title)
          .setContentText(content)
          .setSmallIcon(iconResId) // TODO figure out how to pass icon from RN
          .setPriority(NotificationCompat.PRIORITY_HIGH)
          // .setContentIntent(pendingIntent)
          .build()
    }

    private fun updateNotification(title: String, content: String) {
      val notification = createNotification(title, content)
      val notificationManager = getSystemService(NotificationManager::class.java)
      notificationManager?.notify(1, notification)
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