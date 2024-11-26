using RecipesNotebookServer.Models.Entities;

namespace RecipesNotebookServer.Repository.UserRepository
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsers();

        Task<User?> GetUserById(long id);

        Task<User?> GetUserByEmail(string email);

        Task<User?> AddUser(string email, string name, string hashedPassword, string salt);
    }
}
