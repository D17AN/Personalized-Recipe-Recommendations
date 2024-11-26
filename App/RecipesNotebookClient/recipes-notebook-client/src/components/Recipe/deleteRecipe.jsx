import BASE_URL from "../../../config";

export const deleteRecipe = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/recipe/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
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