import Settings from "../models/Settings.js";
import bcrypt from "bcryptjs";

export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      // Create default if not exists
      const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "admin123", 10);
      settings = new Settings({
        adminEmail: process.env.ADMIN_EMAIL || "gowsikk8@gmail.com",
        adminPassword: hashedPassword,
      });
      await settings.save();
    }
    // Don't return password
    const { adminPassword, ...safeSettings } = settings._doc;
    res.json(safeSettings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching settings" });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const { adminEmail, adminPassword, heroImageUrl, siteTitle } = req.body;
    let settings = await Settings.findOne();
    
    const updateData = { heroImageUrl, siteTitle, adminEmail, updatedAt: new Date() };
    
    if (adminPassword) {
      updateData.adminPassword = await bcrypt.hash(adminPassword, 10);
    }

    if (!settings) {
      settings = new Settings(updateData);
    } else {
      Object.assign(settings, updateData);
    }

    await settings.save();
    const { adminPassword: p, ...safeSettings } = settings._doc;
    res.json(safeSettings);
  } catch (error) {
    res.status(500).json({ message: "Error updating settings" });
  }
};
