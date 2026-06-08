#include "HX711.h"
#include <EEPROM.h>

#define DT 18
#define SCK 19
#define EEPROM_SIZE 4
#define EEPROM_ADDR 0

HX711 scale;

void saveCalibration(float factor) {
  EEPROM.put(EEPROM_ADDR, factor);
  EEPROM.commit();
  Serial.println("Calibration factor saved to EEPROM!");
}

float loadCalibration() {
  float factor;
  EEPROM.get(EEPROM_ADDR, factor);
  return factor;
}

void setup() {
  Serial.begin(115200);
  EEPROM.begin(EEPROM_SIZE);
  scale.begin(DT, SCK);

  float saved_factor = loadCalibration();

  if (!isnan(saved_factor) && saved_factor != 0 && saved_factor > -1000000 && saved_factor < 1000000) {
    Serial.print("Calibration factor loaded from EEPROM: ");
    Serial.println(saved_factor);
    scale.set_scale(saved_factor);
    delay(500);
    scale.tare();
    Serial.println("Tare OK! Ready!");
  } else {
    Serial.println("Remove all weight from scale...");
    delay(3000);
    scale.tare();
    Serial.println("Tare OK! Place exactly 1L of water (1000g)...");
    delay(5000);

    long raw = scale.get_value(10);
    float calibration_factor = raw / 1000.0;
    scale.set_scale(calibration_factor);
    saveCalibration(calibration_factor);

    Serial.print("Calibration factor: ");
    Serial.println(calibration_factor);
    Serial.println("Calibration complete!");
  }
}

// Call this function to get the current volume in liters
float getLiters() {
  float weight = scale.get_units(10); // no is_ready() check
  float liters = weight / 1000.0;
  return liters;
}

void loop() {
  float liters = getLiters();
  Serial.print("Volume: ");
  Serial.print(liters, 3);
  Serial.println(" L");
  delay(1000);
}