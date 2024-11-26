using Microsoft.EntityFrameworkCore.Update.Internal;
using RecipesNotebookServer.Models.Entities;

namespace RecipesNotebookServer.Repository.RecipeRepository
{
    public interface IRecipeRepository
    {
        public Task<Recipe> Add(string name, string description,
            string mealType, int totalTime,
            string diet, int calories,
            string difficulty, string userEmail);

        public Task Delete(long id);

        public Task<Recipe> Update(long id, string? newName, string? newDescription,
            string? newMealType, int? newTotalTime,
            string? newDiet, int? newCalories,
            string? newDifficulty);

        public Task<Recipe?> GetById(long id);

        public Task<IEnumerable<Recipe>> GetAllByUserPaginated(string? name, string userEmail, int page, int pageSize);

        public Task<int> GetAllByUserCount(string? name, string userEmail, int page, int pageSize);

    }
}
