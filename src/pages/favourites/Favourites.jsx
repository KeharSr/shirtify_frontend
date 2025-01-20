import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Loader,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { deleteFavouriteApi, getFavouritesApi } from "../../apis/Apis";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  // Add pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const res = await getFavouritesApi();
      if (res.status === 200) {
        const validFavorites = res.data.favorites.filter(
          (fav) => fav.product && fav.product._id
        );
        setFavorites(validFavorites);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch favorites");
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (id, productId) => {
    try {
      const res = await deleteFavouriteApi(id);
      if (res.status === 200) {
        setFavorites((prevFavorites) =>
          prevFavorites.filter((item) => item._id !== id)
        );
        localStorage.setItem(`favorite_${productId}`, JSON.stringify(false));
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove from favorites");
    }
  };

  // Helper function to get the first image from product images
  const getFirstImage = (product) => {
    if (!product.productImage) return "";

    if (Array.isArray(product.productImage)) {
      return product.productImage[0];
    }
    return product.productImage;
  };

  // Add pagination logic
  const totalPages = Math.ceil(favorites.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFavorites = favorites.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-50 to-pink-50">
        <Loader className="w-12 h-12 text-purple-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Favorite T-shirt
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Here's a collection of your most loved picks.
          </p>
        </motion.div>

        {favorites.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12 bg-white rounded-lg shadow-lg"
          >
            <Heart className="w-16 h-16 text-pink-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700">
              Your favorites list is empty
            </h2>
            <p className="mt-2 text-gray-600">
              Start adding some amazing t-shirt to your favorites!
            </p>
            <Link
              to="/homepage"
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Explore Products
              <ArrowRight className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </Link>
          </motion.div>
        ) : (
          <>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-96 mx-auto"
              >
                {currentFavorites.map((favorite) => (
                  <motion.div
                    key={favorite._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-80 h-[32rem] bg-white rounded-3xl shadow-lg overflow-hidden"
                  >
                    <div className="relative h-64 w-full">
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
                          {favorite.product.productCategory}
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          removeFromFavorites(
                            favorite._id,
                            favorite.product._id
                          )
                        }
                        className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md z-10"
                      >
                        <Heart
                          className="h-4 w-4 text-red-500"
                          fill="currentColor"
                        />
                      </button>

                      <div className="w-full h-64 relative">
                        <img
                          src={`http://localhost:5000/products/${getFirstImage(
                            favorite.product
                          )}`}
                          className="w-full h-full object-contain"
                          alt={favorite.product.productName}
                        />
                        {Array.isArray(favorite.product.productImage) &&
                          favorite.product.productImage.length > 1 && (
                            <div className="absolute bottom-4 right-4 bg-black/70 px-2 py-1 rounded-full text-white text-xs">
                              +{favorite.product.productImage.length - 1} more
                            </div>
                          )}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col justify-between h-[16rem]">
                      <div className="space-y-3">
                        <h2 className="text-lg font-bold text-gray-900 truncate">
                          {favorite.product.productName}
                        </h2>

                        <div className="space-y-1">
                          <p className="text-gray-500 text-sm">
                            {favorite.product.productCategory}
                          </p>
                          <p className="text-gray-600 text-xs line-clamp-2">
                            {favorite.product.productDescription}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold">
                            ${favorite.product.productPrice}
                          </span>
                          <div className="flex items-center gap-1">
                            {favorite.product.productSize && (
                              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                                {favorite.product.productSize.length}{" "}
                                {favorite.product.productSize.length === 1
                                  ? "size"
                                  : "sizes"}
                              </span>
                            )}
                            {favorite.product.productColor && (
                              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                                {favorite.product.productColor.length}{" "}
                                {favorite.product.productColor.length === 1
                                  ? "color"
                                  : "colors"}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() =>
                            removeFromFavorites(
                              favorite._id,
                              favorite.product._id
                            )
                          }
                          className="w-full py-3 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors"
                        >
                          REMOVE
                        </button>
                        <Link
                          to={`/product/${favorite.product._id}`}
                          className="w-full"
                        >
                          <button className="w-full py-3 bg-blue-50 text-blue-500 text-sm font-semibold rounded-lg hover:bg-blue-100 transition-colors">
                            VIEW MORE
                          </button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Add pagination controls */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg border ${
                        currentPage === page
                          ? "bg-purple-600 text-white"
                          : "bg-white hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;
