import React, { useState } from "react";
import FlashcardForm from "./FlashcardForm";
import FlashcardList from "./FlashcardList";
import Quiz from "./Quiz"; // Import the Quiz component
import "./App.css";

//adding some comments
//testing out discord webhook
const d = new Date();
const time = d.getDate();
//can delete this next time you open this

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [quizMode, setQuizMode] = useState(false); // State to toggle quiz mode

  const addFlashcard = (term, definition) => {
    setFlashcards([...flashcards, { term, definition }]);
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
