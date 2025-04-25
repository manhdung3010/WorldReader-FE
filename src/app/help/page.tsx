import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center | WorldReader",
  description:
    "Get support and find answers to your questions about WorldReader",
};

const HelpCenterPage = () => {
  const supportCategories = [
    {
      id: 1,
      title: "Getting Started",
      icon: "🚀",
      description: "Learn the basics of using WorldReader",
      articles: [
        {
          title: "How to create an account",
          link: "/help/getting-started/create-account",
        },
        {
          title: "Understanding your subscription",
          link: "/help/getting-started/subscription",
        },
        {
          title: "Navigating the library",
          link: "/help/getting-started/library",
        },
      ],
    },
    {
      id: 2,
      title: "Reading Experience",
      icon: "📚",
      description: "Make the most of your reading experience",
      articles: [
        {
          title: "Customizing your reading settings",
          link: "/help/reading/settings",
        },
        { title: "Using bookmarks and notes", link: "/help/reading/bookmarks" },
        { title: "Offline reading guide", link: "/help/reading/offline" },
      ],
    },
    {
      id: 3,
      title: "Account & Billing",
      icon: "💰",
      description: "Manage your account and payments",
      articles: [
        {
          title: "Updating payment information",
          link: "/help/account/payment",
        },
        {
          title: "Changing subscription plans",
          link: "/help/account/subscription",
        },
        { title: "Canceling your subscription", link: "/help/account/cancel" },
      ],
    },
    {
      id: 4,
      title: "Technical Support",
      icon: "🔧",
      description: "Troubleshoot technical issues",
      articles: [
        { title: "Common error messages", link: "/help/technical/errors" },
        { title: "Device compatibility", link: "/help/technical/devices" },
        {
          title: "App performance issues",
          link: "/help/technical/performance",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Help Center</h1>
        <p className="text-gray-600 mb-8">
          Find answers to common questions and get support for your WorldReader
          experience.
        </p>

        {/* Search Bar */}
        <div className="mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for help..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
            <button className="absolute right-3 top-3 text-gray-400 hover:text-gray-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Support Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {supportCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-start mb-4">
                <span className="text-3xl mr-4">{category.icon}</span>
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    {category.title}
                  </h2>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {category.articles.map((article, index) => (
                  <li key={index}>
                    <a
                      href={article.link}
                      className="text-primary-600 hover:text-primary-700 flex items-center"
                    >
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      {article.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Options */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Still Need Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-4">📧</div>
              <h3 className="font-medium mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">
                Get help via email within 24 hours
              </p>
              <a
                href="mailto:support@worldreader.com"
                className="text-primary-600 hover:text-primary-700"
              >
                support@worldreader.com
              </a>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="font-medium mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Chat with our support team</p>
              <button className="text-primary-600 hover:text-primary-700">
                Start Chat
              </button>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-4">📱</div>
              <h3 className="font-medium mb-2">Community Forum</h3>
              <p className="text-gray-600 mb-4">Connect with other readers</p>
              <a
                href="/community"
                className="text-primary-600 hover:text-primary-700"
              >
                Visit Forum
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
