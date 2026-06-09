namespace H2GO.API.Models;

public class ReminderSetting
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int ReminderIntervalMinutes { get; set; }
    public string AlertMode { get; set; } = string.Empty;
    public bool RemindersEnabled { get; set; }
    public DateTime UpdatedAt { get; set; }
}
