using H2GO.API.Data;
using H2GO.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace H2GO.API.Controllers;

[ApiController]
[Route("api/reminder-event")]
public class ReminderEventController : ControllerBase
{
    private readonly H2GODbContext _context;

    public ReminderEventController(H2GODbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> PostReminderEvent(ReminderEventRequest request)
    {
        var deviceKey = Request.Headers["X-Device-Key"].ToString();

        var device = await _context.DeviceKeys
            .FirstOrDefaultAsync(d => d.Key == deviceKey && d.IsActive);

        if (device == null)
            return Unauthorized("Invalid or inactive device key.");

        var reminder = new ReminderHistory
        {
            UserId = request.UserId,
            TriggeredAt = DateTime.Now,
            Acknowledged = false,
            AcknowledgedAt = null,
            ReminderType = request.ReminderType,
        };

        _context.ReminderHistories.Add(reminder);
        await _context.SaveChangesAsync();

        return StatusCode(201, "Reminder event logged.");
    }
}
