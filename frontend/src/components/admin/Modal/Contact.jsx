import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

const Contact = ({
  onContactCreated,
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
    watch,
  } = useForm();

  useEffect(() => {
    if (isEditing && contactToEdit) {
      reset({
        name: contactToEdit.name,
        email: contactToEdit.email,
        phone: contactToEdit.phone,
        subject: contactToEdit.subject,
        body: contactToEdit.body,
        status: contactToEdit.status,
      });

      // Find the option object that matches the status
      const selectedStatus = options.find(
        (option) => option.value === contactToEdit.status
      );
      setValue("status", selectedStatus); // Set initial value for status
    }
  }, [isEditing, contactToEdit, reset, setValue]);

  const onSubmit = async (data) => {
    const url = isEditing
      ? `http://localhost:4000/api/contacts/${contactToEdit._id}`
      : "http://localhost:4000/api/contacts";
    const method = isEditing ? "PUT" : "POST";
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const contact = await response.json();
        onContactCreated(contact);
        notifySuccess("Contact updated successfully");
        onClose();
      } else {
        notifyError("Failed to update contact");
        console.error("Failed to update contact", response.statusText);
      }
    } catch (err) {
      notifyError("Error updating contact");
      console.error("Error updating contact", err);
    }
  };

  const options = [
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "resolved", label: "Resolved" },
  ];

  // Watch status value
  const selectedStatus = watch("status");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">
          {isEditing ? "Edit Contact" : "Add Contact"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                readOnly
                className="w-full px-3 py-2 border rounded-md"
                {...register("name")}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                readOnly
                className="w-full px-3 py-2 border rounded-md"
                {...register("email")}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="phone" className="block text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                type="text"
                readOnly
                maxLength={11}
                className="w-full px-3 py-2 border rounded-md"
                {...register("phone")}
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-gray-700 mb-2">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                readOnly
                className="w-full px-3 py-2 border rounded-md"
                {...register("subject")}
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="body" className="block text-gray-700 mb-2">
              Message
            </label>
            <textarea
              {...register("body")}
              id="body"
              readOnly
              className="w-full px-3 py-2 border rounded-md"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-gray-700 mb-2">
              Status
            </label>
            <Select
              options={options}
              id="status"
              placeholder="Select status"
              value={selectedStatus} // Set current value
              onChange={(selectedOption) => setValue("status", selectedOption)} // Update form value on change
              isClearable
              isSearchable
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderColor: errors.status ? "red" : base.borderColor,
                  "&:hover": {
                    borderColor: errors.status ? "red" : base.borderColor,
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
