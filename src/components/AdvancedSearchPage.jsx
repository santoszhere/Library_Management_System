import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useQuery = () => {
      return new URLSearchParams(useLocation().search);
};

const AdvancedSearchPage = () => {
      const query = useQuery();
      const [searchResults, setSearchResults] = useState([]);
      const [filters, setFilters] = useState({
            category: "",
            dateRange: { start: "", end: "" },
      });
      const searchQuery = query.get("query");

      useEffect(() => {
            if (searchQuery) {
                  // Simulate an API call to fetch results
                  setSearchResults([
                        { id: 1, title: "Book Title 1", author: "Author 1" },
                        { id: 2, title: "Book Title 2", author: "Author 2" },
                  ]);
            }
      }, [searchQuery]);

      const handleFilterChange = (e) => {
            setFilters({ ...filters, [e.target.name]: e.target.value });
      };

      const handleSearch = (e) => {
            e.preventDefault();
            // Fetch results based on filters
            console.log(filters);
      };

      return (
            <div className="container mx-auto p-6">
                  <h1 className="text-2xl font-bold mb-6">Search Results for: {searchQuery}</h1>

                  {/* Advanced Filters */}
                  <form onSubmit={handleSearch} className="space-y-4 mb-8">
                        <div>
                              <label className="block text-gray-700">Category</label>
                              <select
                                    name="category"
                                    className="w-full px-4 py-2 border rounded-md focus:outline-none"
                                    value={filters.category}
                                    onChange={handleFilterChange}
                              >
                                    <option value="">All Categories</option>
                                    <option value="fiction">Fiction</option>
                                    <option value="non-fiction">Non-Fiction</option>
                                    <option value="sci-fi">Sci-Fi</option>
                                    <option value="biography">Biography</option>
                              </select>
                        </div>

                        <div className="flex space-x-4">
                              <div>
                                    <label className="block text-gray-700">Start Date</label>
                                    <input
                                          type="date"
                                          name="start"
                                          className="px-4 py-2 border rounded-md focus:outline-none"
                                          value={filters.dateRange.start}
                                          onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })}
                                    />
                              </div>
                              <div>
                                    <label className="block text-gray-700">End Date</label>
                                    <input
                                          type="date"
                                          name="end"
                                          className="px-4 py-2 border rounded-md focus:outline-none"
                                          value={filters.dateRange.end}
                                          onChange={(e) => setFilters({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })}
                                    />
                              </div>
                        </div>

                        <button
                              type="submit"
                              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                              Filter
                        </button>
                  </form>

                  {/* Search Results */}
                  <div>
                        {searchResults.length > 0 ? (
                              searchResults.map((result) => (
                                    <div key={result.id} className="border-b py-2">
                                          <h2 className="text-lg font-semibold">{result.title}</h2>
                                          <p className="text-gray-600">by {result.author}</p>
                                    </div>
                              ))
                        ) : (
                              <p>No results found for "{searchQuery}"</p>
                        )}
                  </div>
            </div>
      );
};

export default AdvancedSearchPage;
