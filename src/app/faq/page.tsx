import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | WorldReader",
  description:
    "Find answers to common questions about WorldReader's digital library, subscription plans, account management, and technical support. Get help with your reading experience.",
  openGraph: {
    title: "Frequently Asked Questions | WorldReader",
    description:
      "Find answers to common questions about WorldReader's digital library, subscription plans, account management, and technical support.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WorldReader FAQ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Frequently Asked Questions | WorldReader",
    description:
      "Find answers to common questions about WorldReader's digital library and services.",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "/faq",
  },
};

const FAQPage = () => {
  const faqCategories = [
    {
      id: 1,
      title: "Account & Subscription",
      questions: [
        {
          id: 1,
          question: "How do I create an account?",
          answer:
            "You can create an account by clicking the 'Sign Up' button in the top right corner. You'll need to provide your email address, create a password, and verify your email.",
        },
        {
          id: 2,
          question: "How do I change my subscription plan?",
          answer:
            "You can change your subscription plan by going to your account settings and selecting 'Subscription'. From there, you can upgrade, downgrade, or cancel your subscription.",
        },
        {
          id: 3,
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and various local payment methods depending on your region.",
        },
      ],
    },
    {
      id: 2,
      title: "Reading & Books",
      questions: [
        {
          id: 1,
          question: "How do I download books for offline reading?",
          answer:
            "To download a book for offline reading, open the book and click the download icon. The book will be available in your library even when you're offline.",
        },
        {
          id: 2,
          question: "Can I read on multiple devices?",
          answer:
            "Yes, you can read on multiple devices. The number of devices depends on your subscription plan. Free users can use 1 device, Premium users can use 3 devices, and Family plan users can use 5 devices per member.",
        },
        {
          id: 3,
          question: "How do I bookmark pages?",
          answer:
            "While reading, tap the bookmark icon in the top right corner of the page to save your current position. You can access all your bookmarks from the book's menu.",
        },
      ],
    },
    {
      id: 3,
      title: "Technical Support",
      questions: [
        {
          id: 1,
          question: "What devices are supported?",
          answer:
            "WorldReader is available on web browsers, iOS, and Android devices. We support the latest versions of major browsers and operating systems.",
        },
        {
          id: 2,
          question: "How do I report a technical issue?",
          answer:
            "You can report technical issues by going to the Help Center and selecting 'Report an Issue'. Please provide as much detail as possible about the problem.",
        },
        {
          id: 3,
          question: "Is my reading progress saved?",
          answer:
            "Yes, your reading progress is automatically saved and synced across all your devices. You can continue reading from where you left off on any device.",
        },
      ],
    },
    {
      id: 4,
      title: "Privacy & Security",
      questions: [
        {
          id: 1,
          question: "How is my personal data protected?",
          answer:
            "We use industry-standard encryption and security measures to protect your personal data. Your information is stored securely and never shared with third parties without your consent.",
        },
        {
          id: 2,
          question: "Can I delete my account?",
          answer:
            "Yes, you can delete your account at any time from your account settings. Please note that this action is permanent and will delete all your data, including reading history and bookmarks.",
        },
        {
          id: 3,
          question: "How do I enable two-factor authentication?",
          answer:
            "You can enable two-factor authentication in your account settings under 'Security'. This adds an extra layer of security to your account.",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>

      <div className="space-y-8">
        {faqCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">{category.title}</h2>

            <div className="space-y-4">
              {category.questions.map((faq) => (
                <div
                  key={faq.id}
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 mb-4">
          {` Can't find what you're looking for?`}
        </p>
        <button className="bg-primary-600 text-white py-2 px-6 rounded-md hover:bg-primary-700 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default FAQPage;
