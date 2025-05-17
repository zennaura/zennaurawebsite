// src/components/ManageProducts.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {useUser} from '../../components/AuthContext/AuthContext'

const ManageProducts = () => {
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (productId, images = []) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      // Delete images from Cloudinary first
      await axios.post("/api/images/delete", { images });
      
      // Then delete product from database
      await axios.delete(`/api/products/${productId}`);
      
      // Update local state
      setProducts(products.filter((p) => p._id !== productId));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete product");
    }
  };

  if (loading) return <div className="text-center py-4">Loading products...</div>;
  if (error) return <div className="text-red-500 text-center py-4">Error: {error}</div>;

  
  if (user?.userRole !== 'admin') {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
        <p className="text-gray-700 mb-4">This page is not accessible by you.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <Link 
          to="/admin/products/add"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add New Product
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">SKU</th>
              <th className="py-3 px-4 text-left">Price</th>
              <th className="py-3 px-4 text-left">Stock</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {products.map((product) => (
              <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">{product.name}</td>
                <td className="py-3 px-4">{product.sku}</td>
                <td className="py-3 px-4">
                  ${product.variants[0]?.salePrice?.toFixed(2) || "N/A"}
                </td>
                <td className="py-3 px-4">
                  {product.variants.reduce((sum, v) => sum + (v.stock || 0), 0)}
                </td>
                <td className="py-3 px-4 flex space-x-2">
                  <Link
                    to={`/admin/products/edit/${product._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id, getAllImageUrls(product))}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helper function to get all image URLs from a product
const getAllImageUrls = (product) => {
  const urls = [];
  
  if (product.frontImage) urls.push(product.frontImage);
  if (product.otherImages) urls.push(...product.otherImages);
  if (product.productDescriptions?.image) urls.push(product.productDescriptions.image);
  
  // Add poster images
  const posters = product.posters || {};
  Object.values(posters).forEach(url => {
    if (url) urls.push(url);
  });
  
  // Add variant images
  product.variants?.forEach(variant => {
    if (variant.images) urls.push(...variant.images);
  });
  
  return urls.filter(url => url && typeof url === 'string');
};

export default ManageProducts;