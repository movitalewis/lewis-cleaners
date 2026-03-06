import express from "express";
import Login from "../models/User.js";

const router = express.Router();

/**
 * POST - Save Login form
 */
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    const allUsers = await Login.find();
    console.log("ALL USERS:", allUsers);

    const user = await Login.findOne({ username, password });
    console.log("USER FOUND:", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    res.json({ success: true, user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

export default router;