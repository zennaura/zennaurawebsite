import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useUser } from './components/AuthContext/AuthContext';

import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Homepage from './UserPanel/Homepage/Homepage';
import Registration from './components/Registration/Registration';
import Login from './components/SignUp/WelcomeToZennAura/WelcomeToZennAura';
import AboutUs from './UserPanel/AboutUs/AboutUs/AboutUs';
import Policies from './UserPanel/Policiess/Policies/Policies';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import TermsAndConditions from './UserPanel/Termsandcondition/Termsandcondition/Termsandcondition';
import Shop from './UserPanel/Shop/Shop/shop';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Skinncare from './UserPanel/ProductCategory/Category/SkinnCare/SkinnCare';
import AuraJewels from './UserPanel/ProductCategory/Category/AuraJewels/AuraJewels';
import DivineCrystal from './UserPanel/ProductCategory/Category/DivineCrystal/DivineCrystal';
import SacreDrituals from './UserPanel/ProductCategory/Category/SacredRituals/SacredRituals';
import ProductDetails from './UserPanel/ProductPage/ProductPage/ProductPage';
import UserDashboard from './UserPanel/UserDashboard/UserDashboardMain/UserDashboardMain';

import AdminDashboard from './Admin/Dashboard/Dashboard';
import AddProduct from './Admin/AddProduct/AddProduct';
import AllProduct from './Admin/AllProduct/AllProduct';
import ViewAllorder from './Admin/ViewAllOrders/ViewAllOrders';
import ViewAllProduct from './Admin/ViewAllProduct/ViewAllProduct';
import UpdateProduct from './Admin/UpdateProduct/UpdateProduct';
import ManageProducts from './Admin/ProductManage/ManageProducts';
import CheckoutPage from './UserPanel/CheckoutPage/CheckoutPage';
import Thankyoupage from './UserPanel/Thankyoupage/Thankyoupage';
import VerificationCodeInput from './components/VerificationCodeInput/VerificationCodeInput';
import SetNewPassword from './components/SetNewPassword/SetNewPassword';
import VerificationCodeforgotpassword from './components/VerificationCodeInput/VerificationCodeforgotpassword';
import ForgotPasswordEmail from './components/ForgotPasswordEmail/ForgotPasswordEmail';

function App() {
  const { user } = useUser();
  const location = useLocation();

  return (
    <>
      {/* ScrollToTop can be added here if needed */}
      <ScrollToTop />
      {(!user || user.userRole === 'user') && location.pathname !== '/verification' && location.pathname !== '/emailforforgotpassword' && location.pathname !== '/resetpasswordvarification' && location.pathname !== '/resetpassword' && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/manageproducts" element={<ManageProducts />} />

        <Route path="/" element={<Homepage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/skincare" element={<Skinncare />} />
        <Route path="/aurajewels" element={<AuraJewels />} />
        <Route path="/divinecrystals" element={<DivineCrystal />} />
        <Route path="/sacredrituals" element={<SacreDrituals />} />
        <Route path="/productdetails/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
        <Route path="/userdashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/addproduct" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
        <Route path="/allproduct" element={<ProtectedRoute><AllProduct /></ProtectedRoute>} />
        <Route path="/admin-homepage" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin-view-orders" element={<ProtectedRoute><ViewAllorder /></ProtectedRoute>} />
        <Route path="/admin-view-products" element={<ProtectedRoute><ViewAllProduct /></ProtectedRoute>} />
        <Route path="/admin-update-product-form" element={<ProtectedRoute><UpdateProduct /></ProtectedRoute>} />
        <Route path="/checkout-page" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
        <Route path="/thankyou-page" element={<ProtectedRoute><Thankyoupage /></ProtectedRoute>} />
        <Route path="/verification" element={<VerificationCodeInput />} />
        <Route path="/emailforforgotpassword" element={<ForgotPasswordEmail />} />
        <Route path="/resetpasswordvarification" element={<VerificationCodeforgotpassword />} />
        <Route path="/resetpassword" element={<SetNewPassword />} />
      </Routes>

      {location.pathname !== '/verification' && location.pathname !== '/emailforforgotpassword' && location.pathname !== '/resetpasswordvarification' && location.pathname !== '/resetpassword' && <Footer />}
    </>
  );
}

export default App;
