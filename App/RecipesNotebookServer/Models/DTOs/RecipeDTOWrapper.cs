namespace RecipesNotebookServer.Models.DTOs
{
    public class RecipeDTOWrapper
    {
        public IEnumerable<RecipeDTO> Recipes { get; set; } = new List<RecipeDTO>();

        public int Page { get; set; }

        public int NumberOfPages { get; set; }
    }
}
