#include "config.h"

#define EEPROM_SIZE 4
#define EEPROM_ADDR 0

HX711 scale;

void saveCalibration(float factor) {
    EEPROM.put(EEPROM_ADDR, factor);
    EEPROM.commit();
    Serial.println("[LOADCELL] Calibration saved.");
}

float loadCalibration() {
    float factor;
    EEPROM.get(EEPROM_ADDR, factor);
    return factor;
}
void loadcellSetup() {
    EEPROM.begin(EEPROM_SIZE);
    scale.begin(LOADCELL_DT, LOADCELL_SCK);

    float saved_factor = loadCalibration();

    if (!isnan(saved_factor) && saved_factor != 0
        && saved_factor > -1000000 && saved_factor < 1000000) {

        Serial.print("[LOADCELL] Calibration loaded: ");
        Serial.println(saved_factor);
        scale.set_scale(saved_factor);
        delay(500);
        scale.tare();
        Serial.println("[LOADCELL] Tare OK. Ready.");

    } else {
        Serial.println("[LOADCELL] No valid calibration found.");
        Serial.println("[LOADCELL] Remove all weight...");
        delay(3000);
        scale.tare();
        Serial.println("[LOADCELL] Place exactly 1L of water (1000 g)...");
        delay(5000);

        long raw = scale.get_value(10);
        float calibration_factor = raw / 1000.0;
        scale.set_scale(calibration_factor);
        saveCalibration(calibration_factor);

        Serial.print("[LOADCELL] Calibration factor: ");
        Serial.println(calibration_factor);
        Serial.println("[LOADCELL] Calibration complete.");
    }
}

float getLiters() {
    float weight = scale.get_units(10);
    return weight / 1000.0;
}