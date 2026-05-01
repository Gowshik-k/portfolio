import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';

dotenv.config();

const sampleProjects = [
  {
    title: "Lumina Digital Lab",
    description: "A comprehensive digital experience focused on bridging the gap between brand storytelling and technical execution.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766",
    category: "Web Application",
    featured: true,
    tags: ["React", "Motion", "Branding"]
  },
  {
    title: "Aura Systems",
    description: "Cloud-native infrastructure monitoring with a focus on real-time visualization and predictive analytics.",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
    category: "Development",
    tags: ["Node.js", "Kubernetes"]
  },
  {
    title: "Helix Identity",
    description: "Reimagining modern security with a fluid, user-centric approach to decentralized identity management.",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19705267",
    category: "Branding",
    tags: ["UI/UX", "Design"]
  },
  {
     title: "Vortex Media",
     description: "Next-gen content distribution network optimized for high-fidelity video streaming and real-time interaction.",
     image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
     category: "Design",
     tags: ["Optimization", "Streaming"]
  }
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio");
    console.log("Connected to MongoDB for seeding...");
    
    await Project.deleteMany({});
    console.log("Cleared existing projects.");
    
    await Project.insertMany(sampleProjects);
    console.log("Seeded sample projects successfully!");
    
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
}

seedDB();
