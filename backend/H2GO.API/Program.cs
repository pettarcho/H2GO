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

// Prefer a connection string built from Railway's individual MySQL env vars
// (MYSQLHOST/MYSQLPORT/MYSQLUSER/MYSQLPASSWORD/MYSQLDATABASE), falling back
// to the "DefaultConnection" value in appsettings.json for local dev.
var mysqlHost = builder.Configuration["MYSQLHOST"];
string connectionString;

if (!string.IsNullOrEmpty(mysqlHost))
{
    var mysqlPort = builder.Configuration["MYSQLPORT"] ?? "3306";
    var mysqlUser = builder.Configuration["MYSQLUSER"];
    var mysqlPassword = builder.Configuration["MYSQLPASSWORD"];
    var mysqlDatabase = builder.Configuration["MYSQLDATABASE"];

    connectionString =
        $"Server={mysqlHost};Port={mysqlPort};Database={mysqlDatabase};User={mysqlUser};Password={mysqlPassword};";
}
else
{
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("No database connection configured.");
}

builder.Services.AddDbContext<H2GODbContext>(options =>
    options.UseMySql(
        connectionString,
        ServerVersion.AutoDetect(connectionString)
    ));

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("FrontendPolicy");

app.UseHttpsRedirection();
app.MapControllers();
app.Run();
