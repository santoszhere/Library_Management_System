import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Books from "./pages/Books";
import About from "./pages/About";
import RegisterForm from "./pages/RegisterForm";
import ProtectedRoutes from "./auth/auth";
import { Toaster } from "react-hot-toast";
import Dashboard from "./dashboard/Dashboard";
import DashboardUser from "./dashboard/components/DashboardUser";
import DashboardBook from "./dashboard/components/DashboardBook";
import CreateBook from "./dashboard/components/CreateBook";
import EditBook from "./dashboard/components/EditBook";

const App = () => {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/dashboard");
  return (
    <div>
      <Toaster />
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<RegisterForm />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/books" element={<Books />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="customers" element={<DashboardUser />} />
            <Route path="books" element={<DashboardBook />} />
            <Route path="book/create" element={<CreateBook />} />
            <Route
              path="book/edit/:id"
              element={<EditBook isProduct={true} />}
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
