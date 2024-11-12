import React, { useEffect, useState } from "react";
import DefinitionModal from "./DefinitionModal.js";
import axios from "axios";

function Flashcard({ term }) {
  const [definitions, setDefinitions] = useState([]); // State to hold definitions
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch definitions from the backend when the component mounts
  useEffect(() => {
    setIsLoading(true); // Start loading
    axios
      .get(`http://localhost:3001/api/definitions?term=${term}`)
      .then((response) => {
        setDefinitions(response.data.definitions);
        setError(null); // Clear any previous error
      })
      .catch((error) => {
        console.error("Error fetching definitions:", error);
        setError("Failed to load definitions. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false); // Stop loading
      });
  }, [term]);

  const handleCardFlip = () => {
    setIsModalOpen(true); // Open the modal when the card is "flipped"
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flashcard-container">
      <div onClick={handleCardFlip} className="flashcard">
        {term}
      </div>
      {isModalOpen && (
        <>
          <DefinitionModal definitions={definitions} onClose={closeModal} />
          {isLoading && (
            <p className="loading-message">Loading definitions...</p>
          )}
          {error && <p className="error-message">{error}</p>}
        </>
      )}
    </div>
  );
}

export default Flashcard;
