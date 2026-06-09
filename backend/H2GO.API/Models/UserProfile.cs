namespace H2GO.API.Models;

public class UserProfile
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string FullName { get; set; } = string.Empty;
    public string UserType { get; set; } = string.Empty;
    public DateTime DateOfBirth { get; set; }
    public DateTime UpdatedAt { get; set; }
}
