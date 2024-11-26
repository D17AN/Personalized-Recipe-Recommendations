using Microsoft.EntityFrameworkCore;
using RecipesNotebookServer.Models;
using RecipesNotebookServer.Models.Entities;
using System.Linq;

namespace RecipesNotebookServer.Repository.RecipeRepository
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public RecipeRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Recipe?> GetById(long id)
        {
            Recipe? recipe = await _dbContext.Recipes.FirstOrDefaultAsync(x => x.Id == id);

            if (recipe == null)
            {
                throw new Exception("Recipe not found");
            }

            return recipe;
        }

        public async Task<int> GetAllByUserCount(string? name, string userEmail,
            int page, int pageSize)
        {
            IQueryable<Recipe> query = _dbContext.Recipes;

            query = query.Where(x => x.User.Email.Equals(userEmail));

            if (name == null || name.Trim() == "")
            {

            }
            else
            {
                query = query.Where(x => x.Name.Contains(name));
            }

            int count = await query.CountAsync();

            return count;
        }

        public async Task<IEnumerable<Recipe>> GetAllByUserPaginated(string? name, string userEmail, 
            int page, int pageSize)
        {
            IQueryable<Recipe> query = _dbContext.Recipes;

            query = query.Where(x => x.User.Email.Equals(userEmail));

            if (name == null || name.Trim() == "")
            {
                
            }
            else
            {
                query = query.Where(x => x.Name.Contains(name));
            }

            return (await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync());
        }

        public async Task<Recipe?> Add(string name, string description,
            string mealType, int totalTime,
            string diet, int calories,
            string difficulty, string userEmail)
        {
            User? user = _dbContext.Users
                .FirstOrDefault(u => u.Email.Equals(userEmail));

            if (user == null)
            {
                throw new Exception("The user doesn't exists");    
            }

            Recipe recipe = new Recipe
            {
                Name = name,
                Description = description,
                MealType = mealType,
                TotalTime = totalTime,
                Diet = diet,
                Calories = calories,
                Difficulty = difficulty,
                UserId = user.Id,
            };

            await _dbContext.AddAsync(recipe);
            await _dbContext.SaveChangesAsync();

            return recipe;
        }

        public async Task Delete(long id)
        {
            Recipe? recipe = await _dbContext.Recipes.FirstOrDefaultAsync(u => u.Id == id);
            if (recipe == null)
            {
                throw new Exception("Recipe doesn't exists!");
            }

            _dbContext.Recipes.Remove(recipe);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Recipe?> Update(long id, string? newName, string? newDescription,
            string? newMealType, int? newTotalTime,
            string? newDiet, int? newCalories,
            string? newDifficulty)
        {
            Recipe? recipe = await _dbContext.Recipes.FirstOrDefaultAsync(u => u.Id == id);

            if (recipe == null)
            {
                throw new Exception("The recipe doesn't exists!");
            }

            if (newName != null)
            {
                recipe.Name = newName;
            }

            if (newDescription != null)
            {
                recipe.Description = newDescription;
            }

            if (newMealType != null)
            {
                recipe.MealType = newMealType;
            }

            if (newTotalTime != null)
            {
                recipe.TotalTime = (int)newTotalTime;
            }

            if (newDiet != null)
            {
                recipe.Diet = newDiet;
            }

            if (newCalories != null)
            {
                recipe.Calories = (int)newCalories;
            }

            if (newDifficulty != null)
            {
                recipe.Difficulty = newDifficulty;
            }
            await _dbContext.SaveChangesAsync();

            return recipe;
        }
    }
}
