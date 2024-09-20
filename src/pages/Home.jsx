import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomePage = () => {
  return (
    <div className="bg-gray-100">
      {/* Header Section */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Our Library Management System
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Manage your library efficiently and effortlessly with our intuitive
          system.
        </p>
      </div>

      {/* Image Slider Section */}
      <div className="h-64 md:h-[650px] mb-10 overflow-hidden">
        <Carousel
          showArrows={true}
          showStatus={true}
          showIndicators={true}
          autoPlay={true}
          infiniteLoop={true}
          interval={2000}
        >
          <div>
            <img src="./image-1.jpg" />
          </div>
          <div>
            <img src="./image-2.jpg" alt="Library Image 2" />
          </div>
          <div>
            <img src="./image-3.jpg" alt="Library Image 3" />
          </div>

          <div>
            <img src="./image-4.jpg" alt="Library Image 3" />
          </div>
        </Carousel>
      </div>

      {/* Description Section */}
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-4">About Our System</h2>
        <p className="text-gray-700 mb-4">
          Our Library Management System is designed to streamline library
          operations, making it easier for both librarians and patrons. With
          features such as book tracking, member management, and online catalog
          access, we provide a comprehensive solution for modern libraries.
        </p>
        <p className="text-gray-700">
          Whether you're managing a small community library or a large academic
          institution, our system can be tailored to meet your needs. Join us in
          enhancing the library experience for everyone.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
