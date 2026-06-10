// reminder.ino

#include "config.h"

unsigned long lastReminderTime = 0;

// These values are loaded from the API at boot via fetchReminderSettings().
// The defaults below are fallbacks used only if the network is unavailable.
unsigned long REMINDER_INTERVAL = 1800000UL; // fallback: 30 min
bool          remindersEnabled  = true;

float goalML = 2000.0; // fallback; overridden by fetchGoalML() at boot

void reminderSetup() {
    pinMode(BUZZER_PIN, OUTPUT);
    digitalWrite(BUZZER_PIN, LOW);
    Serial.println("[REMINDER] Reminder system started.");
}

// Called from main.ino after a successful fetchGoalML().
void setGoalML(int ml) {
    goalML = (float)ml;
    Serial.print("[REMINDER] Goal set to: ");
    Serial.print(goalML);
    Serial.println(" ml");
}

// Called from main.ino after a successful fetchReminderSettings().
void applyReminderSettings(int intervalMinutes, bool enabled) {
    REMINDER_INTERVAL = (unsigned long)intervalMinutes * 60000UL;
    remindersEnabled  = enabled;
    Serial.print("[REMINDER] Interval set to: ");
    Serial.print(intervalMinutes);
    Serial.println(" min");
}

void buzzerBeep(int times) {
    for (int i = 0; i < times; i++) {
        digitalWrite(BUZZER_PIN, HIGH);
        delay(500);
        digitalWrite(BUZZER_PIN, LOW);
        delay(300);
    }
}

// Returns true if a reminder just fired, so main.ino can log the event.
bool checkReminder() {
    if (!remindersEnabled) return false;

    if (getDailyConsumption() >= goalML) {
        return false;
    }

    unsigned long currentMillis = millis();
    if (currentMillis - lastReminderTime >= REMINDER_INTERVAL) {
        lastReminderTime = currentMillis;

        float remaining = goalML - getDailyConsumption();
        Serial.println("[REMINDER] Time to drink water!");
        Serial.print("[REMINDER] Remaining: ");
        Serial.print(remaining);
        Serial.println(" ml");

        buzzerBeep(3);
        return true; // signal to main.ino that the event fired
    }

    return false;
}