import React, { useState } from "react";
import axios from "axios";

const Email = () => {
  const [emailData, setEmailData] = useState({
    to: "",
    subject: "",
    message: "",
    attachment: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData({ ...emailData, [name]: value });
  };

  const handleFileChange = (e) => {
    setEmailData({ ...emailData, attachment: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("to", emailData.to);
    formData.append("subject", emailData.subject);
    formData.append("message", emailData.message);
    if (emailData.attachment) {
      formData.append("attachment", emailData.attachment);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_LINK}/send-email`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Email sent successfully!");
        // Reset the form if needed
        setEmailData({
          to: "",
          subject: "",
          message: "",
          attachment: null,
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email.");
    }
  };

  return (
    <div className="px-4 py-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Send Email</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="to">
            To:
          </label>
          <input
            type="email"
            id="to"
            name="to"
            value={emailData.to}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="recipient@example.com"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="subject">
            Subject:
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={emailData.subject}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Subject of the email"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="message">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            value={emailData.message}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
            rows="4"
            placeholder="Your message here..."
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="attachment">
            Attachment:
          </label>
          <input
            type="file"
            id="attachment"
            onChange={handleFileChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Send Email
        </button>
      </form>
    </div>
  );
};

export default Email;
