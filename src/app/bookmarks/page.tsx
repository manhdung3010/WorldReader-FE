import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bookmarks | WorldReader",
  description: "Manage your saved books and reading positions",
};

const BookmarksPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookmarks</h1>

      <div className="grid grid-cols-1 gap-6">
        {/* Bookmark Item */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">Book Title</h3>
              <p className="text-gray-600 text-sm mt-1">Chapter 5 - Page 127</p>
              <p className="text-gray-500 text-sm mt-2">
                Last read: 2 days ago
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                Continue Reading
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900">
            No bookmarks yet
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Start reading books and they will appear here
          </p>
          <button className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
            Browse Library
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookmarksPage;
