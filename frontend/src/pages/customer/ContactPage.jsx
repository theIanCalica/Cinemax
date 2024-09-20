import React from "react";
import Navbar from "../../components/customer/Navbar/Navbar";
import Hero from "../../components/customer/Hero/Hero";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getBorderColor } from "../../Utils/borderColor";

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, touchedFields },
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_LINK}/contacts`,
        data
      );
      if (response.status === 201) {
        reset();
        toast.success("Message sent successfully!", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
        });
      } else {
        toast.error("There was an error submitting the form.", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error("There was an error submitting the form.", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
      });
    }
  };

  return (
    <div className="container mx-auto px-4">
      <Navbar />
      <Hero type="Contact" />
      <hr className="broken-hr" />
      <div className="text-center mt-10">
        <p className="text-gray-500 font-serif">Contact With Us</p>
        <h1 className="text-4xl font-bold">Feel Free to Write Us Anytime</h1>
      </div>

      <DevTool control={control} />
      <div className="flex justify-center my-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full"
        >
          <div className="mb-3">
            <input
              className={`w-full bg-gray-200 text-black border rounded py-3 px-4 ${getBorderColor(
                "name",
                errors,
                touchedFields
              )}`}
              id="name"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="mb-3">
            <input
              className={`w-full bg-gray-200 text-black border rounded py-3 px-4 ${getBorderColor(
                "email",
                errors,
                touchedFields
              )}`}
              id="email"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-3">
            <input
              className={`w-full bg-gray-200 text-black border rounded py-3 px-4 ${getBorderColor(
                "phone",
                errors,
                touchedFields
              )}`}
              id="phone"
              type="text"
              maxLength={11}
              placeholder="Phone Number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^(09\d{9})$/,
                  message:
                    "Invalid phone number. Must start with 09 and contain 11 digits",
                },
              })}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="mb-3">
            <input
              className={`w-full bg-gray-200 text-black border rounded py-3 px-4 ${getBorderColor(
                "subject",
                errors,
                touchedFields
              )}`}
              id="subject"
              placeholder="Subject"
              {...register("subject", { required: "Subject is required" })}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div className="mb-3 col-span-2">
            <textarea
              name="body"
              id="body"
              rows={5}
              className={`w-full bg-gray-200 text-black border rounded py-3 px-4 ${getBorderColor(
                "body",
                errors,
                touchedFields
              )}`}
              placeholder="Comment"
              {...register("body", { required: "Comment is required" })}
            ></textarea>
            {errors.body && (
              <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
            )}
          </div>

          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="w-full md:w-60 h-14 bg-themeYellow text-white border border-transparent hover:bg-white hover:text-themeYellow hover:border-themeYellow transition-colors duration-300 ease-in-out"
            >
              Send a Message
            </button>
          </div>
        </form>
      </div>

      <div className="relative h-80">
        <img
          src="/images/upuan.jpg"
          className="w-full h-full object-cover opacity-20"
          alt=""
        />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        draggable
        theme="light"
      />
    </div>
  );
};

export default ContactPage;
