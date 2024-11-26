import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/RecipeDetails.css';
import { updateRecipe } from '../components/Recipe/updateRecipe';

const RecipeDetails = () => {
  const location = useLocation();
  const [editable, setEditable] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState(null);
  const [recipe, setRecipe] = useState(location.state?.recipe);

  const handleEditClick = () => {
    setEditable(true);
    setEditedRecipe(recipe); // Store the original recipe for cancellation
  };

  const handleSaveClick = async () => {
    if (!editedRecipe) return;

    const updatedData = {}; // Object to store changed fields
    if (editedRecipe.name && editedRecipe.name.trim() !== recipe.name) {
        updatedData.name = editedRecipe.name;
    }

    // Check each field for changes before adding it to updatedData
    if (editedRecipe.description && editedRecipe.description.trim() !== recipe.description) {
      updatedData.description = editedRecipe.description;
    }
    if (editedRecipe.mealType && editedRecipe.mealType.trim() !== recipe.mealType) {
      updatedData.mealType = editedRecipe.mealType;
    }
    if (
      editedRecipe.totalTime !== null && // Check for null before comparison
      editedRecipe.totalTime !== recipe.totalTime
    ) {
      updatedData.totalTime = editedRecipe.totalTime;
    }
    if (editedRecipe.diet && editedRecipe.diet.trim() !== recipe.diet) {
      updatedData.diet = editedRecipe.diet;
    }
    if (editedRecipe.difficulty && editedRecipe.difficulty.trim() !== recipe.difficulty) {
      updatedData.difficulty = editedRecipe.difficulty;
    }
    if (
      editedRecipe.calories !== null && // Check for null before comparison
      editedRecipe.calories !== recipe.calories
    ) {
      updatedData.calories = editedRecipe.calories;
    }

    // Send only the updated fields to the updateRecipe function
    const updatedRecipe = await updateRecipe(
        recipe.id,
        updatedData.name || null,
        updatedData.description || null,
        updatedData.mealType || null,
        updatedData.totalTime || null,
        updatedData.diet || null,
        updatedData.difficulty || null,
        updatedData.calories || null,
    );

    if (updatedRecipe) {
      // Update recipe state with the updated data (if successful)
      setEditedRecipe(updatedRecipe);
      setRecipe(updatedRecipe);
      setEditable(false); // Exit edit mode
      
    } else {
      // Handle update failure (optional: display error message)
      console.error('Failed to update recipe');
    }
  };

  const handleCancelClick = () => {
    // Restore the original recipe and exit edit mode
    setEditable(false);
    setEditedRecipe(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe({
      ...editedRecipe,
      [name]: value,
    });
  };

  if (!recipe) {
    return <div>No recipe found.</div>;
  }

  return (
    <div className="recipe-details-container">
      <div className="home-link-container">
        <Link to="/home" className="home-link">
          Home
        </Link>
      </div>
      <div className="recipe-details2">
        <h2>{recipe.name}</h2>
        <p>
          <strong>Description:</strong>{' '}
          {editable ? (
            <input
              type="text"
              name="description"
              value={editedRecipe ? editedRecipe.description : ''}
              onChange={handleInputChange}
            />
          ) : (
            recipe.description
          )}
        </p>
        <p>
          <strong>Meal Type:</strong>{' '}
          {editable ? (
            <input
              type="text"
              name="mealType"
              value={editedRecipe ? editedRecipe.mealType : ''}
              onChange={handleInputChange}
            />
          ) : (
            recipe.mealType
          )}
        </p>
        <p>
          <strong>Total Time:</strong>{' '}
          {editable ? (
            <input
              type="number"
              name="totalTime"
              value={editedRecipe ? editedRecipe.totalTime : ''}
              onChange={handleInputChange}
            />
          ) : (
            `${recipe.totalTime} mins`
          )}
        </p>
        <p>
          <strong>Diet:</strong>{' '}
          {editable ? (
            <input
              type="text"
              name="diet"
              value={editedRecipe ? editedRecipe.diet : ''}
              onChange={handleInputChange}
            />
          ) : (
            recipe.diet
          )}
        </p>
        <p>
          <strong>Difficulty:</strong>{' '}
          {editable ? (
            <input
              type="text"
              name="difficulty"
              value={editedRecipe ? editedRecipe.difficulty : ''}
              onChange={handleInputChange}
            />
          ) : (
            recipe.difficulty
          )}
        </p>
        <p>
          <strong>Calories:</strong>{' '}
          {editable ? (
            <input
              type="number"
              name="calories"
              value={editedRecipe ? editedRecipe.calories : ''}
              onChange={handleInputChange}
            />
          ) : (
            `${recipe.calories} kcal`
          )}
        </p>
        {editable ? (
          <div>
            <button className="save-btn" onClick={handleSaveClick}>Save</button>
            <button className="cancel-btn" onClick={handleCancelClick}>Cancel</button>
          </div>
        ) : (
          <button className="edit-btn" onClick={handleEditClick}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
