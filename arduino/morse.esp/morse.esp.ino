#include <WiFi.h>
#include <ArduinoWebsockets.h>
#include "secrets.h"
#include "utils.h"

#define MAX_WIFI_CONNECT_TRIES 10

const char* ssid = SSID;
const char* password = PASSWORD;

const char* webSocketServerHost = WS_SERVER_HOST;
const uint16_t webSocketServerPort = WS_SERVER_PORT;

int wifiStatus = WL_IDLE_STATUS;

using namespace websockets;

WebsocketsClient websocket;

void setup() {
  Serial.begin(115200);

  Serial.printf("Connecting to network %s\n", ssid);
  bool isConnectedToWiFi = connectToWiFi();

  if (!isConnectedToWiFi) {
    Serial.println("Could not connect to WiFi.");
    return;
  }

  Serial.println("Connected to WiFi");

  bool isConnectedToWebsocket = websocket.connect(webSocketServerHost, webSocketServerPort, "/");
  
  if (!isConnectedToWebsocket) {
    Serial.printf("Did not connect to websocket at ws://%s:%d\n", webSocketServerHost, webSocketServerPort);
    return;
  }

  websocket.onMessage([&](WebsocketsMessage message){
    Serial.println(message.data());
  });
}

void loop() {

  if (!websocket.available()) {
    Serial.println("Websocket disconected. Attemting to reconect...");
    websocket.connect(webSocketServerHost, webSocketServerPort, "/");
  }

  websocket.poll();

  if (Serial.available()) {
    String word = Serial.readStringUntil('\n');
    word.trim();
    websocket.send(word);
  }

  delay(500);
}


bool connectToWiFi() {
  WiFi.begin(ssid, password);

  for (int i = 0; i < MAX_WIFI_CONNECT_TRIES && wifiStatus != WL_CONNECTED; i++) {
    wifiStatus = WiFi.status();
    Serial.printf("WiFi status: %s\n", convertWiFiStatusToString(wifiStatus));
    delay(500);
  }

  return wifiStatus == WL_CONNECTED;
}
