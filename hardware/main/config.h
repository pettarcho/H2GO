// config.h
// Central include and configuration file for H2Go firmware.

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
const char* WIFI_SSID     = "Xiaomi 15";
const char* WIFI_PASSWORD = "Kalo2005";
const char* API_BASE_URL  = "http://10.184.248.211:5285/api";
const char* DEVICE_KEY    = "h2go-key-a1b2c3d4e5f6g7h8i9j0";

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