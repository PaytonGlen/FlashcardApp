import React, { useState } from 'react';

function FlashcardForm({ addFlashcard }) {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term && definition) {
      addFlashcard(term, definition);  // Call addFlashcard with term and definition
      setTerm('');
      setDefinition('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flashcard-form">
      <input
        id='term-input'
        type="text"
        placeholder="Term"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        required
      />
      <input
        id='definition-input'
        type="text"
        placeholder="Definition"
        value={definition}
        onChange={(e) => setDefinition(e.target.value)}
        required
      />
      <button id='add-button' type="submit">Add Flashcard</button>
    </form>
  );
}

export default FlashcardForm;

