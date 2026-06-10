namespace H2GO.API.Models;

public class ReminderEventRequest
{
    public int UserId { get; set; }
    public string ReminderType { get; set; } = string.Empty;
}
