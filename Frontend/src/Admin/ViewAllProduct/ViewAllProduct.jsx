import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ViewAllProduct.css';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import { useUser } from '../../components/AuthContext/AuthContext';
import noImage from "../../assests/noImage.png";

const ProductsManagement = () => {
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/products`);
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_BACKEND_LINK}/api/products/${id}`);
        setProducts(products.filter(product => product._id !== id));
        toast.success('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
      }
    }
  };

  const handleEditClick = (product) => {
    navigate('/admin-update-product-form', { state: { product } });
  };

  const filteredProducts = products.filter(product => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      product.name?.toLowerCase().includes(searchTermLower) ||
      product.sku?.toLowerCase().includes(searchTermLower) ||
      product.category?.toLowerCase().includes(searchTermLower) ||
      product.parentCategory?.toLowerCase().includes(searchTermLower) ||
      product.subCategory?.toLowerCase().includes(searchTermLower) ||
      product.subSubCategory?.toLowerCase().includes(searchTermLower)
    );
  });

  console.log(products);
  if (loading) {
    return (
      <div className="main-container">
        <div className="left-container">
          <AdminNavbar />
        </div>
        <div className="right-container">
          <div className="loading-spinner">Loading products...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-container">
        <div className="left-container">
          <AdminNavbar />
        </div>
        <div className="right-container">
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  
  if (user?.userRole !== 'admin') {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white !p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-red-600 !mb-4">Access Denied</h2>
        <p className="text-gray-700 !mb-4">This page is not accessible by you.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white !px-4 !py-2 rounded-md hover:bg-blue-700"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
  return (
    <div className="main-container">
      <div className="left-container">
        <AdminNavbar />
      </div>
      <div className="right-container">
        <div className="admin-products-container">
          {/* Header Section */}
          <div className="admin-products-header">
            <h1 className="admin-products-title">Product Management</h1>
            <div className="admin-products-actions">
              <div className="admin-products-search">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <button
                className="admin-products-add-btn"
                onClick={() => navigate('/addproduct')}
              >
                Add New Product
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="admin-products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product._id || Math.random()} className="admin-product-card">
                  <div className="admin-product-image">
                    <img 
                      src={product?.variants[0]?.frontImage || noImage} 
                      alt={product.name || 'Product image'} 
                      onError={(e) => {
                        e.target.src = noImage;
                      }}
                    />
                  </div>
                  <div className="admin-product-details">
                    {/* <h3 className="admin-product-name">{product.name || 'Unnamed Product'}</h3> */}
                    <p className="admin-product-title">{product?.variants[0]?.variantname || 'No title'}</p>
                    <div className="admin-product-categories">
                      <span>{product.parentCategory || 'No category'}</span> &gt;
                      <span>{product.subCategory || 'No subcategory'}</span> &gt;
                      <span>{product.subSubCategory || 'No sub-subcategory'}</span> &gt;
                      <span>{product.category || 'No category'}</span>
                    </div>
                    <p className="admin-product-sku">SKU: {product.sku || 'N/A'}</p>

                    <div className="admin-product-variants">
                      {product.variants?.length > 0 ? (
                        product.variants.map((variant, index) => (
                          <div key={index} className="admin-product-variant">
                            <p>Size: {variant.size || 'N/A'}</p>
                            <p>Price: ₹ {(variant.salePrice || 0).toFixed(2)} ({(variant.discount || 0)}% off)</p>
                            <p>Stock: {variant.stock || 0}</p>
                          </div>
                        ))
                      ) : (
                        <p className="no-variants">No variants available</p>
                      )}
                    </div>
                  </div>
                  <div className="admin-product-actions">
                    <button
                      className="admin-product-edit"
                      onClick={() => handleEditClick(product)}
                    >
                      Update
                    </button>
                    <button
                      className="admin-product-delete"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products-found">
                {searchTerm ? 'No products match your search' : 'No products available'}
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default ProductsManagement;