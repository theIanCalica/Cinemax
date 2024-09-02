import React from "react";

const ThankYouEmail = () => {
  const name = "John Doe";
  const email = "john.doe@example.com";
  const phone = "+1-234-567-890";
  const subject = "Inquiry about movie showtimes";
  const body =
    "I would like to know more about the showtimes for the upcoming blockbuster.";

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#333",
        lineHeight: "1.6",
        padding: "20px",
        maxWidth: "600px",
        margin: "20px auto",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
      }}
    >
      <img
        src="https://images.pexels.com/photos/2072165/pexels-photo-2072165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
      />
      <div style={{ padding: "20px" }}>
        <p style={{ fontSize: "18px", fontWeight: "bold", color: "#ff5733" }}>
          Hi <strong>{name}</strong>,
        </p>
        <p style={{ marginBottom: "16px" }}>
          Thank you for reaching out to us. We have received your message
          regarding "<strong>{subject}</strong>" and will get back to you as
          soon as possible.
        </p>
        <p style={{ marginBottom: "16px", fontWeight: "bold" }}>
          Below is a summary of your message:
        </p>
        <ul
          style={{ listStyleType: "none", paddingLeft: "0", lineHeight: "1.8" }}
        >
          <li>
            <strong>Name:</strong> {name}
          </li>
          <li>
            <strong>Email:</strong> {email}
          </li>
          <li>
            <strong>Phone:</strong> {phone}
          </li>
          <li>
            <strong>Subject:</strong> {subject}
          </li>
          <li>
            <strong>Message:</strong> {body}
          </li>
        </ul>
        <p style={{ marginTop: "24px" }}>Best Regards,</p>
        <p style={{ fontWeight: "bold", color: "#ff5733" }}>Cinemax</p>
      </div>
    </div>
  );
};

export default ThankYouEmail;
