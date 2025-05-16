import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ViewAllProduct.css';
import AdminNavbar from '../AdminNavbar/AdminNavbar';

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
 
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
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
    navigate('/admin-update-product-form', { state: { product: product } });
  };

  const filteredProducts = products.filter(product =>
    // product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            {filteredProducts.map((product) => (
              <div key={product._id} className="admin-product-card">
                <div className="admin-product-image">
                  <img src={product.frontImage || 'https://via.placeholder.com/150'}  />
                </div>
                <div className="admin-product-details">
                  {/* <h3 className="admin-product-name">{product.name}</h3> */}
                  <p className="admin-product-title">{product.title}</p>
                  <div className="admin-product-categories">
                    <span>{product.parentCategory}</span> &gt;
                    <span>{product.subCategory}</span> &gt;
                    <span>{product.subSubCategory}</span> &gt;
                    <span>{product.category}</span>
                  </div>
                  <p className="admin-product-sku">SKU: {product.sku}</p>

                  <div className="admin-product-variants">
                    {product.variants.map((variant, index) => (
                      <div key={index} className="admin-product-variant">
                        <p>Size: {variant.size}</p>
                        <p>Price: ${variant.saleprice} ({variant.discount}% off)</p>
                        <p>Stock: {variant.stock}</p>
                      </div>
                    ))}
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
            ))}
          </div>
           
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductsManagement;
