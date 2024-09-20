import { AiFillBank } from "react-icons/ai";
import { CgProductHunt } from "react-icons/cg";
import {
    FaRegUser,
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaUserFriends,
    FaBloggerB,
} from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GiShoppingBag } from "react-icons/gi";
import {
    MdOutlineInventory2,
    MdProductionQuantityLimits,
} from "react-icons/md";

import * as yup from "yup";

export const registrationValidationSchema = yup.object({
    username: yup
        .string()
        .min(4, "Username is not less than 4 character")
        .required("User name is required"),
    email: yup
        .string()
        .email("Provide valid email address")
        .required("Email address is required"),
    password: yup
        .string()
        .min(6, "Password must be 6 character long")
        .required("Password is required"),
    avatar: yup.mixed().required("avatar is required"),
});

export const loginValidationSchema = yup.object({
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be 6 character long")
        .required("Password is required"),
});

// constants/constants.js
export const pages = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Login", path: "/sign-in" },
];

export const loggedInPages = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Books", path: "/books" },
];

export const settings = ["Profile", "Dashboard", "Logout"];

export const dashSidebar = [{
        id: 2,
        name: "Customer",
        icon: FaUserFriends,
        link: "/dashboard/customers",
    },
    {
        id: 3,
        name: "Books",
        icon: AiFillBank,
        link: "/dashboard/books",
    },

    {
        id: 5,
        name: "Inventory",
        icon: MdOutlineInventory2,
        link: "/dashboard/inventory",
    },
];

export const bookValidationSchema = yup.object({
    title: yup
        .string()
        .min(3, "Title should be more than 3 character")
        .required("This field is required"),
    author: yup.string().required("This field is required"),
    genre: yup.string().required("This field is required"),
    publicationYear: yup.number().required("This field is required"),
    isbn: yup.number().required("This field is required"),
    avatar: yup.mixed().required("avatar is required"),
});