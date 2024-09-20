import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { pages, loggedInPages } from "../constants/constants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // For user profile dropdown
  const [searchQuery, setSearchQuery] = useState(""); // For search functionality
  const user = useSelector((state) => state.user); // Redux user state
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Reference to the dropdown

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Array for dropdown options when the user is logged in
  const profileDropdownOptions = [
    { name: "Profile", path: "/profile" },
    { name: "Logout", path: "/logout" },
  ];

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo / Branding */}
          <Link to="/" className="text-lg font-semibold">Library Management System</Link>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center">
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring focus:border-blue-500"
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </form>

        {/* Desktop Links / User Profile */}
        <div className="hidden md:flex space-x-4 items-center">
          {user.isLoggedIn
            ? (
              <>
                {/* Display Links for Logged-in Users */}
                {loggedInPages.map((page) => (
                  <NavLink
                    to={page.path}
                    key={page.name}
                    className={({ isActive }) =>
                      `${isActive ? "text-blue-500" : ""} text-gray-700 hover:text-blue-500`
                    }
                  >
                    {page.name}
                  </NavLink>
                ))}

                {/* User Profile with Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <img
                      src={user.userData.avatar} // Assuming user has profileImage in the state
                      alt="User Profile"
                      className="h-8 w-8 rounded-full"
                    />
                  </button>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-10">
                      {profileDropdownOptions.map((option) => (
                        <NavLink
                          key={option.name}
                          to={option.path}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setDropdownOpen(false)}
                        >
                          {option.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )
            : (
              // Non-Logged-in Links
              pages.map((page) => (
                <NavLink
                  to={page.path}
                  key={page.name}
                  className={({ isActive }) =>
                    `${isActive ? "text-blue-500" : ""} text-gray-700 hover:text-blue-500`
                  }
                >
                  {page.name}
                </NavLink>
              ))
            )
          }
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          {user.isLoggedIn
            ? (
              <>
                {loggedInPages.map((page) => (
                  <NavLink
                    key={page.name}
                    to={page.path}
                    className="block text-gray-700 hover:text-blue-500 px-4 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {page.name}
                  </NavLink>
                ))}
                <div className="block text-gray-700 px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <img
                      src={user.userData.avatar}
                      alt="User Profile"
                      className="h-8 w-8 rounded-full"
                    />
                    <span>{user.name}</span>
                  </div>

                  {profileDropdownOptions.map((option) => (
                    <NavLink
                      key={option.name}
                      to={option.path}
                      className="block text-gray-700 hover:text-blue-500 px-4 py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {option.name}
                    </NavLink>
                  ))}
                </div>
              </>
            )
            : (
              pages.map((page) => (
                <NavLink
                  key={page.name}
                  to={page.path}
                  className="block text-gray-700 hover:text-blue-500 px-4 py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {page.name}
                </NavLink>
              ))
            )
          }

          <form onSubmit={handleSearchSubmit} className="flex items-center px-4 py-2">
            <input
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 w-full focus:outline-none focus:ring focus:border-blue-500"
            />
            <button
              type="submit"
              className="ml-2 bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
