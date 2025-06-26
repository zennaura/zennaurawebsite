import React, { useState } from "react";
import "./ReviewFormModal.css";
import axios from "axios"

const ReviewFormModal = ({ isOpen, onClose, productId, variantId }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [youtubeURL, setYoutubeURL] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!isOpen) return null;

  // Cloudinary Upload Function
  const uploadToCloudinary = async (file, folderName = "reviews") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    formData.append("folder", folderName);

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/zennaura/auto/upload", // auto supports image/video
      { method: "POST", body: formData }
    );

    if (!response.ok) throw new Error("Failed to upload to Cloudinary");
    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async () => {
    // Basic validation for required fields
    if (!title.trim() || !reviewText.trim() || !name.trim() || !email.trim() || !rating) {
      alert("Please fill in all required fields, including title, rating, review, name, and email.");
      return;
    }
    try {
      // Upload all files to Cloudinary
      const mediaUrls = [];
      for (let file of mediaFiles) {
        const url = await uploadToCloudinary(file);
        mediaUrls.push(url);
      }

      const reviewData = {
        productId,
        variantId,
        rating,
        title,
        reviewText,
        youtubeURL,
        name,
        email,
        mediaUrls, // array of uploaded image/video URLs
      };

      const response = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });
      // const response = await axios.post(`${import.meta.env.VITE_BACKEND_LINK}/api/reviews`,{
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(reviewData),
      // })
      if (response.ok) {
        alert("Review submitted successfully!");
        onClose();
      } else {
        alert("Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Something went wrong while submitting your review.");
    }
  };

  const handleFileChange = (e) => {
    setMediaFiles(Array.from(e.target.files));
  };

  return (
    <div className="review-modal-overlay">
      <div className="review-modal">
        <button className="review-modal-close" onClick={onClose}>←</button>
        <h2>Write a Review</h2>
        <div className="review-stars">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <span
                key={index}
                className={`star-icon ${starValue <= (hover || rating) ? "filled" : ""}`}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </span>
            );
          })}
        </div>

        <input
          type="text"
          placeholder="Give your review a title"
          maxLength="100"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your reviews here"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        ></textarea>

        <p>Pictures/Videos (optional)</p>
        <div className="review-upload-box">
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
          />
        </div>

        <input
          type="text"
          placeholder="YouTube URL"
          value={youtubeURL}
          onChange={(e) => setYoutubeURL(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter your name (public)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your email (private)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p className="review-policy">
          How we use your data: We'll contact you about the review you left, and only if necessary.
          By submitting your review, you agree to our terms, privacy, and content policies.
        </p>

        <div className="review-buttons">
          <button className="cancel-btn" onClick={onClose}>CANCEL REVIEW</button>
          <button className="submit-btn" onClick={handleSubmit}>SUBMIT REVIEW</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewFormModal;
