import React, { useEffect, useState } from "react";
import AxiosInstance from "../../config/AxiosInstance";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const DashboardUser = () => {
  const [users, setUsers] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useSelector((state) => state.search);
  const getAllUsers = async () => {
    setIsLoading(true);
    try {
      const { data } = await AxiosInstance.get("/admin/get-all-users");
      if (data.statusCode !== 200) return;
      setUsers(data.data);
      setFilteredUser(data?.data);
    } catch (error) {
      toast.error("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [refresh]);

  const filteredUserItem = filteredUser.filter(
    (user) =>
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredUser(users);
    } else {
      setFilteredUser(filteredUserItem);
    }
  }, [search]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleRemove = async (id, user) => {
    const deleteUser = confirm("Are you sure you want to delete this user. ?");

    if (user.role === "admin") {
      toast.error("You can't remove admin");
    }
    if (user.role === "member" && deleteUser) {
      const { data } = await AxiosInstance.delete(`/admin/delete-user/${id}`);
      if (data?.statusCode !== 200) return;
      toast.success(data?.message);
      setRefresh(!refresh);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-sm text-gray-500">
            A list of all the users in your account including their name, title,
            email, and role.
          </p>
        </div>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md">
          Add user
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="border-b-2 border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">
                Name
              </th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">
                Profile
              </th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">
                Email
              </th>
              <th className="px-4 py-3 text-left text-gray-600 font-medium">
                Role
              </th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUser && filteredUser.length !== 0 ? (
              filteredUser?.map((user, index) => (
                <tr key={user._id} className="border-b font-light">
                  <td className="px-4 capitalize py-3">
                    <span className="p-2 font-semibold">{index + 1}</span>{" "}
                    {user.username}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={user.avatar}
                      alt={user.username}
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-500">{user.email}</td>
                  <td className="px-4 py-3 text-gray-500">{user.role}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleRemove(user._id, user)}
                      className="text-red-600 font-semibold hover:text-purple-800"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <div className="flex items-center text-2xl justify-center">
                No user found
              </div>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardUser;
