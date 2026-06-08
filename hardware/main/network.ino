/*
========================================
NETWORK MODULE
H2Go Smart Water Bottle – Base Station
========================================
*/
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// ========================================
// CONFIGURATION
// ========================================
const char* WIFI_SSID     = "";
const char* WIFI_PASSWORD = "";
const char* API_URL       = "https://your-backend-url/api/hydration";

static const unsigned long WIFI_RETRY_INTERVAL = 30000UL;
static unsigned long lastWifiRetry = 0;

// ========================================
// WIFI – INITIAL CONNECTION
// ========================================
void connectWiFi() {
    Serial.println("[NET] Connecting to WiFi...");
    WiFi.mode(WIFI_STA);
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

    int attempts = 0;
    while (WiFi.status() != WL_CONNECTED && attempts < 20) {
        delay(500);
        Serial.print(".");
        attempts++;
    }
    Serial.println();

    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("[NET] WiFi connected.");
        Serial.print("[NET] IP: ");
        Serial.println(WiFi.localIP());
    } else {
        Serial.println("[NET] WiFi failed – will retry in loop.");
    }
}
// ========================================
// WIFI – RUNTIME RECONNECT
// ========================================
void maintainWiFi() {
    if (WiFi.status() == WL_CONNECTED) return;

    unsigned long now = millis();
    if (now - lastWifiRetry < WIFI_RETRY_INTERVAL) return;

    lastWifiRetry = now;
    Serial.println("[NET] WiFi lost – reconnecting...");
    WiFi.disconnect();
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
}
// ========================================
// CONNECTION CHECK
// ========================================

bool isNetworkConnected() {
    return WiFi.status() == WL_CONNECTED;
}
// ========================================
// JSON PAYLOAD BUILDER
// ========================================

String createHydrationPayload(
    int   userId,
    float currentWeightG,
    float waterRemainingML,
    float consumedTodayML,
    float goalML,
    bool  reminderActive)
{
    JsonDocument doc;

    doc["userId"]          = userId;
    doc["currentWeightG"]  = round(currentWeightG);
    doc["consumedTodayML"] = round(consumedTodayML);
    doc["remainingML"]     = round(waterRemainingML);
    doc["goalML"]          = round(goalML);
    doc["reminderActive"]  = reminderActive;

    float progress = 0.0;
    if (goalML > 0.0) {
        progress = (consumedTodayML / goalML) * 100.0;
        if (progress > 100.0) progress = 100.0;
    }
    doc["progressPct"] = round(progress);

    String payload;
    serializeJson(doc, payload);
    return payload;
}
// ========================================
// HTTP POST
// ========================================

bool sendPayload(const String& payload) {
    if (!isNetworkConnected()) {
        Serial.println("[NET] Cannot send – not connected.");
        return false;
    }

    HTTPClient http;
    http.begin(API_URL);
    http.addHeader("Content-Type", "application/json");

    Serial.println("[NET] Sending: " + payload);

    int responseCode = http.POST(payload);

    Serial.print("[NET] HTTP response: ");
    Serial.println(responseCode);

    http.end();

    return (responseCode >= 200 && responseCode < 300);
}

// ========================================
// HIGH-LEVEL FUNCTION (called from main)
// ========================================
bool sendHydrationData(
    int   userId,
    float currentWeightG,
    float waterRemainingML,
    float consumedTodayML,
    float goalML,
    bool  reminderActive)
{
    String payload = createHydrationPayload(
        userId,
        currentWeightG,
        waterRemainingML,
        consumedTodayML,
        goalML,
        reminderActive
    );

    return sendPayload(payload);
}