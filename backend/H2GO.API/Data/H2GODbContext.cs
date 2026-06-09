using Microsoft.EntityFrameworkCore;
using H2GO.API.Models;

namespace H2GO.API.Data;

public class H2GODbContext : DbContext
{
    public H2GODbContext(DbContextOptions<H2GODbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<HydrationGoal> HydrationalGoals { get; set; }
    public DbSet<DeviceKey> DevieKeys { get; set; }
    public DbSet<HydrationReading> Hydrationreadings { get; set; }
    public DbSet<ReminderSetting> ReminderSettings { get; set; }
    public DbSet<ReminderHistory> ReminderHistories { get; set; }
    public DbSet<SecurityLog> SecurityLogs { get; set; }
}
