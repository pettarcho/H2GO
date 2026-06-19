using Microsoft.EntityFrameworkCore;
using H2GO.API.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Origins allowed to call this API. Defaults cover local dev + the deployed
// Vercel frontend. Override/extend via the "AllowedOrigins" env var on
// Railway (comma-separated) if you add more frontend domains later, e.g.:
//   AllowedOrigins=https://h2-go.vercel.app,https://another-domain.com
var defaultOrigins = new[]
{
    "http://localhost:5173",
    "https://h2-go.vercel.app"
};

var allowedOrigins = builder.Configuration["AllowedOrigins"]
    ?.Split(',', StringSplitOptions.TrimEntries | StringSplitOptions.RemoveEmptyEntries)
    ?? defaultOrigins;

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy => policy
        .WithOrigins(allowedOrigins)
        .AllowAnyMethod()
        .AllowAnyHeader());
});

builder.Services.AddDbContext<H2GODbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    ));

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("FrontendPolicy");

app.UseHttpsRedirection();
app.MapControllers();
app.Run();
