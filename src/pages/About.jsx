import React from "react";

const About = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-96 rounded-lg shadow-lg overflow-hidden mb-8"
        style={{ backgroundImage: "url('image-2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold text-white mb-4 text-center">
            About Us
          </h1>
          <p className="text-lg text-gray-200 text-center max-w-2xl">
            Learn more about the system, the importance of books, and meet the passionate team that brings it all together.
          </p>
        </div>
      </div>

      {/* About the System Section */}
      <section className="mb-12 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">Our Mission</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Our library system is built with the goal of making knowledge accessible to everyone. From fiction to non-fiction, historical archives to modern-day research papers, we strive to provide a vast collection of books to enhance knowledge, spark creativity, and inspire learning.
        </p>
      </section>

      {/* Importance of Books Section */}
      <section className="mb-12 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          Why Books Matter
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
          Books are more than just a collection of pages; they hold the power to expand minds, challenge ideas, and foster empathy. Whether you're learning something new or escaping into a different world, books provide knowledge, entertainment, and inspiration like no other medium.
        </p>
        <img
          src="image-3.jpg"
          alt="Books"
          className="mx-auto rounded-lg shadow-lg"
        />
      </section>

      {/* Team Section */}
      <section className="mb-12 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src="image-1.jpg"
              alt="Team Member 1"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              John Doe
            </h3>
            <p className="text-gray-600 font-medium mb-4">Founder & CEO</p>
            <p className="text-gray-500">
              John is the visionary behind the system, ensuring it runs smoothly and provides value to all users. With a passion for technology and education, he leads the team with inspiration.
            </p>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src="image-1.jpg"

              alt="Team Member 2"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Jane Smith
            </h3>
            <p className="text-gray-600 font-medium mb-4">Chief Librarian</p>
            <p className="text-gray-500">
              Jane curates the book collection, ensuring it meets the needs of readers from all backgrounds and interests. With over a decade of experience, she brings a wealth of knowledge to the team.
            </p>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img
              src="image-1.jpg"

              alt="Team Member 3"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Emily Johnson
            </h3>
            <p className="text-gray-600 font-medium mb-4">Lead Developer</p>
            <p className="text-gray-500">
              Emily is responsible for building and maintaining the platform. Her expertise in software development ensures the system runs seamlessly for all users.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Join Our Community
        </h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
          Become a part of our growing community of readers and learners. Whether you're here for knowledge or inspiration, we welcome you to explore our library and take advantage of the resources available.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium">
          Explore Our Collection
        </button>
      </section>
    </div>
  );
};

export default About;
