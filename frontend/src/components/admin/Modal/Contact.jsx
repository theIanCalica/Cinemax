import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import axios from "axios";
import { notifyError, notifySuccess } from "../../../Utils/helpers";

const Contact = ({ onContactCreated, onClose, contactToEdit }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  useEffect(() => {
    if (contactToEdit) {
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
  }, [contactToEdit, reset, setValue]);

  const onSubmit = async (data) => {
    const url = `${process.env.REACT_APP_API_LINK}/contacts/${contactToEdit._id}`;
    const method = "PUT";

    try {
      // Make the axios request
      const response = await axios({
        method,
        url,
        headers: {
          "Content-Type": "application/json",
        },
        data, // Pass the form data here
      });

      // Handle success
      if (response.status === 200 || response.status === 201) {
        onContactCreated(response.data); // Pass the updated contact data to the callback
        notifySuccess("Contact updated successfully");
        onClose();
      } else {
        // Handle unexpected status codes
        notifyError("Failed to update contact");
        console.error("Failed to update contact", response.statusText);
      }
    } catch (err) {
      // Handle errors from axios
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
        <h2 className="text-xl font-bold mb-4">Edit Contact</h2>
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
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
