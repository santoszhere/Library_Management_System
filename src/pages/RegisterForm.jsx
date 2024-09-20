import React from "react";
import { Form, Formik } from "formik";
import FormikInput from "../formik/FormikInput";
import { registrationValidationSchema } from "../constants/constants";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AxiosInstance from "../config/AxiosInstance";
import FormikFile from "../formik/FormikFile";

const RegisterForm = () => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    avatar: null,
  };

  const formSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("avatar", values.avatar);

      const { data } = await AxiosInstance.post("/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(data);
      if (data?.statusCode === 201) {
        toast.success("Registration successful");
        resetForm();
        navigate("/sign-in");
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      toast.error(error.response?.data || "An error occurred");
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registrationValidationSchema}
      onSubmit={formSubmit}
      enableReinitialize={true}
    >
      {({ isSubmitting }) => (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white shadow-md rounded-lg p-8 w-full  max-w-md">
            <h1 className="text-2xl font-semibold text-center mb-6">Sign Up</h1>
            <p className="text-center text-gray-600 mb-4">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-blue-500 hover:underline">
                Sign In
              </Link>
            </p>
            <Form className="space-y-4">
              <FormikInput
                type="text"
                label="Username"
                required={true}
                name="username"
                className="border rounded-md p-2 w-full"
              />
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
              <FormikFile
                name="avatar"
                label="Upload your image"
                required={true}
                setImagePreview={true}
              />
              <button
                type="submit"
                className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800 transition duration-200"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Loading..." : "Sign Up"}
              </button>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default RegisterForm;
