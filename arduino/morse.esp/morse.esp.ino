#include <WiFi.h>
#include <ArduinoHttpClient.h>
#include "secrets.h"

const char* ssid = SECRET_SSID;
const char* password = SECRET_PASS;
const char* host = "192.168.240.197";
int port = 3000;
int wifiStatus = WL_IDLE_STATUS;

WiFiClient  wifiClient;
HttpClient http = HttpClient(wifiClient, host, port);


void setup() {
  Serial.begin(9600);
  connectToWifi();
  sendPostRequest();
}

void loop() {
  
}


String get_wifi_status(int status){
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

void connectToWifi() {
  Serial.print("Connecting to network: ");
  Serial.print(ssid);
  Serial.print(" with password: ");
  Serial.println(password);
  WiFi.begin(ssid, password);

  while ( wifiStatus != WL_CONNECTED ) {
    wifiStatus = WiFi.status();
    Serial.print("status: ");
    Serial.println(get_wifi_status(wifiStatus));
    delay(500);
  }

  Serial.print("connected to network: ");
  Serial.println(WiFi.SSID());
}

void sendPostRequest() {
  String payload = "{\n\t\"value\": \"beni\"\n}";
  String contentType = "application/json";
  Serial.println("Sending POST request...");
  http.post("/api/words", contentType, payload);

  int statusCode = http.responseStatusCode();
  String response = http.responseBody();
  Serial.print(response);
}
