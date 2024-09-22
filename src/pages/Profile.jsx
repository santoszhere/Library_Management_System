import React, { useEffect, useState } from "react";
import AxiosInstance from "../config/AxiosInstance";
import { FiEdit2, FiCheck, FiX } from "react-icons/fi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "../store/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch()
  const [userProfile, setUserProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    username: "",
    email: "",
    avatar: "",
    oldPassword: "",
    newPassword: "",
  });

  const getUserProfile = async () => {
    try {
      const { data } = await AxiosInstance.get("/users/current-user");
      setUserProfile(data.data);
      setEditData({
        username: data.data.username,
        email: data.data.email,
        avatar: data.data.avatar,
        oldPassword: "",
        newPassword: "",
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleReturnBook = async (id) => {
    try {
      const { data } = await AxiosInstance.post(`/borrow/books/${id}/return`);
      getUserProfile();

      if (!data.data) {
        toast.error("Failed to return book");
      }
      toast.success(data.message);
      dispatch(fetchCurrentUser())
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };
  ``
  const handleEditSubmit = async () => {
    try {
      await AxiosInstance.put("/users/update", editData);
      getUserProfile();
      setIsEditing(false);
      toast.success("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  if (!userProfile) return <div>Loading...</div>;

  const { username, email, avatar, role, borrowedBooks, fines } = userProfile;

  return (
    <div className="container mx-auto p-6">
      {/* User Info Section */}
      <div className="flex flex-col md:flex-row items-center bg-white shadow-lg rounded-lg p-6 mb-8">
        <img
          src={avatar}
          alt={username}
          className="w-32 h-32 object-cover rounded-full mb-4 md:mb-0 md:mr-6"
        />
        <div className="flex-grow text-center md:text-left">
          {isEditing ? (
            <>
              <input
                className="block w-full md:w-auto text-xl font-semibold border border-gray-300 p-2 rounded mb-2"
                value={editData.username}
                onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                placeholder="Username"
              />
              <input
                className="block w-full md:w-auto text-gray-600 border border-gray-300 p-2 rounded mb-2"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                placeholder="Email"
              />

              {/* Old Password Field */}
              <input
                type="password"
                className="block w-full md:w-auto border border-gray-300 p-2 rounded mb-2"
                value={editData.oldPassword}
                onChange={(e) => setEditData({ ...editData, oldPassword: e.target.value })}
                placeholder="Old Password"
              />

              {/* New Password Field */}
              <input
                type="password"
                className="block w-full md:w-auto border border-gray-300 p-2 rounded mb-2"
                value={editData.newPassword}
                onChange={(e) => setEditData({ ...editData, newPassword: e.target.value })}
                placeholder="New Password"
              />
            </>
          ) : (
            <>
              <h1 className="text-3xl font-semibold mb-2">{username}</h1>
              <p className="text-gray-600 mb-2">{email}</p>
            </>
          )}
          <p className="text-gray-500">
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </p>
        </div>
        <div className="flex justify-center md:justify-end mt-4 md:mt-0 space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleEditSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 flex items-center"
              >
                <FiCheck className="mr-2" /> Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 flex items-center"
              >
                <FiX className="mr-2" /> Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 flex items-center"
            >
              <FiEdit2 className="mr-2" /> Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Borrowed Books Section */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6">Borrowed Books</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {borrowedBooks.length > 0 ? (
            borrowedBooks.map((book) => (
              <div
                key={book.isbn}
                className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col md:flex-row"
              >
                {/* Book Image and Button */}
                <div className="flex flex-col items-center md:items-start">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-32 h-48 object-cover rounded-lg shadow-md mb-4"
                  />
                  <button
                    onClick={() => handleReturnBook(book._id)}
                    className="bg-red-500 text-white px-6 py-2 rounded-full shadow hover:bg-red-600 transition duration-300"
                  >
                    Return Book
                  </button>
                </div>

                {/* Book Details */}
                <div className="flex-grow md:ml-6">
                  <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                  <p className="text-gray-600">Author: {book.author}</p>
                  <p className="text-gray-600">Genre: {book.genre}</p>
                  <p className="text-gray-600">Published: {book.publicationYear}</p>
                  <p className="text-gray-600">ISBN: {book.isbn}</p>
                  <p className="text-gray-600">
                    Borrowed At: {new Date(book.borrowedAt).toLocaleDateString()}
                  </p>
                  <p className="text-red-500">
                    Due Date: {new Date(book.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No borrowed books at the moment.</p>
          )}
        </div>
      </div>

      {/* Fines Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-semibold mb-4">Fines</h2>
        <p className="text-gray-600">{fines === 0 ? "No fines" : `$${fines}`}</p>
      </div>
    </div>
  );
};

export default Profile;
