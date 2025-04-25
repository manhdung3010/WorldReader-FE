import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading Progress | WorldReader",
  description: "Track your reading progress and achievements",
};

const ReadingProgressPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Reading Progress</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Currently Reading Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Currently Reading</h2>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium">Book Title</h3>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-primary-600 h-2.5 rounded-full"
                    style={{ width: "45%" }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">45% Complete</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reading Stats Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Reading Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-primary-600">12</p>
              <p className="text-sm text-gray-600">Books Read</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-primary-600">3</p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-primary-600">5</p>
              <p className="text-sm text-gray-600">Want to Read</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-primary-600">2,450</p>
              <p className="text-sm text-gray-600">Pages Read</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingProgressPage;
