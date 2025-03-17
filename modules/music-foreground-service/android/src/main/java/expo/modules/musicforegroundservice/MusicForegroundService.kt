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
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import java.io.IOException

class MusicForegroundService : Service() {
  private val channel_id = "music_channel_id"
    override fun onCreate() {
        super.onCreate()
        try {
          createNotificationChannel()
          val notification = createNotification("Music Player", "No song playing", "avatar_1.png")

          startForeground(1, notification)
        } catch (e: Exception) {
          Log.e("MusicForegroundService", "Error starting foreground service", e)
        }
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
      val title = intent?.getStringExtra("title")
      val content = intent?.getStringExtra("content")
      val imageName = intent?.getStringExtra("imageName") ?: "avatar_1.png" 

      if (title != null && content != null) {
          updateNotification(title, content, imageName)
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
      Log.e("MusicForegroundService", "Service started")
      val iconResId = getBitmapFromAssets(imageName)

      return NotificationCompat.Builder(this, channel_id)
          .setContentTitle(title)
          .setContentText(content)
          .setSmallIcon(android.R.drawable.ic_notification_overlay) // TODO figure out how to import drawable from main android
          .setLargeIcon(iconResId)
          .setPriority(NotificationCompat.PRIORITY_HIGH)
          .build()
    }

    private fun updateNotification(title: String, content: String, imageName: String) {
      val notification = createNotification(title, content, imageName)
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