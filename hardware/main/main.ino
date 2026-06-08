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
      network    → WiFi and HTTP POST
========================================
*/
#include <Arduino.h>
// ========================================
// CONFIGURATION – adjust before flashing
// ========================================
static const int USER_ID = 1;

// How often (ms) to read the scale and update hydration state.
static const unsigned long SENSOR_INTERVAL = 2000UL;
// How often (ms) to POST data to the backend.
static const unsigned long SEND_INTERVAL = 60000UL;

// ========================================
// STATE
// ========================================
static unsigned long lastSensorRead = 0;
static unsigned long lastNetworkSend = 0;
// ========================================
// FORWARD DECLARATIONS
// ========================================
float getLiters();
void  loadcellSetup();

void  hydrationSetup();
void  updateHydration(float currentReading);
float getDailyConsumption();

void  reminderSetup();
void  checkReminder();
extern float goalML;

void  connectWiFi();
void  maintainWiFi();
bool  sendHydrationData(int userId,
                        float currentWeightG,
                        float waterRemainingML,
                        float consumedTodayML,
                        float goalML,
                        bool  reminderActive);

void setup() {
    Serial.begin(115200);
    delay(500);

    Serial.println("========================================");
    Serial.println(" H2Go Smart Bottle – Booting");
    Serial.println("========================================");

    loadcellSetup();   // includes EEPROM init, tare, calibration
    hydrationSetup();  // captures baseline reading
    reminderSetup();   // configures buzzer pin
    connectWiFi();     // network last, hardware must be ready first

    Serial.println("[MAIN] Boot complete.");
}

void loop() {
    unsigned long now = millis();
    // WiFi watchdog – non-blocking reconnect
    maintainWiFi();
    // Sensor read and hydration update
    if (now - lastSensorRead >= SENSOR_INTERVAL) {
        lastSensorRead = now;

        float liters         = getLiters();
        float currentWeightG = liters * 1000.0;

        updateHydration(liters);

        Serial.print("[MAIN] Weight: ");
        Serial.print(currentWeightG, 1);
        Serial.print(" g  |  Daily: ");
        Serial.print(getDailyConsumption(), 1);
        Serial.println(" ml");
    }
    // Reminder check – interval gate is inside checkReminder()
    checkReminder();
    // Network send
    if (now - lastNetworkSend >= SEND_INTERVAL) {
        lastNetworkSend = now;

        float consumedML     = getDailyConsumption();
        float currentWeightG = getLiters() * 1000.0;
        float remainingML    = goalML - consumedML;
        if (remainingML < 0.0) remainingML = 0.0;
        bool reminderActive = (consumedML < goalML);
        bool ok = sendHydrationData(
            USER_ID,
            currentWeightG,
            remainingML,
            consumedML,
            goalML,
            reminderActive
        );
        Serial.println(ok ? "[MAIN] Data sent." : "[MAIN] Send failed – will retry.");
    }
}