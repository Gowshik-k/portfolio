import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Settings from "../models/Settings.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    let settings = await Settings.findOne();
    
    let adminEmail, adminPasswordHash;

    if (!settings) {
      // Fallback to .env for initial setup if no settings in DB
      adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
      adminPasswordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 10);
    } else {
      adminEmail = settings.adminEmail;
      adminPasswordHash = settings.adminPassword;
    }

    if (email === adminEmail && await bcrypt.compare(password, adminPasswordHash)) {
      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "24h" });
      return res.json({ token, email });
    }
    res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    res.status(500).json({ message: "Login error" });
  }
};
