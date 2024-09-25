import React, { useEffect, useState } from "react";
import {
  adminDeleteUser,
  adminGetALlUser,
  adminUpdateRole,
} from "../../config/AxiosInstance";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const DashboardUser = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useSelector((state) => state.search);

  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const { data } = await adminGetALlUser();
      if (data.statusCode !== 200) return;
      setUsers(data.data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [refresh]);

  const handleRemove = async (id, user) => {
    const deleteUser = confirm("Are you sure you want to delete this user?");
    if (user.role === "admin") {
      toast.error("You can't remove admin");
    } else if (deleteUser) {
      const { data } = await adminDeleteUser(id);
      if (data?.statusCode !== 200) return;
      toast.success(data?.message);
      setRefresh(!refresh);
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      const { data } = await adminUpdateRole(id, newRole);
      if (data?.statusCode === 200) {
        toast.success("Role updated successfully");
        setRefresh(!refresh);
      }
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const filteredUser = users.filter(
    (user) =>
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <p className="text-sm text-gray-500">
          Manage the users of your platform by their roles.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-gray-700 font-medium">
                #
              </th>
              <th className="px-4 py-3 text-left text-gray-700 font-medium">
                Name
              </th>
              <th className="px-4 py-3 text-left text-gray-700 font-medium">
                Profile
              </th>
              <th className="px-4 py-3 text-left text-gray-700 font-medium">
                Email
              </th>
              <th className="px-4 py-3 text-left text-gray-700 font-medium">
                Role
              </th>
              <th className="px-4 py-3 text-right text-gray-700 font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUser.length !== 0 ? (
              filteredUser?.map((user, index) => (
                <tr key={user._id} className="border-b">
                  <td className="px-4 py-3 text-gray-600">{index + 1}</td>
                  <td className="px-4 py-3 capitalize">{user.username}</td>
                  <td className="px-4 py-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={user.avatar}
                      alt={user.username}
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-600">{user.email}</td>
                  <td className="px-4 py-3 text-gray-600 capitalize">
                    {/* If admin, show static text, otherwise allow role change */}
                    {user.role === "admin" ? (
                      <span className="text-sm font-medium">Admin</span>
                    ) : (
                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-700 py-1 px-3 rounded-md"
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user._id, e.target.value)
                        }
                      >
                        <option value="member">Member</option>
                        <option value="librarian">Librarian</option>
                      </select>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleRemove(user._id, user)}
                      className="text-red-600 font-semibold hover:text-red-800 transition duration-200"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-600">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardUser;
