import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors'

dotenv.config();
const app = express();
app.use(cors({
    origin: "http://127.0.0.1:5500", // Change this to your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
  
  // ✅ Handle preflight requests
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // Match your frontend
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
    if (req.method === "OPTIONS") {
      return res.sendStatus(204);  // Respond to preflight request
    }
  
    next();
  });
  
app.use(express.json());

// Routes
app.use('/', userRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB Connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log(err));
