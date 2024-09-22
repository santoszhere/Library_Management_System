import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AxiosInstance from '../config/AxiosInstance';

const useQuery = () => {
      return new URLSearchParams(useLocation().search);
};

const AdvancedSearchPage = () => {
      const query = useQuery();
      const navigate = useNavigate();
      const [searchResults, setSearchResults] = useState([]);
      const [category, setCategory] = useState([])
      const [loading, setLoading] = useState(false);
      const [filters, setFilters] = useState({
            category: "",
            publicationYear: "",
            availability: false,
            sort: "new",
      });

      const searchQuery = query.get("query");
      useEffect(() => {
            if (searchQuery || filters.category || filters.publicationYear || filters.availability !== false) {
                  fetchSearchResults();
            }
      }, [searchQuery, filters]);

      const fetchSearchResults = async () => {
            setLoading(true);
            try {
                  const { data } = await AxiosInstance.get("/search/query", {
                        params: {
                              // query: searchQuery,
                              category: filters.category,
                              publicationYear: filters.publicationYear,
                              availability: filters.availability,
                        },
                  });
                  // Filter to prioritize exact matches
                  const exactMatches = data.data.filter(book =>
                        book.title.toLowerCase() === searchQuery.toLowerCase()
                  );
                  setSearchResults(exactMatches.length > 0 ? exactMatches : data.data);
            } catch (error) {
                  console.error("Error fetching search results:", error);
            } finally {
                  setLoading(false);
            }
      };

      const getCategory = async () => {
            const { data } = await AxiosInstance.get("search/get-category")
            if (data.statusCode === 200) {
                  setCategory(data.data)
            }
      }

      useEffect(() => {
            getCategory()
      }, [])

      const handleFilterChange = (e) => {
            const { name, value, type, checked } = e.target;
            setFilters({ ...filters, [name]: type === "checkbox" ? checked : value });
      };

      const handleSearch = (e) => {
            e.preventDefault();
            const params = new URLSearchParams();
            if (searchQuery) params.set("query", searchQuery);
            if (filters.category) params.set("category", filters.category);
            if (filters.publicationYear) params.set("publicationYear", filters.publicationYear);
            if (filters.availability !== undefined) params.set("availability", filters.availability);
            window.history.pushState({}, '', `?${params.toString()}`);
            fetchSearchResults();
      };

      // Sorting the books based on publication year
      const sortedResults = [...searchResults].sort((a, b) => {
            return filters.sort === "new" ? b.publicationYear - a.publicationYear : a.publicationYear - b.publicationYear;
      });

      const handleRedirectToBooks = () => {
            navigate('/books');
      };

      return (
            <div className="flex container mx-auto p-6">
                  {/* Filters Section */}
                  <div className="w-1/4 p-4 bg-gray-100 rounded-md shadow-md mr-6">
                        <h2 className="text-xl font-bold mb-4">Filters</h2>
                        <form onSubmit={handleSearch} className="space-y-4">
                              <div>
                                    <label className="block text-gray-700">Category</label>
                                    <select
                                          name="category"
                                          className="w-full px-4 py-2 border rounded-md focus:outline-none"
                                          value={filters.category}
                                          onChange={handleFilterChange}
                                    >
                                          {
                                                category?.map((cat, index) => (

                                                      <option key={index} value={cat}>{cat}</option>
                                                ))
                                          }

                                    </select>
                              </div>
                              <div>
                                    <label className="block text-gray-700">Publication Year</label>
                                    <input
                                          type="number"
                                          name="publicationYear"
                                          className="w-full px-4 py-2 border rounded-md focus:outline-none"
                                          value={filters.publicationYear}
                                          onChange={handleFilterChange}
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
                                          name="sort"
                                          className="w-full px-4 py-2 border rounded-md focus:outline-none"
                                          value={filters.sort}
                                          onChange={handleFilterChange}
                                    >
                                          <option value="new">New First</option>
                                          <option value="old">Old First</option>
                                    </select>
                              </div>
                              <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-full"
                              >
                                    Filter
                              </button>
                              <button
                                    type="button"
                                    onClick={handleRedirectToBooks}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full mt-2"
                              >
                                    Show All Books
                              </button>
                        </form>
                  </div>

                  {/* Search Results Section */}
                  <div className="w-3/4 p-4">
                        <h1 className="text-2xl font-bold mb-6">Search Results for: {searchQuery}</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                              {loading ? (
                                    <div className="text-center">Loading...</div>
                              ) : sortedResults.length > 0 ? (
                                    sortedResults.map((result) => (
                                          <div key={result._id} className="bg-white rounded-md shadow-md border border-gray-300 h-full flex flex-col p-4">

                                                <img src={result.coverImage} alt={result.title} className="w-full h-40 object-cover rounded-md mb-4" />

                                                <h2 className="text-xl font-semibold">{result.title}</h2>
                                                <p className="text-gray-600">by {result.author}</p>
                                                <p className="text-gray-500">{result.genre}</p>
                                                <p className="text-gray-400">Published: {result.publicationYear}</p>
                                                <p className={`text-lg font-bold ${result.availability ? "text-green-600" : "text-red-600"}`}>
                                                      {result.availability ? "Available" : "Unavailable"}
                                                </p>
                                                {!result.availability && result.borrowedBy && (
                                                      <div className="mt-2">
                                                            <p className="font-medium">Borrowed by:</p>
                                                            <span>{result.borrowedBy.username}</span>
                                                      </div>
                                                )}
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
