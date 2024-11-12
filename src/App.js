import React, { useState } from "react";
import FlashcardForm from "./FlashcardForm.js";
import FlashcardList from "./FlashcardList.js";
import Quiz from "./Quiz.js"; // Import the Quiz component
import "./App.css";
import axios from "axios";

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [quizMode, setQuizMode] = useState(false); // State to toggle quiz mode

  const addFlashcard = async (term, definitions) => {
    const newFlashcard = { term, definitions };

    // Optional: Save to backend
    try {
      await axios.post("http://localhost:3001/api/flashcards", newFlashcard);
    } catch (error) {
      console.error("Error saving flashcard:", error);
    }

    // Update state
    setFlashcards([...flashcards, newFlashcard]);
  };

  const startQuiz = () => {
    setQuizMode(true);
  };

  const endQuiz = () => {
    setQuizMode(false);
  };

  return (
    <div className="App">
      <h1>Flashcard App</h1>
      <FlashcardForm addFlashcard={addFlashcard} />

      {quizMode ? (
        <Quiz flashcards={flashcards} endQuiz={endQuiz} /> // Show quiz if quizMode is true
      ) : (
        <>
          <FlashcardList flashcards={flashcards} />
          <button onClick={startQuiz}>Start Quiz</button>
        </>
      )}
    </div>
  );
}

export default App;
