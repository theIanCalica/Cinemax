// controllers/contactController.js
const Contact = require("../Models/Contact");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "iggc654@gmail.com",
    pass: "lrwd plzs ktnd kcqs",
  },
});

// Get all contacts
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Add Contact
exports.addContact = async (req, res) => {
  const { name, email, phone, subject, body } = req.body;
  try {
    const newContact = new Contact({ name, email, phone, subject, body });

    const saveContact = await newContact.save();

    // Send email
    const mailOptions = {
      from: "iggc654@gmail.com",
      to: email,
      subject: "Thank you for contacting us!",
      html: ` 
      <div
        style="
          font-family: Arial, sans-serif;
          color: #333;
          line-height: 1.6;
          padding: 20px;
          max-width: 600px;
          margin: 20px auto;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          background-color: #fff;
        "
      >
        <img
          src="https://images.pexels.com/photos/2072165/pexels-photo-2072165.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Banner"
          style="width: 100%; border-radius: 8px 8px 0 0;"
        />
        <div style="padding: 20px">
          <p style="font-size: 18px; font-weight: bold; color: #ff5733;">
            Hi <strong>${name}</strong>,
          </p>
          <p style="margin-bottom: 16px;">
            Thank you for reaching out to us. We have received your message
            regarding "<strong>${subject}</strong>" and will get back to you as
            soon as possible.
          </p>
          <p style="margin-bottom: 16px; font-weight: bold;">
            Below is a summary of your message:
          </p>
          <ul
            style="list-style-type: none; padding-left: 0; line-height: 1.8;"
          >
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Subject:</strong> ${subject}</li>
            <li><strong>Message:</strong> ${body}</li>
          </ul>
          <p style="margin-top: 24px;">Best Regards,</p>
          <p style="font-weight: bold; color: #ff5733;">Cinemax</p>
        </div>
      </div>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Server error");
      } else {
        console.log("Email sent: " + info.response);
        res.status(201).json(saveContact);
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get a single contact by ID
exports.getContactById = async (req, res) => {
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
};

// Update a contact by ID
exports.updateContactById = async (req, res) => {
  const { name, email, phone, subject, body, status } = req.body;

  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, subject, body, status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }

    res.status(201).json({ success: true, contact });
    console.log(req);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Delete a contact by ID
exports.deleteContactById = async (req, res) => {
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
};
