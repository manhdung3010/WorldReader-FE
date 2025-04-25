import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partners | WorldReader",
  description: "Our partners in making knowledge accessible to everyone",
};

const PartnersPage = () => {
  const partnerCategories = [
    {
      id: 1,
      title: "Publishers",
      description:
        "Leading publishing houses that provide content for our digital library",
      partners: [
        {
          id: 1,
          name: "Global Books",
          logo: "/images/partners/global-books-logo.png",
          description:
            "One of the world's largest publishing houses with a catalog of over 100,000 titles.",
        },
        {
          id: 2,
          name: "Literary Press",
          logo: "/images/partners/literary-press-logo.png",
          description:
            "Award-winning publisher specializing in contemporary fiction and non-fiction.",
        },
        {
          id: 3,
          name: "Academic Publishing",
          logo: "/images/partners/academic-publishing-logo.png",
          description:
            "Leading provider of academic and educational content for students and researchers.",
        },
        {
          id: 4,
          name: "Independent Press",
          logo: "/images/partners/independent-press-logo.png",
          description:
            "Championing diverse voices and innovative storytelling from around the world.",
        },
      ],
    },
    {
      id: 2,
      title: "Authors",
      description: "Talented writers who trust us to distribute their work",
      partners: [
        {
          id: 1,
          name: "Jane Smith",
          logo: "/images/partners/jane-smith-photo.png",
          description:
            "Bestselling author of contemporary fiction with over 20 published works.",
        },
        {
          id: 2,
          name: "John Davis",
          logo: "/images/partners/john-davis-photo.png",
          description:
            "Award-winning science fiction writer with a global following.",
        },
        {
          id: 3,
          name: "Maria Rodriguez",
          logo: "/images/partners/maria-rodriguez-photo.png",
          description:
            "Acclaimed author of historical fiction and cultural narratives.",
        },
        {
          id: 4,
          name: "David Chen",
          logo: "/images/partners/david-chen-photo.png",
          description:
            "Prolific writer of mystery and thriller novels with international success.",
        },
      ],
    },
    {
      id: 3,
      title: "Organizations",
      description: "Institutions and organizations that support our mission",
      partners: [
        {
          id: 1,
          name: "Global Literacy Foundation",
          logo: "/images/partners/global-literacy-logo.png",
          description:
            "Non-profit organization dedicated to promoting literacy worldwide.",
        },
        {
          id: 2,
          name: "Digital Education Initiative",
          logo: "/images/partners/digital-education-logo.png",
          description:
            "Coalition of educators and technologists working to improve digital learning.",
        },
        {
          id: 3,
          name: "Cultural Heritage Institute",
          logo: "/images/partners/cultural-heritage-logo.png",
          description:
            "Organization preserving and promoting cultural heritage through digital means.",
        },
        {
          id: 4,
          name: "Tech for Good Alliance",
          logo: "/images/partners/tech-for-good-logo.png",
          description:
            "Network of technology companies committed to positive social impact.",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Our Partners</h1>
        <p className="text-gray-600 mb-8">
          We work with leading publishers, authors, and organizations to make
          knowledge accessible to everyone.
        </p>

        {/* Partner Categories */}
        {partnerCategories.map((category) => (
          <div key={category.id} className="mb-16">
            <h2 className="text-2xl font-semibold mb-2">{category.title}</h2>
            <p className="text-gray-600 mb-6">{category.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {category.partners.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                      {/* Placeholder for partner logo */}
                      <span className="text-gray-500 text-xs text-center">
                        {partner.name}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold">{partner.name}</h3>
                  </div>
                  <p className="text-gray-600">{partner.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Become a Partner */}
        <div className="bg-primary-50 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">Become a Partner</h2>
          <p className="mb-6">
            We're always looking to expand our network of partners. Whether
            you're a publisher, author, or organization, we'd love to hear from
            you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="font-medium mb-2">Publishers</h3>
              <p className="text-gray-600 mb-4">
                Distribute your content to millions of readers worldwide.
              </p>
              <a
                href="/partners/publishers"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Learn More →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">✍️</div>
              <h3 className="font-medium mb-2">Authors</h3>
              <p className="text-gray-600 mb-4">
                Reach new audiences and maximize your book's visibility.
              </p>
              <a
                href="/partners/authors"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Learn More →
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="font-medium mb-2">Organizations</h3>
              <p className="text-gray-600 mb-4">
                Collaborate with us to promote literacy and education.
              </p>
              <a
                href="/partners/organizations"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Learn More →
              </a>
            </div>
          </div>
          <div className="text-center">
            <button className="bg-primary-600 text-white py-2 px-6 rounded-md hover:bg-primary-700 transition-colors">
              Contact Partnership Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersPage;
