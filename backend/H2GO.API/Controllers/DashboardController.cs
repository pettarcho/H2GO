using Microsoft.AspNetCore.Mvc;

namespace H2GO.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class DashboardController : ControllerBase
{
    [HttpGet]
    public IActionResult GetDashboard()
    {
        return Ok("Dashboard is working!");
    }
}
