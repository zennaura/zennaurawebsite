import React, { useState } from "react";
import "./UserDashboard.css";
import { useUser } from '../../../components/AuthContext/AuthContext';
import FeatureProduct from "../../Featuredproducts/Featuredproducts";
import {
  FaUserCircle,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaStar,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import axios from 'axios';

// Import toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDashboard = ({ onNavigate }) => {
  const { user, setUser } = useUser();
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const defaultAddress = {
    street: "Not specified",
    city: "Not specified",
    state: "Not specified",
    country: "Not specified",
    zipCode: "Not specified"
  };

  const address = user.Address && user.Address.length > 0 ? user.Address[0] : defaultAddress;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleEditClick = (section) => {
    onNavigate(section === 'account' ? 'editInfo' : 'address');
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    formData.append("folder", "profilepicture");

    const response = await fetch("https://api.cloudinary.com/v1_1/zennaura/image/upload", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    return data.secure_url;
  };

  const deleteFromCloudinary = async (url) => {
    if (!url) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/cloudnaryimg/delete-img`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend deletion error:", errorData);
        return { success: false, error: errorData.error || "Failed to delete image" };
      }

      return await response.json();
    } catch (error) {
      console.error("Network error:", error);
      return { success: false, error: "Network error while deleting image" };
    }
  };

  const handleImageUpload = async (e) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      toast.error('Only JPEG, PNG, and GIF images are allowed');
      return;
    }

    if (file.size > maxSize) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);

    try {
      // Delete previous image if exists
      if (user.profilePicture) {
        const deleteResult = await deleteFromCloudinary(user.profilePicture);
        if (deleteResult.success === false) {
          console.warn("Failed to delete old profile image:", deleteResult.error);
          // Continue anyway, don't block upload
        }
      }

      const imageUrl = await uploadToCloudinary(file);

      await axios.put(
        `${import.meta.env.VITE_BACKEND_LINK}/api/userdashboard/profile-image/${user._id}`,
        { profileimage: imageUrl }
      );

      setUser(prev => ({
        ...prev,
        profilePicture: imageUrl
      }));

      toast.success('Profile image updated successfully!');
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile image');
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleDeleteImage = async () => {
    if (!user.profilePicture) {
      toast.info("No profile image to delete.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete your profile image?")) {
      return;
    }

    setIsDeleting(true);

    try {
      const deleteResult = await deleteFromCloudinary(user.profilePicture);
      if (deleteResult.success === false) {
        throw new Error(deleteResult.error || "Failed to delete image");
      }

      await axios.put(
        `${import.meta.env.VITE_BACKEND_LINK}/api/userdashboard/profile-image/${user._id}`,
        { profileimage: "" }
      );

      setUser(prev => ({
        ...prev,
        profilePicture: ""
      }));

      toast.success("Profile image deleted successfully.");
    } catch (error) {
      console.error('Delete image error:', error);
      toast.error(error.message || "Failed to delete profile image.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="UserDashboard-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="UserDashboard-box">
        <div className="UserDashboard-userDetails">
          <div className="UserDashboard-userDetails-upper">
            <div className="UserDashboard-avatarBox" style={{ position: 'relative' }}>
              <label
                htmlFor="profile-upload"
                className="profile-upload-label"
                style={{ cursor: isUploading ? 'default' : 'pointer' }}
              >
                {isUploading ? (
                  <div className="uploading-text">Uploading...</div>
                ) : (
                  <>
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt="Profile"
                        className="UserDashboard-avatarImage"
                      />
                    ) : (
                      <FaUserCircle className="UserDashboard-avatarIcon" size={60} />
                    )}
                    <span className="edit-icon">✏️ Update Image</span>
                  </>
                )}
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading || isDeleting}
                style={{ display: 'none' }}
              />

              {/* Delete image button */}
              {user.profilePicture && !isUploading && (
                <button
                  className="delete-image-btn"
                  onClick={handleDeleteImage}
                  disabled={isDeleting}
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    background: 'rgba(255,255,255,0.8)',
                    border: 'none',
                    borderRadius: '50%',
                    cursor: isDeleting ? 'not-allowed' : 'pointer',
                    padding: '5px'
                  }}
                  title="Delete profile image"
                >
                  <FaTrashAlt color="red" size={18} />
                </button>
              )}
            </div>
            <h3 className="UserDashboard-username">{user.firstName} {user.lastName}</h3>
            <div className="UserDashboard-points">
              <FaStar className="UserDashboard-icon" />
              Points: {user.Points || 0}
            </div>
            <p className="text-[10px] my-1 text-[#48091a] bg-white border border-[#48091a] px-4 py-2 rounded-md max-w-fit shadow-sm font-medium">
              Become a member to start earning points and unlock rewards.
            </p>
          </div>

          <div className="UserDashboard-infoList">
            <p><FaMapMarkerAlt className="UserDashboard-icon" /> {address.city}, {address.country}</p>
            <p><FaEnvelope className="UserDashboard-icon" /> {user.email}</p>
            <p><FaPhoneAlt className="UserDashboard-icon" /> {user.phone ? `+91 ${user.phone}` : 'Not specified'}</p>
          </div>
        </div>

        <div className="UserDashboard-otherdetials">
          <div className="UserDashboard-accountdetails">
            <h4>
              <span>Account Details</span>
              <FaEdit className="UserDashboard-editIcon" onClick={() => handleEditClick('account')} />
            </h4>
            <p>First Name: <strong>{user.firstName}</strong></p>
            <p>Last Name: <strong>{user.lastName}</strong></p>
            <p>Date of Birth: <strong>{formatDate(user.dateOfBirth)}</strong></p>
            <p>Date of Anniversary: <strong>{formatDate(user.dateOfAnniversary)}</strong></p>
            <p>Gender: <strong>{user.gender || 'Not specified'}</strong></p>
          </div>

          <div className="UserDashboard-shippingAddress">
            <h4>
              <span>Shipping Address</span>
              <FaEdit className="UserDashboard-editIcon" onClick={() => handleEditClick('address')} />
            </h4>
            <p>Address: <strong>{address.addressLine2 || 'Not specified'}</strong></p>
            <p>City: <strong>{address.city}</strong></p>
            <p>State: <strong>{address.state}</strong></p>
            <p>Country: <strong>{address.country}</strong></p>
            <p>Zip Code: <strong>{address.zipCode}</strong></p>
          </div>
        </div>
      </div>
      <FeatureProduct />
    </div>
  );
};

export default UserDashboard;
