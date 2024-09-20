import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Field } from "formik";
import React, { useState } from "react";

const FormikInput = ({ name, label, required, type, ...props }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div>
      <Field name={name}>
        {({ field, form, meta }) => {
          return (
            <div className="flex  relative flex-col">
              <label
                className="capitalize tracking-wide font-medium flex gap-2 text-gray-500"
                htmlFor={name}
              >
                {label}
                <span className="text-red-900 text-xl">
                  {required ? "*" : ""}
                </span>
              </label>
              <input
                className="border-[1px] focus:outline-gray-400  rounded-sm px-4 py-1"
                type={
                  type === "password" && !isPasswordVisible
                    ? "password"
                    : "text"
                }
                {...field}
                {...props}
                id={name}
                value={meta.value}
                onChange={field.onChange}
                autoComplete="off"
              />
              {type === "password" && (
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute top-[40px] cursor-pointer right-10"
                >
                  {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                </span>
              )}
              <div>
                {meta.touched && meta.error && (
                  <div className="text-red-500  text-sm italic">
                    {meta.error}
                  </div>
                )}
              </div>
            </div>
          );
        }}
      </Field>
    </div>
  );
};

export default FormikInput;
