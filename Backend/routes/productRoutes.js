const express = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("../model/Product");
const cloudinary = require("../config/cloudinaryConfig");
const upload = require("../config/multerConfig"); // should be using memoryStorage
// import { deleteImagesFromCloudinary } from "../utils/cloudinary.js";
const { Types } = require('mongoose');
const _ = require('lodash');
const router = express.Router();


// Upload images to Cloudinary
router.post("/upload", upload.array("images"), async (req, res) => {
  try {
    const urls = await Promise.all(
      req.files.map((file) =>
        cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString("base64")}`, {
          folder: "products",
        })
      )
    );

    const secureUrls = urls.map((result) => result.secure_url);
    res.status(200).json({ success: true, data: secureUrls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload images." });
  }
});

// Add a new product
router.post("/products", async (req, res) => {
  try {
    const productData = req.body; // <--- Accept JSON directly
    console.log("Received product data:", productData);

    const product = new Product(productData);
    await product.save();

    res.status(201).json({ message: "Product added successfully!", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Failed to add product." });
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const { categories, concerns, intents } = req.query;

    const query = {};

    if (subCategory) query.subCategory = { $in: JSON.parse(subCategory) };
    if (concerns) query.tags = { $in: JSON.parse(concerns) };
    if (intents) query.Intenttags = { $in: JSON.parse(intents) };

    const products = await Product.find(query); // if query is empty, returns all
    res.json(products);
  } catch (err) {
    console.error('Error fetching filtered products:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get product by ID with all details
router.get("/products/:id", async (req, res) => {
  try {
    // 1. Validate the ID format first
    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: "Invalid product ID format"
      });
    }

    // 2. Find the product with proper error handling
    const product = await Product.findById(req.params.id)
      .lean()
      .exec();

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
        suggestedAction: "Verify the product ID or check if it was deleted"
      });
    }

    // 3. Transform the data (your existing transformation is good)
    const transformedProduct = {
      ...product,
      // ... (keep your existing transformation logic)
    };

    // 4. Successful response
    res.status(200).json({
      success: true,
      product: transformedProduct
    });

  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch product details",
      details: process.env.NODE_ENV === 'development' ? {
        message: error.message,
        stack: error.stack
      } : undefined
    });
  }
});
router.get("/singleproduct/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the ID format
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, error: "Invalid product ID format" });
    }

    // Find and return the product
    const product = await Product.findById(id).lean().exec();
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    res.status(200).json({ success: true, product });

  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch product details" });
  }
});

// Delete product and its images from Cloudinary
router.delete("/products/:id", async (req, res) => {
  try {
    // 1. Validate ID format
    if (!Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid product ID format" });
    }

    // 2. Find product
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // 3. Collect all image references (using native JS)
    const imagesToDelete = [];

    // Helper function to safely get nested values
    function getValue(obj, path) {
      return path.split('.').reduce((acc, part) =>
        acc && acc[part] !== undefined ? acc[part] : undefined,
        obj);
    }

    // Define all image fields to check
    const imageFields = [
      'frontImage',
      'backImage',
      'productDescriptions.image',
      'otherImages',
      'healingImage',
      'benefits',
      'whyChoose',
      'waysToClean',
      'whoWear',
      'whereHowWear'
    ];

    // Collect images from all fields
    imageFields.forEach(field => {
      const value = getValue(product, field);
      if (value) {
        if (Array.isArray(value)) {
          imagesToDelete.push(...value.filter(img => img));
        } else {
          imagesToDelete.push(value);
        }
      }
    });

    // Add stone images
    if (product.stoneUsedImage?.length) {
      product.stoneUsedImage.forEach(stone => {
        if (stone.image) imagesToDelete.push(stone.image);
      });
    }

    // Add variant images
    if (product.variants?.length) {
      product.variants.forEach(variant => {
        if (variant.variantsimages?.length) {
          imagesToDelete.push(...variant.variantsimages.filter(img => img));
        }
      });
    }

    // 4. Delete images from Cloudinary
    const deleteResults = await Promise.allSettled(
      imagesToDelete.map(async url => {
        try {
          const publicId = extractPublicId(url);
          if (!publicId) {
            return { status: 'skipped', reason: 'invalid_url', url };
          }

          const result = await cloudinary.uploader.destroy(publicId);
          return {
            status: result.result === 'ok' ? 'success' : 'failed',
            publicId,
            url,
            result
          };
        } catch (err) {
          return {
            status: 'error',
            url,
            error: err.message
          };
        }
      })
    );

    // 5. Delete product from database
    await Product.findByIdAndDelete(req.params.id);

    // 6. Return response
    res.json({
      success: true,
      message: "Product deleted successfully",
      deletedImages: deleteResults.filter(r => r.value?.status === 'success').length,
      totalImages: imagesToDelete.length,
      details: deleteResults.map(r => r.value)
    });

  } catch (error) {
    console.error("Deletion error:", error);
    res.status(500).json({
      error: "Failed to delete product",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Helper function to collect all image references
function collectAllImageReferences(product) {
  const images = [];

  // Add all possible image fields
  const imageFields = [
    'frontImage',
    'backImage',
    'productDescriptions.image',
    'otherImages',
    'healingImage',
    'benefits',
    'whyChoose',
    'waysToClean',
    'whoWear',
    'whereHowWear'
  ];

  imageFields.forEach(field => {
    const value = _.get(product, field);
    if (value) {
      if (Array.isArray(value)) {
        images.push(...value.filter(img => img));
      } else {
        images.push(value);
      }
    }
  });

  // Add stone images
  if (product.stoneUsedImage?.length) {
    product.stoneUsedImage.forEach(stone => {
      if (stone.image) images.push(stone.image);
    });
  }

  // Add variant images
  if (product.variants?.length) {
    product.variants.forEach(variant => {
      if (variant.variantsimages?.length) {
        images.push(...variant.variantsimages.filter(img => img));
      }
    });
  }

  return images.filter(img => img); // Remove any null/undefined
}

// Helper function to delete Cloudinary images with reporting
async function deleteCloudinaryImages(imageUrls) {

  const results = await Promise.allSettled(
    imageUrls.map(async url => {
      try {
        const publicId = extractPublicId(url);
        if (!publicId) {
          return { status: 'skipped', reason: 'invalid_url', url };
        }

        const result = await cloudinary.uploader.destroy(publicId);
        return {
          status: result.result === 'ok' ? 'success' : 'failed',
          publicId,
          url,
          result
        };
      } catch (err) {
        return {
          status: 'error',
          url,
          error: err.message
        };
      }
    })
  );

  return {
    total: results.length,
    success: results.filter(r => r.value?.status === 'success').length,
    failed: results.filter(r => r.value?.status !== 'success').length,
    details: results.map(r => r.value)
  };
}

// Helper function to extract public_id from Cloudinary URL
function extractPublicId(url) {
  if (!url) return null;
  try {
    const matches = url.match(/upload\/(?:v\d+\/)?([^\.]+)/);
    return matches ? matches[1] : null;
  } catch (err) {
    console.error("Error extracting public_id:", err);
    return null;
  }
}

// Update product
router.put("/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;


    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {

      return res.status(404).json({ error: "Product not found" });
    }


    res.status(200).json({
      message: "Product updated successfully!",
      product: updatedProduct
    });
  } catch (error) {
    console.error("Error updating product:", error);

    res.status(500).json({ error: "Failed to update product." });
  }
});
// Search products
router.get('/search', async (req, res) => {
  try {
    const query = req.query.query?.trim();

    if (!query || query.length < 2) {  // Minimum search length
      return res.status(400).json({
        message: 'Search query must be at least 2 characters long'
      });
    }

    // Escape regex special characters to prevent errors
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const products = await Product.find({
      $or: [
        { name: { $regex: escapedQuery, $options: 'i' } },
        { title: { $regex: escapedQuery, $options: 'i' } },
        { description: { $regex: escapedQuery, $options: 'i' } },
        { sku: { $regex: escapedQuery, $options: 'i' } },
        { tags: { $in: [new RegExp(escapedQuery, 'i')] } },
        { 'variants.name': { $regex: escapedQuery, $options: 'i' } },
        { 'variants.sku': { $regex: escapedQuery, $options: 'i' } },
      ]
    })
      .populate('variants')
      .limit(50);  // Add limit to prevent too many results

    if (products.length === 0) {
      return res.status(404).json({
        message: 'No products found matching your search',
        suggestions: await getSearchSuggestions(query)
      });
    }

    res.json(products);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      message: 'Server error during search',
      error: error.message
    });
  }
});

// Helper function for search suggestions
async function getSearchSuggestions(query) {
  try {
    return await Product.aggregate([
      {
        $match: {
          $text: { $search: query }
        }
      },
      { $limit: 5 },
      { $project: { name: 1, _id: 0 } }
    ]);
  } catch (e) {
    return [];
  }
}
router.get('/categories', async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $group: {
          _id: {
            parentCategory: "$parentCategory",
            subCategory: "$subCategory",
            category: "$category"
          }
        }
      },
      {
        $group: {
          _id: {
            parentCategory: "$_id.parentCategory",
            subCategory: "$_id.subCategory"
          },
          categories: { $addToSet: "$_id.category" }
        }
      },
      {
        $group: {
          _id: "$_id.parentCategory",
          subCategories: {
            $push: {
              subCategory: "$_id.subCategory",
              categories: "$categories"
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          parentCategory: "$_id",
          subCategories: 1
        }
      }
    ]);

    res.json(result);
  } catch (err) {
    console.error('Error fetching category hierarchy:', err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// GET: Unique Concerns
router.get('/concerns', async (req, res) => {
  try {
    const concerns = await Product.distinct('tags');
    res.json(concerns);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch concerns' });
  }
});

// GET: Unique Intents
router.get('/intents', async (req, res) => {
  try {
    const intents = await Product.distinct('Intenttags');
    res.json(intents);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch intents' });
  }
});

module.exports = router;
