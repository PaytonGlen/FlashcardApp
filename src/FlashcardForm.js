// FlashcardForm.js
import React, { useState } from "react";
import axios from "axios";

function FlashcardForm({ addFlashcard }) {
  const [term, setTerm] = useState("");
  const [definitions, setDefinitions] = useState([""]); // Start with one definition input

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (term && definitions[0]) {
      try {
        // Send the term and definitions to the backend
        await axios.post("http://localhost:3001/api/flashcards", {
          term,
          definitions,
        });

        // Call addFlashcard to update parent state and reset form
        addFlashcard(term, definitions);
        setTerm("");
        setDefinitions([""]); // Reset definitions to one empty field
      } catch (error) {
        // Enhanced error logging
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error(
            "Error adding flashcard:",
            error.response.data,
            `Status: ${error.response.status}`
          );
        } else if (error.request) {
          // No response was received after the request was made
          console.error("No response from server:", error.request);
        } else {
          // Something else triggered an error
          console.error("Error setting up request:", error.message);
        }
      }
    }
  };

  const handleDefinitionChange = (index, value) => {
    const newDefinitions = [...definitions];
    newDefinitions[index] = value;
    setDefinitions(newDefinitions);
  };

  const addDefinitionField = () => {
    setDefinitions([...definitions, ""]);
  };

  return (
    <form onSubmit={handleSubmit} className="flashcard-form">
      <div>
        <input
          id="term-input"
          type="text"
          placeholder="Term"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          required
        />
      </div>
      {definitions.map((definition, index) => (
        <div key={index} className="definition-field">
          <input
            type="text"
            placeholder={`Definition ${index + 1}`}
            value={definition}
            onChange={(e) => handleDefinitionChange(index, e.target.value)}
            required={index === 0} // Only the first definition is required
          />
          {index === definitions.length - 1 && (
            <button
              type="button"
              onClick={addDefinitionField}
              className="add-button"
            >
              +
            </button>
          )}
        </div>
      ))}
      <button id="add-button" type="submit">
        Add Flashcard
      </button>
    </form>
  );
}

export default FlashcardForm;
