const mongoose = require('mongoose');

// Variant Schema
const VariantSchema = new mongoose.Schema({
  variantname: String,
  size: String,
  salePrice: Number,
  discount: Number,
  costPrice: Number,
  stock: Number,
  tax: Number,
  frontImage: String,
  backImage: String,

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
  category: String, //love 
  subCategory: String, //crystal 
  subSubCategory: String, //combo  not in use 

  name: String,
  title: String,
  description: String,
  sku: String,
  // .concern add in 
  tags: [String],
  Intenttags: [String],
  Chakratags:[String],
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
      date: { type: Date, default: Date.now },
      mediaUrls: [String],
      title: String,
      youtubeURL: String
    }
  ],

  productDescriptions: {
    title: String,
    image: String
  },

  healingProperties: {
    first: String,
    second: String,
    third: String,
    fourth:String
  },

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
