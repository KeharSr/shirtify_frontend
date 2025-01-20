import React, { useEffect, useState } from "react";
import { getAllProductsApi } from "../apis/Apis";
import Hero from "../components/Hero";
import Products from "../components/Products";
import Banner from "../components/Banner";
import logo from "../assets/images/logo1.png";
import {
  ArrowRightIcon,
  Menu,
  X,
  User,
  ShoppingCart,
  Star,
  Package,
  Users,
  Globe,
} from "lucide-react";

const Stats = () => (
  <div className="bg-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <Package className="h-10 w-10 text-indigo-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">200+</div>
          <div className="text-sm text-gray-500 mt-1">Brands</div>
        </div>
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <Star className="h-10 w-10 text-indigo-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">2,000+</div>
          <div className="text-sm text-gray-500 mt-1">Products</div>
        </div>
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <Users className="h-10 w-10 text-indigo-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">30,000+</div>
          <div className="text-sm text-gray-500 mt-1">Happy Customers</div>
        </div>
        <div className="text-center">
          <div className="flex justify-center mb-3">
            <Globe className="h-10 w-10 text-indigo-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">50+</div>
          <div className="text-sm text-gray-500 mt-1">Countries Served</div>
        </div>
      </div>
    </div>
  </div>
);

const Navbar = ({ isLoggedIn, logo }) => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo Section */}
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <a href="/" className="flex items-center space-x-2">
                  {logo && (
                    <img 
                      src={logo} 
                      alt="Store Logo"
                      className="h-12 w-auto object-contain"
                    />
                  )}
                </a>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center space-x-6">
                    <a
                      href="/cart"
                      className="text-gray-700 hover:text-indigo-600 transition-colors duration-200 relative"
                    >
                      <ShoppingCart className="h-6 w-6" />
                      <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        0
                      </span>
                    </a>
                    <div className="relative group">
                      <button className="text-gray-700 hover:text-indigo-600 transition-colors duration-200">
                        <User className="h-6 w-6" />
                      </button>
                      <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <a
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                        >
                          Profile
                        </a>
                        <a
                          href="/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                        >
                          Orders
                        </a>
                        <a
                          href="/settings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                        >
                          Settings
                        </a>
                        <hr className="my-2" />
                        <a
                          href="/logout"
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Logout
                        </a>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-4">
                  <a
                    href="/login"
                    className="px-6 py-2.5 rounded-md text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 transition-colors duration-200 font-medium"
                  >
                    Login
                  </a>
                  <a
                    href="/login"
                    className="px-6 py-2.5 rounded-md text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 transition-colors duration-200 font-medium"
                  >
                    Register
                  </a>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-indigo-600 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <div className="flex flex-col space-y-3">
                {isLoggedIn ? (
                  <>
                    <a
                      href="/cart"
                      className="text-gray-700 hover:text-indigo-600 py-2 transition-colors duration-200"
                    >
                      Cart
                    </a>
                    <a
                      href="/profile"
                      className="text-gray-700 hover:text-indigo-600 py-2 transition-colors duration-200"
                    >
                      Profile
                    </a>
                    <a
                      href="/orders"
                      className="text-gray-700 hover:text-indigo-600 py-2 transition-colors duration-200"
                    >
                      Orders
                    </a>
                    <a
                      href="/settings"
                      className="text-gray-700 hover:text-indigo-600 py-2 transition-colors duration-200"
                    >
                      Settings
                    </a>
                    <a
                      href="/logout"
                      className="text-red-600 hover:text-red-700 py-2 transition-colors duration-200"
                    >
                      Logout
                    </a>
                  </>
                ) : (
                  <div className="flex flex-col space-y-3 pt-2">
                    <a
                      href="/login"
                      className="px-4 py-3 text-center rounded-md text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 transition-colors duration-200 font-medium"
                    >
                      Login
                    </a>
                    <a
                      href="/register"
                      className="px-4 py-3 text-center rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 font-medium"
                    >
                      Register
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

     
      
    </>
  );
};


const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fashion Blogger",
      content:
        "The quality of products and customer service is exceptional. I'm always impressed with their collection.",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Regular Customer",
      content:
        "Fast shipping and amazing variety. This has become my go-to store for all fashion needs.",
      rating: 5,
    },
    {
      name: "Emma Davis",
      role: "Style Consultant",
      content:
        "Their curated collection is perfect for both casual and formal wear. Highly recommended!",
      rating: 5,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover why our customers love shopping with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-xl p-8 transform transition duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <img
                    src="/api/placeholder/64/64"
                    alt={testimonial.name}
                    className="h-16 w-16 rounded-full object-cover ring-4 ring-gray-50"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-1 rounded-full">
                    <Star size={16} fill="white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="text-yellow-400"
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Verified Purchase
                  </span>
                  <button className="text-blue-500 text-sm font-medium hover:text-blue-600">
                    Read full review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-xl font-bold mb-4">About Us</h3>
          <p className="text-gray-400 leading-relaxed">
            Your premier destination for fashion, featuring 200+ international
            brands and high-quality products.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Shop</h3>
          <ul className="space-y-3 text-gray-400">
            <li>
              <a href="/new-arrivals" className="hover:text-white transition-colors duration-200">
                New Arrivals
              </a>
            </li>
            <li>
              <a href="/bestsellers" className="hover:text-white transition-colors duration-200">
                Bestsellers
              </a>
            </li>
            <li>
              <a href="/brands" className="hover:text-white transition-colors duration-200">
                Brands
              </a>
            </li>
            <li>
              <a href="/sale" className="hover:text-white transition-colors duration-200">
                Sale
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Help</h3>
          <ul className="space-y-3 text-gray-400">
            <li>
              <a href="/help" className="hover:text-white transition-colors duration-200">
                Sizing Guide
              </a>
            </li>
            <li>
              <a href="/help" className="hover:text-white transition-colors duration-200">
                Shipping Info
              </a>
            </li>
            <li>
              <a href="/help" className="hover:text-white transition-colors duration-200">
                Returns
              </a>
            </li>
            <li>
              <a href="/help" className="hover:text-white transition-colors duration-200">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <ul className="space-y-3 text-gray-400">
            <li>Email: support@shirtify.com</li>
            <li>Phone: +977-9843712332</li>
            <li>Address: 123 Fashion St, Style City</li>
          </ul>
          <div className="mt-6 flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
        <p>&copy; 2025 Shirtify. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const LandingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [randomLink, setRandomLink] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // In your landing page component


// Update your register button


  useEffect(() => {
    getAllProductsApi()
      .then((res) => {
        if (res.status === 201) {
          setProducts(res.data.products);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setRandomLink(Math.random() < 0.5 ? "/shortsleeves" : "/longsleeves");
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isLoggedIn={isLoggedIn} logo={logo} />
      <main >
        {/* Hero Section with proper image sizing */}
        <div className="relative h-[750px] overflow-hidden">
          <Hero />
        </div>
        
        <div className="mt-16"> {/* Added negative margin to reduce gap */}
          <Stats />
        </div>

        {/* Featured Products Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-4xl font-bold text-gray-900 mb-12">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {products.slice(0, 6).map((singleProduct) => (
                <div
                  key={singleProduct._id}
                  className="transform hover:scale-105 transition-transform duration-300"
                >
                  <Products productInformation={singleProduct} color="red" />
                </div>
              ))}
            </div>
            <div className="text-center mt-16">
              <a
                href={randomLink}
                className="inline-flex items-center px-8 py-4 border-2 border-indigo-600 text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-300"
              >
                View All Products
                <ArrowRightIcon
                  className="ml-2 -mr-1 h-6 w-6"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </section>

        <Testimonials />
        
        {/* Banner with proper sizing */}
        <div className="relative overflow-hidden">
          <Banner />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;