import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  read: Boolean,
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
