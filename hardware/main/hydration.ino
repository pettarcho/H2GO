// hydration.ino

#include "config.h"

float lastReading = 0.0;
float dailyConsumption = 0.0;
unsigned long lastMidnightCheck = 0;

void hydrationSetup() {
  lastReading = getLiters();
  lastMidnightCheck = millis();
  Serial.println("Hydration tracking started!");
}

void checkMidnightReset() {
  unsigned long currentMillis = millis();
  if (currentMillis - lastMidnightCheck >= 86400000UL) {
    dailyConsumption = 0.0;
    lastMidnightCheck = currentMillis;
    Serial.println("Midnight reset! Daily consumption cleared.");
  }
}

void updateHydration(float currentReading) {
  checkMidnightReset();

  if (currentReading < 0.05) {
    Serial.println("No bottle detected, skipping...");
    return;
  }

  float delta = lastReading - currentReading;
  lastReading = currentReading;

  if (delta > 0.01) {
    float deltaML = delta * 1000.0;
    dailyConsumption += deltaML;

    Serial.print("Consumed: ");
    Serial.print(deltaML, 1);
    Serial.println(" ml");

    Serial.print("Daily total: ");
    Serial.print(dailyConsumption, 1);
    Serial.println(" ml");
  }
}

float getDailyConsumption() {
  return dailyConsumption;
}