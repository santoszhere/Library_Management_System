import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setsearch } from "../../store/slices/searchSlice";
import AxiosInstance from "../../config/AxiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DashNavBar = () => {
  const { userData } = useSelector((state) => state.user);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSearch = (value) => {
    setSearchInput(value);
    dispatch(setsearch(value));
  };
  const handlelogout = async () => {
    const { data } = await AxiosInstance.post("/users/logout", {});
    toast.success(data?.message);
    navigate("/");
    dispatch(logoutUser());
  };
  return (
    <nav className="flex items-center justify-between py-3 px-10">
      <div>
        <p className="text-2xl font-medium tracking-wider">
          Library Management System
        </p>
      </div>
      <div className="flex-grow  relative flex justify-center mx-10">
        <input
          className=" py-3 w-full px-14 outline-none focus:border-purple-400 rounded-lg hover:border font-light capitalize h-[52px]"
          type="text"
          value={searchInput}
          placeholder="search"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <CiSearch className="absolute left-4 top-3 text-2xl" />
      </div>
      <div className="flex items-center gap-3 ">
        <img
          src={userData?.avatar}
          className="h-8 w-8 object-cover rounded-full"
          alt="User image"
        />
        <span className="font-light tracking-wider capitalize text-lg">
          {userData.username}{" "}
        </span>
        <button
          onClick={handlelogout}
          className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded-lg text-white"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default DashNavBar;
