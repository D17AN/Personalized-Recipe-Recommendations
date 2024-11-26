namespace RecipesNotebookServer.Models.RequestBodies
{
    public class UserRegisterRequestBody
    {
        public string Email { get; set; } = null!;

        public string Name { get; set; } = null!;
        
        public string Password { get; set; } = null!;
    }
}
