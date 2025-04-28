import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | WorldReader - Your Digital Reading Companion",
  description:
    "Learn how WorldReader protects your personal information and data. Our comprehensive privacy policy explains how we collect, use, and safeguard your information when you use our digital reading platform.",
  keywords: [
    "WorldReader privacy",
    "data protection",
    "personal information",
    "privacy policy",
    "data security",
    "user privacy",
  ],
  openGraph: {
    title: "Privacy Policy | WorldReader - Digital Reading Platform",
    description:
      "Learn how WorldReader protects your personal information and data. Our comprehensive privacy policy explains how we collect, use, and safeguard your information.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WorldReader Privacy Policy - Digital Reading Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | WorldReader - Digital Reading Platform",
    description:
      "Learn how WorldReader protects your personal information and data.",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const PrivacyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-gray-600">
            At WorldReader, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you use our service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Information We Collect
          </h2>
          <h3 className="text-xl font-medium mb-3">2.1 Personal Information</h3>
          <p className="text-gray-600">
            We may collect personal information that you voluntarily provide to
            us when you:
          </p>
          <ul className="list-disc pl-6 mt-4 text-gray-600">
            <li>Register for an account</li>
            <li>Subscribe to our newsletter</li>
            <li>Make a purchase</li>
            <li>Contact our support team</li>
          </ul>

          <h3 className="text-xl font-medium mb-3 mt-6">
            2.2 Usage Information
          </h3>
          <p className="text-gray-600">
            We automatically collect certain information when you use our
            service, including:
          </p>
          <ul className="list-disc pl-6 mt-4 text-gray-600">
            <li>Device information</li>
            <li>Log data</li>
            <li>Reading history and preferences</li>
            <li>Bookmark and note data</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. How We Use Your Information
          </h2>
          <p className="text-gray-600">
            We use the collected information for various purposes:
          </p>
          <ul className="list-disc pl-6 mt-4 text-gray-600">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>
              To gather analysis or valuable information to improve our service
            </li>
            <li>To monitor the usage of our service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
          <p className="text-gray-600">
            We implement appropriate technical and organizational security
            measures to protect your personal information. However, no method of
            transmission over the Internet is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
          <p className="text-gray-600">You have the right to:</p>
          <ul className="list-disc pl-6 mt-4 text-gray-600">
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Data portability</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
          <p className="text-gray-600">
            We use cookies and similar tracking technologies to track activity
            on our service and hold certain information. You can instruct your
            browser to refuse all cookies or to indicate when a cookie is being
            sent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">{`7. Children's Privacy`}</h2>
          <p className="text-gray-600">
            Our service is not intended for use by children under the age of 13.
            We do not knowingly collect personal information from children under
            13.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            8. Changes to This Privacy Policy
          </h2>
          <p className="text-gray-600">
            {`We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last Updated" date.`}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please contact
            us:
            <br />
            Email: privacy@worldreader.com
            <br />
            Address: [Your Company Address]
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPage;
