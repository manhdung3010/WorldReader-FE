import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Digital Library | WorldReader",
  description:
    "Access your personal digital library with WorldReader. Browse, read, and manage your collection of books, articles, and educational content in one place.",
  openGraph: {
    title: "Your Digital Library | WorldReader",
    description:
      "Access your personal digital library with WorldReader. Browse, read, and manage your collection of books, articles, and educational content in one place.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WorldReader Digital Library",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Digital Library | WorldReader",
    description:
      "Access your personal digital library with WorldReader. Browse and read your collection in one place.",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "/library",
  },
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
