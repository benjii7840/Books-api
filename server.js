import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Book from "./models/Books.js";

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Connection error:", err));

app.get("/", (req, res) => {
  res.send(" Your server is now working");
});
app.get("/api/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

app.post("/api/books", async (req, res) => {
  const { title, author, genre, read } = req.body;
  const newBook = await Book.create({
    title,
    author,
    genre,
    read,
  });
  res.json(newBook);
});

app.put("/api/books/:id", async (req, res) => {
  const { title, author, genre, read } = req.body;
  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    { title, author, genre, read },
    { new: true },
  );
  res.json(updatedBook);
});

app.delete("/api/books/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server running at port 3000");
});
