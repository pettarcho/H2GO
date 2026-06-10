using H2GO.API.Data;
using H2GO.API.Models;
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

    // Register Method!
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var existingUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email);


        if (existingUser != null)
            return BadRequest("Email already exists.");

        var user = new User
        {
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Role = "user",
            CreatedAt = DateTime.Now
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return Ok("User registered successfully!");
    }

    // Login Method!
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email);

        if (user == null)
            return BadRequest("Invalid email or password.");

        var passwordMatch = BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash);

        if (!passwordMatch)
            return BadRequest("Invalid email or password.");
        else
            return Ok("Login successful!");            
    }
}
