import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";
import { addToCartApi, addFavouriteApi } from "../apis/Apis";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";

const Products = ({ productInformation, color }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem(`favorite_${productInformation._id}`);
    setIsFavorite(status ? JSON.parse(status) : false);
  }, [productInformation._id]);

  useEffect(() => {
    localStorage.setItem(
      `favorite_${productInformation._id}`,
      JSON.stringify(isFavorite)
    );
  }, [isFavorite, productInformation._id]);

  const addToCart = async (productId) => {
    try {
      const res = await addToCartApi({ productId });
      if (res.status === 201) {
        toast.success("Product added to cart");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to add to cart");
    }
  };

  const toggleFavorite = async (productId) => {
    try {
      const res = await addFavouriteApi({ productId });
      if (res.status === 200) {
        setIsFavorite(true);
        toast.success("Product added to favorites");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data.message || "An unexpected error occurred");
    }
  };

  // Loading state
  if (!productInformation) {
    return (
      <div className="w-80 h-[32rem] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  // Get the first image from the array of product images
  const mainImage = Array.isArray(productInformation.productImage) 
    ? productInformation.productImage[0] 
    : productInformation.productImage;

  // Get available sizes and colors count
  const sizesCount = productInformation.productSize?.length || 0;
  const colorsCount = productInformation.productColor?.length || 0;

  return (
    <div
      className="w-80 h-[32rem] bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative group"
      data-aos="fade-up"
    >
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden">
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
            {productInformation.productCategory}
          </span>
        </div>

        <button
          onClick={() => toggleFavorite(productInformation._id)}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md z-10 hover:bg-gray-50 transition-colors"
        >
          <Heart
            className={`h-4 w-4 ${
              isFavorite ? "text-red-500" : "text-gray-400"
            }`}
            fill={isFavorite ? "currentColor" : "none"}
          />
        </button>

        <div className="w-full h-64 relative group-hover:scale-105 transition-transform duration-300">
          <img
            src={`http://localhost:5000/products/${mainImage}`}
            className="w-full h-full object-contain"
            alt={productInformation.productName}
          />
        </div>

        {/* Additional images indicator */}
        {Array.isArray(productInformation.productImage) && 
         productInformation.productImage.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded-full text-white text-xs">
            +{productInformation.productImage.length - 1} more
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col justify-between h-[16rem]">
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900 truncate">
            {productInformation.productName}
          </h2>

          <div className="space-y-1">
            <p className="text-gray-500 text-sm">
              {productInformation.productCategory}
            </p>
            <p className="text-gray-600 text-xs line-clamp-2">
              {productInformation.productDescription}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-blue-600">
              Rs {productInformation.productPrice}
            </span>
            <div className="flex gap-2 text-xs text-gray-500">
              {sizesCount > 0 && (
                <span className="px-2 py-1 bg-gray-100 rounded-full">
                  {sizesCount} {sizesCount === 1 ? 'size' : 'sizes'}
                </span>
              )}
              {colorsCount > 0 && (
                <span className="px-2 py-1 bg-gray-100 rounded-full">
                  {colorsCount} {colorsCount === 1 ? 'color' : 'colors'}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => addToCart(productInformation._id)}
            className="w-full py-3 bg-blue-500 text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            BUY NOW
          </button>
          <Link to={`/product/${productInformation._id}`} className="w-full">
            <button className="w-full py-3 bg-blue-50 text-blue-500 text-sm font-semibold rounded-lg hover:bg-blue-100 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              VIEW MORE
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;