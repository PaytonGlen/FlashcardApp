import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3001;

app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.path}`);
  next();
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// In-memory storage for flashcard definitions
const flashcardDefinitions = {
  JavaScript: [
    "A programming language commonly used in web development.",
    "Used to build interactive websites.",
  ],
  React: [
    "A JavaScript library for building user interfaces.",
    "Used for building single-page applications.",
  ],
};

// Route to fetch definitions based on term
app.get("/api/definitions", (req, res) => {
  const { term } = req.query;
  const definitions = flashcardDefinitions[term] || [
    "No definition found for this term.",
  ];
  res.json({ definitions });
});

// Route to add a new flashcard
app.post("/api/flashcards", (req, res) => {
  const { term, definitions } = req.body;

  // Validate input data
  if (
    !term ||
    !definitions ||
    !Array.isArray(definitions) ||
    definitions.length === 0
  ) {
    return res.status(400).json({
      error:
        "Invalid flashcard data. Term and at least one definition are required.",
    });
  }

  // Store the flashcard in the `flashcardDefinitions` object
  flashcardDefinitions[term] = definitions;
  console.log(`New flashcard added:`, { term, definitions });

  // Send response with the newly added flashcard
  res.status(201).json({
    message: "Flashcard added successfully",
    flashcard: { term, definitions },
  });
});

app.listen(3001, "0.0.0.0", () => {
  console.log(`Server is running on ${port}`);
});
