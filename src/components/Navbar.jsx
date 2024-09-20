import React, { useState } from "react";
import { pages } from "../constants/constants";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          {/* <img src="logo.png" alt="Logo" className="h-8 mr-2" /> */}
          <span className="text-lg font-semibold">
            Library Management System
          </span>
        </div>

        <div className="hidden md:flex space-x-4">
          {pages.map((page) => (
            <NavLink
              to={page.path}
              key={page.name}
              className={({ isActive }) =>
                `${
                  isActive ? "text-blue-500" : ""
                } text-gray-700 hover:text-blue-500`
              }
            >
              {page.name}
            </NavLink>
          ))}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          {pages.map((page) => (
            <a
              key={page.name}
              href={page.path}
              className="block text-gray-700 hover:text-blue-500 px-4 py-2"
            >
              {page.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
