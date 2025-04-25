import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | WorldReader",
  description: "Manage your reading preferences and account settings",
};

const SettingsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Reading Preferences */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Reading Preferences</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Size
              </label>
              <select className="w-full border-gray-300 rounded-md shadow-sm">
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
              <select className="w-full border-gray-300 rounded-md shadow-sm">
                <option>Light</option>
                <option>Dark</option>
                <option>Sepia</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Line Height
              </label>
              <select className="w-full border-gray-300 rounded-md shadow-sm">
                <option>Compact</option>
                <option>Comfortable</option>
                <option>Spacious</option>
              </select>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-6">Account Settings</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Notifications
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-primary-600" />
                  <label className="ml-2 text-sm text-gray-700">
                    Reading reminders
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-primary-600" />
                  <label className="ml-2 text-sm text-gray-700">
                    New book recommendations
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select className="w-full border-gray-300 rounded-md shadow-sm">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>

            <div>
              <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
