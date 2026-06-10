#include <HX711.h>


/*
========================================
MAIN MODULE
H2Go Smart Water Bottle – Base Station
========================================
Responsibilities:
  - Hardware initialisation (setup)
  - Main execution loop (loop)
  - Orchestration of all sub-modules:
      loadcell   → raw weight reading
      hydration  → consumption tracking and daily reset
      reminder   → buzzer and goal logic
      network    → WiFi and HTTP POST/GET
========================================
*/
#include "config.h"

static unsigned long lastSensorRead = 0;
static unsigned long lastNetworkSend = 0;

// ========================================
// FORWARD DECLARATIONS
// ========================================

void  loadcellSetup();
float getLiters();

void  hydrationSetup();
void  updateHydration(float currentReading);
float getDailyConsumption();

void  reminderSetup();
bool  checkReminder();           // now returns bool
void  setGoalML(int ml);
void  applyReminderSettings(int intervalMinutes, bool enabled);
extern float goalML;

void  connectWiFi();
void  maintainWiFi();
bool  sendHydrationData(int userId, float currentWeightG, float consumedTodayML);
bool  sendReminderEvent(int userId, const char* reminderType);
int   fetchGoalML();
bool  fetchReminderSettings(int& intervalMinutes, bool& enabled);

void interfaceSetup();
void showStatusScreen(float consumedML, float currentWeightG);
void showWifiStatus(bool connected);
void showReminderScreen();
void interfaceUpdate();

void setup() {
    Serial.begin(115200);
    delay(500);

    Serial.println("========================================");
    Serial.println(" H2Go Smart Bottle – Booting");
    Serial.println("========================================");

    loadcellSetup();
    hydrationSetup();
    reminderSetup();
    interfaceSetup();
    connectWiFi();
    showWifiStatus(isNetworkConnected());

    // Fetch goal and reminder settings from the API.
    // If the network is unavailable at boot, the fallback defaults
    // defined in reminder.ino remain active.
    int fetchedGoal = fetchGoalML();
    if (fetchedGoal > 0) {
        setGoalML(fetchedGoal);
    }

    int  intervalMin = 30;
    bool enabled     = true;
    if (fetchReminderSettings(intervalMin, enabled)) {
        applyReminderSettings(intervalMin, enabled);
    }

    Serial.println("[MAIN] Boot complete.");
}

void loop() {
    unsigned long now = millis();

    maintainWiFi();
    interfaceUpdate();

    // Sensor read and hydration update
    if (now - lastSensorRead >= SENSOR_INTERVAL) {
        lastSensorRead = now;

        float liters         = getLiters();
        float currentWeightG = liters * 1000.0;
        updateHydration(liters);
        showStatusScreen(getDailyConsumption(), getLiters() * 1000.0);

        Serial.print("[MAIN] Weight: ");
        Serial.print(currentWeightG, 1);
        Serial.print(" g  |  Daily: ");
        Serial.print(getDailyConsumption(), 1);
        Serial.println(" ml");
    }

    // Reminder check – if it fires, log the event to the backend
    if (checkReminder()) {
        sendReminderEvent(USER_ID, "interval");
        showReminderScreen();
    }

    // Network send of hydration reading
    if (now - lastNetworkSend >= SEND_INTERVAL) {
        lastNetworkSend = now;

        float consumedML     = getDailyConsumption();
        float currentWeightG = getLiters() * 1000.0;

        bool ok = sendHydrationData(USER_ID, currentWeightG, consumedML);
        Serial.println(ok ? "[MAIN] Data sent." : "[MAIN] Send failed.");
    }
}