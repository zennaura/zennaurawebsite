const mongoose = require('mongoose');

// Variant Schema
const VariantSchema = new mongoose.Schema({
  size: String,
  salePrice: Number,
  discount: Number,
  costPrice: Number,
  stock: Number,

  variantsimages: [String], // 2 images

  specifications: {
    material: String,
    productType: String,
    size: String,
    color: String,
    beadSize: String,
    weight: String,
    packaging: String
  },

  featureProduct: { type: Boolean, default: false },
  bestSeller: { type: Boolean, default: false },
});

// Product Schema
const ProductSchema = new mongoose.Schema({
  parentCategory: String, //aura
  subCategory: String, //crystal 
  subSubCategory: String, //combo
  category: String, //love 

  name: String,
  title: String,
  description: String,
  sku: String,

  tags: [String],
  stoneUsedImage: [
    {
      title: String,
      image: String
    }
  ], // n images

  rating: { type: Number, default: 0 },
  reviews: [
    {
      user: String,
      comment: String,
      rating: Number,
      date: { type: Date, default: Date.now }
    }
  ],

  productDescriptions: {
    title: String,
    image: String
  },
  
  frontImage: String,
  otherimages: [String], // 3 images

  healingImage: String,
  benefits: String,
  whyChoose: String,
  waysToClean: String,
  whoWear: String,
  whereHowWear: String,

  variants: [VariantSchema]
});

// Rating updater method
ProductSchema.methods.calculateAverageRating = function () {
  if (this.reviews.length === 0) {
    this.rating = 0;
  } else {
    const total = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.rating = total / this.reviews.length;
  }
  return this.save();
};

module.exports = mongoose.model('Product', ProductSchema);
