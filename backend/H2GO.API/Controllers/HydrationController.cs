using H2GO.API.Data;
using H2GO.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace H2GO.API.Controllers;

[ApiController]
[Route("api/hydration")]
public class HydrationController : ControllerBase
{
    private readonly H2GODbContext _context;

    public HydrationController(H2GODbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> PostHydrationReading(HydrationRequest request)
    {
        var deviceKey = Request.Headers["X-Device-Key"].ToString();

        var device = await _context.DeviceKeys
            .FirstOrDefaultAsync(d => d.Key == deviceKey && d.IsActive);

        if (device == null)
            return Unauthorized("Invalid or inactive device key.");

        var reading = new HydrationReading
        {
            DeviceId = device.Id,
            UserId = device.UserId,
            WeightGrams = request.WeightGrams,
            WaterConsumedMl = request.WaterConsumedMl,
            Timestamp = DateTime.Now
        };

        _context.HydrationReadings.Add(reading);
        await _context.SaveChangesAsync();

        return StatusCode(201, "Hydration reading saved.");
    }
}