import Auth from "../models/auth.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username) return res.status(400).send("Username is required.");
  if (!password || password.length < 6) {
    return res.status(400).send("Password must be at least 6 characters long.");
  }

  const userExists = await Auth.findOne({ email }).exec();
  if (userExists) {
    return res.status(400).send("Email is already taken.");
  }

  const user = new Auth({ username, email, password });

  try {
    await user.save();
    return res.json({
      ok: true,
      message: "Registration successful! Please login to continue.",
    });
  } catch (err) {
    console.error("User creation failed:", err);
    return res.status(500).send("Server error. Please try again.");
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Auth.findOne({ email }).exec();
    if (!user) {
      return res.status(400).send("User not found. Please register first.");
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(400).send("Login failed. Invalid credentials.");
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).send("Server error: Missing JWT secret.");
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user });
  } catch (error) {
    console.error("Login failed:", error);
    return res.status(500).send("Internal server error. Please try again.");
  }
};
