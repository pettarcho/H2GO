namespace H2GO.API.Models;

public class ReminderHistory
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public DateTime TriggeredAt { get; set; }
    public bool Acknowledged { get; set; }
    public DateTime? AcknowledgedAt { get; set; }
    public string ReminderType { get; set; } = string.Empty;
}
