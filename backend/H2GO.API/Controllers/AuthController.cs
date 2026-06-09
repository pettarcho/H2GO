using H2GO.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace H2GO.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class AuthController : ControllerBase
{
    private readonly H2GODbContext _context;

    public AuthController(H2GODbContext context)
    {
        _context = context;
    }
    [HttpPost("register")]
    public IActionResult Register()
    {
        return Ok("Register is working!");
    }

    [HttpPost("login")]
    public IActionResult Login()
    {
        return Ok("Login is working!");
    }
}
