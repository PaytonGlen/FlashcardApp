import React from "react";
import Flashcard from "./Flashcard.js";

function FlashcardList({ flashcards }) {
  return (
    <div className="flashcard-list">
      {flashcards.map((flashcard, index) => (
        <Flashcard key={index} term={flashcard.term} />
      ))}
    </div>
  );
}

export default FlashcardList;
