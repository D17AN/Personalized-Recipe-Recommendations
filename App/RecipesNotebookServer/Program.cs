
using Microsoft.EntityFrameworkCore;
using RecipesNotebookServer.Models;
using RecipesNotebookServer.Repository.RecipeRepository;
using RecipesNotebookServer.Repository.UserRepository;
using System.Configuration;

namespace RecipesNotebookServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            
            IConfiguration configuration = new ConfigurationBuilder()
                .SetBasePath(builder.Environment.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .Build();

            string? databaseConnectionString = configuration.GetConnectionString("DatabaseConnection");
            
            builder.Services.AddDbContext<ApplicationDbContext>
                (options => 
                    options.UseSqlite(databaseConnectionString)
                    .UseLazyLoadingProxies()
                    );

            //Add here the services
            builder.Services.AddTransient<IUserRepository, UserRepository>();
            builder.Services.AddTransient<IRecipeRepository, RecipeRepository>();

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin() // You can restrict origins here if needed
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.UseCors();
            app.MapControllers();
            app.Run();
        }
    }
}
