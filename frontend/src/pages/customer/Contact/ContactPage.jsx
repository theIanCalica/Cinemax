import React from "react";
import Navbar from "../../../components/customer/Navbar/Navbar";
import Hero from "../../../components/customer/Hero/Hero";
import "./ContactPage.scss";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        "http://localhost:4000/api/contacts",
        data
      );
      if (response.status === 201) {
        reset();
        console.log("Form Data Submitted Successfully:", response.data);
        toast.success("Message sent successfully!", {
          position: "top-right",
          autoClose: 5000, // Time in milliseconds for the toast to auto-close
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      } else {
        console.error("Form submission error:", response);
        toast.error("There was an error submitting the form.", {
          position: "top-right",
          autoClose: 5000, // Time in milliseconds for the toast to auto-close
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("There was an error submitting the form.", {
        position: "top-right",
        autoClose: 5000, // Time in milliseconds for the toast to auto-close
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  // Utility function to determine input border color
  const getBorderColor = (fieldName) => {
    if (errors[fieldName]) {
      return "border-red-500";
    } else if (touchedFields[fieldName]) {
      return "border-green-500";
    }
    return "border-gray-200";
  };

  return (
    <div className="container">
      <Navbar />
      <Hero type="Contact" />
      <hr className="broken-hr" />
      <div className="flex justify-center items-center flex-col mt-40">
        <p className="text-gray-500 font-serif">Contact With Us</p>
        <h1 className="text-4xl font-bold font-sans">
          Feel Free to Write us Anytime
        </h1>
      </div>

      {/* End of hero  */}
      {/* Contact us form */}
      <DevTool control={control} />
      <div className="flex justify-center my-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl w-full"
        >
          <div className="w-full mb-3">
            <input
              className={`w-full bg-gray-200 text-black border rounded py-3 px-4 ${getBorderColor(
                "name"
              )}`}
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="w-full mb-3">
            <input
              className={`w-full bg-gray-200 text-black border rounded py-3 px-4 ${getBorderColor(
                "email"
              )}`}
              id="email"
              name="email"
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

          <div className="w-full mb-3">
            <input
              className={`w-full bg-gray-200 text-black border rounded py-3 px-4 ${getBorderColor(
                "phone"
              )}`}
              id="phone"
              name="phone"
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

          <div className="w-full mb-3">
            <input
              className={`w-full bg-gray-200 text-black border rounded py-3 px-4 ${getBorderColor(
                "subject"
              )}`}
              id="subject"
              name="subject"
              type="text"
              placeholder="Subject"
              {...register("subject", { required: "Subject is required" })}
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div className="w-full mb-3 col-span-2">
            <textarea
              name="body"
              id="body"
              rows={5}
              className={`w-full bg-gray-200 text-black border rounded py-3 px-4 ${getBorderColor(
                "body"
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
              className="w-60 h-14 bg-themeYellow text-white border border-transparent hover:bg-white hover:text-themeYellow hover:border-themeYellow transition-colors duration-300 ease-in-out"
            >
              Send a Message
            </button>
          </div>
        </form>
      </div>
      <div className="h-80 ">
        <img
          src="/images/upuan.jpg"
          className="w-screen 0bject-cover "
          style={{ opacity: "0.2", height: "60vh" }}
          alt=""
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </div>
  );
};

export default ContactPage;
