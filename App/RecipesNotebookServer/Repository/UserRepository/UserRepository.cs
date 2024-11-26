using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using RecipesNotebookServer.Models;
using RecipesNotebookServer.Models.Entities;
using System.Text;

namespace RecipesNotebookServer.Repository.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public UserRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User?> AddUser(string email, string name, string hashedPassword, string salt)
        {
            User user = new User
            {
                Email = email,
                Name = name,
                HashedPassword = hashedPassword,
                Salt = salt
            };

            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();

            return await _dbContext.Users
                .FirstOrDefaultAsync(user => user.Email.Equals(email));
        }

        public async Task<User?> GetUserByEmail(string email)
        {
            return await _dbContext.Users
                .FirstOrDefaultAsync(user => user.Email.Equals(email));
        }

        public async Task<User?> GetUserById(long id)
        {
            return await _dbContext.Users
                .FirstOrDefaultAsync(user => user.Id == id);
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _dbContext.Users.ToListAsync();
        }
    }
}
