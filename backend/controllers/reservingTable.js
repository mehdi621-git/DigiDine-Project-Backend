import Booking from "../models/bookings.js";
import multer from "multer";
import fs from "fs";

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

      const { name, phone, email, persons, date, time } = req.body;
      const image = req.file ? req.file.filename : null;

      // Validate request
      if (!name || !phone || !email || !persons || !date || !time || !image) {
        return res.status(400).json({ message: "All fields, including image, are required" });
      }

      const newBooking = new Booking({ name, phone, email, persons, date, time, image });
      await newBooking.save();

      res.status(201).json({ message: "Table reserved successfully!", booking: newBooking });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

export default reserveTable;
export { upload };



