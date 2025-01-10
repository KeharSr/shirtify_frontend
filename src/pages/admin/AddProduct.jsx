import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { createProductApi } from '../../apis/Apis';
import { motion } from 'framer-motion';
import { Camera, Package, DollarSign, Hash, FileText, Palette, Maximize2 } from 'lucide-react';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [productColor, setProductColor] = useState([]);
  const [productSize, setProductSize] = useState([]);
  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');

  const handleImages = (event) => {
    const files = Array.from(event.target.files);
    setProductImages([...productImages, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const addColor = () => {
    if (newColor.trim()) {
      setProductColor([...productColor, newColor]);
      setNewColor('');
    }
  };

  const removeColor = (colorToRemove) => {
    setProductColor(productColor.filter((color) => color !== colorToRemove));
  };

  const addSize = () => {
    if (newSize.trim()) {
      setProductSize([...productSize, newSize]);
      setNewSize('');
    }
  };

  const removeSize = (sizeToRemove) => {
    setProductSize(productSize.filter((size) => size !== sizeToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!productName.trim()) {
      return toast.error('Product name is required');
    }
    if (!productPrice) {
      return toast.error('Product price is required');
    }
    if (!productCategory) {
      return toast.error('Product category is required');
    }
    if (!productDescription.trim()) {
      return toast.error('Product description is required');
    }
    if (!productQuantity) {
      return toast.error('Product quantity is required');
    }
    if (productSize.length === 0) {
      return toast.error('At least one size is required');
    }
    if (productColor.length === 0) {
      return toast.error('At least one color is required');
    }
    if (productImages.length === 0) {
      return toast.error('At least one image is required');
    }

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productPrice', productPrice);
    formData.append('productCategory', productCategory);
    formData.append('productDescription', productDescription);
    formData.append('productQuantity', productQuantity);
    productImages.forEach((image) => {
      formData.append('productImage', image);
    });
    formData.append('productColor', JSON.stringify(productColor));
    formData.append('productSize', JSON.stringify(productSize));

    createProductApi(formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          // Clear form after successful submission
          setProductName('');
          setProductPrice('');
          setProductCategory('');
          setProductDescription('');
          setProductQuantity('');
          setProductImages([]);
          setImagePreviews([]);
          setProductColor([]);
          setProductSize([]);
          setNewColor('');
          setNewSize('');
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message || 'Something went wrong');
        }
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-8 max-w-5xl mx-auto bg-white rounded-xl shadow-2xl"
    >
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Add New Product</h1>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Name */}
          <motion.div whileHover={{ scale: 1.02 }} className="col-span-1">
            <label className="flex items-center text-lg font-medium text-gray-700 mb-3" htmlFor="productName">
              <Package className="mr-2" size={24} />
              Product Name
            </label>
            <input
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="productName"
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </motion.div>

          {/* Product Description */}
          <motion.div whileHover={{ scale: 1.02 }} className="col-span-2">
            <label className="flex items-center text-lg font-medium text-gray-700 mb-3" htmlFor="productDescription">
              <FileText className="mr-2" size={24} />
              Product Description
            </label>
            <textarea
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="productDescription"
              rows="5"
              placeholder="Enter product description"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </motion.div>

          {/* Product Quantity */}
          <motion.div whileHover={{ scale: 1.02 }} className="col-span-1">
            <label className="flex items-center text-lg font-medium text-gray-700 mb-3" htmlFor="productQuantity">
              <Hash className="mr-2" size={24} />
              Product Quantity
            </label>
            <input
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="productQuantity"
              type="text"
              placeholder="Enter product quantity"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
            />
          </motion.div>

          {/* Product Category */}
          <motion.div whileHover={{ scale: 1.02 }} className="col-span-1">
            <label className="flex items-center text-lg font-medium text-gray-700 mb-3" htmlFor="productCategory">
              <Hash className="mr-2" size={24} />
              Product Category
            </label>
            <select
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="productCategory"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Long Sleeves">Long Sleeves</option>
              <option value="Short Sleeves">Short Sleeves</option>
            </select>
          </motion.div>
        </div>

        {/* Product Images */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="flex items-center text-lg font-medium text-gray-700 mb-3" htmlFor="productImages">
            <Camera className="mr-2" size={24} />
            Upload Images
          </label>
          <input
            className="hidden"
            id="productImages"
            type="file"
            multiple
            onChange={handleImages}
            accept="image/*"
          />
          <label
            htmlFor="productImages"
            className="cursor-pointer flex items-center justify-center w-full h-64 border-3 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            <div className="text-center">
              <Camera className="mx-auto h-16 w-16 text-gray-400" />
              <p className="mt-2 text-lg text-gray-600">Click to upload images</p>
            </div>
          </label>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {imagePreviews.map((preview, index) => (
              <img key={index} src={preview} alt={`Preview ${index}`} className="w-full h-32 object-cover rounded-lg" />
            ))}
          </div>
        </motion.div>

        {/* Colors */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="flex items-center text-lg font-medium text-gray-700 mb-3" htmlFor="colors">
            <Palette className="mr-2" size={24} />
            Product Colors
          </label>
          <div className="flex items-center space-x-4">
            <input
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="colors"
              type="text"
              placeholder="Add a color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
            />
            <button
              type="button"
              onClick={addColor}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {productColor.map((color, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full cursor-pointer hover:bg-red-300"
                onClick={() => removeColor(color)}
              >
                {color} ✕
              </span>
            ))}
          </div>
        </motion.div>

        {/* Sizes */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="flex items-center text-lg font-medium text-gray-700 mb-3" htmlFor="sizes">
            <Maximize2 className="mr-2" size={24} />
            Product Sizes
          </label>
          <div className="flex items-center space-x-4">
            <input
              className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="sizes"
              type="text"
              placeholder="Add a size"
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
            />
            <button
              type="button"
              onClick={addSize}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {productSize.map((size, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 text-gray-800 rounded-full cursor-pointer hover:bg-red-300"
                onClick={() => removeSize(size)}
              >
                {size} ✕
              </span>
            ))}
          </div>
        </motion.div>

        {/* Product Price */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <label className="flex items-center text-lg font-medium text-gray-700 mb-3" htmlFor="productPrice">
            <DollarSign className="mr-2" size={24} />
            Product Price
          </label>
          <input
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="productPrice"
            type="number"
            placeholder="Enter product price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </motion.div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          className="w-full px-4 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700"
        >
          Submit Product
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddProduct;