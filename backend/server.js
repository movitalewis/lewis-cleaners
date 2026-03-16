import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import Login from "./models/User.js";

  // Seed admin user
  export const seedAdmin = async () => {
  const existing = await User.findOne({ username: "admin" });

  if (!existing) {
    await Login.create({
      username: "admin",
      password: "admin123",
    });
    console.log("✅ Admin user seeded");
  } else {
    console.log("Admin already exists");
  }
};
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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