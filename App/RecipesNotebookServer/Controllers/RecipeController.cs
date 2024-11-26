using Microsoft.AspNetCore.Mvc;
using RecipesNotebookServer.Models.DTOs;
using RecipesNotebookServer.Models.Entities;
using RecipesNotebookServer.Models.RequestBodies;
using RecipesNotebookServer.Repository.RecipeRepository;

namespace RecipesNotebookServer.Controllers
{
    [Route("api/recipe")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeRepository _recipeRepository;

        public RecipeController(IRecipeRepository recipeRepository)
        {
            _recipeRepository = recipeRepository;
        }


        [HttpGet("{recipeId}")]
        public async Task<ActionResult<RecipeDTO>> GetRecipeById(long recipeId)
        {
            try
            {
                Recipe? recipe = await _recipeRepository.GetById(recipeId);

                return Ok(
                    new RecipeDTO 
                    {
                        Id = recipe.Id, 
                        Name = recipe.Name,
                        Description = recipe.Description,
                        MealType = recipe.MealType,
                        TotalTime = recipe.TotalTime, 
                        Diet = recipe.Diet,
                        Difficulty = recipe.Difficulty,
                        Calories = recipe.Calories,
                    }
                );
            }
            catch (Exception ex)
            {
                return NotFound("Recipe doesn't exist");
            }
        }

        [HttpPost("all")]
        public async Task<ActionResult<RecipeDTOWrapper>> GetRecipesByUserPaginated([FromBody] GetRecipesRequestBody getRecipesRequestBody, int page = 1, int pageSize = 10)
        {
            try
            { 
                IEnumerable<RecipeDTO> recipesDTOs = (await _recipeRepository
                    .GetAllByUserPaginated(
                        getRecipesRequestBody.Name, 
                        getRecipesRequestBody.Email, 
                        page, 
                        pageSize))
                    .Select(r => new RecipeDTO
                    {
                        Id = r.Id,
                        Name = r.Name,
                        Description = r.Description,
                        MealType = r.MealType,
                        TotalTime = r.TotalTime,
                        Diet = r.Diet,
                        Difficulty = r.Difficulty,
                        Calories = r.Calories
                    });

                int nrRecipes = await _recipeRepository
                    .GetAllByUserCount(
                        getRecipesRequestBody.Name, 
                        getRecipesRequestBody.Email, 
                        page, 
                        pageSize);

                int nrOfPages = (nrRecipes + pageSize - 1) / pageSize;

                return Ok(
                        new RecipeDTOWrapper
                        {
                            Recipes = recipesDTOs,
                            Page = page,
                            NumberOfPages = nrOfPages
                        }
                    );
            }
            catch( Exception ex ) 
            { 
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("")]
        public async Task<ActionResult<RecipeDTO>> Add([FromBody] RecipeAddRequestBodyDTO recipeRequestBody)
        {
            try
            {
                Recipe recipe = await _recipeRepository
                    .Add(recipeRequestBody.Name, recipeRequestBody.Description,
                    recipeRequestBody.MealType, recipeRequestBody.TotalTime,
                    recipeRequestBody.Diet, recipeRequestBody.Calories,
                    recipeRequestBody.Difficulty, recipeRequestBody.UserEmail);

                return Ok(
                    new RecipeDTO
                    {
                        Id = recipe.Id,
                        Name = recipe.Name,
                        Description = recipe.Description,
                        MealType = recipe.MealType,
                        TotalTime = recipe.TotalTime,
                        Diet = recipe.Diet,
                        Difficulty = recipe.Difficulty,
                        Calories = recipe.Calories
                    });
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("{recipeId}")]
        public async Task<ActionResult<RecipeDTO>> Update(long recipeId, [FromBody] RecipeUpdateRequestBody recipeUpdateRequestBody)
        {
            try
            {
                Recipe recipe = await _recipeRepository
                    .Update(
                    recipeId,
                    recipeUpdateRequestBody.Name,
                    recipeUpdateRequestBody.Description,
                    recipeUpdateRequestBody.MealType,
                    recipeUpdateRequestBody.TotalTime,
                    recipeUpdateRequestBody.Diet,
                    recipeUpdateRequestBody.Calories,
                    recipeUpdateRequestBody.Difficulty
                    );

                return Ok(
                    new RecipeDTO
                    {
                        Id = recipe.Id,
                        Name = recipe.Name,
                        Description = recipe.Description,
                        MealType = recipe.MealType,
                        TotalTime = recipe.TotalTime,
                        Diet = recipe.Diet,
                        Difficulty = recipe.Difficulty,
                        Calories = recipe.Calories
                    });
            }
            catch( Exception ex )
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{recipeId}")]
        public async Task<ActionResult> Delete(long recipeId)
        {
            try
            {
                await _recipeRepository.Delete(recipeId);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
