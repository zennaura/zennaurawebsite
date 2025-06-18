import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../../components/AuthContext/AuthContext";

const UpdateProduct = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const productData = location.state?.product;
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Cloudinary configuration
  const CLOUD_NAME = "zennaura";
  const UPLOAD_PRESET = "ml_default";

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
  const [Intenttags, setIntenttags] = useState([]);
  const [Chakratags, setChakratags] = useState([]);

  const [stoneName, setStoneName] = useState("");
  const [stoneImage, setStoneImage] = useState(null);
  const [stones, setStones] = useState([]);
  const [productDescription, setProductDescription] = useState("");
  const [healingFirst, setHealingFirst] = useState("");
  const [healingSecond, setHealingSecond] = useState("");
  const [healingThird, setHealingThird] = useState("");
  const [healingFourth, setHealingFourth] = useState("");

  const [images, setImages] = useState({
    descriptionImage: null,
    otherimages: [],
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
        category: productData.category || "",
      });

      setBasicDetails({
        name: productData.name || "",
        title: productData.title || "",
        description: productData.description || "",
        sku: productData.sku || "",
      });

      setTags(Array.isArray(productData.tags) ? productData.tags : []);
      setIntenttags(
        Array.isArray(productData.Intenttags) ? productData.Intenttags : []
      );
      setChakratags(Array.isArray(productData.Chakratags) ? productData.Chakratags : [])
      setStones(
        Array.isArray(productData.stoneUsedImage)
          ? productData.stoneUsedImage
          : []
      );
      setProductDescription(productData.productDescriptions?.title || "");
      setHealingFirst(productData.healingProperties?.first || "");
      setHealingSecond(productData.healingProperties?.second || "");
      setHealingThird(productData.healingProperties?.third || "");
      setHealingFourth(productData.healingProperties?.fourth || "");

      setImages({
        descriptionImage: productData.productDescriptions?.image || null,
        otherimages: Array.isArray(productData.otherimages)
          ? productData.otherimages
          : [],
      });

      setPosters({
        healing: productData.healingImage || null,
        benefits: productData.benefits || null,
        whyChoose: productData.whyChoose || null,
        waysToClean: productData.waysToClean || null,
        whoWear: productData.whoWear || null,
        howToWear: productData.whereHowWear || null,
      });

      setVariants(
        Array.isArray(productData.variants)
          ? productData.variants.map((v) => ({
              ...v,
              variantname: String(v.variantname || ""),
              size: String(v.size || ""),
              tax: String(v.tax || ""),
              salePrice: String(v.salePrice || ""),
              discount: String(v.discount || ""),
              costPrice: String(v.costPrice || ""),
              stock: String(v.stock || ""),
              frontImage: v.frontImage || null,
              backImage: v.backImage || null,
              images: Array.isArray(v.variantsimages) ? v.variantsimages : [],
              specifications: {
                material: v.specifications?.material || "",
                productType: v.specifications?.productType || "",
                beadSize: v.specifications?.beadSize || "",
                size: v.specifications?.size || "",
                color: v.specifications?.color || "",
                weight: v.specifications?.weight || "",
                packaging: v.specifications?.packaging || "",
              },
              featureProduct: Boolean(v.featureProduct),
              bestSeller: Boolean(v.bestSeller),
            }))
          : []
      );

      setLoading(false);
    } else {
      setError("No product data received");
      setLoading(false);
      navigate("/admin-view-products");
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
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_LINK}/api/cloudnaryimg/delete-img`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl: url }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend deletion error:", errorData);
        return {
          success: false,
          error: errorData.error || "Failed to delete image",
        };
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

      if (fieldName === "otherimages") {
        // Upload new images first
        const urls = await Promise.all(
          Array.from(files).map((file) => uploadToCloudinary(file))
        );
        // Only after successful upload, delete old images
        if (images.otherimages && images.otherimages.length > 0) {
          await Promise.all(
            images.otherimages.map((url) =>
              deleteFromCloudinary(url).catch((e) => null)
            )
          );
        }
        setImages({ ...images, [fieldName]: urls });
      } else {
        // Upload new image first
        const url = await uploadToCloudinary(files[0]);
        // Only after successful upload, delete old image
        if (images[fieldName]) {
          await deleteFromCloudinary(images[fieldName]).catch((e) => null);
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
        await deleteFromCloudinary(posters[fieldName]).catch((e) => null);
      }
      setPosters({ ...posters, [fieldName]: url });
    } catch (error) {
      console.error("Poster upload error:", error);
      setError("Failed to upload poster. Please try again.");
    }
  };

  // Variant handlers
  const handleAddVariant = () => {
    // In the useEffect initialization:
    setVariants((prevVariants) => [
      ...prevVariants,
      {
        variantname: "",
        size: "",
        tax: "",
        salePrice: "",
        discount: "",
        costPrice: "",
        stock: "",
        frontImage: null,
        backImage: null,
        variantsimages: [],
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
      const files = Array.from(event.target.files); // Limit to 2 images
      if (files.length === 0) return;

      // Upload new images first
      const urls = await Promise.all(files.map(uploadToCloudinary));

      // Get old images for cleanup
      const oldImages = variants[index].variantsimages || [];

      // Update state with new images
      const updatedVariants = [...variants];
      updatedVariants[index].variantsimages = urls;
      setVariants(updatedVariants);

      // Clean up old images (fire and forget)
      if (oldImages.length > 0) {
        Promise.all(
          oldImages.map((url) => deleteFromCloudinary(url).catch((e) => null))
        );
      }
    } catch (error) {
      console.error("Variant image upload error:", error);
      setError("Failed to upload variant images. Please try again.");
    }
  };

  // Remove image from otherimages
  const handleRemoveOtherImage = async (index) => {
    try {
      const imageUrl = images.otherimages[index];
      if (imageUrl) {
        await deleteFromCloudinary(imageUrl);
      }
      const updatedImages = [...images.otherimages];
      updatedImages.splice(index, 1);
      setImages({ ...images, otherimages: updatedImages });
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

    if (
      !basicDetails.description ||
      !basicDetails.sku ||
      variants.length === 0
    ) {
      alert("Please fill in all required fields and add at least one variant.");
      return;
    }

    const updatedProductData = {
      parentCategory: category.parent,
      subCategory: category.sub,
      subSubCategory: category.subSub,
      category: category.category,

      // name: basicDetails.name,
      title: basicDetails.title,
      description: basicDetails.description,
      sku: basicDetails.sku,

      tags,
      Intenttags,
      Chakratags,
      stoneUsedImage: stones,

      otherimages: images.otherimages,

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
      healingProperties: {
        first: healingFirst,
        second: healingSecond,
        third: healingThird,
        fourth: healingFourth,
      },
      variants: variants.map((variant) => ({
        ...variant,
        size: Number(variant.size),
        tax: Number(variant.tax),
        salePrice: Number(variant.salePrice),
        discount: Number(variant.discount),
        costPrice: Number(variant.costPrice),
        stock: Number(variant.stock),
        variantsimages: variant.variantsimages || [], // Fixed field name
        specifications: variant.specifications,
        featureProduct: variant.featureProduct,
        bestSeller: variant.bestSeller,
      })),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_LINK}/api/products/${productData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProductData),
        }
      );

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

  if (user?.userRole !== "admin") {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-700 mb-4">
            This page is not accessible by you.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-50 flex justify-center items-center !p-6">
      {success && (
        <div className="fixed top-5 !left-1/2 transform !-translate-x-1/2 bg-green-500 text-white !px-6 !py-3 rounded-lg shadow-lg transition-all duration-300 animate-bounce z-50">
          ✅ Product Updated Successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="!max-w-4xl !mx-auto bg-white shadow-lg rounded-xl !p-8 !space-y-8"
      >
        {/* Product Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 !gap-4">
          <h2 className="col-span-full !text-xl font-semibold text-gray-800">
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
              className="!mt-1 block !w-full border border-gray-300 rounded-md !p-2"
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
              className="!mt-1 block !w-full border border-gray-300 rounded-md !p-2"
            />
          </label>
          <label className="block">
            <span className="text-gray-700">Sub Category</span>
            <input
              type="text"
              value={category.sub}
              onChange={(e) =>
                setCategory({ ...category, sub: e.target.value })
              }
              className="!mt-1 block !w-full border border-gray-300 rounded-md !p-2"
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
              className="!mt-1 block !w-full border border-gray-300 rounded-md !p-2"
            />
          </label>
        </div>

        {/* Basic Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <h2 className="col-span-full !text-xl font-semibold text-gray-800">
            Basic Details
          </h2>

          {/* <label className="block">
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
          </label> */}

          <label className="block">
            <span className="text-gray-700">Product Description</span>
            <input
              type="text"
              value={basicDetails.description}
              onChange={(e) =>
                setBasicDetails({
                  ...basicDetails,
                  description: e.target.value,
                })
              }
              className="!mt-1 block !w-full border border-gray-300 rounded-md !p-2"
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
              className="!mt-1 block !w-full border border-gray-300 rounded-md !p-2"
            />
          </label>

          {/* <label className="block">
            <span className="text-gray-700">Product SKU</span>
            <input
              type="text"
              value={basicDetails.sku}
              onChange={(e) =>
                setBasicDetails({ ...basicDetails, sku: e.target.value })
              }
              className="!mt-1 block !w-full border border-gray-300 rounded-md !p-2"
              required
            />
          </label> */}
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 !mb-2">
            Product Chakra Tags
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim() !== "") {
                  setChakratags([...Chakratags, e.target.value.trim()]);
                  e.target.value = "";
                }
              }}
              placeholder="Enter a tag"
              className="flex-1 border border-gray-300 rounded-md !p-2 md:!p-3 !text-sm md:text-base"
            />

            <button
              type="button"
              onClick={() => {
                const inputField = document.querySelector(
                  'input[placeholder="Enter a tag"]'
                );
                if (inputField && inputField.value.trim() !== "") {
                  setChakratags([...Chakratags, inputField.value.trim()]);
                  inputField.value = "";
                }
              }}
              className="bg-blue-600 text-white !px-4 !py-2 rounded-md hover:bg-blue-700 !text-sm md:text-base"
            >
              Add
            </button>
          </div>

          <div id="tagList" className="!mt-2 flex !gap-2 flex-wrap">
            {Chakratags.map((Chakratag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium !mr-2 !px-2.5 !py-0.5 rounded-full flex items-center gap-2"
              >
                {Chakratag}
                <button
                  type="button"
                  onClick={() => {
                    setChakratags(Chakratags.filter((_, i) => i !== index));
                  }}
                  className="bg-red-500 text-white !px-2 !py-1 rounded-md hover:bg-red-600"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>


        {/*Concern Tags */}
        {/* <div>
          <h2 className="!text-xl font-semibold text-gray-800 !mb-2">
            Product Concern Tags
          </h2>
          <div className="flex flex-col md:flex-row items-center !gap-4">
            <input
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim() !== "") {
                  setTags([...tags, e.target.value.trim()]);
                  e.target.value = "";
                }
              }}
              placeholder="Enter a tag"
              className="flex-1 border border-gray-300 rounded-md !p-2 md:!p-3 !text-sm md:text-base"
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
              className="bg-blue-600 text-white !px-4 !py-2 rounded-md hover:bg-blue-700 !text-sm md:text-base"
            >
              Add
            </button>
          </div>

          <div id="tagList" className="!mt-2 flex !gap-2 flex-wrap">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium !mr-2 !px-2.5 !py-0.5 rounded-full flex items-center !gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => {
                    setTags(tags.filter((_, i) => i !== index));
                  }}
                  className="bg-red-500 text-white !px-2 !py-1 rounded-md hover:bg-red-600"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div> */}

        {/*Intent Tags */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 !mb-2">
            Product Intent Tags
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim() !== "") {
                  setIntenttags([...Intenttags, e.target.value.trim()]);
                  e.target.value = "";
                }
              }}
              placeholder="Enter a tag"
              className="flex-1 border border-gray-300 rounded-md !p-2 md:!p-3 !text-sm md:text-base"
            />

            <button
              type="button"
              onClick={() => {
                const inputField = document.querySelector(
                  'input[placeholder="Enter a tag"]'
                );
                if (inputField && inputField.value.trim() !== "") {
                  setIntenttags([...Intenttags, inputField.value.trim()]);
                  inputField.value = "";
                }
              }}
              className="bg-blue-600 text-white !px-4 !py-2 rounded-md hover:bg-blue-700 !text-sm md:text-base"
            >
              Add
            </button>
          </div>

          <div id="tagList" className="!mt-2 flex !gap-2 flex-wrap">
            {Intenttags.map((Intenttag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-sm font-medium !mr-2 !px-2.5 !py-0.5 rounded-full flex items-center gap-2"
              >
                {Intenttag}
                <button
                  type="button"
                  onClick={() => {
                    setIntenttags(Intenttags.filter((_, i) => i !== index));
                  }}
                  className="bg-red-500 text-white !px-2 !py-1 rounded-md hover:bg-red-600"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Stone Used */}
        <div>
          <h2 className="!text-xl font-semibold text-gray-800 !mb-2">
            Stone Used
          </h2>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={stoneName}
              onChange={(e) => setStoneName(e.target.value)}
              placeholder="Enter stone name"
              className="border border-gray-300 rounded-md !p-2"
            />

            <input
              type="file"
              onChange={(e) => setStoneImage(e.target.files[0])}
              className="!w-full border border-gray-300 rounded-md !p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:!p-2 hover:file:bg-blue-600"
            />

            <button
              type="button"
              onClick={handleAddStone}
              className="bg-blue-600 text-white !px-4 1py-2 rounded-md hover:bg-blue-700 !w-fit"
            >
              Add Stone
            </button>
          </div>

          <div id="stoneList" className="!mt-2 flex 1gap-2 flex-wrap">
            {stones.map((stone, index) => (
              <div
                key={index}
                className="flex items-center !gap-2 bg-blue-100 rounded-full !px-3 !py-1"
              >
                {stone.image && (
                  <img
                    src={stone.image}
                    alt={stone.title}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}
                <span className="text-blue-800 !text-sm font-medium">
                  {stone.title}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveStone(index)}
                  className="bg-red-500 text-white !px-2 !py-1 rounded-md hover:bg-red-600 !text-xs"
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
            <h2 className="!text-xl font-semibold text-gray-800 !mb-2">
              Product Description
            </h2>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Enter product description"
              className="!mb-2 block w-full border border-gray-300 rounded-md !p-2"
              rows={4}
            />
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, "descriptionImage")}
              className="w-full border border-gray-300 rounded-md !p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:!p-2 hover:file:bg-blue-600"
            />
            {images.descriptionImage && (
              <div className="!mt-2 flex items-center gap-2">
                <img
                  src={images.descriptionImage}
                  alt="Description"
                  className="!h-20 object-contain"
                />
                <button
                  type="button"
                  onClick={() =>
                    setImages({ ...images, descriptionImage: null })
                  }
                  className="bg-red-500 text-white !px-2 !py-1 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          {/* Product Images */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 !mb-2">
              Product Common Images
            </h2>

            {/* Other Images */}
            <label className="block !mb-2 !mt-4">Other Images</label>
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, "otherimages")}
              className="!w-full border border-gray-300 rounded-md !p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:!p-2 hover:file:bg-blue-600"
              multiple
            />
            <div className="flex flex-wrap gap-2 !mt-2">
              {images.otherimages?.map((img, index) => (
                <div key={index} className="relative flex items-center gap-2">
                  <img
                    src={img}
                    alt={`Product ${index}`}
                    className="h-20 object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveOtherImage(index)}
                    className="bg-red-500 text-white !px-2 !py-1 rounded-md hover:bg-red-600"
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 !mb-2 !mt-3">
            Healing Properties
          </h2>

          <textarea
            value={healingFirst}
            onChange={(e) => setHealingFirst(e.target.value)}
            placeholder="Enter first box"
            className="!mb-2 block w-full border border-gray-300 rounded-md !p-2"
            // rows={4}
          />
          <textarea
            value={healingSecond}
            onChange={(e) => setHealingSecond(e.target.value)}
            placeholder="Enter second box"
            className="!mb-2 block w-full border border-gray-300 rounded-md !p-2"
            // rows={4}
          />
          <textarea
            value={healingThird}
            onChange={(e) => setHealingThird(e.target.value)}
            placeholder="Enter third box"
            className="!mb-2 block w-full border border-gray-300 rounded-md !p-2"
            // rows={4}
          />
          <textarea
            value={healingFourth}
            onChange={(e) => setHealingFourth(e.target.value)}
            placeholder="Enter fourth box"
            className="!mb-2 block w-full border border-gray-300 rounded-md !p-2"
            // rows={4}
          />
        </div>

        {/* Posters */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 !mb-2">Posters</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="flex flex-col items-center !space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Healing
              </label>
              <input
                type="file"
                onChange={(e) => handlePosterUpload(e, "healing")}
                className="!w-full border border-gray-300 rounded-md !p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:!p-2 hover:file:bg-blue-600"
              />
              {posters.healing && (
                <div className="flex items-center gap-2">
                  <img
                    src={posters.healing}
                    alt="Healing"
                    className="!h-16 object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setPosters({ ...posters, healing: null })}
                    className="bg-red-500 text-white !px-2 !py-1 rounded-md hover:bg-red-600"
                  >
                    x
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center !space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Benefits
              </label>
              <input
                type="file"
                onChange={(e) => handlePosterUpload(e, "benefits")}
                className="w-full border border-gray-300 rounded-md !p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:!p-2 hover:file:bg-blue-600"
              />
              {posters.benefits && (
                <div className="flex items-center gap-2">
                  <img
                    src={posters.benefits}
                    alt="Benefits"
                    className="!h-16 object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setPosters({ ...posters, benefits: null })}
                    className="bg-red-500 text-white !px-2 !py-1 rounded-md hover:bg-red-600"
                  >
                    x
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center !space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Why Choose
              </label>
              <input
                type="file"
                onChange={(e) => handlePosterUpload(e, "whyChoose")}
                className="!w-full border border-gray-300 rounded-md !p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:!p-2 hover:file:bg-blue-600"
              />
              {posters.whyChoose && (
                <div className="flex items-center gap-2">
                  <img
                    src={posters.whyChoose}
                    alt="Why Choose"
                    className="!h-16 object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setPosters({ ...posters, whyChoose: null })}
                    className="bg-red-500 text-white !px-2 !py-1 rounded-md hover:bg-red-600"
                  >
                    x
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Ways to Clean
              </label>
              <input
                type="file"
                onChange={(e) => handlePosterUpload(e, "waysToClean")}
                className="!w-full border border-gray-300 rounded-md !p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:!p-2 hover:file:bg-blue-600"
              />
              {posters.waysToClean && (
                <div className="flex items-center gap-2">
                  <img
                    src={posters.waysToClean}
                    alt="Ways to Clean"
                    className="!h-16 object-contain"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setPosters({ ...posters, waysToClean: null })
                    }
                    className="bg-red-500 text-white !px-2 !py-1 rounded-md hover:bg-red-600"
                  >
                    x
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Who Wear
              </label>
              <input
                type="file"
                onChange={(e) => handlePosterUpload(e, "whoWear")}
                className="!w-full border border-gray-300 rounded-md !p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:!p-2 hover:file:bg-blue-600"
              />
              {posters.whoWear && (
                <div className="flex items-center gap-2">
                  <img
                    src={posters.whoWear}
                    alt="Who Wear"
                    className="!h-16 object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setPosters({ ...posters, whoWear: null })}
                    className="bg-red-500 text-white !px-2 !py-1 rounded-md hover:bg-red-600"
                  >
                    x
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center !space-y-2">
              <label className="text-sm font-medium text-gray-700">
                How to Wear
              </label>
              <input
                type="file"
                onChange={(e) => handlePosterUpload(e, "howToWear")}
                className="!w-full border border-gray-300 rounded-md !p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:!p-2 hover:file:bg-blue-600"
              />
              {posters.howToWear && (
                <div className="flex items-center gap-2">
                  <img
                    src={posters.howToWear}
                    alt="How to Wear"
                    className="!h-16 object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setPosters({ ...posters, howToWear: null })}
                    className="bg-red-500 text-white !px-2 !py-1 rounded-md hover:bg-red-600"
                  >
                    x
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Variants */}
        <div className="!space-y-4 !border-t !pt-4">
          <h2 className="text-xl font-semibold text-gray-800">Variants</h2>

          {variants.map((variant, index) => (
            <div key={index} className="border !p-4 rounded-md !space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Variant name  */}
                <input
                  type="text"
                  value={variant.variantname}
                  onChange={(e) =>
                    handleVariantChange(index, "variantname", e.target.value)
                  }
                  placeholder="Varient Name"
                  className="border border-gray-300 rounded-md !p-2"
                />
                {/* <input
                  type="number"
                  value={variant.size}
                  onChange={(e) =>
                    handleVariantChange(index, "size", e.target.value)
                  }
                  placeholder="Size"
                  className="border border-gray-300 rounded-md !p-2"
                /> */}
                {/* Tax */}
                <input
                  type="number"
                  value={variant.tax}
                  onChange={(e) =>
                    handleVariantChange(index, "tax", e.target.value)
                  }
                  placeholder="Tax on product"
                  className="border border-gray-300 rounded-md !p-2"
                />
                <input
                  type="number"
                  value={variant.salePrice}
                  onChange={(e) =>
                    handleVariantChange(index, "salePrice", e.target.value)
                  }
                  placeholder="Sale Price"
                  className="border border-gray-300 rounded-md !p-2"
                />

                <input
                  type="number"
                  value={variant.discount}
                  onChange={(e) =>
                    handleVariantChange(index, "discount", e.target.value)
                  }
                  placeholder="Discount"
                  className="border border-gray-300 rounded-md !p-2"
                />

                <input
                  type="number"
                  value={variant.costPrice}
                  onChange={(e) =>
                    handleVariantChange(index, "costPrice", e.target.value)
                  }
                  placeholder="M.R.P"
                  className="border border-gray-300 rounded-md !p-2"
                />

                <input
                  type="number"
                  value={variant.stock}
                  onChange={(e) =>
                    handleVariantChange(index, "stock", e.target.value)
                  }
                  placeholder="Stock"
                  className="border border-gray-300 rounded-md !p-2"
                />
              </div>

              {/* Front Image */}
              <div className="!my-5">
                <label className="block !mb-1">Front Image</label>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      uploadToCloudinary(file).then((url) => {
                        const updatedVariants = [...variants];
                        if (updatedVariants[index].frontImage) {
                          deleteFromCloudinary(
                            updatedVariants[index].frontImage
                          );
                        }
                        updatedVariants[index].frontImage = url;
                        setVariants(updatedVariants);
                      });
                    }
                  }}
                  className="!w-full border border-gray-300 rounded-md !p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:!p-2 hover:file:bg-blue-600"
                />
                {variant.frontImage && (
                  <div className="!mt-2 flex items-center gap-2">
                    <img
                      src={variant.frontImage}
                      alt="Front"
                      className="!h-20 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedVariants = [...variants];
                        deleteFromCloudinary(updatedVariants[index].frontImage);
                        updatedVariants[index].frontImage = null;
                        setVariants(updatedVariants);
                      }}
                      className="bg-red-500 text-white !px-2 !py-1 rounded-md hover:bg-red-600"
                    >
                      x
                    </button>
                  </div>
                )}
              </div>

              {/* Back Image */}
              <div className="!my-5">
                <label className="block !mb-1">Back Image</label>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      uploadToCloudinary(file).then((url) => {
                        const updatedVariants = [...variants];
                        if (updatedVariants[index].backImage) {
                          deleteFromCloudinary(
                            updatedVariants[index].backImage
                          );
                        }
                        updatedVariants[index].backImage = url;
                        setVariants(updatedVariants);
                      });
                    }
                  }}
                  className="!w-full border border-gray-300 rounded-md !p-2 text-sm text-gray-500 file:border-0 file:bg-blue-500 file:text-white file:rounded-md file:!p-2 hover:file:bg-blue-600"
                />
                {variant.backImage && (
                  <div className="!mt-2 flex items-center gap-2">
                    <img
                      src={variant.backImage}
                      alt="Back"
                      className="!h-20 object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedVariants = [...variants];
                        deleteFromCloudinary(updatedVariants[index].backImage);
                        updatedVariants[index].backImage = null;
                        setVariants(updatedVariants);
                      }}
                      className="bg-red-500 text-white !px-2 !py-1 rounded-md hover:bg-red-600"
                    >
                      x
                    </button>
                  </div>
                )}
              </div>
              <div className="!my-5">
                <label className="block !mb-1">Variant Image (max 2)</label>
                <input
                  type="file"
                  onChange={(e) => handleVariantImageUpload(index, e)}
                  className="!w-full border border-gray-300 rounded-md !p-2 text-sm text-gray-500 file:border-0 file:bg-blue-600 file:text-white file:rounded-md file:!p-2 hover:file:bg-blue-700"
                  accept="image/*"
                  multiple
                />
                <div className="flex gap-2 !mt-2">
                  {variant.images?.map((img, imgIndex) => (
                    <div
                      key={imgIndex}
                      className="relative flex items-center gap-2"
                    >
                      <img
                        src={img}
                        alt={`Variant ${index} image ${imgIndex}`}
                        className="!h-16 object-contain border rounded"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveVariantImage(index, imgIndex)
                        }
                        className="bg-red-500 text-white !px-2 !py-1 rounded-md hover:bg-red-600"
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
                  className="border border-gray-300 rounded-md !p-2"
                />
                {/* <input
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
                  className="border border-gray-300 rounded-md !p-2"
                /> */}

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
                  className="border border-gray-300 rounded-md !p-2"
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
                  className="border border-gray-300 rounded-md !p-2"
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
                  placeholder="SKU"
                  className="border border-gray-300 rounded-md !p-2"
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
                  className="border border-gray-300 rounded-md !p-2"
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
                  className="border border-gray-300 rounded-md !p-2"
                />
              </div>

              <label className="inline-flex items-center cursor-pointer !my-4 !space-x-2">
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
                  } after:absolute after:top-0.5 after:left-0.5 after:!w-4 after:!h-4 after:bg-white after:rounded-full after:transition after:duration-200 after:ease-in-out ${
                    variant.featureProduct ? "after:!translate-x-5" : ""
                  }`}
                ></span>
                <span className="!text-sm text-gray-700">Feature Product</span>
              </label>

              <label className="inline-flex items-center cursor-pointer !space-x-2">
                <input
                  type="checkbox"
                  checked={variant.bestSeller}
                  onChange={(e) =>
                    handleVariantChange(index, "bestSeller", e.target.checked)
                  }
                  className="hidden"
                />
                <span
                  className={`relative inline-block !w-10 !h-5 rounded-full transition duration-200 ease-in-out ${
                    variant.bestSeller ? "bg-blue-600" : "bg-gray-300"
                  } after:absolute after:top-0.5 after:left-0.5 after:!w-4 after:!h-4 after:bg-white after:rounded-full after:transition after:duration-200 after:ease-in-out ${
                    variant.bestSeller ? "after:!translate-x-5" : ""
                  }`}
                ></span>
                <span className="!text-sm text-gray-700">Best Seller</span>
              </label>

              <button
                type="button"
                onClick={() => handleRemoveVariant(index)}
                className="bg-red-600 text-white !px-4 !py-2 !ml-6 rounded-md hover:bg-red-700"
              >
                Remove Variant
              </button>
            </div>
          ))}

          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleAddVariant}
              className="bg-green-600 text-white !px-4 !py-2 rounded-md hover:bg-green-700"
            >
              Add Variant
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white !px-4 !py-2 rounded-md hover:bg-blue-700 !w-full"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
