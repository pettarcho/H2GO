/*
========================================
NETWORK MODULE
Smart Hydration Base
========================================
Responsibilities:
- Connect to WiFi
- Create JSON payload
- Send data to backend API

========================================
*/
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
// ========================================
// WIFI CONFIGURATION
// ========================================
const char* WIFI_SSID = "";
const char* WIFI_PASSWORD = "";
const char* API_URL =
    "https://your-backend-url/api/hydration";

bool wifiConnected = false;
// ========================================
// WIFI CONNECTION
// ========================================
void connectWiFi()
{
    Serial.println("Connecting to WiFi...");
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    int attempts = 0;
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
        attempts++;
        if (attempts > 20)
        {
            Serial.println();
            Serial.println("WiFi connection failed");
            wifiConnected = false;
            return;
        }
    }
    wifiConnected = true;
    Serial.println();
    Serial.println("WiFi connected!");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
}
// ========================================
// CONNECTION CHECK
// ========================================

bool isNetworkConnected()
{
    return WiFi.status() == WL_CONNECTED;
}
// ========================================
// CREATE JSON PAYLOAD
// ========================================
String createHydrationPayload(
    int userId,
    float currentWeight,
    float waterRemaining,
    float consumedToday)
{
    JsonDocument doc;

    doc["userId"] = userId;
    doc["currentWeight"] = currentWeight;
    doc["waterRemaining"] = waterRemaining;
    doc["consumedToday"] = consumedToday;

    String payload;

    serializeJson(doc, payload);

    return payload;
}

// ========================================
// SEND PAYLOAD
// ========================================

bool sendPayload(String payload)
{
    if (!isNetworkConnected())
    {
        Serial.println("WiFi not connected");
        return false;
    }

    HTTPClient http;

    http.begin(API_URL);

    http.addHeader(
        "Content-Type",
        "application/json"
    );

    Serial.println();
    Serial.println("Sending payload:");
    Serial.println(payload);

    int responseCode =
        http.POST(payload);

    Serial.print("HTTP Response Code: ");
    Serial.println(responseCode);

    http.end();

    return (responseCode > 0);
}

// ========================================
// HIGH LEVEL FUNCTION
// ========================================

bool sendHydrationData(
    int userId,
    float currentWeight,
    float waterRemaining,
    float consumedToday)
{
    String payload =
        createHydrationPayload(
            userId,
            currentWeight,
            waterRemaining,
            consumedToday
        );

    return sendPayload(payload);
}
