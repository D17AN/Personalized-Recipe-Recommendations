using Microsoft.EntityFrameworkCore;
using RecipesNotebookServer.Models.Entities;

namespace RecipesNotebookServer.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> option) : base(option)
        {
            
        }

        public virtual DbSet<User> Users { get; set; }

        public virtual DbSet<Recipe> Recipes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Recipe>(entity =>
            {
                entity.ToTable("Recipes");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                    .IsRequired();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.Property(e => e.Description)
                    .HasMaxLength(5000);

                entity.Property(e => e.MealType)
                    .HasMaxLength(256);

                entity.Property(e => e.TotalTime)
                    .IsRequired();

                entity.Property(e => e.Diet)
                    .HasMaxLength(256);

                entity.Property(e => e.Difficulty)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.Property(e => e.Calories)
                    .IsRequired();

                entity.HasOne(e => e.User)
                    .WithMany(u => u.Recipes)
                    .HasForeignKey(e => e.UserId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("Users");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                    .IsRequired();

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.Property(e => e.HashedPassword)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.Property(e => e.Salt)
                    .HasMaxLength(16);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
