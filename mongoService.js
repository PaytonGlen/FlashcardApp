import mongoose from "mongoose";
import Flashcard from "./Flashcard.js"; // Adjust path as necessary

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/flashcardsDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
