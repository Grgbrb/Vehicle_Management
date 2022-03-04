using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Interfaces;
using API.Entities;
using API.Dtos;
using NSwag;
using NSwag.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddScoped<IVehicleService, vehiclerepository>();
builder.Services.AddControllers();
builder.Services.AddCors();
builder.Services.AddDbContext<DataContext>(options => options.UseSqlServer(
  builder.Configuration.GetConnectionString("DefaultConnection"),
  sqlServerOptionsAction : options =>{
    options.EnableRetryOnFailure();
  }
    ));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSwaggerDocument();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

   // app.UseSwagger();
    app.UseOpenApi();
    app.UseSwaggerUi3();
}

app.UseHttpsRedirection();
  
app.UseRouting();

app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:4200"));

app.UseAuthorization();

app.MapControllers();

app.Run();
