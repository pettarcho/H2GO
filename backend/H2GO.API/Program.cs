using Microsoft.EntityFrameworkCore;
using H2GO.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Railway assigns a port via the PORT env var and routes its public domain
// to it. Without this, Kestrel listens on the default/launchSettings port,
// which Railway's proxy can't reach — the container shows as "running" but
// every request from outside fails (looks like "Failed to fetch" in the
// browser). Locally, PORT isn't set, so launchSettings.json still applies.
var railwayPort = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrEmpty(railwayPort))
{
    builder.WebHost.UseUrls($"http://0.0.0.0:{railwayPort}");
}

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

// No EF Core migrations exist yet for this project. On startup, create the
// database schema from the current models if it doesn't already exist.
// This only acts on a completely empty database — if any tables are already
// present (e.g. from a prior run), it's a no-op. Once you set up real EF Core
// migrations, replace this with `db.Database.Migrate();`.
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<H2GODbContext>();
    db.Database.EnsureCreated();
}

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("FrontendPolicy");

// Railway terminates HTTPS at its edge and forwards plain HTTP to the
// container. Redirecting to HTTPS inside the container would point at a
// port nothing is listening on, breaking every request. Only redirect
// locally, where you're actually running both an http and https profile.
if (app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}
app.MapControllers();
app.Run();
