using Microsoft.AspNetCore.Mvc;

namespace H2GO.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class NotificationsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetNotifications()
    {
        return Ok("Notifications is working!");
    }
}
