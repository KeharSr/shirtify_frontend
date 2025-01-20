import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getSingleProductApi, addToCartApi } from "../../apis/Apis";
import toast from "react-hot-toast";
import Navbar from "../../components/Navbar";
import Modal from "react-modal";
import axios from "axios";
import {
  ShoppingCart,
  Camera,
  X,
  Plus,
  Minus,
  Facebook,
  Twitter,
  Instagram,
  Check,
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [isOutStock, setIsOutStock] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isTryOnActive, setIsTryOnActive] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const outputCanvasRef = useRef(null);

  Modal.setAppElement("#root");

  const openModal = () => setIsTryOnActive(true);
  const closeModal = () => setIsTryOnActive(false);

  useEffect(() => {
    getSingleProductApi(id)
      .then((res) => {
        if (res.status === 200) {
          const productData = res.data.product;
          setProduct(productData);
          setMainImage(productData.productImage[0]);
          if (productData.productSize?.length > 0) {
            setSelectedSize(productData.productSize[0]);
          }
          if (productData.productColor?.length > 0) {
            setSelectedColor(productData.productColor[0]);
          }
          updateStockStatus(productData, quantity);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to load product details");
      });
  }, [id]);

  const updateStockStatus = (product, quantity) => {
    if (product.productQuantity < quantity) {
      setError("Out of Stock");
      setIsOutStock(true);
    } else {
      setError("");
      setIsOutStock(false);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    newQuantity = parseInt(newQuantity, 10);
    if (newQuantity > quantity && isOutStock) return;
    if (newQuantity < 1) return;
    if (product && newQuantity > product.productQuantity) {
      toast.error("Quantity exceeds available stock");
      return;
    }
    setQuantity(newQuantity);
    if (product) {
      updateStockStatus(product, newQuantity);
    }
  };

  const addToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }

    if (!isOutStock && product && quantity > 0) {
      addToCartApi({
        productId: product._id,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor,
      })
        .then((res) => {
          if (res.status === 201) {
            toast.success("Product added to cart");
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to add to cart");
        });
    }
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        console.log("Camera stream started");
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => {
        console.error("Error accessing the camera: ", err);
        toast.error("Failed to access camera");
      });
  };

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
  
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
  
    if (videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  
      canvas.toBlob((blob) => {
        if (blob) sendFrameToBackend(blob);
      }, "image/jpeg");
    }
  };

  const sendFrameToBackend = async (blob) => {
  const formData = new FormData();
  formData.append("frame", blob, "frame.jpg");
  formData.append("tshirt_image", `http://localhost:5000/products/${mainImage}`);

  try {
    const response = await axios.post("http://localhost:5001/process_frame", formData);
    drawOverlay(response.data);
  } catch (error) {
    console.error("Error sending frame to backend:", error);
  }
};

const drawOverlay = (data) => {
  const canvas = outputCanvasRef.current;
  const context = canvas.getContext("2d");
  const image = new Image();
  image.src = "data:image/jpeg;base64," + data.image;
  image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  };
};

  useEffect(() => {
    if (isTryOnActive) {
      console.log("Try-On activated");
      startVideo();
      const intervalId = setInterval(captureFrame, 1000 / 30); // Capture at 30 FPS
      return () => {
        clearInterval(intervalId);
        if (videoRef.current && videoRef.current.srcObject) {
          videoRef.current.srcObject
            .getTracks()
            .forEach((track) => track.stop());
        }
        console.log("Try-On deactivated and camera stopped");
      };
    }
  }, [isTryOnActive]);

  const getColorDisplay = (color) => {
    const colorMap = {
      red: "bg-red-500",
      blue: "bg-blue-500",
      green: "bg-green-500",
      black: "bg-black",
      white: "bg-white border border-gray-300",
      yellow: "bg-yellow-500",
      purple: "bg-purple-500",
      pink: "bg-pink-500",
      gray: "bg-gray-500",
      brown: "bg-amber-800",
    };
    return colorMap[color.toLowerCase()] || "bg-gray-200";
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navbar />
      <main className="pt-20"></main>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Image Gallery Section - Made Smaller */}
            <div className="md:w-2/5 p-6">
              <div className="relative pb-[80%] mb-4 rounded-lg overflow-hidden shadow-md">
                <img
                  src={`http://localhost:5000/products/${mainImage}`}
                  alt={product.productName}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.productImage.map((img, index) => (
                  <div
                    key={index}
                    className={`relative rounded-md overflow-hidden cursor-pointer transform transition-all duration-300 ${
                      mainImage === img
                        ? "ring-2 ring-indigo-500 scale-95"
                        : "hover:scale-95"
                    }`}
                    onClick={() => setMainImage(img)}
                  >
                    <div className="pb-[100%]">
                      <img
                        src={`http://localhost:5000/products/${img}`}
                        alt={`View ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="md:w-3/5 p-6 bg-gradient-to-br from-white to-gray-50">
              <h1 className="text-3xl font-bold mb-3 text-gray-800">
                {product.productName}
              </h1>

              <div className="text-3xl font-bold text-indigo-600 mb-4">
                Rs {product.productPrice.toFixed(2)}
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.productDescription}
              </p>

              {/* Size Selection */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.productSize.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-md font-medium text-sm transition-all duration-300 ${
                        selectedSize === size
                          ? "bg-indigo-600 text-white ring-2 ring-indigo-600 ring-offset-1"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Color
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.productColor.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${getColorDisplay(
                        color
                      )} ${
                        selectedColor === color
                          ? "ring-2 ring-indigo-600 ring-offset-1"
                          : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-1"
                      }`}
                    >
                      {selectedColor === color && (
                        <Check
                          className={`w-4 h-4 ${
                            color.toLowerCase() === "white"
                              ? "text-gray-800"
                              : "text-white"
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="mb-6">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Quantity
                </label>
                <div className="flex items-center w-32">
                  <button
                    onClick={() =>
                      handleQuantityChange(Math.max(1, quantity - 1))
                    }
                    className="p-1.5 rounded-l-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition duration-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    min="1"
                    max={product.productQuantity}
                    className="w-12 px-2 py-1.5 text-center border-y border-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="p-1.5 rounded-r-md bg-gray-100 text-gray-600 hover:bg-gray-200 transition duration-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-6">
                <button
                  onClick={addToCart}
                  disabled={isOutStock}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 rounded-md font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={openModal}
                  className="flex-1 bg-purple-700 text-white px-4 py-2 rounded-md font-semibold hover:from-purple-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center shadow-md text-sm"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Try On
                </button>
              </div>

              {/* Social Share */}
              <div className="flex items-center pt-2 border-t border-gray-100">
                <span className="text-sm text-gray-600 mr-3">Share:</span>
                <div className="flex space-x-3">
                  <Facebook className="w-5 h-5 text-blue-600 cursor-pointer hover:text-blue-700" />
                  <Twitter className="w-5 h-5 text-blue-400 cursor-pointer hover:text-blue-500" />
                  <Instagram className="w-5 h-5 text-pink-600 cursor-pointer hover:text-pink-700" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Virtual Try-On Modal */}
        <Modal
          isOpen={isTryOnActive}
          onRequestClose={closeModal}
          contentLabel="Virtual Try-On"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              zIndex: 1000,
            },
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "transparent",
              border: "none",
              padding: 0,
              width: "95vw",
              height: "90vh",
              maxWidth: "1400px",
              overflow: "hidden",
            },
          }}
        >
          <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/70 to-transparent p-4 z-10 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Virtual Try-On
                </h2>
                <p className="text-gray-300 text-sm">
                  Try on {product?.productName}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all duration-300"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Main Content */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Video Container */}
              <div className="relative w-full h-full">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  muted
                />
                <canvas ref={canvasRef} className="hidden" />
                <canvas
                  ref={outputCanvasRef}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                />
              </div>

              {/* Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/10 p-3 rounded-full">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Camera Active</p>
                      <p className="text-gray-300 text-sm">Looking good!</p>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 flex items-center space-x-2">
                      <Camera className="w-5 h-5" />
                      <span>Take Photo</span>
                    </button>
                    <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-all duration-300 flex items-center space-x-2">
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProductDetails;
