// Android (Kotlin) — WebView hosting the exact same local animated background.
// Copy the zip contents into app/src/main/assets/marketcraft3d/.
// Place your native labels and buttons in a View layered ABOVE this WebView.
// Do NOT load untrusted external content into a JavaScript-enabled WebView.
// Android min API is determined by your project; this sample uses AndroidX WebKit.

import android.annotation.SuppressLint
import android.webkit.WebChromeClient
import android.webkit.WebView
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewClientCompat
import androidx.webkit.WebResourceRequest

@SuppressLint("SetJavaScriptEnabled")
fun configureMarketCraftBackground(webView: WebView, lightMode: Boolean) {
    val loader = WebViewAssetLoader.Builder()
        .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(webView.context))
        .build()
    webView.settings.javaScriptEnabled = true
    webView.settings.domStorageEnabled = false
    webView.setBackgroundColor(android.graphics.Color.TRANSPARENT)
    webView.webChromeClient = WebChromeClient()
    webView.webViewClient = object : WebViewClientCompat() {
        override fun shouldInterceptRequest(view: WebView, request: WebResourceRequest) =
            loader.shouldInterceptRequest(request.url)
    }
    val theme = if (lightMode) "light" else "dark"
    webView.loadUrl("https://appassets.androidplatform.net/assets/marketcraft3d/index.html?embed=1&theme=$theme")
}

// When changing theme without reloading:
// webView.evaluateJavascript("window.MarketCraftMountains.setTheme('light')", null)
// Pause animations on Activity/Fragment onPause for battery efficiency:
// webView.evaluateJavascript("window.MarketCraftMountains.setMotion('off')", null)
// Resume on onResume:
// webView.evaluateJavascript("window.MarketCraftMountains.setMotion('on')", null)
