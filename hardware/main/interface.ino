// interface.ino
// OLED display module for H2Go – 128x32 SSD1306 via I2C
// Default I2C pins on ESP32: SDA = GPIO 21, SCL = GPIO 22

#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define OLED_WIDTH   128
#define OLED_HEIGHT   32
#define OLED_RESET    -1   // shared reset with ESP32; -1 disables it
#define OLED_ADDRESS 0x3C  // most common I2C address for 128x32 modules

static Adafruit_SSD1306 display(OLED_WIDTH, OLED_HEIGHT, &Wire, OLED_RESET);

// Duration (ms) for which the reminder screen stays visible
static const unsigned long REMINDER_SCREEN_DURATION = 5000UL;

// Internal state
static bool          oledReady          = false;
static bool          reminderScreenActive = false;
static unsigned long reminderScreenStart = 0;

// ========================================
// INITIALISATION
// ========================================

void interfaceSetup() {
    if (!display.begin(SSD1306_SWITCHCAPVCC, OLED_ADDRESS)) {
        Serial.println("[OLED] Display not found – check wiring.");
        oledReady = false;
        return;
    }
    oledReady = true;
    display.setTextWrap(false);
    display.clearDisplay();

    // Boot screen
    display.setTextSize(1);
    display.setTextColor(SSD1306_WHITE);
    display.setCursor(28, 4);
    display.println("H2Go");
    display.setCursor(16, 16);
    display.println("Initialising...");
    display.display();
    Serial.println("[OLED] Display ready.");
}
// ========================================
// REMINDER SCREEN
// ========================================
// Called from main.ino when checkReminder() returns true.
// Displays a full-screen reminder message for REMINDER_SCREEN_DURATION ms.
void showReminderScreen() {
    if (!oledReady) return;

    reminderScreenActive = true;
    reminderScreenStart  = millis();

    display.clearDisplay();

    // Large top line
    display.setTextSize(2);
    display.setTextColor(SSD1306_WHITE);
    display.setCursor(8, 0);
    display.println("Drink!");

    // Small bottom line with remaining amount
    float remaining = goalML - getDailyConsumption();
    if (remaining < 0.0) remaining = 0.0;
    display.setTextSize(1);
    display.setCursor(0, 24);
    display.print((int)remaining);
    display.print(" ml remaining");
    display.display();
}
// ========================================
// STATUS SCREEN
// ========================================
// Draws the normal operating screen:
//   Row 1: progress bar + percentage
//   Row 2: current weight or "No bottle" message
void showStatusScreen(float consumedML, float currentWeightG) {
    if (!oledReady) return;
    if (reminderScreenActive) return; // do not overwrite an active reminder

    display.clearDisplay();

    // --- Progress bar (row 1, y = 0..13) ---
    float pct = 0.0;
    if (goalML > 0.0) pct = (consumedML / goalML) * 100.0;
    if (pct > 100.0)  pct = 100.0;

    int barWidth = (int)((pct / 100.0) * 112.0); // 112 px for bar, 16 reserved for text

    // Outline
    display.drawRect(0, 0, 112, 13, SSD1306_WHITE);
    // Fill
    if (barWidth > 0) {
        display.fillRect(1, 1, barWidth > 110 ? 110 : barWidth, 11, SSD1306_WHITE);
    }
    // Percentage label to the right of the bar
    display.setTextSize(1);
    display.setTextColor(SSD1306_WHITE);
    display.setCursor(114, 3);
    // Two-digit percentage to fit the 16 px space; cap display at 99 to keep one digit
    if ((int)pct == 100) {
        display.print("OK");
    } else {
        display.print((int)pct);
        display.print("%");
    }

    // --- Status line (row 2, y = 17..31) ---
    display.setCursor(0, 18);
    if (currentWeightG < 50.0) {
        display.print("No bottle detected");
    } else {
        display.print((int)consumedML);
        display.print(" / ");
        display.print((int)goalML);
        display.print(" ml");
    }

    display.display();
}
// ========================================
// WIFI STATUS SCREEN
// ========================================
// Called from main.ino during boot while WiFi is connecting,
// and optionally when a reconnect attempt begins.
void showWifiStatus(bool connected) {
    if (!oledReady) return;

    display.clearDisplay();
    display.setTextSize(1);
    display.setTextColor(SSD1306_WHITE);

    display.setCursor(0, 4);
    display.println("Network:");
    display.setCursor(0, 18);
    display.println(connected ? "Connected" : "Connecting...");

    display.display();
}
// ========================================
// UPDATE – called every loop iteration
// ========================================

// Manages the reminder screen timeout: once REMINDER_SCREEN_DURATION
// has elapsed, clears the flag so the next showStatusScreen() call
// can overwrite it.
void interfaceUpdate() {
    if (!reminderScreenActive) return;

    if (millis() - reminderScreenStart >= REMINDER_SCREEN_DURATION) {
        reminderScreenActive = false;
    }
}