import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  adminEmail: { type: String, required: true },
  adminPassword: { type: String, required: true },
  heroImageUrl: { type: String, default: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe" },
  siteTitle: { type: String, default: "Portfolio" },
  updatedAt: { type: Date, default: Date.now }
});

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
