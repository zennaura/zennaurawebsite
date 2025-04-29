// server/utils/cloudinary.js
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteImagesFromCloudinary = async (imageUrls) => {
  try {
    const publicIds = imageUrls.map((url) => {
      const matches = url.match(/upload\/(?:v\d+\/)?([^\.]+)/);
      return matches ? matches[1] : null;
    }).filter(Boolean);

    if (publicIds.length === 0) return;

    await cloudinary.api.delete_resources(publicIds);
  } catch (error) {
    console.error("Error deleting images from Cloudinary:", error);
    throw error;
  }
};

module.exports = { deleteImagesFromCloudinary };
