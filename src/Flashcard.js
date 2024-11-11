import React, { useState } from 'react';

function Flashcard({ flashcard }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="flashcard" onClick={handleFlip}>
      {isFlipped ? flashcard.definition : flashcard.term}
    </div>
  );
}

export default Flashcard;

