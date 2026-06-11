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
    public DbSet<HydrationGoal> HydrationGoals { get; set; }
    public DbSet<DeviceKey> DeviceKeys { get; set; }
    public DbSet<HydrationReading> HydrationReadings { get; set; }
    public DbSet<ReminderSetting> ReminderSettings { get; set; }
    public DbSet<ReminderHistory> ReminderHistories { get; set; }
    public DbSet<SecurityLog> SecurityLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("users");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.PasswordHash).HasColumnName("password_hash");
            entity.Property(e => e.Role).HasColumnName("role");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
        });

        modelBuilder.Entity<UserProfile>(entity =>
        {
            entity.ToTable("userprofile");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.FullName).HasColumnName("full_name");
            entity.Property(e => e.UserType).HasColumnName("user_type");
            entity.Property(e => e.DateOfBirth).HasColumnName("date_of_birth");
            entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
        });

        modelBuilder.Entity<HydrationGoal>(entity =>
        {
            entity.ToTable("hydrationgoals");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.DailyGoalMl).HasColumnName("daily_goal_ml");
            entity.Property(e => e.GoalType).HasColumnName("goal_type");
            entity.Property(e => e.Active).HasColumnName("active");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
        });

        modelBuilder.Entity<DeviceKey>(entity =>
        {
            entity.ToTable("devicekeys");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Key).HasColumnName("device_key");
            entity.Property(e => e.DeviceName).HasColumnName("device_name");
            entity.Property(e => e.IsActive).HasColumnName("is_active");
            entity.Property(e => e.RegisteredAt).HasColumnName("registered_at");
        });

        modelBuilder.Entity<HydrationReading>(entity =>
        {
            entity.ToTable("hydrationreadings");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.DeviceId).HasColumnName("device_id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.WeightGrams).HasColumnName("weight_grams");
            entity.Property(e => e.WaterConsumedMl).HasColumnName("water_consumed_ml");
            entity.Property(e => e.Timestamp).HasColumnName("timestamp");
        });

        modelBuilder.Entity<ReminderSetting>(entity =>
        {
            entity.ToTable("remindersettings");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.ReminderIntervalMinutes).HasColumnName("reminder_interval_minutes");
            entity.Property(e => e.AlertMode).HasColumnName("alert_mode");
            entity.Property(e => e.RemindersEnabled).HasColumnName("reminders_enabled");
            entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
        });

        modelBuilder.Entity<ReminderHistory>(entity =>
        {
            entity.ToTable("reminderhistory");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.TriggeredAt).HasColumnName("triggered_at");
            entity.Property(e => e.Acknowledged).HasColumnName("acknowledged");
            entity.Property(e => e.AcknowledgedAt).HasColumnName("acknowledged_at").IsRequired(false);
            entity.Property(e => e.ReminderType).HasColumnName("reminder_type");
        });

        modelBuilder.Entity<SecurityLog>(entity =>
        {
            entity.ToTable("securitylog");
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.EventType).HasColumnName("event_type");
            entity.Property(e => e.DeviceKey).HasColumnName("device_key");
            entity.Property(e => e.IpAddress).HasColumnName("ip_address");
            entity.Property(e => e.Details).HasColumnName("details");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
        });
    }
}
