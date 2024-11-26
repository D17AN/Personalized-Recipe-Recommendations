// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getRecipes } from '../components/Recipe/getRecipes';
import AddRecipeModal from '../pages/AddRecipeModal';
import DeleteRecipeModal from '../pages/DeleteRecipeModal';
import RecommendModal from '../pages/RecommendModal';
import { deleteRecipe } from '../components/Recipe/deleteRecipe';
import '../styles/Home.css';
import '../styles/App.css';

const Home = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
  const [showDeleteRecipeModal, setShowDeleteRecipeModal] = useState(false);
  const [showRecommendModal, setShowRecommendModal] = useState(false); // State for recommend modal
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const [recommendedRecipe, setRecommendedRecipe] = useState(null);
  const pageSize = 6;

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchRecipes = async () => {
      const data = await getRecipes(user.email, currentPage, pageSize, searchTerm);
      if (data) {
        setRecipes(data.recipes);
        setNumberOfPages(data.numberOfPages);
      }
    };

    fetchRecipes();

    if (triggerFetch) {
      fetchRecipes();
      setTriggerFetch(false); 
    }
  }, [currentPage, triggerFetch, user.email, pageSize]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    setCurrentPage(1);
    setTriggerFetch(true); 
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${recipe.name}`, { state: { recipe } });
  };

  const handleAddRecipe = () => {
    setShowAddRecipeModal(true);
  };

  const handleCloseModal = () => {
    setShowAddRecipeModal(false);
    setRecommendedRecipe(null);
  };

  const handleAddNewRecipe = (newRecipe) => {
    setShowAddRecipeModal(false);
    setCurrentPage(1);
    setTriggerFetch(true); 
  };

  const handleDeleteClick = (recipe) => {
    setRecipeToDelete(recipe);
    setShowDeleteRecipeModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteRecipeModal(false);
    setRecipeToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (recipeToDelete) {
      await deleteRecipe(recipeToDelete.id);
      setShowDeleteRecipeModal(false);
      setCurrentPage(1);
      setTriggerFetch(true); 
    }
  };

  const handleRecommend = () => {
    setShowRecommendModal(true);
  };

  const handleCloseRecommendModal = () => {
    setShowRecommendModal(false);
  };

  const handleRecommendItem = (recipe) => {
    // If the response contains a recipe, set it in state
    if (recipe) {
      setRecommendedRecipe(recipe);
      setShowAddRecipeModal(true); // Open Add Recipe Modal
    } else {
      // If no recipe received, display an alert or handle the error accordingly
      alert('Something went wrong. Unable to recommend a recipe.');
    }
  };

  return (
    <div className="container">
      <div className="home-link-container">
        <Link to="/home" className="home-link">Home</Link>
      </div>
      <div className="search-container">
        <button onClick={handleRecommend} className="recommend-button">Recommend</button>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search recipes"
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      <div className="recipes-container">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <p className="recipe-name" onClick={() => handleRecipeClick(recipe)}>{recipe.name}</p>
            <p className="recipe-details">
              <span>Difficulty: {recipe.difficulty}</span>
              <span className="recipe-total-time">Total Time: {recipe.totalTime} mins</span>
              <span className="recipe-calories">Calories: {recipe.calories} kcal</span>
            </p>
            <button className="delete-button" onClick={() => handleDeleteClick(recipe)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="pagination-container">
        {Array.from({ length: numberOfPages }, (_, index) => index + 1).map((pageNumber) => (
          <span
            key={pageNumber}
            className={`pagination-item ${currentPage === pageNumber ? 'current-page' : ''}`}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
            {currentPage === pageNumber && <span></span>} 
          </span>
        ))}
      </div>

      <button onClick={handleLogout} className="logout-button">Logout</button>
      <button onClick={handleAddRecipe} className="add-recipe-button">+</button> 

      {showAddRecipeModal && (
        <AddRecipeModal onClose={handleCloseModal} onAdd={handleAddNewRecipe} recipe={recommendedRecipe} userEmail={user.email} />
      )}

      {showDeleteRecipeModal && (
        <DeleteRecipeModal onClose={handleCloseDeleteModal} onConfirm={handleConfirmDelete} />
      )}

      {showRecommendModal && (
        <RecommendModal onClose={handleCloseRecommendModal} onRecommend={handleRecommendItem} userEmail={user.email}/>
      )}
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Home;
