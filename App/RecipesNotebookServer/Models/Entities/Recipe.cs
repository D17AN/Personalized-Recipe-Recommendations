using System.ComponentModel.DataAnnotations;

namespace RecipesNotebookServer.Models.Entities
{
    public class Recipe
    {
        [Range(0, long.MaxValue, ErrorMessage = "User id out of range!")]
        public long Id { get; set; }

        [MaxLength(256, ErrorMessage = "Meal name too long!")]
        public string Name { get; set; } = null!;

        [MaxLength(5000, ErrorMessage = "Description too long!")]
        public string Description { get; set; } = null!;

        [MaxLength(256, ErrorMessage = "Meal type too long!")]
        public string MealType { get; set; } = null!;

        [Range(0, int.MaxValue, ErrorMessage = "Time value out of range!")]
        public int TotalTime { get; set; }

        [MaxLength(256, ErrorMessage = "Diet too long!")]
        public String Diet { get; set; } = null!;

        [MaxLength(256, ErrorMessage = "Difficulty length too long!")]
        [RegularExpression("^(easy|more-effort|a-challenge)$", ErrorMessage = "The difficulty must be easy, more-effort, a-challenge")]
        public String Difficulty { get; set; } = null!;

        [Range(0, int.MaxValue, ErrorMessage = "Calories out of range!")]
        public int Calories { get; set; }

        [Range(0, long.MaxValue, ErrorMessage = "User id out of range!")]
        public long UserId { get; set; }

        public virtual User User { get; set; } = null!;


    }
}
