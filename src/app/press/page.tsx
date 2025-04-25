import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press | WorldReader",
  description:
    "Latest news, press releases, and media coverage about WorldReader",
};

const PressPage = () => {
  const pressReleases = [
    {
      id: 1,
      date: "April 15, 2023",
      title: "WorldReader Reaches 10 Million Active Users",
      excerpt:
        "WorldReader today announced that it has reached 10 million active users worldwide, marking a significant milestone in the company's mission to make knowledge accessible to everyone.",
      link: "/press/releases/worldreader-reaches-10-million-users",
    },
    {
      id: 2,
      date: "March 8, 2023",
      title: "WorldReader Launches New Mobile App",
      excerpt:
        "WorldReader has launched a completely redesigned mobile app with enhanced features for a better reading experience across all devices.",
      link: "/press/releases/worldreader-launches-new-mobile-app",
    },
    {
      id: 3,
      date: "February 20, 2023",
      title: "WorldReader Partners with Leading Publishers",
      excerpt:
        "WorldReader has announced partnerships with several leading publishers to expand its digital library with thousands of new titles.",
      link: "/press/releases/worldreader-partners-with-leading-publishers",
    },
    {
      id: 4,
      date: "January 10, 2023",
      title: "WorldReader Secures $25M in Series B Funding",
      excerpt:
        "WorldReader has secured $25 million in Series B funding to accelerate its global expansion and enhance its technology platform.",
      link: "/press/releases/worldreader-secures-series-b-funding",
    },
  ];

  const mediaCoverage = [
    {
      id: 1,
      source: "TechCrunch",
      date: "April 5, 2023",
      title: "How WorldReader is Democratizing Access to Books",
      excerpt:
        "WorldReader's innovative approach to digital reading is making literature accessible to millions of people who previously had limited access to books.",
      link: "https://techcrunch.com/article-link",
      logo: "/images/press/techcrunch-logo.png",
    },
    {
      id: 2,
      source: "The New York Times",
      date: "March 15, 2023",
      title: "The Digital Library Revolution: WorldReader Leads the Way",
      excerpt:
        "As digital reading continues to grow, WorldReader is at the forefront of innovation, providing a seamless experience for readers around the world.",
      link: "https://nytimes.com/article-link",
      logo: "/images/press/nyt-logo.png",
    },
    {
      id: 3,
      source: "Forbes",
      date: "February 28, 2023",
      title: "WorldReader: The Startup Making Reading Accessible to Everyone",
      excerpt:
        "WorldReader's mission to make knowledge accessible to everyone is resonating with readers and investors alike.",
      link: "https://forbes.com/article-link",
      logo: "/images/press/forbes-logo.png",
    },
    {
      id: 4,
      source: "The Guardian",
      date: "January 20, 2023",
      title:
        "How WorldReader is Transforming Education in Developing Countries",
      excerpt:
        "WorldReader's digital library is helping to bridge the educational gap in developing countries by providing access to thousands of books.",
      link: "https://theguardian.com/article-link",
      logo: "/images/press/guardian-logo.png",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Press</h1>
        <p className="text-gray-600 mb-8">
          Latest news, press releases, and media coverage about WorldReader.
        </p>

        {/* Press Contact */}
        <div className="bg-primary-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Press Contact</h2>
          <p className="mb-6">
            For press inquiries, please contact our communications team:
          </p>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="mb-2">
              <strong>Email:</strong> press@worldreader.com
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
            <p>
              <strong>Address:</strong> 123 Reading Street, Bookville, BK 12345
            </p>
          </div>
        </div>

        {/* Press Releases */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Press Releases</h2>
          <div className="space-y-6">
            {pressReleases.map((release) => (
              <div
                key={release.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="text-sm text-gray-500 mb-2">{release.date}</div>
                <h3 className="text-xl font-semibold mb-2">{release.title}</h3>
                <p className="text-gray-600 mb-4">{release.excerpt}</p>
                <a
                  href={release.link}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Read More →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Media Coverage */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Media Coverage</h2>
          <div className="space-y-6">
            {mediaCoverage.map((media) => (
              <div key={media.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">
                    {/* Placeholder for media logo */}
                    <span className="text-gray-500 text-sm">
                      {media.source}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-2">
                      {media.date}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {media.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{media.excerpt}</p>
                    <a
                      href={media.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Read Article →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Kit */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Media Kit</h2>
          <p className="mb-6">
            Download our media kit for logos, brand guidelines, and company
            information.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/press/media-kit/worldreader-media-kit.pdf"
              className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-primary-600 mr-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Media Kit (PDF)</h3>
                <p className="text-sm text-gray-600">2.5 MB</p>
              </div>
            </a>
            <a
              href="/press/media-kit/worldreader-logos.zip"
              className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-primary-600 mr-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Logo Pack (ZIP)</h3>
                <p className="text-sm text-gray-600">1.2 MB</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressPage;
