import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";

import DetailBook from "./pages/books/detail-book";
import CreateBook from "./pages/books/create-book";
import DetailAuthor from "./pages/authors/detail-author";
import CreateAuthor from "./pages/authors/create-author";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/authors/detail-author/:id" element={<DetailAuthor />} />
      <Route path="/authors/create-author" element={<CreateAuthor />} />
      <Route path="/books/detail-book/:id" element={<DetailBook />} />
      <Route path="/books/create-book" element={<CreateBook />} />
    </Routes>
  );
}
