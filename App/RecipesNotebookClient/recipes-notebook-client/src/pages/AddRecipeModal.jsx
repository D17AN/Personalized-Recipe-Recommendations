import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addRecipe } from '../components/Recipe/addRecipe';
import '../styles/AddRecipeModal.css';

const AddRecipeModal = ({ onClose, onAdd, recipe, userEmail }) => {
  const [name, setName] = useState(recipe ? recipe.name : ''); // Set the initial state with recommended recipe data if available
  const [description, setDescription] = useState(recipe ? recipe.description : '');
  const [mealType, setMealType] = useState(recipe ? recipe.mealType : '');
  const [totalTime, setTotalTime] = useState(recipe ? recipe.totalTime : '');
  const [diet, setDiet] = useState(recipe ? recipe.diet : '');
  const [difficulty, setDifficulty] = useState(recipe ? recipe.difficulty : '');
  const [calories, setCalories] = useState(recipe ? recipe.calories : '');

  const handleAdd = async () => {
    const newRecipe = { name, description, mealType, totalTime, diet, difficulty, calories, userEmail };
    const result = await addRecipe(newRecipe.name, newRecipe.description, newRecipe.mealType, newRecipe.totalTime, newRecipe.diet, newRecipe.difficulty, newRecipe.calories, newRecipe.userEmail);
    if (result) {
      onAdd(newRecipe);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add New Recipe</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="text" placeholder="Meal Type" value={mealType} onChange={(e) => setMealType(e.target.value)} />
        <input type="text" placeholder="Total Time" value={totalTime} onChange={(e) => setTotalTime(e.target.value)} />
        <input type="text" placeholder="Diet" value={diet} onChange={(e) => setDiet(e.target.value)} />
        <input type="text" placeholder="Difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
        <input type="text" placeholder="Calories" value={calories} onChange={(e) => setCalories(e.target.value)} />
        <div className="modal-buttons">
          <button onClick={handleAdd} className="add-button">Add</button>
          <button onClick={onClose} className="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

AddRecipeModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
  recipe: PropTypes.object.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default AddRecipeModal;
