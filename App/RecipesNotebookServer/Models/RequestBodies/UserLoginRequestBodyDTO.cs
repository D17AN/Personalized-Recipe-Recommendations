namespace RecipesNotebookServer.Models.RequestBodies
{
    public class UserLoginRequestBodyDTO
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
