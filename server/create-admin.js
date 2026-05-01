import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Settings from './models/Settings.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio");
    console.log("Connected to MongoDB...");

    const email = "gowsikk8@gmail.com";
    const password = process.env.ADMIN_PASSWORD || "admin123";
    const hashedPassword = await bcrypt.hash(password, 10);

    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({
        adminEmail: email,
        adminPassword: hashedPassword,
        siteTitle: "Gowshik's Portfolio"
      });
    } else {
      settings.adminEmail = email;
      settings.adminPassword = hashedPassword;
    }

    await settings.save();
    console.log("-----------------------------------------");
    console.log("✅ Admin credentials updated successfully!");
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log("-----------------------------------------");
    
    process.exit(0);
  } catch (error) {
    console.error("Error updating admin:", error);
    process.exit(1);
  }
};

createAdmin();
