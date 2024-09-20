import { useField } from "formik";
import React, { useState } from "react";

const FormikFile = ({ name, label, setImagePreview = true, ...props }) => {
  const [field, meta, helpers] = useField({ name });
  const [preview, setPreview] = useState(null);

  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    helpers.setValue(file);
    if (file && setImagePreview) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex gap-2 flex-col p-[10px]">
      <label
        className="capitalize underline underline-offset-2 font-light flex gap-2 text-gray-500"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        className="border-[1px] antialiased cursor-pointer rounded-sm px-4 py-1"
        type="file"
        name={name}
        id={props.id || props.name}
        onChange={handleChange}
        onBlur={field.onBlur}
        {...props}
      />
      {preview && (
        <div className="flex items-center justify-center">
          <img
            src={preview}
            alt="Preview"
            className="h-40 w-40 object-cover rounded-full border-2 border-gray-300"
          />
        </div>
      )}
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormikFile;
