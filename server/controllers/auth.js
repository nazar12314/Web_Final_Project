import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User does not exist!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
};

export const registerUser = async (req, res) => {
    const { password, confirmPassword, firstName, lastName, email } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match!" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name: `${firstName} ${lastName}`,
            email,
            password: hashedPassword,
        });

        const user = await newUser.save();

        const token = jwt.sign(
            { email: user.email, id: user._id },
            "Secret token",
            { expiresIn: "1h" }
        );

        res.status(201).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
};
