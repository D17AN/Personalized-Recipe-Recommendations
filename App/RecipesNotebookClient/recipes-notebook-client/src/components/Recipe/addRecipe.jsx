import BASE_URL from "../../../config";

export const addRecipe = async (name, 
    description, mealType, 
    totalTime, diet, 
    difficulty, calories,
    userEmail) => {
    try {
      const response = await fetch(`${BASE_URL}/recipe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, mealType, totalTime, diet, difficulty, calories, userEmail })
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