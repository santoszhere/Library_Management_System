import { Form, Formik } from "formik";
import React from "react";
import FormikInput from "../formik/FormikInput";
import { loginValidationSchema } from "../constants/constants";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AxiosInstance from "../config/AxiosInstance";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/slices/authSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const formSubmit = async (values) => {
    try {
      const { data } = await AxiosInstance.post("/users/login", values);
      console.log(data);
      if (data.statusCode !== 200) return;
      const userData = data.data;
      const role = userData.role;
      dispatch(loginUser({ userData, role }));
      toast.success(data?.message);
      if (role === "member") {
        navigate("/books");
      } else if (role == "admin") {
        navigate("/dashboard/charts");
      }
    } catch (error) {
      toast.error("Invalid Credentials");
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={formSubmit}
      enableReinitialize={true}
    >
      {({ isSubmitting }) => (
        <div className="flex sm:items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-md rounded-lg p-8 w-full  max-w-md">
            <h1 className="text-2xl font-semibold text-center mb-6">Sign In</h1>
            <p className="text-center text-gray-600 mb-4">
              Don't have an account?{" "}
              <Link to="/sign-up" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
            <Form className="space-y-4">
              <FormikInput
                type="email"
                label="Email"
                required={true}
                name="email"
                className="border rounded-md p-2 w-full"
              />
              <FormikInput
                type="password"
                label="Password"
                required={true}
                name="password"
                className="border rounded-md p-2 w-full"
              />
              <button
                type="submit"
                className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : "Sign In"}
              </button>
            </Form>
            <div className="flex justify-between items-center border-t pt-4 mt-4">
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default LoginForm;
