using System.ComponentModel.DataAnnotations;

namespace RecipesNotebookServer.Models.Entities
{
    public class User
    {
        [Range(0, long.MaxValue, ErrorMessage = "User id out of range!")]
        public long Id { get; set; }

        [MaxLength(256, ErrorMessage = "User name too long!")]
        public string Name { get; set; } = null!;

        [MaxLength(256, ErrorMessage = "User email too long!")]
        [EmailAddress(ErrorMessage = "User email must be a valid email!")]
        public string Email { get; set; } = null!;

        [MaxLength(256, ErrorMessage = "Password too long!")]
        public string HashedPassword { get; set; } = null!;

        [MinLength(16, ErrorMessage = "The salt must have 16 characters!")]
        [MaxLength(16, ErrorMessage = "The salt must have 16 characters!")]
        public string? Salt { get; set; }

        public virtual ICollection<Recipe> Recipes { get; set; } = new List<Recipe>();
    }
}
