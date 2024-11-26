namespace RecipesNotebookServer.Models.RequestBodies
{
    public class GetRecipesRequestBody
    {
        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;
    }
}
