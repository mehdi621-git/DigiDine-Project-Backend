import Booking from "../models/bookings.js";
import multer from "multer";
import fs from "fs";
import nodemailer from'nodemailer';
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
// Ensure 'uploads' directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage }).single("image");

// @desc    Reserve a table
// @route   POST /api/bookings
// @access  Public
const reserveTable = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    try {
      console.log(req.body); // Debugging
console.log("moving right")
      const { name, phone, email, persons, date, time } = req.body;
      const image = req.file ? req.file.filename : null;

      // Validate request
      if (!name || !phone || !email || !persons || !date || !time || !image) {
        return res.status(400).json({ message: "All fields, including image, are required" });
      }

      const newBooking = new Booking({ name, phone, email, persons, date, time, image });
      await newBooking.save();

      const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
      oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
      
      async function sendEmail() {
        try {
          const accessToken = await oAuth2Client.getAccessToken();
      
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: "digidineproject@gmail.com",
              clientId: CLIENT_ID,
              clientSecret: CLIENT_SECRET,
              refreshToken: REFRESH_TOKEN,
              accessToken: accessToken.token,
            },
          });
      
          const mailOptions = {
            from: "digidineproject@gmail.com",
            to: email,
            subject: "Welcome!",
            html: `
            <p>You have successfully registered a table for <strong>${persons}</strong> persons on <strong>${date}</strong> at <strong>${time}</strong>.</p>
            <br/>
            <p>On behalf of <strong>${name}</strong>.</p>
            <br/>
            <p><b>Contact Information:</b></p>
            <p>📧 Email: ${email}</p>
            <p>📞 Phone Number: ${phone}</p>
          `,
          };
      
          const result = await transporter.sendMail(mailOptions);
          console.log("Email sent:", result);
        } catch (error) {
          console.error(error);
        }
      }
      
      sendEmail();
      res.status(201).json({ message: "Table reserved successfully!", booking: newBooking });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

export default reserveTable;
export { upload };



