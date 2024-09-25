import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCategory, searchQuery } from "../config/AxiosInstance";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

// Debounce function
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const AdvancedSearchPage = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    title: "",
    isbn: "",
    genre: "",
    publicationYear: "",
    availability: false,
    sortBy: "newest",
  });

  // Debounced states for title, isbn, and publicationYear
  const [debouncedTitle, setDebouncedTitle] = useState(filters.title);
  const [debouncedIsbn, setDebouncedIsbn] = useState(filters.isbn);
  const [debouncedPublicationYear, setDebouncedPublicationYear] = useState(
    filters.publicationYear
  );

  // Debounce for title
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setFilters({ ...filters, title: newTitle });
    debounceTitleChange(newTitle);
  };

  const debounceTitleChange = useCallback(
    debounce((value) => {
      setDebouncedTitle(value);
    }, 500),
    []
  );

  // Debounce for ISBN
  const handleIsbnChange = (e) => {
    const newIsbn = e.target.value;
    setFilters({ ...filters, isbn: newIsbn });
    debounceIsbnChange(newIsbn);
  };

  const debounceIsbnChange = useCallback(
    debounce((value) => {
      setDebouncedIsbn(value);
    }, 500),
    []
  );

  // Debounce for publicationYear
  const handlePublicationYearChange = (e) => {
    const newPublicationYear = e.target.value;
    setFilters({ ...filters, publicationYear: newPublicationYear });
    debouncePublicationYearChange(newPublicationYear);
  };

  const debouncePublicationYearChange = useCallback(
    debounce((value) => {
      setDebouncedPublicationYear(value);
    }, 500),
    []
  );

  // Fetch search results whenever debounced values or other filters change
  useEffect(() => {
    fetchSearchResults();
  }, [
    debouncedTitle,
    debouncedIsbn,
    debouncedPublicationYear,
    filters.genre,
    filters.availability,
    filters.sortBy,
  ]);

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const params = {
        ...(filters.genre && {
          genre: filters.genre === "All" ? "" : filters.genre,
        }),
        ...(debouncedPublicationYear && {
          publicationYear: debouncedPublicationYear,
        }),
        ...(filters.availability && { availability: filters.availability }),
        ...(debouncedTitle && { title: debouncedTitle }),
        ...(debouncedIsbn && { isbn: debouncedIsbn }),
        sortBy: filters.sortBy,
      };

      const { data } = await searchQuery(params);
      setSearchResults(data.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  const getGenres = async () => {
    try {
      const { data } = await getCategory();
      if (data.statusCode === 200) {
        setGenres(data.data);
      }
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "genre" && value === "All") {
      setFilters({
        title: "",
        isbn: "",
        genre: "",
        publicationYear: "",
        availability: false,
        sortBy: "newest",
      });
    } else {
      setFilters({ ...filters, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleRedirectToBooks = () => {
    navigate("/books");
  };

  return (
    <div className="flex flex-col lg:flex-row container mx-auto p-6">
      {/* Filters Section */}
      <div className="w-full lg:w-1/4 p-4 bg-gray-100 rounded-md shadow-md mb-6 lg:mb-0 lg:mr-6">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700">Genre</label>
            <select
              name="genre"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              value={filters.genre}
              onChange={handleFilterChange}
            >
              <option value="">All</option>
              {genres?.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
              <option value="All">All Genres</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              value={filters.title}
              onChange={handleTitleChange}
              placeholder="Enter book title"
            />
          </div>
          <div>
            <label className="block text-gray-700">ISBN</label>
            <input
              type="text"
              name="isbn"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              value={filters.isbn}
              onChange={handleIsbnChange}
              placeholder="Enter ISBN number"
            />
          </div>

          <div>
            <label className="block text-gray-700">Publication Year</label>
            <input
              type="number"
              name="publicationYear"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              value={filters.publicationYear}
              onChange={handlePublicationYearChange}
              placeholder="Enter publication year"
            />
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="availability"
                checked={filters.availability}
                onChange={handleFilterChange}
              />
              <span className="ml-2">Available</span>
            </label>
          </div>
          <div>
            <label className="block text-gray-700">Sort By</label>
            <select
              name="sortBy"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              value={filters.sortBy}
              onChange={handleFilterChange}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title">Title</option>
            </select>
          </div>
          <button
            type="button"
            onClick={handleRedirectToBooks}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
          >
            Show All Books
          </button>
        </form>
      </div>

      {/* Search Results Section */}
      <div className="w-full lg:w-3/4">
        <h1 className="text-2xl font-bold mb-6">Search Results</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : searchResults.length > 0 ? (
            searchResults.map((result) => (
              <div
                key={result._id}
                className="bg-white rounded-md shadow-md border border-gray-300 h-full flex flex-col p-4 transform transition duration-500 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={result.coverImage}
                  alt={result.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <div className="flex justify-between">
                  <div className="text-left">
                    <h2 className="text-xl font-semibold">{result.title}</h2>
                    <p className="text-gray-600">by {result.author}</p>
                    <p className="text-gray-500">{result.genre}</p>
                    <p className="text-gray-400">
                      Published: {result.publicationYear}
                    </p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-bold ${
                        result.availability ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {result.availability ? "Available" : "Unavailable"}
                    </p>
                    {!result.availability && result.borrowedBy && (
                      <div className="mt-2">
                        <p className="font-medium">Borrowed by:</p>
                        <span>{result.borrowedBy.username}</span>
                      </div>
                    )}
                  </div>
                </div>
                {result.availability && (
                  <button
                    onClick={handleRedirectToBooks}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full mt-2"
                  >
                    Borrow This Book
                  </button>
                )}
              </div>
            ))
          ) : (
            <p>No results found for applied filters</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchPage;
