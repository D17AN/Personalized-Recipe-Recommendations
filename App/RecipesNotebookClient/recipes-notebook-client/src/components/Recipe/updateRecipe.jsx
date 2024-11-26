import BASE_URL from "../../../config";

export const updateRecipe = async (id, name, 
    description, mealType, 
    totalTime, diet, 
    difficulty, calories) => {
    try {
      const response = await fetch(`${BASE_URL}/recipe/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, mealType, totalTime, diet, difficulty, calories })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error while updating recipe:', error);
      return null;
    }
  };