import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | WorldReader",
  description:
    "Learn about how WorldReader uses cookies and similar technologies",
};

const CookiePolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
        <p className="text-gray-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-lg max-w-none">
          <p className="mb-6">
            {`This Cookie Policy explains how WorldReader ("we", "us", or "our")
            uses cookies and similar technologies to recognize you when you
            visit our website. It explains what these technologies are and why
            we use them, as well as your rights to control our use of them.`}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            What are cookies?
          </h2>
          <p className="mb-6">
            Cookies are small data files that are placed on your computer or
            mobile device when you visit a website. Cookies are widely used by
            website owners to make their websites work, or to work more
            efficiently, as well as to provide reporting information.
          </p>
          <p className="mb-6">
            {`Cookies set by the website owner (in this case, WorldReader) are
            called "first-party cookies". Cookies set by parties other than the
            website owner are called "third-party cookies". Third-party cookies
            enable third-party features or functionality to be provided on or
            through the website (e.g., advertising, interactive content, and
            analytics). The parties that set these third-party cookies can
            recognize your computer both when it visits the website in question
            and also when it visits certain other websites.`}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Why do we use cookies?
          </h2>
          <p className="mb-6">
            {`We use first-party and third-party cookies for several reasons. Some
            cookies are required for technical reasons in order for our website
            to operate, and we refer to these as "essential" or "strictly
            necessary" cookies. Other cookies enable us to track and target the
            interests of our users to enhance the experience on our website.
            Third parties serve cookies through our website for advertising,
            analytics, and other purposes.`}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Types of cookies we use
          </h2>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">Essential Cookies</h3>
            <p className="mb-4">
              These cookies are strictly necessary to provide you with services
              available through our website and to use some of its features,
              such as access to secure areas. Because these cookies are strictly
              necessary to deliver the website, you cannot refuse them without
              impacting how our website functions.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">Performance Cookies</h3>
            <p className="mb-4">
              These cookies are used to enhance the performance and
              functionality of our website but are non-essential to their use.
              However, without these cookies, certain functionality may become
              unavailable.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">
              Analytics and Customization Cookies
            </h3>
            <p className="mb-4">
              These cookies collect information that is used either in aggregate
              form to help us understand how our website is being used or how
              effective our marketing campaigns are, or to help us customize our
              website for you in order to enhance your experience.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">Advertising Cookies</h3>
            <p className="mb-4">
              These cookies are used to make advertising messages more relevant
              to you and your interests. They also perform functions like
              preventing the same ad from continuously reappearing, ensuring
              that ads are properly displayed, and in some cases selecting
              advertisements that are based on your interests.
            </p>
          </div>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            How can you control cookies?
          </h2>
          <p className="mb-6">
            You have the right to decide whether to accept or reject cookies.
            You can exercise your cookie preferences by clicking on the
            appropriate opt-out links provided below.
          </p>
          <p className="mb-6">
            You can set your browser to refuse all or some browser cookies, or
            to alert you when websites set or access cookies. If you disable or
            refuse cookies, please note that some parts of this website may
            become inaccessible or not function properly.
          </p>
          <p className="mb-6">
            For more information about the cookies we use, please contact us at
            privacy@worldreader.com.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Do Not Track</h2>
          <p className="mb-6">
           {` Some browsers have incorporated "Do Not Track" (DNT) features that
            can send a signal to the websites you visit indicating you do not
            wish to be tracked. Because there is not yet a common understanding
            of how to interpret the DNT signal, our website does not currently
            respond to browser DNT signals.`}
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">
            Changes to this Cookie Policy
          </h2>
          <p className="mb-6">
            We may update this Cookie Policy from time to time in order to
            reflect, for example, changes to the cookies we use or for other
            operational, legal, or regulatory reasons. Please therefore revisit
            this Cookie Policy regularly to stay informed about our use of
            cookies and related technologies.
          </p>
          <p className="mb-6">
            The date at the top of this Cookie Policy indicates when it was last
            updated.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
          <p className="mb-6">
            If you have any questions about our use of cookies or other
            technologies, please contact us at:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="mb-2">
              <strong>Email:</strong> privacy@worldreader.com
            </p>
            <p className="mb-2">
              <strong>Address:</strong> 123 Reading Street, Bookville, BK 12345
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
