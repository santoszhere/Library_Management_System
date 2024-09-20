import React from "react";
import { dashSidebar } from "../../constants/constants";
import { NavLink } from "react-router-dom";

const DashSideBar = () => {
  return (
    <aside className=" py-2 px-3 text-white w-52">
      <ul className="">
        {dashSidebar?.map((data) => (
          <NavLink
            className={({ isActive }) =>
              ` ${
                isActive ? "text-purple-400" : ""
              } flex items-center text-black  font-meduim text-lg tracking-wide gap-1 py-2 px-10  my-2`
            }
            to={data.link}
            key={data.id}
          >
            <span>{<data.icon />}</span>
            <p>{data.name}</p>
          </NavLink>
        ))}
      </ul>
    </aside>
  );
};

export default DashSideBar;
