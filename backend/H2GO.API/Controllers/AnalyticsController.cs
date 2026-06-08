using Microsoft.AspNetCore.Mvc;

namespace H2GO.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class AnalyticsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetWeeklyAnalytics()
    {
        return Ok("Weekly analytics is working!");
    }
}
