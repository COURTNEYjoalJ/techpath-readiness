// Flutter: use webview_flutter; package files are served by your app, not remote CDN.
// A straightforward approach is to use a local HTTP asset server to serve the folder,
// then load its URL in WebView. This is a sketch, not a drop-in standalone server.
//
// final controller = WebViewController()
//   ..setJavaScriptMode(JavaScriptMode.unrestricted)
//   ..loadRequest(Uri.parse('$localAssetServer/marketcraft3d/index.html?embed=1&theme=dark'));
//
// To change theme: controller.runJavaScript("window.MarketCraftMountains.setTheme('light')");
// To pause: controller.runJavaScript("window.MarketCraftMountains.setMotion('off')");
//
// Android projects can avoid a server by using the native WebViewAssetLoader
// implementation in AndroidWebViewExample.kt.
