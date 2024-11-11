import React, { useState } from 'react';
import FlashcardForm from './FlashcardForm';
import FlashcardList from './FlashcardList';
import './App.css';

function App() {
  const [flashcards, setFlashcards] = useState([]);

  // Function to add a new flashcard
  const addFlashcard = (term, definition) => {
    setFlashcards([...flashcards, { term, definition }]);
  };

  return (
    <div className="App">
      <h1 style={{color: "white"}}>Flashcard App</h1>
      <FlashcardForm addFlashcard={addFlashcard} />
      <FlashcardList flashcards={flashcards} />
    </div>
  );
}

export default App;
