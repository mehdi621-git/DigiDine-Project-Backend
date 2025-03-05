import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  persons: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String, // Store time as HH:MM format (e.g., "18:30")
    required: true
  },
  image: {
    type: String, // Store the image filename or URL
    required: true
  }
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;

