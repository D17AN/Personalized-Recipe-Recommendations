using RecipesNotebookServer.Models.Entities;
using System.ComponentModel.DataAnnotations;

namespace RecipesNotebookServer.Models.DTOs
{
    public class RecipeDTO
    {
        public long Id { get; set; }

        public string Name { get; set; } = null!;

        public string Description { get; set; } = null!;

        public string MealType { get; set; } = null!;

        public int TotalTime { get; set; }

        public String Diet { get; set; } = null!;

        public String Difficulty { get; set; } = null!;

        public int Calories { get; set; }
       
    }
}
