using CricketTournamentAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using CricketTournamentAPI.Repository;  
using CricketTournamentAPI.Services;    


var builder = WebApplication.CreateBuilder(args);

// Add Database Context with SQLite
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Controllers
builder.Services.AddControllers();

// Add Swagger Support
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Cricket Tournament API", Version = "v1" });
});

// Enable CORS (Allow Frontend Requests)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") 
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

//Registers services, ASP.NET Core can inject them automatically
builder.Services.AddScoped<ITournamentRepository, TournamentRepository>();
builder.Services.AddScoped<ITournamentService, TournamentService>();

var app = builder.Build();

// Enable Swagger UI (only in Development mode)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Cricket Tournament API v1");
        c.RoutePrefix = "swagger"; // Swagger UI at /swagger
    });
}

// Enable CORS
app.UseCors("AllowReactApp"); // Enable CORS Policy

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
