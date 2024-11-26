// src/pages/DeleteRecipeModal.jsx
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/DeleteRecipeModal.css';

const DeleteRecipeModal = ({ onClose, onConfirm }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete this recipe?</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="confirm-button">Confirm</button>
          <button onClick={onClose} className="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  );
};

DeleteRecipeModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default DeleteRecipeModal;
