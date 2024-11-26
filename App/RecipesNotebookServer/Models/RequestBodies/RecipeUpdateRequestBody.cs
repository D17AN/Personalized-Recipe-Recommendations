namespace RecipesNotebookServer.Models.RequestBodies
{
    public class RecipeUpdateRequestBody
    {
        public string? Name { get; set; } = null!;

        public string? Description { get; set; } = null!;

        public string? MealType { get; set; } = null!;

        public int? TotalTime { get; set; }

        public string? Diet { get; set; } = null!;

        public string? Difficulty { get; set; } = null!;     

        public int? Calories { get; set; }
    }
}
