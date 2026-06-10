using H2GO.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace H2GO.API.Controllers;

[ApiController]
[Route("api/goals")]
public class GoalsController : ControllerBase
{
    private readonly H2GODbContext _context;

    public GoalsController(H2GODbContext context)
    {
        _context = context;
    }

    [HttpGet("active")]
    public async Task<IActionResult> GetActiveGoal()
    {
        var deviceKey = Request.Headers["X-Device-Key"].ToString();

        var device = await _context.DeviceKeys
            .FirstOrDefaultAsync(d => d.Key == deviceKey && d.IsActive);

        if (device == null)
            return Unauthorized("Invalid or inactive device key.");

        var goal = await _context.HydrationGoals
            .Where(g => g.UserId == device.UserId && g.Active)
            .OrderByDescending(g => g.CreatedAt)
            .FirstOrDefaultAsync();

        if (goal == null)
            return NotFound("No active goal found.");
        else
            return Ok(new { daily_goal_ml = goal.DailyGoalMl });    
    }
}
