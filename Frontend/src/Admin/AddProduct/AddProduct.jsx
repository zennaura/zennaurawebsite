import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const navigate = useNavigate(); // ✅ Add this inside your component
  // State to manage success message
  const [success, setSuccess] = useState(false);

  // Product Category
  const [category, setCategory] = useState({
    parent: "",
    sub: "",
    subSub: "",
    category: "",
  });

  // Basic Details
  const [basicDetails, setBasicDetails] = useState({
    name: "",
    title: "",
    description: "",
    sku: "",
  });

  // Concern Tags State
  const [tags, setTags] = useState([]);
  // Intent Tags State
  const [Intenttags, setIntenttags] = useState([]);
  const [tagInput, setTagInput] = useState(""); // New state for tag input

  // Stones Used
  const [stones, setStones] = useState([]);
  const [stoneName, setStoneName] = useState("");
  const [stoneImage, setStoneImage] = useState(null);

  const handleAddStone = async () => {
    if (stoneName.trim() === "" || !stoneImage) {
      alert("Please enter a stone name and select an image.");
      return;
    }

    const imageUrl = await uploadToCloudinary(stoneImage);
    const newStone = {
      title: stoneName,
      image: imageUrl, // Store the Cloudinary URL
    };

    setStones([...stones, newStone]);
    setStoneName(""); // Clear the input field
    setStoneImage(null); // Clear the file input
  };

  const handleRemoveStone = (index) => {
    const updatedStones = stones.filter((_, i) => i !== index);
    setStones(updatedStones);
  };

  // Product Description and Images State
  const [productDescription, setProductDescription] = useState("");
  const [images, setImages] = useState({
    descriptionImage: null,

    otherImages: [],
  });

  // File Upload Handler
  const handleFileUpload = async (event, fieldName) => {
    const files = event.target.files;

    if (fieldName === "otherImages") {
      // For multiple files, upload each file to Cloudinary
      const urls = await Promise.all(
        Array.from(files).map((file) => uploadToCloudinary(file))
      );
      setImages({ ...images, [fieldName]: urls });
    } else {
      // For single files, upload the first file to Cloudinary
      const url = await uploadToCloudinary(files[0]);
      setImages({ ...images, [fieldName]: url });
    }
  };

  // Posters State
  const [posters, setPosters] = useState({
    healing: null,
    benefits: null,
    whyChoose: null,
    waysToClean: null,
    whoWear: null,
    howToWear: null,
  });

  const handlePosterUpload = async (event, fieldName) => {
    const file = event.target.files[0];
    if (!file) return;

    const url = await uploadToCloudinary(file);
    setPosters({ ...posters, [fieldName]: url });
  };

  // Variants
  const [variants, setVariants] = useState([]);

  // Add Variant
  const handleAddVariant = () => {
    setVariants([
      ...variants,
      // In handleAddVariant function:
      {
        variantname: "",
        size: "",
        tax: "",
        salePrice: "",
        discount: "",
        costPrice: "",
        stock: "",
        variantsimages: [], // Changed from 'images' to 'variantsimages'
        frontImage: "",
        backImage: "",
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

  // Remove Variant
  const handleRemoveVariant = () => {
    if (variants.length > 0) {
      const updatedVariants = [...variants];
      updatedVariants.pop();
      setVariants(updatedVariants);
    }
  };

  // Handle Variant Change
  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    if (field.includes(".")) {
      // Handle nested fields like "specifications.material"
      const [parentField, childField] = field.split(".");
      updatedVariants[index][parentField][childField] = value;
    } else {
      updatedVariants[index][field] = value;
    }
    setVariants(updatedVariants);
  };

  // Handle Variant Image Upload
  const handleVariantImageUpload = async (index, event) => {
    const files = Array.from(event.target.files);
    const urls = await Promise.all(files.map(file => uploadToCloudinary(file)));

    const updatedVariants = [...variants];
    // Use 'variantsimages' instead of 'images'
    updatedVariants[index].variantsimages = [...(updatedVariants[index].variantsimages || []), ...urls];
    setVariants(updatedVariants);
  };

  const handleVariantSingleImageUpload = async (index, field, event) => {
    const file = event.target.files[0];
    if (!file) return;

    const url = await uploadToCloudinary(file);
    const updatedVariants = [...variants];
    updatedVariants[index][field] = url;
    setVariants(updatedVariants);
  };

  // Cloudinary Upload Function
  const uploadToCloudinary = async (file, folderName = "products") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    formData.append("folder", folderName);

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/zennaura/image/upload",
      { method: "POST", body: formData }
    );

    if (!response.ok) throw new Error("Failed to upload image to Cloudinary");
    const data = await response.json();
    return data.secure_url; // Return the secure URL of the uploaded image
  };

  // Form Submission Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation (customize as needed)
    if (!basicDetails.description || !basicDetails.sku || variants.length === 0) {
      alert("Please fill in all required fields and add at least one variant.");
      return;
    }

    const productData = {
      parentCategory: category.parent,
      subCategory: category.sub,
      subSubCategory: category.subSub,
      category: category.category,

      title: basicDetails.title,
      description: basicDetails.description,
      sku: basicDetails.sku,

      tags,
      Intenttags,
      stoneUsedImage: stones.map((stone) => ({
        title: stone.title,
        image: stone.image,
      })),

      // Fix: Change 'otherImages' to 'otherimages' to match schema
      otherimages: images.otherImages || [],

      healingImage: posters.healing || null,
      benefits: posters.benefits || null,
      whyChoose: posters.whyChoose || null,
      waysToClean: posters.waysToClean || null,
      whoWear: posters.whoWear || null,
      whereHowWear: posters.howToWear || null,

      productDescriptions: {
        title: productDescription,
        image: images.descriptionImage || null,
      },

      variants: variants.map((variant) => ({
        ...variant,
        variantname: variant.variantname,
        size: Number(variant.size),
        tax: Number(variant.tax),
        salePrice: Number(variant.salePrice),
        discount: Number(variant.discount),
        costPrice: Number(variant.costPrice),
        stock: Number(variant.stock),
        frontImage: variant.frontImage || null,
        backImage: variant.backImage || null,
        variantsimages: variant.variantsimages || [], // Changed from variant.images
      })),
    };
    console.log('Sending Product Data:', productData);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_LINK}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        setSuccess(true); // Show success message
        setTimeout(() => {
          setSuccess(false);
          navigate("/admin-view-products"); // ✅ Navigate after 3 seconds
        }, 3000); // Delay can be adjusted or removed
      } else {
        const errorData = await response.json();
        console.error('Backend Error:', errorData);
        throw new Error(errorData.message || 'Failed to add product.');
      }
    } catch (error) {
      console.error('❌ Error:', error);
      alert('Something went wrong. Check the console for more details.');
    }
  };



  return (
    <div className="bg-gray-50 flex justify-center items-center p-6">
      {success && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 animate-bounce z-50">
          ✅ Product Added Successfully!
        </div>
      )}

      <form
        style={{ padding: "20px" }}
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-8">
        {/* <!-- Product Category --> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2
            className="col-span-full text-xl font-semibold text-gray-800">Product
            Category</h2>
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
            <span className="text-gray-700">Category</span>
            <input
              type="text"
              value={category.sub}
              onChange={(e) =>
                setCategory({ ...category, sub: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Sub Category</span>
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
            <span className="text-gray-700">SubSub Category</span>
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

        {/* <!-- Basic Details --> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 className="col-span-full text-xl font-semibold text-gray-800">
            Basic Details
          </h2>

          {/* Product Name */}
          {/* <label className="block">
            <span className="text-gray-700">Product Name</span>
            <input
              type="text"
              value={basicDetails.name}
              onChange={(e) =>
                setBasicDetails({ ...basicDetails, name: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </label> */}

          {/* Product Description */}
          <label className="block">
            <span className="text-gray-700">Product Description</span>
            <textarea
              value={basicDetails.description}
              onChange={(e) =>
                setBasicDetails({ ...basicDetails, description: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-24" // Adjust height as needed
              rows={4} // Optional: Sets the number of visible rows
              placeholder="Enter product description..."
            />
          </label>

          {/* Product Title */}
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

          {/* Product SKU */}
          <label className="block">
            <span className="text-gray-700">Product SKU</span>
            <input
              type="text"
              value={basicDetails.sku}
              onChange={(e) =>
                setBasicDetails({ ...basicDetails, sku: e.target.value })
              }
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </label>
        </div>
        {/* <!-- Concern Tags --> */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Product Concern Tags</h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Tag Input Field */}
            <input
              type="text"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim() !== '') {
                  setTags([...tags, e.target.value.trim()]);
                  e.target.value = ''; // Clear the input field
                }
              }}
              placeholder="Enter a tag"
              className="flex-1 border border-gray-300 rounded-md p-2 md:p-3 text-sm md:text-base"
            />

            {/* Add Tag Button */}
            <button
              type="button"
              onClick={() => {
                const inputField = document.querySelector('input[placeholder="Enter a tag"]');
                if (inputField && inputField.value.trim() !== '') {
                  setTags([...tags, inputField.value.trim()]);
                  inputField.value = ''; // Clear the input field
                }
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm md:text-base"
            >
              Add
            </button>
          </div>

          {/* List of Added Tags */}
          <div id="tagList" className="mt-2 flex gap-2 flex-wrap">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full flex items-center gap-2"
              >
                {tag} {/* Display the tag */}
                <button
                  type="button"
                  onClick={() => {
                    setTags(tags.filter((_, i) => i !== index)); // Remove the tag
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>
        {/* <!--Intent  Tags --> */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Product Intent Tags</h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Tag Input Field (Controlled) */}
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && tagInput.trim() !== '') {
                  setIntenttags([...Intenttags, tagInput.trim()]);
                  setTagInput(""); // Clear input using state
                }
              }}
              placeholder="Enter a tag"
              className="flex-1 border border-gray-300 rounded-md p-2 md:p-3 text-sm md:text-base"
            />

            {/* Add Tag Button */}
            <button
              type="button"
              onClick={() => {
                if (tagInput.trim() !== '') {
                  setIntenttags([...Intenttags, tagInput.trim()]);
                  setTagInput(""); // Clear input using state
                }
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm md:text-base"
            >
              Add
            </button>
          </div>

          {/* List of Added Tags */}
          <div id="tagList" className="mt-2 flex gap-2 flex-wrap">
            {Intenttags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => {
                    setIntenttags(Intenttags.filter((_, i) => i !== index));
                  }}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>
        {/* <!-- Stone Used --> */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Stone Used</h2>
          <div className="flex flex-col gap-2">
            {/* Stone Name Input */}
            <input
              type="text"
              value={stoneName}
              onChange={(e) => setStoneName(e.target.value)}
              placeholder="Enter stone name"
              className="border border-gray-300 rounded-md p-2"
            />

            {/* Stone Image Upload */}
            <input
              type="file"
              onChange={(e) => setStoneImage(e.target.files[0])}
              className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-600"
            />

            {/* Add Stone Button */}
            <button
              type="button"
              onClick={handleAddStone}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-fit"
            >
              Add Stone
            </button>
          </div>

          {/* List of Added Stones */}
          <div id="stoneList" className="mt-2 flex gap-2 flex-wrap">
            {stones.map((stone, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full flex items-center gap-2"
              >
                {stone.title} {/* Display the stone name */}
                <button
                  type="button"
                  onClick={() => handleRemoveStone(index)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* <!-- Description & Images --> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Description */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Product Description</h2>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Enter product description"
              className="mb-2 block w-full border border-gray-300 rounded-md p-2"
              rows={4}
            />
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, 'descriptionImage')}
              className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-600"
            />
          </div>

          {/* Product Images */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Product Common Images</h2>



            {/* Other Images */}
            <label className="block mb-2">Other Images</label>
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, 'otherImages')}
              className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-600"
              multiple
            />
          </div>
        </div>

        {/* <!-- Posters --> */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Posters</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* Healing Poster */}
            <div className="flex flex-col items-center space-y-2">
              <label htmlFor="healing" className="text-sm font-medium text-gray-700">
                Healing
              </label>
              <input
                type="file"
                id="healing"
                onChange={(e) => handlePosterUpload(e, 'healing')}
                className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-600"
              />
            </div>

            {/* Benefits Poster */}
            <div className="flex flex-col items-center space-y-2">
              <label htmlFor="benefits" className="text-sm font-medium text-gray-700">
                Benefits
              </label>
              <input
                type="file"
                id="benefits"
                onChange={(e) => handlePosterUpload(e, 'benefits')}
                className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-600"
              />
            </div>

            {/* Why Choose Poster */}
            <div className="flex flex-col items-center space-y-2">
              <label htmlFor="why-choose" className="text-sm font-medium text-gray-700">
                Why Choose
              </label>
              <input
                type="file"
                id="why-choose"
                onChange={(e) => handlePosterUpload(e, 'whyChoose')}
                className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-600"
              />
            </div>

            {/* Ways to Clean Poster */}
            <div className="flex flex-col items-center space-y-2">
              <label htmlFor="ways-to-clean" className="text-sm font-medium text-gray-700">
                Ways to Clean
              </label>
              <input
                type="file"
                id="ways-to-clean"
                onChange={(e) => handlePosterUpload(e, 'waysToClean')}
                className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-600"
              />
            </div>

            {/* Who Wear Poster */}
            <div className="flex flex-col items-center space-y-2">
              <label htmlFor="who-wear" className="text-sm font-medium text-gray-700">
                Who Wear
              </label>
              <input
                type="file"
                id="who-wear"
                onChange={(e) => handlePosterUpload(e, 'whoWear')}
                className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-600"
              />
            </div>

            {/* How to Wear Poster */}
            <div className="flex flex-col items-center space-y-2">
              <label htmlFor="how-to-wear" className="text-sm font-medium text-gray-700">
                How to Wear
              </label>
              <input
                type="file"
                id="how-to-wear"
                onChange={(e) => handlePosterUpload(e, 'howToWear')}
                className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-600"
              />
            </div>
          </div>
        </div>

        {/* <!-- Variants --> */}
        <div
          style={{ padding: "10px", marginTop: "20px" }}

          className="space-y-4 border-t pt-4">
          <h2 className="text-xl font-semibold text-gray-800">Variants</h2>

          {/* Render Each Variant Dynamically */}
          {variants.map((variant, index) => (
            <div key={index} className="border p-4 rounded-md space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Variant name  */}
                <input
                  type="text"
                  value={variant.variantname}
                  onChange={(e) =>
                    handleVariantChange(index, 'variantname', e.target.value)
                  }
                  placeholder="Varient Name"
                  className="border border-gray-300 rounded-md p-2"
                />
                {/* Size */}
                <input
                  type="number"
                  value={variant.size}
                  onChange={(e) =>
                    handleVariantChange(index, 'size', e.target.value)
                  }
                  placeholder="Size in mm"
                  className="border border-gray-300 rounded-md p-2"
                />
                {/* Tax */}
                <input
                  type="number"
                  value={variant.tax}
                  onChange={(e) =>
                    handleVariantChange(index, 'tax', e.target.value)
                  }
                  placeholder="Tax on product"
                  className="border border-gray-300 rounded-md p-2"
                />

                {/* Sale Price */}
                <input
                  type="number"
                  value={variant.salePrice}
                  onChange={(e) =>
                    handleVariantChange(index, 'salePrice', e.target.value)
                  }
                  placeholder="Sale Price"
                  className="border border-gray-300 rounded-md p-2"
                />

                {/* Discount */}
                <input
                  type="number"
                  value={variant.discount}
                  onChange={(e) =>
                    handleVariantChange(index, 'discount', e.target.value)
                  }
                  placeholder="Discount"
                  className="border border-gray-300 rounded-md p-2"
                />

                {/* Cost Price */}
                <input
                  type="number"
                  value={variant.costPrice}
                  onChange={(e) =>
                    handleVariantChange(index, 'costPrice', e.target.value)
                  }
                  placeholder="Cost Price"
                  className="border border-gray-300 rounded-md p-2"
                />

                {/* Stock */}
                <input
                  type="number"
                  value={variant.stock}
                  onChange={(e) =>
                    handleVariantChange(index, 'stock', e.target.value)
                  }
                  placeholder="Stock"
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Variant Images */}
              <div className="my-5">
                {/* Front Image */}
                <label className="block mb-2">Product Front Image</label>
                <input
                  type="file"
                  onChange={(e) => handleVariantSingleImageUpload(index, 'frontImage', e)}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-600"
                />

                {/* Back Image */}
                <label className="block mb-2">Product Back Image</label>
                <input
                  type="file"
                  onChange={(e) => handleVariantSingleImageUpload(index, 'backImage', e)}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-600"
                />
                {/* Varient Image */}
                <label className="block mb-1">Variant Image (max 2)</label>
                {/* Variant Images (multiple) */}
                <input
                  type="file"
                  onChange={(e) => handleVariantImageUpload(index, e)}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-500 file:border-0 file:bg-blue-600 file:text-white file:rounded-md file:p-2 hover:file:bg-blue-700"
                  accept="image/*"
                  multiple
                />
              </div>

              {/* Specifications */}
              <div style={{ padding: "20px" }} className="grid grid-cols-2 mb-5 mt-5 pt-5 md:grid-cols-3 gap-4">
                {/* Material */}
                <input
                  type="text"
                  value={variant.specifications.material}
                  onChange={(e) =>
                    handleVariantChange(
                      index,
                      'specifications.material',
                      e.target.value
                    )
                  }
                  placeholder="Material"
                  className="border border-gray-300 rounded-md p-2"
                />
                {/* beadSize */}
                <input
                  type="text"
                  value={variant.specifications.beadSize}
                  onChange={(e) =>
                    handleVariantChange(
                      index,
                      'specifications.beadSize',
                      e.target.value
                    )
                  }
                  placeholder="Bead Size"
                  className="border border-gray-300 rounded-md p-2"
                />

                {/* Product Type */}
                <input
                  type="text"
                  value={variant.specifications.productType}
                  onChange={(e) =>
                    handleVariantChange(
                      index,
                      'specifications.productType',
                      e.target.value
                    )
                  }
                  placeholder="Product Type"
                  className="border border-gray-300 rounded-md p-2"
                />

                {/* Size */}
                <input
                  type="text"
                  value={variant.specifications.size}
                  onChange={(e) =>
                    handleVariantChange(index, 'specifications.size', e.target.value)
                  }
                  placeholder="Size"
                  className="border border-gray-300 rounded-md p-2"
                />

                {/* Color */}
                <input
                  type="text"
                  value={variant.specifications.color}
                  onChange={(e) =>
                    handleVariantChange(index, 'specifications.color', e.target.value)
                  }
                  placeholder="Color"
                  className="border border-gray-300 rounded-md p-2"
                />
                {/* Weight */}
                <input
                  type="text"
                  value={variant.specifications.weight}
                  onChange={(e) =>
                    handleVariantChange(index, 'specifications.weight', e.target.value)
                  }
                  placeholder="Weight"
                  className="border border-gray-300 rounded-md p-2"
                />
                {/* Packaging */}
                <input
                  type="text"
                  value={variant.specifications.packaging}
                  onChange={(e) =>
                    handleVariantChange(
                      index,
                      'specifications.packaging',
                      e.target.value
                    )
                  }
                  placeholder="Packaging"
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Feature Product Toggle */}
              <label className="inline-flex items-center cursor-pointer my-4 space-x-2">
                <input
                  type="checkbox"
                  checked={variant.featureProduct}
                  onChange={(e) =>
                    handleVariantChange(index, 'featureProduct', e.target.checked)
                  }
                  className="hidden"
                />
                <span
                  className={`relative inline-block w-10 h-5 rounded-full transition duration-200 ease-in-out ${variant.featureProduct ? 'bg-blue-600' : 'bg-gray-300'
                    } after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition after:duration-200 after:ease-in-out ${variant.featureProduct ? 'after:translate-x-5' : ''
                    }`}
                ></span>
                <span className="text-sm text-gray-700">Feature Product</span>
              </label>

              {/* Best Seller Toggle */}
              <label className="inline-flex items-center cursor-pointer space-x-2">
                <input
                  type="checkbox"
                  checked={variant.bestSeller}
                  onChange={(e) =>
                    handleVariantChange(index, 'bestSeller', e.target.checked)
                  }
                  className="hidden"
                />
                <span
                  className={`relative inline-block w-10 h-5 rounded-full transition duration-200 ease-in-out ${variant.bestSeller ? 'bg-blue-600' : 'bg-gray-300'
                    } after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition after:duration-200 after:ease-in-out ${variant.bestSeller ? 'after:translate-x-5' : ''
                    }`}
                ></span>
                <span className="text-sm text-gray-700">Best Seller</span>
              </label>
            </div>
          ))}

          {/* Add Variant Button */}
          <button
            type="button"
            style={{ padding: "10px" }}
            onClick={handleAddVariant}
            className="bg-green-600 text-white px-4 py-2  rounded-md hover:bg-green-700"
          >
            Add Variant
          </button>

          {/* Remove Variant Button */}
          <button
            type="button"
            style={{ padding: "10px", marginLeft: "10px" }}

            onClick={handleRemoveVariant}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Remove Variant
          </button>
        </div>
        {/* <!-- Submit Button --> */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
        >
          Add Product
        </button>

      </form>

    </div>
  )
}

export default AddProduct
