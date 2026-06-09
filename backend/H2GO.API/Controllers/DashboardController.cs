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
    public IActionResult GetDashboard()
    {
        return Ok("Dashboard is working!");
    }
}
