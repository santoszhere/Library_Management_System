import React, { useEffect, useState } from "react";
import AxiosInstance from "../config/AxiosInstance";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../store/slices/authSlice";

const Books = () => {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [loadingBookId, setLoadingBookId] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data } = await AxiosInstance.get("/books/get-all-books");
        if (data?.data) {
          setBooks(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch books", error);
        toast.error("Failed to fetch books");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, [refresh]);

  const handleBorrowBook = async (bookId) => {
    setLoadingBookId(bookId);

    try {
      const { data } = await AxiosInstance.post(
        `/borrow/books/${bookId}/borrow`,
        {}
      );
      if (data.statusCode !== 200) {
        toast.error("Failed to borrow book");
        return;
      }
      toast.success(data.message);
      dispatch(fetchCurrentUser())
      setRefresh(!refresh);
    } catch (error) {
      toast.error("Error borrowing the book");
    } finally {
      setLoadingBookId(null);
    }
  };

  const isBookBorrowedByUser = (bookId) => {
    return userData?.borrowedBooks?.some((book) => book._id === bookId);
  };
  console.log(userData, "UserData")

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-2xl font-bold animate-pulse">
        Loading books...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div
        className="relative bg-cover bg-center h-96 rounded-lg shadow-lg overflow-hidden mb-8"
        style={{ backgroundImage: "url('./image-3.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold text-white mb-4 text-center">
            Discover, Learn, and Grow
          </h1>
          <p className="text-lg text-gray-200 text-center max-w-2xl">
            Dive into our extensive collection of books across genres. Whether
            you're looking for inspiration, knowledge, or entertainment, we have
            something for everyone. Start your reading journey today!
          </p>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="mb-12 text-center">
        <h2 className="text-3xl font-semibold mb-4 text-gray-800">
          Why Read Books?
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Reading books not only expands your knowledge but also opens doors to
          new ideas and worlds. A well-read individual can think critically,
          communicate effectively, and experience life through different lenses.
          Our library is here to support your intellectual growth and
          creativity. Find your next great read here.
        </p>
      </section>

      {/* Book Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
        {books && books.length > 0 ? (
          books.map((book) => (
            <div
              key={book._id}
              className="border border-gray-200 rounded-lg shadow-lg bg-white p-4 transition hover:shadow-xl"
            >
              {book.coverImage && (
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {book.title}
              </h2>
              <p className="text-gray-600 mb-2">
                {book.author ? `Author: ${book.author}` : "No Author"}
              </p>

              {/* Availability Check */}
              {isBookBorrowedByUser(book._id) ? (
                <p className="text-sm text-yellow-600 font-medium mb-4">
                  You borrowed this book.
                </p>
              ) : book.availability ? (
                <p className="text-sm text-green-600 font-medium mb-4">
                  Available for borrowing
                </p>
              ) : (
                <p className="text-sm text-red-600 font-medium mb-4">
                  Currently unavailable
                </p>
              )}

              {/* Borrow Button or Unavailable Text */}
              {book.availability ? (
                <button
                  className={`w-full ${loadingBookId === book._id
                    ? "bg-gray-500"
                    : "bg-blue-600 hover:bg-blue-700"
                    } text-white py-2 px-4 rounded-lg transition font-medium`}
                  onClick={() => handleBorrowBook(book._id)}
                  disabled={loadingBookId === book._id}
                >
                  {loadingBookId === book._id ? "Loading..." : "Borrow this Book"}
                </button>
              ) : (
                !isBookBorrowedByUser(book._id) && (
                  <p className="text-red-500 font-medium text-center">
                    Unavailable for now
                  </p>
                )
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-xl text-gray-500">
            No books available at the moment.
          </div>
        )}
      </div>

      {/* Testimonial Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-8">
          What Our Readers Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg italic text-gray-600">
              "This library has completely transformed my reading habits. I've
              found so many gems that I wouldn't have discovered otherwise!"
            </p>
            <p className="text-gray-800 font-semibold mt-4">- Jane Doe</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg italic text-gray-600">
              "The collection here is diverse and rich. There's always something
              new to learn from the books I borrow."
            </p>
            <p className="text-gray-800 font-semibold mt-4">- John Smith</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg italic text-gray-600">
              "I love how easy it is to borrow books online and pick them up in
              person. It's convenient and helps me stay on track with my reading
              goals."
            </p>
            <p className="text-gray-800 font-semibold mt-4">- Emily Johnson</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Whether you're here to borrow a book or explore new genres, we're
          excited to have you. Begin your journey today!
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium">
          Explore More Books
        </button>
      </section>
    </div>
  );
};

export default Books;
