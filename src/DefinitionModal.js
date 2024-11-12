// DefinitionModal.js
import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for type-checking
import "./Modal.css";

function DefinitionModal({ definitions = [], onClose }) {
  // Default empty array for definitions
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Definitions</h2>
        <ul>
          {definitions.map((definition, index) => (
            <li key={index}>{definition || "No definition provided"}</li> // Handle empty definition
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

DefinitionModal.propTypes = {
  definitions: PropTypes.array, // Definitions should be an array
  onClose: PropTypes.func.isRequired,
};

export default DefinitionModal;
