import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

/**
 * POST - Save contact form
 */
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

     // 🔒 Backend safety check
    const existing = await Contact.findOne({
      name,
      email,
      phone,
      message,
    });

    console.log("ALL USERS:", allUsers);

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Duplicate submission detected",
      });
    }

    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * GET - Fetch all contacts
 */
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;