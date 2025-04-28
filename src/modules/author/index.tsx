"use client";

import React, { useState, useEffect } from "react";
import { Metadata } from "next";
import { getAuthor } from "@/services/author.service";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Pagination from "@/shared/Pagination/Pagination";

export const metadata: Metadata = {
  title: "Authors | WorldReader",
  description: "Discover authors and their works on WorldReader",
};

interface Author {
  id: number;
  name: string;
  biography: string;
  date: string;
  nationality: string;
  image: string | null;
}

const AuthorsPage = () => {
  const [filters, setFilters] = useState({
    name: "",
    nationality: "",
    page: 1,
    pageSize: 12,
  });

  const {
    data: authorData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "authors",
      filters.name,
      filters.nationality,
      filters.page,
      filters.pageSize,
    ],
    queryFn: async () => {
      const response: any = await getAuthor(filters);
      return response;
    },
    keepPreviousData: true,
  });

  const authors = authorData?.data || [];
  const totalPages = authorData?.totalPages || 1;
  const totalElements = authorData?.totalElements || 0;

  console.log(authorData);

  const handleFilterChange = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset to first page when filters change
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            {" "}
            An error occurred while loading authors
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Featured Authors</h1>

      {/* Filters */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Search by name"
            value={filters.name}
            onChange={(e) => handleFilterChange({ name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nationality
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Search by nationality"
            value={filters.nationality}
            onChange={(e) =>
              handleFilterChange({ nationality: e.target.value })
            }
          />
        </div>
      </div>

      {/* Results count */}
      <p className="text-gray-600 mb-6">
        Showing {authors.length} of {totalElements} authors
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {authors.map((author: Author) => (
          <div
            key={author.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="h-64 bg-gray-200 relative">
              {author.image ? (
                <Image
                  src={author.image}
                  alt={author.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  {author.name}
                </div>
              )}
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{author.name}</h2>
              <p className="text-gray-600 text-sm mb-2">
                {author.nationality} • {new Date(author.date).getFullYear()}
              </p>

              <p className="text-gray-700 mb-4 line-clamp-3">
                {author.biography}
              </p>

              <button className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 transition-colors">
                View Books
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <Pagination
            currentPage={filters.page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default AuthorsPage;
