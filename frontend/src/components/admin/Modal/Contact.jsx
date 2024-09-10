import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getBorderColor } from "../../../Utils/borderColor";
import Select from "react-select";

const Contact = ({
  onClose,
  notifySuccess,
  notifyError,
  contactToEdit,
  isEditing,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEditing && contactToEdit) {
      reset({
        name: contactToEdit.name,
        email: contactToEdit.email,
        phone: contactToEdit.phone,
        subject: contactToEdit.subject,
        body: contactToEdit.body,
        status: contactToEdit.status, // Pre-fill status for edit mode
      });
      // Set value for react-select
      setValue("status", contactToEdit.status);
    }
  }, [isEditing, contactToEdit, reset, setValue]);
  const onSubmit = async (data) => {
    console.log(data);
    const url = isEditing
      ? `http://localhost:4000/api/contacts/${contactToEdit._id}`
      : "http://localhost:4000/api/contacts";
    const method = isEditing ? "PUT" : "POST";
    try {
      const respones = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json1",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          subject: data.subject,
        }),
      });
    } catch (err) {}
  };

  const options = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "resolved", label: "Resolved" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Category" : "Add Category"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              readOnly
              className={`w-full px-3 py-2 border rounded-md`}
              {...register("name")}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              readOnly
              className={`w-full px-3 py-2 border rounded-md`}
              {...register("email")}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              id="phone"
              type="text"
              readOnly
              maxLength={11}
              className={`w-full px-3 py-2 border rounded-md`}
              {...register("phone")}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-700 mb-2">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              readOnly
              className={`w-full px-3 py-2 border rounded-md`}
              {...register("subject")}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="body" className="block text-gray-700 mb-2">
              Message
            </label>
            <textarea
              {...register("subject")}
              name="body"
              id="body"
              readOnly
              className={`w-full px-3 py-2 border rounded-md`}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 mb-2">
              Subject
            </label>
            <Select
              options={options}
              id="status"
              placeholder="Select status"
              onChange={(selectedOption) => setValue("status", selectedOption)}
              isClearable
              isSearchable
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderColor: errors.availability ? "red" : base.borderColor,
                  "&:hover": {
                    borderColor: errors.availability ? "red" : base.borderColor,
                  },
                }),
              }}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-gray-500 border border-gray-300 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md font-semibold border-2 text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
            >
              {isEditing ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
