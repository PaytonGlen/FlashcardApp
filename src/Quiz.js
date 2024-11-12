import React, { useState } from "react";

function Quiz({ flashcards, endQuiz }) {
  const [currentIndex, setCurrentIndex] = useState(0); // Index of the current flashcard
  const [userInput, setUserInput] = useState(""); // User's input for the definition
  const [correctCount, setCorrectCount] = useState(0); // Count of correct answers
  const [feedback, setFeedback] = useState(""); // Feedback for the user

  const currentCard = flashcards[currentIndex];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that the user has entered something reasonable
    if (!userInput.trim()) {
      setFeedback("Please enter an answer.");
      return;
    }

    // Ensure that currentCard.definition exists to prevent runtime errors
    if (
      currentCard.definition &&
      userInput.trim().toLowerCase() === currentCard.definition.toLowerCase()
    ) {
      setCorrectCount(correctCount + 1);
      setFeedback("Correct!");
    } else {
      setFeedback(
        `Incorrect! The correct answer was: ${currentCard.definition || "N/A"}`
      );
    }

    // Clear user input for the next flashcard
    setUserInput("");

    // Move to the next flashcard after a short delay
    setTimeout(() => {
      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setFeedback("");
      } else {
        setFeedback(
          `All done! You got ${correctCount} out of ${flashcards.length} correct.`
        );
      }
    }, 1000);
  };

  return (
    <div className="quiz">
      {currentIndex < flashcards.length ? (
        <>
          <h2>Quiz Mode</h2>
          <p>{`Flashcard ${currentIndex + 1} / ${flashcards.length}`}</p>
          <p>{`Correct: ${correctCount} / ${currentIndex + 1}`}</p>
          <div className="flashcard">
            <p>{currentCard.term}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter your answer"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
          <p>{feedback}</p>
        </>
      ) : (
        <>
          <h2 style={{ color: "white" }}>All done!</h2>
          <p>{`You got ${correctCount} / ${flashcards.length} correct.`}</p>
          <p>{`Score: ${((correctCount / flashcards.length) * 100).toFixed(
            2
          )}%`}</p>
          <button onClick={endQuiz}>End Quiz</button>
        </>
      )}
    </div>
  );
}

export default Quiz;
