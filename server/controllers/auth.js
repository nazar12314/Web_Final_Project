import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import SpotifyWebApi from "spotify-web-api-node";

const generateJwtToken = (user) => {
    return jwt.sign({ email: user.email, id: user._id }, "Secret token", {
        expiresIn: "1h",
    });
};

export const spotifyLogin = (req, res) => {
    const code = req.body.code;

    const spotifyApi = new SpotifyWebApi({
        redirectUri: "http://localhost:3000",
        clientId: "534fc98e66604af6b74ba67486f7590a",
        clientSecret: "27b33c9bacc14b2486d03bd489ec3553",
    });

    spotifyApi
        .authorizationCodeGrant(code)
        .then((data) =>
            res.status(200).json({ accessToken: data.body.access_token })
        )
        .catch(() => res.status(400));
};

export const loginUser = async (req, res) => {
    const { email, password, code } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User does not exist!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        const token = generateJwtToken(user);

        res.status(200).json({ token, user });
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

        const token = generateJwtToken(user);

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
};
