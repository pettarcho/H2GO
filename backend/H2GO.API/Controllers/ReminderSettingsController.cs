using H2GO.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace H2GO.API.Controllers;

[ApiController]
[Route("api/reminder-settings")]
public class ReminderSettingsController : ControllerBase
{
    private readonly H2GODbContext _context;

    public ReminderSettingsController(H2GODbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetReminderSettings()
    {
        var deviceKey = Request.Headers["X-Device-Key"].ToString();

        var device = await _context.DeviceKeys
            .FirstOrDefaultAsync(d => d.Key == deviceKey && d.IsActive);

        if (device == null)
            return Unauthorized("Invalid or inactive device key.");

        var settings = await _context.ReminderSettings
            .FirstOrDefaultAsync(s => s.UserId == device.UserId);

        if (settings == null)
            return NotFound("No reminder settings found.");
        else
            return Ok(new { reminder_interval_minutes = settings.ReminderIntervalMinutes, reminders_enabled = settings.RemindersEnabled });

    }
}
