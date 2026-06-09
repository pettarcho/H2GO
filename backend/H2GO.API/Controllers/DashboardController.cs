using Microsoft.AspNetCore.Mvc;
using H2GO.API.Data;
using Microsoft.EntityFrameworkCore;

namespace H2GO.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class DashboardController : ControllerBase
{
    private readonly H2GODbContext _context;

    public DashboardController(H2GODbContext context)
    {
        _context = context;
    }
    [HttpGet]
    public async Task<IActionResult> GetDashboard()
    {
        var goal = await _context.HydrationGoals.FirstOrDefaultAsync();
        return Ok(goal);
    }
}
