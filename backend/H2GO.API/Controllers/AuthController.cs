using Microsoft.AspNetCore.Mvc;

namespace H2GO.API.Controllers;

[ApiController]
[Route("api/[controller]")]

public class AuthController : ControllerBase
{
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
