// server/routes/imageRoutes.js
import express from "express";
import { deleteImagesFromCloudinary } from '../config/cloudinaryConfig.js';

const router = express.Router();

router.post("/delete", async (req, res) => {
  try {
    const { images } = req.body;
    if (!images || !Array.isArray(images)) {
      return res.status(400).json({ error: "Invalid images array" });
    }
    
    await deleteImagesFromCloudinary(images);
    res.json({ message: "Images deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete images" });
  }
});

export default router;