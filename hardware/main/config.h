// config.h
// Central include and configuration file for H2Go firmware.
// Include this at the top of every .ino file.

#ifndef CONFIG_H
#define CONFIG_H

#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include "HX711.h"
#include <EEPROM.h>

// ----------------------------------------
// Network credentials and endpoints
// ----------------------------------------
const char* WIFI_SSID     = "yailin";
const char* WIFI_PASSWORD = "deez1313";
const char* API_BASE_URL  = "http://172.20.10.2:3000/api/readings";
const char* DEVICE_KEY    = "h2go-esp32-live-a7f3k9x2m4n8q1w5";

// ----------------------------------------
// Pin definitions
// ----------------------------------------
#define LOADCELL_DT   18
#define LOADCELL_SCK  19
#define BUZZER_PIN    27

// ----------------------------------------
// OLED
// ----------------------------------------
#define OLED_WIDTH    128
#define OLED_HEIGHT    32
#define OLED_RESET     -1
#define OLED_ADDRESS  0x3C

// ----------------------------------------
// Timing (ms)
// ----------------------------------------
static const unsigned long SENSOR_INTERVAL     = 2000UL;
static const unsigned long SEND_INTERVAL       = 60000UL;
static const unsigned long WIFI_RETRY_INTERVAL = 30000UL;

// ----------------------------------------
// User
// ----------------------------------------
static const int USER_ID = 1;

#endif