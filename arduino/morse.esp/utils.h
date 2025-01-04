#include <ArduinoHttpClient.h>

String convertWiFiStatusToString(int status) {
  switch(status){
      case WL_IDLE_STATUS:
        return "WL_IDLE_STATUS";
      case WL_SCAN_COMPLETED:
        return "WL_SCAN_COMPLETED";
      case WL_NO_SSID_AVAIL:
        return "WL_NO_SSID_AVAIL";
      case WL_CONNECT_FAILED:
        return "WL_CONNECT_FAILED";
      case WL_CONNECTION_LOST:
        return "WL_CONNECTION_LOST";
      case WL_CONNECTED:
        return "WL_CONNECTED";
      case WL_DISCONNECTED:
        return "WL_DISCONNECTED";
    }
}
