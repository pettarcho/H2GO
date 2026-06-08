// reminders.ino

#define BUZZER_PIN 27

// NOTE: currently set to 20 s for testing purposes.
// Change to 1800000UL (30 min) before production deployment.

unsigned long lastReminderTime = 0;
const unsigned long REMINDER_INTERVAL = 20000UL; // 30 minutes in ms

// Goal options: 1L = 1000ml, 2L = 2000ml, 3L = 3000ml
// This will be set by the web app
float goalML = 2000.0; // default 2L

void reminderSetup() {
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);
  Serial.println("Reminder system started!");
  Serial.print("Current goal: ");
  Serial.print(goalML);
  Serial.println(" ml");
}

void setGoal(int liters) {
  if (liters == 1) goalML = 1000.0;
  else if (liters == 2) goalML = 2000.0;
  else if (liters == 3) goalML = 3000.0;

  Serial.print("Goal set to: ");
  Serial.print(goalML);
  Serial.println(" ml");
}

void buzzerBeep(int times) {
  for (int i = 0; i < times; i++) {
    digitalWrite(BUZZER_PIN, HIGH);
    delay(500);
    digitalWrite(BUZZER_PIN, LOW);
    delay(300);
  }
}

void checkReminder() {
  // Stop reminders if goal is reached
  if (getDailyConsumption() >= goalML) {
    Serial.println("Goal reached! No more reminders.");
    return;
  }

  unsigned long currentMillis = millis();
  if (currentMillis - lastReminderTime >= REMINDER_INTERVAL) {
    lastReminderTime = currentMillis;

    float remaining = goalML - getDailyConsumption();
    Serial.println("REMINDER: Time to drink water!");
    Serial.print("Remaining to goal: ");
    Serial.print(remaining);
    Serial.println(" ml");

    buzzerBeep(3);
  }
}