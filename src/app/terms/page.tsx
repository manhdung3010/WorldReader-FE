import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | WorldReader - Your Digital Reading Companion",
  description:
    "Read our comprehensive Terms of Service to understand the rules, guidelines, and agreements that govern your use of WorldReader's digital reading platform and services.",
  keywords: [
    "WorldReader terms",
    "terms of service",
    "user agreement",
    "digital reading",
    "platform rules",
    "service guidelines",
  ],
  openGraph: {
    title: "Terms of Service | WorldReader - Digital Reading Platform",
    description:
      "Read our comprehensive Terms of Service to understand the rules, guidelines, and agreements that govern your use of WorldReader's digital reading platform.",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WorldReader Terms of Service - Digital Reading Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | WorldReader - Digital Reading Platform",
    description:
      "Read our comprehensive Terms of Service to understand the rules and guidelines for using WorldReader.",
    images: ["/twitter-image.jpg"],
  },
  alternates: {
    canonical: "/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-gray-600">
            {`By accessing and using WorldReader's services, you agree to be bound
            by these Terms of Service. If you do not agree to these terms,
            please do not use our services.`}
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. Description of Service
          </h2>
          <p className="text-gray-600">
            WorldReader provides an online platform for reading and purchasing
            digital books. Our services include:
          </p>
          <ul className="list-disc pl-6 mt-4 text-gray-600">
            <li>Access to digital book library</li>
            <li>Book purchasing and rental options</li>
            <li>Reading progress tracking</li>
            <li>Bookmarking and note-taking features</li>
            <li>Personalized recommendations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
          <p className="text-gray-600">
            To access certain features of WorldReader, you must create an
            account. You are responsible for:
          </p>
          <ul className="list-disc pl-6 mt-4 text-gray-600">
            <li>Maintaining the confidentiality of your account</li>
            <li>All activities that occur under your account</li>
            <li>Notifying us immediately of any unauthorized use</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Payment Terms</h2>
          <p className="text-gray-600">
            All purchases are final and non-refundable unless otherwise
            specified. Subscription fees are billed in advance on a recurring
            basis.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Intellectual Property
          </h2>
          <p className="text-gray-600">
            All content available through WorldReader is protected by copyright
            and other intellectual property laws. You may not copy, distribute,
            or create derivative works without authorization.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            6. Limitation of Liability
          </h2>
          <p className="text-gray-600">
            WorldReader shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages resulting from your use
            of our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to Terms</h2>
          <p className="text-gray-600">
            We reserve the right to modify these terms at any time. Continued
            use of our services after changes constitutes acceptance of the
            modified terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            8. Contact Information
          </h2>
          <p className="text-gray-600">
            For questions about these Terms of Service, please contact us at:
            <br />
            Email: support@worldreader.com
            <br />
            Address: [Your Company Address]
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsPage;
