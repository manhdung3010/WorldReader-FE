import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library | WorldReader",
  description: "Browse our extensive collection of books",
};

const LibraryPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Library</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Book cards will be mapped here */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="aspect-w-3 aspect-h-4 bg-gray-200 rounded-lg mb-4"></div>
          <h3 className="font-semibold text-lg mb-2">Book Title</h3>
          <p className="text-gray-600 text-sm mb-2">Author Name</p>
          <div className="flex justify-between items-center">
            <span className="text-primary-600 font-medium">Category</span>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
              Read Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
