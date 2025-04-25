import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | WorldReader",
  description: "Join our team and help shape the future of digital reading",
};

const CareersPage = () => {
  const jobOpenings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote / New York, NY",
      type: "Full-time",
      description:
        "We're looking for an experienced frontend developer to join our team and help build the next generation of our reading platform.",
    },
    {
      id: 2,
      title: "Content Acquisition Manager",
      department: "Content",
      location: "London, UK",
      type: "Full-time",
      description:
        "Join our content team to help expand our library with diverse and engaging books from around the world.",
    },
    {
      id: 3,
      title: "UX Designer",
      department: "Design",
      location: "Remote / San Francisco, CA",
      type: "Full-time",
      description:
        "Help create intuitive and beautiful reading experiences for our users across all devices.",
    },
    {
      id: 4,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Berlin, Germany",
      type: "Full-time",
      description:
        "Drive user acquisition and engagement through creative marketing campaigns and partnerships.",
    },
    {
      id: 5,
      title: "Customer Support Representative",
      department: "Support",
      location: "Remote",
      type: "Full-time",
      description:
        "Provide excellent support to our readers and help them get the most out of WorldReader.",
    },
    {
      id: 6,
      title: "Data Scientist",
      department: "Analytics",
      location: "Remote / Boston, MA",
      type: "Full-time",
      description:
        "Use data to improve our recommendation engine and enhance the reading experience for our users.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Join Our Team</h1>
        <p className="text-gray-600 mb-8">
          Help us build the future of digital reading and make knowledge
          accessible to everyone.
        </p>

        {/* Company Culture Section */}
        <div className="bg-primary-50 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Culture</h2>
          <p className="mb-6">
            At WorldReader, we believe in creating an inclusive environment
            where everyone can thrive. We value diversity, creativity, and
            collaboration, and we're committed to making a positive impact
            through technology.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">🌍</div>
              <h3 className="font-medium mb-2">Global Impact</h3>
              <p className="text-gray-600">
                Help make knowledge accessible to readers around the world.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="font-medium mb-2">Innovation</h3>
              <p className="text-gray-600">
                Work on cutting-edge technology that transforms how people read.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="font-medium mb-2">Collaboration</h3>
              <p className="text-gray-600">
                Join a team that values diverse perspectives and ideas.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Benefits & Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="text-primary-600 mr-4">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Competitive Compensation</h3>
                <p className="text-gray-600">
                  Salary, equity, and performance bonuses
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-primary-600 mr-4">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Health & Wellness</h3>
                <p className="text-gray-600">
                  Comprehensive health coverage and wellness programs
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-primary-600 mr-4">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Flexible Work</h3>
                <p className="text-gray-600">
                  Remote work options and flexible hours
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-primary-600 mr-4">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Learning & Development</h3>
                <p className="text-gray-600">
                  Professional development and learning resources
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-primary-600 mr-4">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Time Off</h3>
                <p className="text-gray-600">
                  Generous vacation, holidays, and parental leave
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-primary-600 mr-4">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-1">Team Events</h3>
                <p className="text-gray-600">
                  Regular team activities and social events
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Job Openings */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Open Positions</h2>
          <div className="space-y-6">
            {jobOpenings.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 bg-primary-600 text-white py-2 px-6 rounded-md hover:bg-primary-700 transition-colors">
                    Apply Now
                  </button>
                </div>
                <p className="text-gray-600">{job.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gray-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Don't See the Right Role?
          </h2>
          <p className="text-gray-600 mb-6">
            We're always looking for talented people to join our team. Send us
            your resume and we'll keep you in mind for future opportunities.
          </p>
          <button className="bg-primary-600 text-white py-2 px-6 rounded-md hover:bg-primary-700 transition-colors">
            Submit Your Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareersPage;
