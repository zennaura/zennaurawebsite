const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

// Cloudinary Config
cloudinary.config({
  cloud_name: 'zennaura',
  api_key: '253639963894327',
  api_secret: 'HLMTnvocUmvCyl5r6BSDcz0SJtk',
});

router.post('/delete-img', (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: 'imageUrl is required in the request body' });
  }

  // Extract public ID (with or without folder structure)
  const urlArray = imageUrl.split('/');
  const fileNameWithExt = urlArray[urlArray.length - 1];
  const folder = urlArray.slice(-2, -1)[0]; // Gets the folder if exists
  const fileName = fileNameWithExt.split('.')[0];

  const publicId = folder ? `${folder}/${fileName}` : fileName;

  console.log('Deleting public ID:', publicId);

  cloudinary.uploader.destroy(publicId, (error, result) => {
    if (error) {
      console.error('Cloudinary deletion error:', error);
      return res.status(500).json({ error: 'Failed to delete image from Cloudinary' });
    }

    console.log('Cloudinary deletion result:', result);
    res.status(200).json({ message: 'Image deleted successfully', result });
  });
});

module.exports = router;
