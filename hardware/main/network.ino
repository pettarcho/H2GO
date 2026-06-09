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

// Base URL of the backend API
const char* API_BASE_URL  = "https://your-backend-url/api";

// Device key registered in the DeviceKeys table.
// Must match exactly the device_key value stored in the database.
const char* DEVICE_KEY    = "YOUR_DEVICE_KEY_HERE";

static const unsigned long WIFI_RETRY_INTERVAL = 30000UL;
static unsigned long lastWifiRetry = 0;

// ========================================
// WIFI
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
void maintainWiFi() {
    if (WiFi.status() == WL_CONNECTED) return;
    unsigned long now = millis();
    if (now - lastWifiRetry < WIFI_RETRY_INTERVAL) return;
    lastWifiRetry = now;
    Serial.println("[NET] WiFi lost – reconnecting...");
    WiFi.disconnect();
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
}
bool isNetworkConnected() {
    return WiFi.status() == WL_CONNECTED;
}
// ========================================
// SHARED HELPER – attach device key header
// ========================================

// Every request to the API carries the device key in the header.
// The API validates this key against the DeviceKeys table before
// accepting any data or returning any configuration.
void attachDeviceKey(HTTPClient& http) {
    http.addHeader("Content-Type", "application/json");
    http.addHeader("X-Device-Key", DEVICE_KEY);
}

// ========================================
// FETCH ACTIVE HYDRATION GOAL
// ========================================

// Returns the active daily_goal_ml for the authenticated device's user.
// Returns -1 on failure so the caller can detect an error and keep
// the previously loaded value.
int fetchGoalML() {
    if (!isNetworkConnected()) return -1;

    String url = String(API_BASE_URL) + "/goals/active";

    HTTPClient http;
    http.begin(url);
    attachDeviceKey(http);

    int responseCode = http.GET();
    if (responseCode != 200) {
        Serial.print("[NET] fetchGoalML failed, HTTP: ");
        Serial.println(responseCode);
        http.end();
        return -1;
    }

    String body = http.getString();
    http.end();

    JsonDocument doc;
    DeserializationError err = deserializeJson(doc, body);
    if (err) {
        Serial.println("[NET] fetchGoalML JSON parse error.");
        return -1;
    }

    int goal = doc["daily_goal_ml"];
    Serial.print("[NET] Goal fetched: ");
    Serial.print(goal);
    Serial.println(" ml");
    return goal;
}
// ========================================
// FETCH REMINDER SETTINGS
// ========================================

// Populates the two output parameters with the values stored in the
// ReminderSettings table for the authenticated device's user.
// Returns true on success, false on failure.
bool fetchReminderSettings(int& intervalMinutes, bool& enabled) {
    if (!isNetworkConnected()) return false;

    String url = String(API_BASE_URL) + "/reminder-settings";

    HTTPClient http;
    http.begin(url);
    attachDeviceKey(http);

    int responseCode = http.GET();
    if (responseCode != 200) {
        Serial.print("[NET] fetchReminderSettings failed, HTTP: ");
        Serial.println(responseCode);
        http.end();
        return false;
    }

    String body = http.getString();
    http.end();

    JsonDocument doc;
    DeserializationError err = deserializeJson(doc, body);
    if (err) {
        Serial.println("[NET] fetchReminderSettings JSON parse error.");
        return false;
    }

    intervalMinutes = doc["reminder_interval_minutes"];
    enabled         = doc["reminders_enabled"];

    Serial.print("[NET] Reminder interval: ");
    Serial.print(intervalMinutes);
    Serial.print(" min, enabled: ");
    Serial.println(enabled ? "yes" : "no");
    return true;
}
// ========================================
// POST HYDRATION READING
// ========================================

String createHydrationPayload(
    int   userId,
    float currentWeightG,
    float consumedTodayML)
{
    JsonDocument doc;
    doc["user_id"]            = userId;
    doc["weight_grams"]       = round(currentWeightG);
    doc["water_consumed_ml"]  = round(consumedTodayML);
    // timestamp is generated server-side at insert time

    String payload;
    serializeJson(doc, payload);
    return payload;
}

bool sendHydrationData(int userId, float currentWeightG, float consumedTodayML) {
    if (!isNetworkConnected()) {
        Serial.println("[NET] Cannot send – not connected.");
        return false;
    }

    String url     = String(API_BASE_URL) + "/hydration";
    String payload = createHydrationPayload(userId, currentWeightG, consumedTodayML);

    HTTPClient http;
    http.begin(url);
    attachDeviceKey(http);

    Serial.println("[NET] Sending hydration: " + payload);
    int responseCode = http.POST(payload);

    Serial.print("[NET] HTTP response: ");
    Serial.println(responseCode);
    http.end();

    return (responseCode >= 200 && responseCode < 300);
}
// ========================================
// POST REMINDER EVENT
// ========================================

// Called by main.ino every time checkReminder() fires.
// Creates a row in ReminderHistory with triggered_at set server-side.
bool sendReminderEvent(int userId, const char* reminderType) {
    if (!isNetworkConnected()) return false;

    String url = String(API_BASE_URL) + "/reminder-event";

    JsonDocument doc;
    doc["user_id"]       = userId;
    doc["reminder_type"] = reminderType;
    // acknowledged and acknowledged_at are set later via the dashboard

    String payload;
    serializeJson(doc, payload);

    HTTPClient http;
    http.begin(url);
    attachDeviceKey(http);

    int responseCode = http.POST(payload);
    http.end();

    return (responseCode >= 200 && responseCode < 300);
}