using Microsoft.AspNetCore.Mvc;
using H2GO.API.Data;
using Microsoft.EntityFrameworkCore;


namespace H2GO.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class AnalyticsController : ControllerBase
{
    private readonly H2GODbContext _context;
    public AnalyticsController(H2GODbContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<IActionResult> GetWeeklyAnalytics()
    {
        var sevenDaysAgo = DateTime.Now.AddDays(-7);

        var readings = await _context.HydrationReadings
            .Where(r => r.Timestamp >= sevenDaysAgo)
            .ToListAsync();
        return Ok(readings);
    }
}
