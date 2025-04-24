import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if email exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Check if username exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password and create new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();
        res.status(200).json({ message: 'User registered successfully!' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default registerUser;

