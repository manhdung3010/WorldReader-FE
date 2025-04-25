import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authors | WorldReader",
  description: "Discover authors and their works on WorldReader",
};

const AuthorsPage = () => {
  const authors = [
    {
      id: 1,
      name: "Jane Austen",
      bio: "English novelist known primarily for her six major novels, which interpret, critique and comment upon the British landed gentry at the end of the 18th century.",
      books: 6,
      genres: ["Romance", "Classic", "Literary Fiction"],
      image: "/images/authors/jane-austen.jpg",
    },
    {
      id: 2,
      name: "Stephen King",
      bio: "American author of horror, supernatural fiction, suspense, and fantasy novels. His books have sold more than 350 million copies.",
      books: 75,
      genres: ["Horror", "Thriller", "Fantasy"],
      image: "/images/authors/stephen-king.jpg",
    },
    {
      id: 3,
      name: "Yuval Noah Harari",
      bio: "Israeli historian and professor who has written several international bestsellers about human history and the future of humanity.",
      books: 4,
      genres: ["History", "Science", "Philosophy"],
      image: "/images/authors/yuval-harari.jpg",
    },
    {
      id: 4,
      name: "Agatha Christie",
      bio: "English mystery novelist who wrote 66 detective novels and 14 short story collections, particularly those revolving around fictional detectives Hercule Poirot and Miss Marple.",
      books: 80,
      genres: ["Mystery", "Crime", "Detective"],
      image: "/images/authors/agatha-christie.jpg",
    },
    {
      id: 5,
      name: "J.K. Rowling",
      bio: "British author best known for the Harry Potter series, which has won multiple awards and sold more than 500 million copies, becoming the best-selling book series in history.",
      books: 12,
      genres: ["Fantasy", "Young Adult", "Children's Literature"],
      image: "/images/authors/jk-rowling.jpg",
    },
    {
      id: 6,
      name: "Malcolm Gladwell",
      bio: "Canadian journalist, author, and public speaker who has written five New York Times bestsellers and hosts the podcast Revisionist History.",
      books: 5,
      genres: ["Non-Fiction", "Psychology", "Sociology"],
      image: "/images/authors/malcolm-gladwell.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Featured Authors</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {authors.map((author) => (
          <div
            key={author.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="h-64 bg-gray-200 relative">
              {/* Placeholder for author image */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                {author.name}
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{author.name}</h2>
              <p className="text-gray-600 text-sm mb-4">
                {author.books} books published
              </p>

              <p className="text-gray-700 mb-4 line-clamp-3">{author.bio}</p>

              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Genres:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {author.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors">
                View Books
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorsPage;
