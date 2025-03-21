#include <WiFi.h>
#include <ArduinoWebsockets.h>
#include "MorseDecoder.h"
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
MorseDecoder decoder;

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
    String data = message.data();
    
    if (data.startsWith("encode:")) {
      Serial.print("Recieved message to encode ");
      Serial.println(data);
      String word = data.substring(7);
      String encoded = decoder.encode(word.c_str());
      String response = "result:" + encoded;
      websocket.send(response);
    }
  });
}

void loop() {

  if (!websocket.available()) {
    Serial.println("Websocket disconected. Attemting to reconect...");
    websocket.connect(webSocketServerHost, webSocketServerPort, "/");
  }

  websocket.poll();

  if (Serial.available()) {
    String encoded = Serial.readStringUntil('\n');
    encoded.trim();
    String decoded = decoder.decode(encoded.c_str());
    websocket.send(decoded);
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
