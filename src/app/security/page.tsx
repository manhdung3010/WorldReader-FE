import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security | WorldReader",
  description:
    "Learn about WorldReader's security measures and data protection",
};

const SecurityPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Security at WorldReader</h1>

      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Our Commitment to Security
          </h2>
          <p className="text-gray-600">
            At WorldReader, we prioritize the security of your data and personal
            information. We implement industry-standard security measures to
            protect your account and ensure a safe reading experience.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3">Encryption</h3>
              <p className="text-gray-600">
                All data transmitted between your device and our servers is
                encrypted using industry-standard SSL/TLS protocols.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3">Secure Storage</h3>
              <p className="text-gray-600">
                Your personal information and reading data are stored in secure,
                encrypted databases with regular backups.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Account Security</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3">
                Two-Factor Authentication
              </h3>
              <p className="text-gray-600">
                Enable two-factor authentication to add an extra layer of
                security to your account.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3">
                Password Requirements
              </h3>
              <p className="text-gray-600">
                We enforce strong password policies and regular password updates
                to protect your account.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Payment Security</h2>
          <p className="text-gray-600">
            All payment transactions are processed securely through our trusted
            payment partners. We never store your complete credit card
            information on our servers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Regular Security Audits
          </h2>
          <p className="text-gray-600">
            We conduct regular security audits and penetration testing to
            identify and address potential vulnerabilities in our systems.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Security Best Practices
          </h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium mb-3">For Users</h3>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Use strong, unique passwords</li>
              <li>Enable two-factor authentication</li>
              <li>Keep your devices and browsers updated</li>
              <li>Be cautious of suspicious emails or links</li>
              <li>Log out of your account when using shared devices</li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Reporting Security Issues
          </h2>
          <p className="text-gray-600">
            If you discover a security vulnerability or have concerns about our
            security measures, please contact our security team:
            <br />
            Email: security@worldreader.com
            <br />
            We take all security reports seriously and will respond promptly.
          </p>
        </section>
      </div>
    </div>
  );
};

export default SecurityPage;
