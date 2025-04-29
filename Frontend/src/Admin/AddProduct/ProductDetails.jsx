import React from 'react';
import { useLocation } from 'react-router-dom';

const ProductDetails = () => {
  const { state: product } = useLocation();

  if (!product) return <div className="p-8">Product not found</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-lg shadow-md">
      <img
        src={product.frontImage}
        alt={product.productName}
        className="w-full max-h-96 object-cover rounded-md mb-6"
      />

      <h1 className="text-3xl font-bold mb-2">{product.productName}</h1>
      <p className="text-lg text-gray-700 mb-2 font-medium">{product.title}</p>
      <p className="text-sm text-gray-500 mb-4">{product.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {product.variantsimages &&
          product.variantsimages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`variant-img-${i}`}
              className="w-full h-40 object-cover rounded"
            />
          ))}
      </div>

      <div className="mb-4">
        <p><strong>SKU:</strong> {product.sku}</p>
        <p><strong>Size:</strong> {product.size}</p>
        <p><strong>Sale Price:</strong> ₹{product.salePrice}</p>
        <p><strong>Cost Price:</strong> ₹{product.costPrice}</p>
        <p><strong>Discount:</strong> {product.discount}%</p>
        <p><strong>Stock:</strong> {product.stock}</p>
        <p><strong>Best Seller:</strong> {product.bestSeller ? "Yes" : "No"}</p>
        <p><strong>Feature Product:</strong> {product.featureProduct ? "Yes" : "No"}</p>
        <p><strong>Rating:</strong> {product.rating || 0}/5</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Specifications</h2>
        {product.specifications && (
          <ul className="list-disc pl-5 text-gray-600">
            <li>Material: {product.specifications.material}</li>
            <li>Product Type: {product.specifications.productType}</li>
            <li>Color: {product.specifications.color}</li>
            <li>Bead Size: {product.specifications.beadSize}</li>
            <li>Weight: {product.specifications.weight}</li>
            <li>Packaging: {product.specifications.packaging}</li>
          </ul>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {product.tags &&
            product.tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                {tag}
              </span>
            ))}
        </div>
      </div>

      {product.stoneUsedImage && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Stones Used</h2>
          <div className="flex gap-4 flex-wrap">
            {product.stoneUsedImage.map((stone, i) => (
              <div key={i} className="text-center">
                <img
                  src={stone.image}
                  alt={stone.title}
                  className="w-24 h-24 object-cover rounded mb-1"
                />
                <p className="text-sm">{stone.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">More Visuals</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {product.healingImage && <img src={product.healingImage} alt="Healing" className="rounded" />}
          {product.benefits && <img src={product.benefits} alt="Benefits" className="rounded" />}
          {product.whyChoose && <img src={product.whyChoose} alt="Why Choose" className="rounded" />}
          {product.waysToClean && <img src={product.waysToClean} alt="Ways to Clean" className="rounded" />}
          {product.whoWear && <img src={product.whoWear} alt="Who Can Wear" className="rounded" />}
          {product.whereHowWear && <img src={product.whereHowWear} alt="Where/How to Wear" className="rounded" />}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
