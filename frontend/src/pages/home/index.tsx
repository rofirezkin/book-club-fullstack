import React from "react";
import AuthorList from "./components/author-list";
import BookList from "./components/book-list";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Book Club</h1>
      <div className="my-6   gap-3 flex justify-center">
        <Link
          to={"/books/create-book"}
          className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Book
        </Link>
        <Link
          to={"/authors/create-author"}
          className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Author
        </Link>
      </div>

      <AuthorList />
      <BookList />
    </main>
  );
}

export default Home;
