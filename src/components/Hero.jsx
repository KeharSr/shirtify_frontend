import React from "react";
import { ShoppingCart, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image1 from "../assets/images/caresol1.jpg";
import Image2 from "../assets/images/register_image.jpg";
import Image3 from "../assets/images/caresol4.jpg";


const ImageList = [
  {
    id: 1,
    img: Image3,
    title: "Elevate Your Style",
    subtitle: "Up to 50% off on Long Sleeves",
    description: "Upgrade your wardrobe with our premium selection of long sleeves. Limited time offer!",
  },
  {
    id: 2,
    img: Image2,
    title: "Style Meets Comfort",
    subtitle: "Find Your Perfect Pair",
    description: "Discover the perfect pair that complements your unique style and personality.",
  },
  {
    id: 3,
    img: Image1,
    title: "Future of Fashion",
    subtitle: "Advanced Virtual Fitting",
    description: "Experience the future of fashion with our cutting-edge virtual fitting technology.",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % ImageList.length);
  };

  React.useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden min-h-[80vh] bg-gradient-to-br from-gray-50 to-gray-100 pt-16"> {/* Added pt-16 for top spacing */}
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -right-1/4 w-[600px] h-[600px] bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse"></div>
        <div className="absolute -bottom-1/4 -left-1/4 w-[400px] h-[400px] bg-purple-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-left max-w-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <motion.span
                  className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {ImageList[currentSlide].subtitle}
                </motion.span>

                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {ImageList[currentSlide].title}
                </h1>

                <p className="text-lg text-gray-600 leading-relaxed">
                  {ImageList[currentSlide].description}
                </p>

                <div className="flex flex-wrap gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-medium shadow-md shadow-blue-200 flex items-center gap-2 hover:bg-blue-700 transition-colors text-sm"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Shop Now
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2.5 bg-white text-gray-800 rounded-full font-medium shadow-md flex items-center gap-2 hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Sparkles className="w-4 h-4" />
                    Try Virtual Fitting
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Image Carousel - Modified for consistent sizing */}
          <motion.div
            className="flex-1 relative w-full max-w-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-full pb-[125%]">
              <div className="absolute inset-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <div className="relative w-full h-full rounded-2xl overflow-hidden">
                      <img
                        src={ImageList[currentSlide].img}
                        alt={ImageList[currentSlide].title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent"></div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
              {ImageList.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`group relative p-1.5 transition-all duration-300 ${
                    index === currentSlide ? "scale-110" : "hover:scale-105"
                  }`}
                >
                  <span
                    className={`block w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-blue-600 scale-110"
                        : "bg-gray-300 group-hover:bg-blue-400"
                    }`}
                  ></span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;