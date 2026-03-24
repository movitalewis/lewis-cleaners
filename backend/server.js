import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import contactRoutes from "./routes/contactRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import Login from "./models/User.js";
import aiRoutes from "./routes/ai.js";

//dotenv.config();

console.log("ENV EXISTS:", fs.existsSync("./.env"));

  // Seed admin user
  export const seedAdmin = async () => {
  const existing = await Login.findOne({ username: "admin" });

  if (!existing) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await Login.create({
      username: "admin",
      password: hashedPassword,
    });
    console.log("✅ Admin user seeded");
  } else {
    console.log("Admin already exists");
  }
};

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/ai", aiRoutes);

console.log("DB NAME:", mongoose.connection.name);

console.log("Mongo URI:", process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
  console.log("✅ MongoDB Connected");
  await seedAdmin();
})
.catch(err => console.log("MongoDB Connection Error:", err));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use("/api/contacts", contactRoutes);
app.use("/api/login", loginRoutes);