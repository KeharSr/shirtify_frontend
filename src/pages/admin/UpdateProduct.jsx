import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { updateProduct, getSingleProductApi } from '../../apis/Apis';
import { toast } from 'react-hot-toast';
import { X, Plus, Trash2 } from 'lucide-react';

Modal.setAppElement('#root');

const UpdateProduct = ({ isOpen, onRequestClose, productId, onUpdate }) => {
  const [productData, setProductData] = useState({
    productName: '',
    productPrice: '',
    productCategory: '',
    productQuantity: '',
    productDescription: '',
    productSize: [],
    productColor: []
  });
  
  const [newImages, setNewImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [newSize, setNewSize] = useState('');
  const [newColor, setNewColor] = useState('');

  useEffect(() => {
    if (productId) {
      getSingleProductApi(productId)
        .then((res) => {
          const product = res.data.product;
          setProductData({
            productName: product.productName,
            productPrice: product.productPrice,
            productCategory: product.productCategory,
            productQuantity: product.productQuantity,
            productDescription: product.productDescription,
            productSize: Array.isArray(product.productSize) ? product.productSize : [],
            productColor: Array.isArray(product.productColor) ? product.productColor : []
          });
          setOldImages(Array.isArray(product.productImage) ? product.productImage : [product.productImage]);
        })
        .catch((error) => {
          console.log(error);
          toast.error('Failed to load product details');
        });
    }
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(prev => [...prev, ...files]);
    
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const addSize = () => {
    if (newSize && !productData.productSize.includes(newSize)) {
      setProductData(prev => ({
        ...prev,
        productSize: [...prev.productSize, newSize]
      }));
      setNewSize('');
    }
  };

  const removeSize = (size) => {
    setProductData(prev => ({
      ...prev,
      productSize: prev.productSize.filter(s => s !== size)
    }));
  };

  const addColor = () => {
    if (newColor && !productData.productColor.includes(newColor)) {
      setProductData(prev => ({
        ...prev,
        productColor: [...prev.productColor, newColor]
      }));
      setNewColor('');
    }
  };

  const removeColor = (color) => {
    setProductData(prev => ({
      ...prev,
      productColor: prev.productColor.filter(c => c !== color)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    Object.keys(productData).forEach(key => {
      if (key === 'productSize' || key === 'productColor') {
        formData.append(key, JSON.stringify(productData[key]));
      } else {
        formData.append(key, productData[key]);
      }
    });

    newImages.forEach(image => {
      formData.append('productImage', image);
    });

    try {
      const response = await updateProduct(productId, formData);
      if (response.data.success) {
        toast.success('Product updated successfully');
        onUpdate();
        onRequestClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update product');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Product"
      className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-lg shadow-xl overflow-auto max-h-[90vh]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Edit Product</h2>
        <button
          onClick={onRequestClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="h-6 w-6 text-gray-500" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              name="productName"
              value={productData.productName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              name="productCategory"
              value={productData.productCategory}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select Category</option>
              <option value="Short Sleeves">Short Sleeves</option>
              <option value="Long Sleeves">Long Sleeves</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input
              type="number"
              name="productPrice"
              value={productData.productPrice}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <input
              type="number"
              name="productQuantity"
              value={productData.productQuantity}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            name="productDescription"
            value={productData.productDescription}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sizes</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {productData.productSize.map((size) => (
                <span
                  key={size}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2"
                >
                  {size}
                  <button
                    type="button"
                    onClick={() => removeSize(size)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                placeholder="Add size"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={addSize}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {productData.productColor.map((color) => (
                <span
                  key={color}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2"
                >
                  {color}
                  <button
                    type="button"
                    onClick={() => removeColor(color)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                placeholder="Add color"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={addColor}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Current Images</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {oldImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={`http://localhost:5000/products/${image}`}
                  alt={`Product ${index + 1}`}
                  className="h-32 w-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          <label className="block text-sm font-medium text-gray-700 mb-2">New Images</label>
          <input
            type="file"
            onChange={handleImageChange}
            multiple
            accept="image/*"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          
          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="h-32 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onRequestClose}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update Product
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateProduct;