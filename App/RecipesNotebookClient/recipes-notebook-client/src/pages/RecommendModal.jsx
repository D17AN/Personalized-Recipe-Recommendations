//Recommend Modal.jsx
// src/pages/RecommendModal.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../styles/RecommendModal.css';
import '../components/Recipe/recomendRecipe'
import { recommendRecipe } from '../components/Recipe/recomendRecipe';
import '../pages/LoadingScreen';
import LoadingScreen from '../pages/LoadingScreen';

const categories = {
  'Meal Type': ['breakfast', 'lunch', 'dinner', 'dessert'],
  'Diet': ['vegetarian', 'healthy', 'dairy-free', 'high-protein'],
  'Calories': ['under 500kcal', 'under 1000kcal', 'under 1500kcal', 'above 1500kcal'],
  'Time': ['under 30min', 'under 60min', 'above 60min'],
  'Difficulty': ['easy', 'more-effort', 'a-challange'],
};

const RecommendModal = ({ onClose, onRecommend, userEmail }) => {
  const [selectedItems, setSelectedItems] = useState({});
  const [loading, setLoading] = useState(false); // State for loading screen

  const handleSelect = (category, item) => {
    setSelectedItems((prev) => ({ ...prev, [category]: item }));
  };

  const handleRecommend = () => {
    setLoading(true); // Activate loading screen
    const queryParams = Object.entries(selectedItems)
      .map(([category, selectedValue]) => {
        if (category === 'Time') {
          const timeInSeconds = selectedValue.includes('under') ? parseInt(selectedValue.split(' ')[1]) * 60 : parseInt(selectedValue.split(' ')[1]) * 60 + 1;
          return timeInSeconds <= 3600 ? `totalTime=lt-${timeInSeconds}` : `totalTime=gte-${timeInSeconds - 1}`;
        }
        if (category === 'Meal Type') {
          return `mealType=${selectedValue.toLowerCase()}`;
        }
        if (category === 'Calories') {
          const calories = selectedValue.includes('under') ? parseInt(selectedValue.split(' ')[1]) : parseInt(selectedValue.split(' ')[1]) + 1;
          return calories <= 1500 ? `calories=lt-${calories}` : `calories=gte-${calories - 1}`;
        }
        return `${category.toLowerCase()}=${selectedValue}`;
      })
      .join('&');

    const url = queryParams ? `https://www.bbcgoodfood.com/search?tab=recipe&${queryParams}` : 'https://www.bbcgoodfood.com/search?tab=recipe';
    console.log(url);
    recommendRecipe(url).then(response => {
      const recipeData = JSON.parse(response);
      const { name, description, difficulty, time, calories, ingredients } = recipeData;
      const formattedIngredients = ingredients.split("(window.adq")[0].trim();
      const prepMatch = time.match(/Prep:\s*(?:(\d+)\s*hr(?:s)?)?\s*(?:(\d+)\s*mins)?/i);
      const cookMatch = time.match(/Cook:\s*(?:(\d+)\s*hr(?:s)?)?\s*(?:(\d+)\s*mins)?/i);

      let totalTime = 0;
      if (prepMatch) {
        const prepHours = prepMatch[1] ? parseInt(prepMatch[1]) * 60 : 0;
        const prepMinutes = prepMatch[2] ? parseInt(prepMatch[2]) : 0;
        totalTime += prepHours + prepMinutes;
      }
      if (cookMatch) {
        const cookHours = cookMatch[1] ? parseInt(cookMatch[1]) * 60 : 0;
        const cookMinutes = cookMatch[2] ? parseInt(cookMatch[2]) : 0;
        totalTime += cookHours + cookMinutes;
      }

      const newRecipe = {
        name,
        description: `${description}\n${formattedIngredients}`,
        mealType: selectedItems['Meal Type'] || '',
        totalTime,
        diet: selectedItems['Diet'] || '',
        difficulty: difficulty.toLowerCase().replace(/ /g, '-'),
        calories,
        userEmail,
      };

      onRecommend(newRecipe);
      onClose();
    }).catch(error => {
      console.error('Error fetching recipe:', error);
      onClose();
    }).finally( _ => {
      setLoading(false);
    });
  };

  const handleCancel = () => {
    onClose(); // Close the modal
  };

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <div className="modal-content">
          <h2>Recommend</h2>
          <div className="categories-container">
            {Object.entries(categories).map(([category, items]) => (
              <div key={category} className="category-column">
                <h3>{category}</h3>
                {items.map((item) => (
                  <label key={item} className="radio-option">
                    <input
                      type="radio"
                      name={category}
                      value={item}
                      onChange={() => handleSelect(category, item)}
                    />
                    {item}
                  </label>
                ))}
              </div>
            ))}
          </div>
          <div>
            <button className="custom-button custom-button-primary" onClick={handleRecommend}>Recommend</button>
            <button className="custom-button custom-button-secondary" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
       {loading && <LoadingScreen />}
    </div>
  );
};

RecommendModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onRecommend: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired,
};

export default RecommendModal;