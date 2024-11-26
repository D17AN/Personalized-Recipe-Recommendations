import BASE_URL from "../../../config";

export const getRecipes = async (email, page = 1, pageSize = 10, name = '') => {
    try {
      const response = await fetch(`${BASE_URL}/recipe/all?page=${page}&pageSize=${pageSize}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error while fetching recipes:', error);
      return null;
    }
  };