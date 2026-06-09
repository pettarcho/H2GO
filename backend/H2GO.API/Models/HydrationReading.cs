namespace H2GO.API.Models;

public class HydrationReading
{
    public int Id { get; set; }
    public int DeviceId { get; set; }
    public int UserId { get; set; }
    public float WeightGrams { get; set; }
    public float WaterConsumedMl { get; set; }
    public DateTime Timestamp { get; set; }
}
