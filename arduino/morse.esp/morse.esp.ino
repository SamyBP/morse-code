#include <WiFi.h>
#include <ArduinoHttpClient.h>
#include "secrets.h"
#include "utils.h"

const char* ssid = SSID;
const char* password = PASSWORD;
const char* host = SERVER_HOST;
int port = SERVER_PORT;
int wifiStatus = WL_IDLE_STATUS;

WiFiClient wifiClient;
HttpClient http = HttpClient(wifiClient, host, port);

void setup() {
  Serial.begin(9600);

  Serial.printf("Connecting to network %s\n", ssid);
  connectToWifi();
  Serial.printf("Connected to network");
  
  Serial.println("Sending POST request");
  String response = sendPostRequest("/api/words", http, "{\n\t\"value\": \"beni\"\n}");
  Serial.printf("Received from server %s", response);
}

void loop() {
  
}


void connectToWifi() {
  WiFi.begin(ssid, password);

  while ( wifiStatus != WL_CONNECTED ) {
    wifiStatus = WiFi.status();
    Serial.printf("WiFi status: %s\n", convertWiFiStatusToString(wifiStatus));
    delay(500);
  }
}
