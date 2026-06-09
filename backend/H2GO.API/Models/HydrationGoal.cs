namespace H2GO.API.Models;

public class HydrationGoal
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int DailyGoalMl { get; set; }
    public string GoalType { get; set; } = string.Empty;
    public bool Active { get; set; }
    public DateTime CreatedAt { get; set; }
}
