package expo.modules.musicforegroundservice

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.content.Intent

class MusicForegroundServiceModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("MusicForegroundService")
    Events("onChange")

    Function("startService") {  title: String, content: String, imageName: String ->
      val context = appContext.reactContext ?: return@Function Unit
      var intent = Intent(context, MusicForegroundService::class.java).apply {
        putExtra("title", title)
        putExtra("content", content)
        putExtra("imageName", imageName)
    }
      context.startService(intent) 
      Unit
    }

    Function("stopService") {
      val context = appContext.reactContext ?: return@Function Unit
      var intent = Intent(context, MusicForegroundService::class.java)
      context.stopService(intent)
      Unit
    }
  }
}
