import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const productData = location.state?.product;
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Cloudinary configuration
  const CLOUD_NAME = 'zennaura';
  const UPLOAD_PRESET = 'ml_default';

  // Form state
  const [category, setCategory] = useState({
    parent: "",
    sub: "",
    subSub: "",
    category: "",
  });

  const [basicDetails, setBasicDetails] = useState({
    name: "",
    title: "",
    description: "",
    sku: "",
  });

  const [tags, setTags] = useState([]);
  const [stoneName, setStoneName] = useState("");
  const [stoneImage, setStoneImage] = useState(null);
  const [stones, setStones] = useState([]);
  const [productDescription, setProductDescription] = useState("");

  const [images, setImages] = useState({
    descriptionImage: null,
    frontImage: null,
    otherImages: [],
  });

  const [posters, setPosters] = useState({
    healing: null,
    benefits: null,
    whyChoose: null,
    waysToClean: null,
    whoWear: null,
    howToWear: null,
  });

  const [variants, setVariants] = useState([]);

  // Initialize form with product data
  useEffect(() => {
    if (productData) {
      setCategory({
        parent: productData.parentCategory || "",
        sub: productData.subCategory || "",
        subSub: productData.subSubCategory || "",
        category: productData.category || ""
      });

      setBasicDetails({
        name: productData.name || "",
        title: productData.title || "",
        description: productData.description || "",
        sku: productData.sku || ""
      });

      setTags(Array.isArray(productData.tags) ? productData.tags : []);
      setStones(Array.isArray(productData.stoneUsedImage) ? productData.stoneUsedImage : []);
      setProductDescription(productData.productDescriptions?.title || "");

      setImages({
        descriptionImage: productData.productDescriptions?.image || null,
        frontImage: productData.frontImage || null,
        otherImages: Array.isArray(productData.otherImages) ? productData.otherImages : []
      });

      setPosters({
        healing: productData.healingImage || null,
        benefits: productData.benefits || null,
        whyChoose: productData.whyChoose || null,
        waysToClean: productData.waysToClean || null,
        whoWear: productData.whoWear || null,
        howToWear: productData.whereHowWear || null
      });

      setVariants(
        Array.isArray(productData.variants) 
          ? productData.variants.map(v => ({
              ...v,
              size: String(v.size || ""),
              salePrice: String(v.salePrice || ""),
              discount: String(v.discount || ""),
              costPrice: String(v.costPrice || ""),
              stock: String(v.stock || ""),
              images: Array.isArray(v.variantsimages) ? v.variantsimages : [],
              specifications: {
                material: v.specifications?.material || "",
                productType: v.specifications?.productType || "",
                beadSize: v.specifications?.beadSize || "",
                size: v.specifications?.size || "",
                color: v.specifications?.color || "",
                weight: v.specifications?.weight || "",
                packaging: v.specifications?.packaging || ""
              },
              featureProduct: Boolean(v.featureProduct),
              bestSeller: Boolean(v.bestSeller)
            }))
          : []
      );
      
      setLoading(false);
    } else {
      setError("No product data received");
      setLoading(false);
      navigate('/admin-view-products');
    }
  }, [productData, navigate]);

  // Cloudinary Upload Function
  const uploadToCloudinary = async (file, folderName = "products") => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", folderName);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );

      if (!response.ok) {
        throw new Error(`Cloudinary upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  // Improved deleteFromCloudinary function
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

  // Stone handlers
  const handleAddStone = async () => {
    if (stoneName.trim() === "" || !stoneImage) {
      alert("Please enter a stone name and select an image.");
      return;
    }

    try {
      const imageUrl = await uploadToCloudinary(stoneImage);
      const newStone = { title: stoneName, image: imageUrl };
      setStones([...stones, newStone]);
      setStoneName("");
      setStoneImage(null);
    } catch (error) {
      console.error("Error adding stone:", error);
      setError("Failed to add stone. Please try again.");
    }
  };

  const handleRemoveStone = async (index) => {
    try {
      const stoneToRemove = stones[index];
      if (stoneToRemove.image) {
        await deleteFromCloudinary(stoneToRemove.image);
      }
      const updatedStones = stones.filter((_, i) => i !== index);
      setStones(updatedStones);
    } catch (error) {
      console.error("Error removing stone:", error);
    }
  };

  const handleFileUpload = async (event, fieldName) => {
    try {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      if (fieldName === "otherImages") {
        // Upload new images first
        const urls = await Promise.all(
          Array.from(files).map((file) => uploadToCloudinary(file))
        );
        // Only after successful upload, delete old images
        if (images.otherImages && images.otherImages.length > 0) {
          await Promise.all(
            images.otherImages.map(url => 
              deleteFromCloudinary(url).catch(e => null)
            )
          );
        }
        setImages({ ...images, [fieldName]: urls });
      } else {
        // Upload new image first
        const url = await uploadToCloudinary(files[0]);
        // Only after successful upload, delete old image
        if (images[fieldName]) {
          await deleteFromCloudinary(images[fieldName]).catch(e => null);
        }
        setImages({ ...images, [fieldName]: url });
      }
    } catch (error) {
      console.error("File upload error:", error);
      setError("Failed to upload image. Please try again.");
    }
  };

  // Poster upload handler
  const handlePosterUpload = async (event, fieldName) => {
    try {
      const file = event.target.files[0];
      if (!file) return;

      // Upload new poster first
      const url = await uploadToCloudinary(file);
      // Only after successful upload, delete old poster
      if (posters[fieldName]) {
        await deleteFromCloudinary(posters[fieldName]).catch(e => null);
      }
      setPosters({ ...posters, [fieldName]: url });
    } catch (error) {
      console.error("Poster upload error:", error);
      setError("Failed to upload poster. Please try again.");
    }
  };

  // Variant handlers
  const handleAddVariant = () => {
    setVariants([
      ...variants,
      {
        size: "",
        salePrice: "",
        discount: "",
        costPrice: "",
        stock: "",
        images: [],
        specifications: {
          material: "",
          productType: "",
          beadSize: "",
          size: "",
          color: "",
          weight: "",
          packaging: "",
        },
        featureProduct: false,
        bestSeller: false,
      },
    ]);
  };

  const handleRemoveVariant = (index) => {
    if (variants.length > 0) {
      const updatedVariants = [...variants];
      updatedVariants.splice(index, 1);
      setVariants(updatedVariants);
    }
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    if (field.includes(".")) {
      const [parentField, childField] = field.split(".");
      updatedVariants[index][parentField][childField] = value;
    } else {
      updatedVariants[index][field] = value;
    }
    setVariants(updatedVariants);
  };

  // Variant image handlers
  const handleVariantImageUpload = async (index, event) => {
    try {
      const files = Array.from(event.target.files).slice(0, 2);
      
      // Upload new images first
      const urls = await Promise.all(files.map(uploadToCloudinary));
      // Only after successful upload, delete old images
      const variant = variants[index];
      if (variant.images && variant.images.length > 0) {
        await Promise.all(
          variant.images.map(url => 
            deleteFromCloudinary(url).catch(e => null)
          )
        );
      }
      const updatedVariants = [...variants];
      updatedVariants[index].images = urls;
      setVariants(updatedVariants);
    } catch (error) {
      console.error("Variant image upload error:", error);
      setError("Failed to upload variant images. Please try again.");
    }
  };

  // Remove image from otherImages
  const handleRemoveOtherImage = async (index) => {
    try {
      const imageUrl = images.otherImages[index];
      if (imageUrl) {
        await deleteFromCloudinary(imageUrl);
      }
      const updatedImages = [...images.otherImages];
      updatedImages.splice(index, 1);
      setImages({ ...images, otherImages: updatedImages });
    } catch (error) {
      console.error("Error removing image:", error);
    }
  };

  // Remove variant image
  const handleRemoveVariantImage = async (variantIndex, imageIndex) => {
    try {
      const variant = variants[variantIndex];
      const imageUrl = variant.images[imageIndex];
      
      if (imageUrl) {
        await deleteFromCloudinary(imageUrl);
      }

      const updatedVariants = [...variants];
      updatedVariants[variantIndex].images.splice(imageIndex, 1);
      setVariants(updatedVariants);
    } catch (error) {
      console.error("Error removing variant image:", error);
    }
  };

  // Form Submission Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!basicDetails.name || !basicDetails.description || !basicDetails.sku || variants.length === 0) {
      alert("Please fill in all required fields and add at least one variant.");
      return;
    }

    const updatedProductData = {
      parentCategory: category.parent,
      subCategory: category.sub,
      subSubCategory: category.subSub,
      category: category.category,

      name: basicDetails.name,
      title: basicDetails.title,
      description: basicDetails.description,
      sku: basicDetails.sku,

      tags,
      stoneUsedImage: stones,

      frontImage: images.frontImage,
      otherImages: images.otherImages,

      healingImage: posters.healing,
      benefits: posters.benefits,
      whyChoose: posters.whyChoose,
      waysToClean: posters.waysToClean,
      whoWear: posters.whoWear,
      whereHowWear: posters.howToWear,

      productDescriptions: {
        title: productDescription,
        image: images.descriptionImage,
      },

      variants: variants.map((variant) => ({
        ...variant,
        size: variant.size,
        salePrice: Number(variant.salePrice),
        discount: Number(variant.discount),
        costPrice: Number(variant.costPrice),
        stock: Number(variant.stock),
        variantsimages: variant.images || [],
        specifications: variant.specifications,
        featureProduct: variant.featureProduct,
        bestSeller: variant.bestSeller
      })),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/products/${productData._id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProductData),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/admin-view-products");
        }, 3000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update product.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 flex justify-center items-center p-6">
      {success && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 animate-bounce z-50">
          ✅ Product Updated Successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-8"
      >
        {/* Product Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 className="col-span-full text-xl font-semibold text-gray-800">
            Product Category
          </h2>
          <label className="block">
            <span className="text-gray-700">Parent Category</span>
            <input
              type="text"
              value={category.parent}
              onChange={(e) =>
                setCategory({ ...category, parent: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Sub Category</span>
            <input
              type="text"
              value={category.sub}
              onChange={(e) => setCategory({ ...category, sub: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">SubSub Category</span>
            <input
              type="text"
              value={category.subSub}
              onChange={(e) =>
                setCategory({ ...category, subSub: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
          <label className="block">
            <span className="text-gray-700"> Category</span>
            <input
              type="text"
              value={category.category}
              onChange={(e) =>
                setCategory({ ...category, category: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
        </div>

        {/* Basic Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 className="col-span-full text-xl font-semibold text-gray-800">
            Basic Details
          </h2>

          <label className="block">
            <span className="text-gray-700">Product Name</span>
            <input
              type="text"
              value={basicDetails.name}
              onChange={(e) =>
                setBasicDetails({ ...basicDetails, name: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Product Description</span>
            <input
              type="text"
              value={basicDetails.description}
              onChange={(e) =>
                setBasicDetails({ ...basicDetails, description: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Product Title</span>
            <input
              type="text"
              value={basicDetails.title}
              onChange={(e) =>
                setBasicDetails({ ...basicDetails, title: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>

          <label className="block">
            <span className="text-gray-700">Product SKU</span>
            <input
              type="text"
              value={basicDetails.sku}
              onChange={(e) =>
                setBasicDetails({ ...basicDetails, sku: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </label>
        </div>

        {/* Tags */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Product Tags
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim() !== "") {
                  setTags([...tags, e.target.value.trim()]);
                  e.target.value = "";
                }
              }}
              placeholder="Enter a tag"
              className="flex-1 border border-gray-300 rounded-md p-2 md:p-3 text-sm md:text-base"
            />

            <button
              type="button"
              onClick={() => {
                const inputField = document.querySelector(
                  'input[placeholder="Enter a tag"]'
                );
                if (inputField && inputField.value.trim() !== "") {
                  setTags([...tags, inputField.value.trim()]);
                  inputField.value = "";
                }
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm md:text-base"
            >
              Add
            </button>
          </div>

          <div id="tagList" className="mt-2 flex gap-2 flex-wrap">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => {
                    setTags(tags.filter((_, i) => i !== index));
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Stone Used */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Stone Used
          </h2>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={stoneName}
              onChange={(e) => setStoneName(e.target.value)}
              placeholder="Enter stone name"
              className="border border-gray-300 rounded-md p-2"
            />

            <input
              type="file"
              onChange={(e) => setStoneImage(e.target.files[0])}
              className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-600"
            />

            <button
              type="button"
              onClick={handleAddStone}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-fit"
            >
              Add Stone
            </button>
          </div>

          <div id="stoneList" className="mt-2 flex gap-2 flex-wrap">
            {stones.map((stone, index) => (
              <div key={index} className="flex items-center gap-2 bg-blue-100 rounded-full px-3 py-1">
                {stone.image && (
                  <img 
                    src={stone.image} 
                    alt={stone.title} 
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}
                <span className="text-blue-800 text-sm font-medium">
                  {stone.title}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveStone(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 text-xs"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Description & Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Product Description
            </h2>
            <input
              type="text"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Enter product description"
              className="mb-2 block w-full border border-gray-300 rounded-md p-2"
            />
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, "descriptionImage")}
              className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-600"
            />
            {images.descriptionImage && (
              <div className="mt-2 flex items-center gap-2">
                <img 
                  src={images.descriptionImage} 
                  alt="Description" 
                  className="h-20 object-contain"
                />
                <button
                  type="button"
                  onClick={() => setImages({...images, descriptionImage: null})}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Product Images
            </h2>

            <label className="block mb-2">Product Front Image</label>
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, "frontImage")}
              className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-600"
            />
            {images.frontImage && (
              <div className="mt-2 flex items-center gap-2">
                <img 
                  src={images.frontImage} 
                  alt="Front" 
                  className="h-20 object-contain"
                />
                <button
                  type="button"
                  onClick={() => setImages({...images, frontImage: null})}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            )}

            <label className="block mb-2 mt-4">Other Images</label>
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, "otherImages")}
              className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-600"
              multiple
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {images.otherImages?.map((img, index) => (
                <div key={index} className="relative flex items-center gap-2">
                  <img 
                    src={img} 
                    alt={`Product ${index}`} 
                    className="h-20 object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveOtherImage(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Posters */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Posters</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="flex flex-col items-center space-y-2">
              <label className="text-sm font-medium text-gray-700">Healing</label>
              <input
                type="file"
                onChange={(e) => handlePosterUpload(e, "healing")}
                className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-600"
              />
              {posters.healing && (
                <div className="flex items-center gap-2">
                  <img 
                    src={posters.healing} 
                    alt="Healing" 
                    className="h-16 object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setPosters({...posters, healing: null})}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    x
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center space-y-2">
              <label className="text-sm font-medium text-gray-700">Benefits</label>
              <input
                type="file"
                onChange={(e) => handlePosterUpload(e, "benefits")}
                className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-600"
              />
              {posters.benefits && (
                <div className="flex items-center gap-2">
                  <img 
                    src={posters.benefits} 
                    alt="Benefits" 
                    className="h-16 object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setPosters({...posters, benefits: null})}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    x
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center space-y-2">
              <label className="text-sm font-medium text-gray-700">Why Choose</label>
              <input
                type="file"
                onChange={(e) => handlePosterUpload(e, "whyChoose")}
                className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-600"
              />
              {posters.whyChoose && (
                <div className="flex items-center gap-2">
                  <img 
                    src={posters.whyChoose} 
                    alt="Why Choose" 
                    className="h-16 object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setPosters({...posters, whyChoose: null})}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    x
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center space-y-2">
              <label className="text-sm font-medium text-gray-700">Ways to Clean</label>
              <input
                type="file"
                onChange={(e) => handlePosterUpload(e, "waysToClean")}
                className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-600"
              />
              {posters.waysToClean && (
                <div className="flex items-center gap-2">
                  <img 
                    src={posters.waysToClean} 
                    alt="Ways to Clean" 
                    className="h-16 object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setPosters({...posters, waysToClean: null})}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    x
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center space-y-2">
              <label className="text-sm font-medium text-gray-700">Who Wear</label>
              <input
                type="file"
                onChange={(e) => handlePosterUpload(e, "whoWear")}
                className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-600"
              />
              {posters.whoWear && (
                <div className="flex items-center gap-2">
                  <img 
                    src={posters.whoWear} 
                    alt="Who Wear" 
                    className="h-16 object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setPosters({...posters, whoWear: null})}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    x
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center space-y-2">
              <label className="text-sm font-medium text-gray-700">How to Wear</label>
              <input
                type="file"
                onChange={(e) => handlePosterUpload(e, "howToWear")}
                className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-600"
              />
              {posters.howToWear && (
                <div className="flex items-center gap-2">
                  <img 
                    src={posters.howToWear} 
                    alt="How to Wear" 
                    className="h-16 object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setPosters({...posters, howToWear: null})}
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  >
                    x
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Variants */}
        <div className="space-y-4 border-t pt-4">
          <h2 className="text-xl font-semibold text-gray-800">Variants</h2>

          {variants.map((variant, index) => (
            <div key={index} className="border p-4 rounded-md space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <input
                  type="number"
                  value={variant.size}
                  onChange={(e) =>
                    handleVariantChange(index, "size", e.target.value)
                  }
                  placeholder="Size"
                  className="border border-gray-300 rounded-md p-2"
                />

                <input
                  type="number"
                  value={variant.salePrice}
                  onChange={(e) =>
                    handleVariantChange(index, "salePrice", e.target.value)
                  }
                  placeholder="Sale Price"
                  className="border border-gray-300 rounded-md p-2"
                />

                <input
                  type="number"
                  value={variant.discount}
                  onChange={(e) =>
                    handleVariantChange(index, "discount", e.target.value)
                  }
                  placeholder="Discount"
                  className="border border-gray-300 rounded-md p-2"
                />

                <input
                  type="number"
                  value={variant.costPrice}
                  onChange={(e) =>
                    handleVariantChange(index, "costPrice", e.target.value)
                  }
                  placeholder="Cost Price"
                  className="border border-gray-300 rounded-md p-2"
                />

                <input
                  type="number"
                  value={variant.stock}
                  onChange={(e) =>
                    handleVariantChange(index, "stock", e.target.value)
                  }
                  placeholder="Stock"
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>

              <div className="my-5">
                <label className="block mb-1">Variant Image (max 2)</label>
                <input
                  type="file"
                  onChange={(e) => handleVariantImageUpload(index, e)}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-600 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-700"
                  accept="image/*"
                  multiple
                />
                <div className="flex gap-2 mt-2">
                  {variant.images?.map((img, imgIndex) => (
                    <div key={imgIndex} className="relative flex items-center gap-2">
                      <img
                        src={img}
                        alt={`Variant ${index} image ${imgIndex}`}
                        className="h-16 object-contain border rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveVariantImage(index, imgIndex)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                      >
                        x
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  value={variant.specifications.material}
                  onChange={(e) =>
                    handleVariantChange(
                      index,
                      "specifications.material",
                      e.target.value
                    )
                  }
                  placeholder="Material"
                  className="border border-gray-300 rounded-md p-2"
                />
                <input
                  type="text"
                  value={variant.specifications.beadSize}
                  onChange={(e) =>
                    handleVariantChange(
                      index,
                      "specifications.beadSize",
                      e.target.value
                    )
                  }
                  placeholder="Bead Size"
                  className="border border-gray-300 rounded-md p-2"
                />

                <input
                  type="text"
                  value={variant.specifications.productType}
                  onChange={(e) =>
                    handleVariantChange(
                      index,
                      "specifications.productType",
                      e.target.value
                    )
                  }
                  placeholder="Product Type"
                  className="border border-gray-300 rounded-md p-2"
                />

                <input
                  type="text"
                  value={variant.specifications.size}
                  onChange={(e) =>
                    handleVariantChange(
                      index,
                      "specifications.size",
                      e.target.value
                    )
                  }
                  placeholder="Size"
                  className="border border-gray-300 rounded-md p-2"
                />

                <input
                  type="text"
                  value={variant.specifications.color}
                  onChange={(e) =>
                    handleVariantChange(
                      index,
                      "specifications.color",
                      e.target.value
                    )
                  }
                  placeholder="Color"
                  className="border border-gray-300 rounded-md p-2"
                />
                <input
                  type="text"
                  value={variant.specifications.weight}
                  onChange={(e) =>
                    handleVariantChange(
                      index,
                      "specifications.weight",
                      e.target.value
                    )
                  }
                  placeholder="Weight"
                  className="border border-gray-300 rounded-md p-2"
                />
                <input
                  type="text"
                  value={variant.specifications.packaging}
                  onChange={(e) =>  
                    handleVariantChange(
                      index,
                      "specifications.packaging",
                      e.target.value
                    )
                  }
                  placeholder="Packaging"
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>

              <label className="inline-flex items-center cursor-pointer my-4 space-x-2">
                <input
                  type="checkbox"
                  checked={variant.featureProduct}
                  onChange={(e) =>
                    handleVariantChange(
                      index,
                      "featureProduct",
                      e.target.checked
                    )
                  }
                  className="hidden"
                />
                <span
                  className={`relative inline-block w-10 h-5 rounded-full transition duration-200 ease-in-out ${
                    variant.featureProduct ? "bg-blue-600" : "bg-gray-300"
                  } after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition after:duration-200 after:ease-in-out ${
                    variant.featureProduct ? "after:translate-x-5" : ""
                  }`}
                ></span>
                <span className="text-sm text-gray-700">Feature Product</span>
              </label>

              <label className="inline-flex items-center cursor-pointer space-x-2">
                <input
                  type="checkbox"
                  checked={variant.bestSeller}
                  onChange={(e) =>
                    handleVariantChange(
                      index,
                      "bestSeller",
                      e.target.checked
                    )
                  }
                  className="hidden"
                />
                <span
                  className={`relative inline-block w-10 h-5 rounded-full transition duration-200 ease-in-out ${
                    variant.bestSeller ? "bg-blue-600" : "bg-gray-300"
                  } after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition after:duration-200 after:ease-in-out ${
                    variant.bestSeller ? "after:translate-x-5" : ""
                  }`}
                ></span>
                <span className="text-sm text-gray-700">Best Seller</span>
              </label>

              <button
                type="button"
                onClick={() => handleRemoveVariant(index)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Remove Variant
              </button>
            </div>
          ))}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleAddVariant}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Add Variant
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;