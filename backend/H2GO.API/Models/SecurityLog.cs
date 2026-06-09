namespace H2GO.API.Models;

public class SecurityLog
{
    public int Id { get; set; }
    public string EventType { get; set; } = string.Empty;
    public string DeviceKey { get; set; } = string.Empty;
    public string IpAddress { get; set; } = string.Empty;
    public string Details { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
