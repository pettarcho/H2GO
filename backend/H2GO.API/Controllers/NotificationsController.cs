using H2GO.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace H2GO.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class NotificationsController : ControllerBase
{
    private readonly H2GODbContext _context;

    public NotificationsController(H2GODbContext context)
    {
        _context = context;
    }
    [HttpGet]
    public IActionResult GetNotifications()
    {
        return Ok("Notifications is working!");
    }
}
