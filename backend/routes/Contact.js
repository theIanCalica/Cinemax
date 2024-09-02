const express = require("express");
const router = express.Router();
const Contact = require("../Models/Contact");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "cinemax@gmail.com",
    pass: "cinemax12345",
  },
});

// Get all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Add Contact
router.post("/", async (req, res) => {
  const { name, email, phone, subject, body } = req.body;
  try {
    const newContact = new Contact({
      name,
      email,
      phone,
      subject,
      body,
    });

    const saveContact = await newContact.save();

    // Send email
    const mailOptions = {
      from: "cinemax@gmail.com",
      to: email,
      subject: "Thank you for contacting us!",
      html: ` <div
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
    </div>`,
    };

    res.status(201).json(saveContact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get a single contact by ID
router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Update a contact by ID
router.put("/:id", async (req, res) => {
  const { name, email, phone, subject, body } = req.body;

  try {
    // Find and update the contact
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, subject, body },
      { new: true } // Return the updated document
    );

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete a contact by ID
router.delete("/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    res.json({ msg: "Contact deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
