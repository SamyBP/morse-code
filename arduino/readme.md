# Prerequisites

The board used throughout the project is an Arduino ESP32-WROOM-32

# Setup

* Install Arduino IDE v2.x 
* Install **esp32 by Espressif Systems** 
    * open the board manager and type ESP32
* Install **ArduinoWebSockets**
    * open the library manager and type ArduinoWebSockets
    * the version used is found here [ArduinoWebSockets](https://github.com/gilmaimon/ArduinoWebsockets/tree/master) 
* Create a secrets.h file at the root of morse.esp directory and replace the following values:

      #define SSID "your_wifi_network_name"
      #define PASSWORD "your_wifi_password"
      #define WS_SERVER_HOST "host_of_the_ws_server"
      #define WS_SERVER_PORT "port_of_the_ws_server_as_integer"



# Usage

* Click on the board selector and choose **select other board and port**
* Type ESP32 DEVKIT and choose **uPesy ESP32 Wroom DevKit**
* Choose the port at which the board is connected
* Upload the sketch
