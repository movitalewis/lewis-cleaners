import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Login from "../models/User.js";

const router = express.Router();

/**
 * POST - Save Login form
 */
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log("REQ BODY:", req.body);

    const allUsers = await Login.find();
    console.log("ALL USERS:", allUsers);

    const user = await Login.findOne({ username });
    console.log("USER FOUND:", user);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ✅ Generate token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ 
      success: true, 
      user: {
        username: user.username
      },
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

export default router;