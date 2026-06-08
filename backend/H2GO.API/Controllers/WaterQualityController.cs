using Microsoft.AspNetCore.Mvc;

namespace H2GO.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class WaterQualityController : ControllerBase
{
    [HttpGet]
    public IActionResult GetWaterQuality()
    {
        return Ok("Water quality is working!");
    }
}
