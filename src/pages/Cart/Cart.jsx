import React, { useState, useEffect } from 'react';
import { getCartApi, deleteCartItemApi, updateCartItemApi } from '../../apis/Apis';
import Navbar from '../../components/Navbar';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, ArrowRight, Trash2, Package, CircleDollarSign } from 'lucide-react';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [quantityChanged, setQuantityChanged] = useState(false);

  useEffect(() => {
    fetchCart();
  }, [quantityChanged]);

  const fetchCart = async () => {
    try {
      const res = await getCartApi();
      if (res.status === 200 && res.data && res.data.products) {
        // Filter out invalid items
        const cartItems = res.data.products
          .filter(item => 
            item && 
            item.productId && 
            item.productId.productName && 
            item.productId.productPrice && 
            item.productId.productQuantity
          )
          .map(item => ({
            ...item,
            quantity: item.quantity || 1
          }));
        setCart(cartItems);
        calculateSubtotal(cartItems);
      } else {
        setCart([]);
        setSubtotal(0);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      setCart([]);
      setSubtotal(0);
    }
  };

  const handleQuantityChange = async (index, change) => {
    try {
      const item = cart[index];
      if (!item || !item.productId) return;

      const newQuantity = item.quantity + change;
      if (newQuantity < 1) {
        toast.error("Quantity cannot be less than 1");
        return;
      }
      if (newQuantity > item.productId.productQuantity) {
        toast.error("Out of Stock");
        return;
      }

      const data = {
        productId: item.productId._id,
        quantity: newQuantity,
        size: item.size || null,
        color: item.color || null
      };
      
      const res = await updateCartItemApi(data);
      if (res.status === 200) {
        setQuantityChanged(!quantityChanged);
        toast.success("Cart updated successfully");
      }
    } catch (err) {
      console.error("Error updating quantity:", err);
      toast.error("Failed to update cart");
    }
  };

  const calculateSubtotal = (items) => {
    const total = items.reduce((acc, item) => {
      if (!item?.productId?.productPrice || !item?.quantity) {
        return acc;
      }
      return acc + (item.productId.productPrice * item.quantity);
    }, 0);
    setSubtotal(total);
  };

  const handleDeleteItem = async (id) => {
    try {
      const res = await deleteCartItemApi(id);
      if (res.status === 200) {
        toast.success(res.data.message);
        setQuantityChanged(!quantityChanged);
      }
    } catch (err) {
      console.error("Error deleting item from cart:", err);
      toast.error("Failed to remove item from cart");
    }
  };

  const getProductImage = (item) => {
    if (!item?.productId?.productImage) {
      return '';
    }
    
    if (Array.isArray(item.productId.productImage)) {
      return item.productId.productImage[0] || '';
    }
    return item.productId.productImage;
  };

  const validCart = cart.filter(item => 
    item && 
    item.productId && 
    item.productId.productName && 
    item.productId.productPrice
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="container mx-auto p-5 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <h1 className="text-4xl font-bold text-gray-800">Your Shopping Cart</h1>
          <p className="text-gray-600">{validCart.length} {validCart.length === 1 ? 'item' : 'items'} in your cart</p>
        </motion.div>
        
        {validCart.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center space-y-6 mt-12"
          >
            <Package size={64} className="text-gray-400" />
            <p className="text-xl text-gray-600">Your cart is empty</p>
            <Link 
              to="/homepage" 
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {validCart.map((item, index) => (
                  <motion.div 
                    key={item._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-6 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-300"
                  >
                    <div className="flex gap-6">
                      <div className="relative w-32 h-32">
                        <img
                          src={`http://localhost:5000/products/${getProductImage(item)}`}
                          alt={item.productId?.productName || 'Product image'}
                          className="w-full h-full object-cover rounded-lg shadow-md"
                        />
                        {Array.isArray(item.productId?.productImage) && 
                         item.productId.productImage.length > 1 && (
                          <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            +{item.productId.productImage.length - 1}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-800">
                                {item.productId?.productName}
                              </h3>
                              <p className="text-gray-500 text-sm mt-1">
                                {item.productId?.productDescription || 'No description available'}
                              </p>
                            </div>
                            <button 
                              onClick={() => handleDeleteItem(item._id)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-300"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                          
                          <div className="flex gap-4 mt-3">
                            {item.size && (
                              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                                Size: {item.size}
                              </span>
                            )}
                            {item.color && (
                              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                                Color: {item.color}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center space-x-3">
                            <button 
                              onClick={() => handleQuantityChange(index, -1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-300"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="text-lg font-medium w-8 text-center">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => handleQuantityChange(index, 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors duration-300"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-sm text-gray-500">Price per item</p>
                            <p className="text-lg font-semibold text-gray-800">
                              Rs. {item.productId?.productPrice.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-lg shadow p-6 sticky top-[88px]">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-semibold text-gray-800">
                      <span>Total</span>
                      <span>Rs. {subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link to={`/placeorder/${JSON.stringify(validCart)}`}>
                  <button className="w-full mt-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-2">
                    <CircleDollarSign size={20} />
                    <span>Proceed to Checkout</span>
                  </button>
                </Link>

                <Link to="/homepage">
                  <button className="w-full mt-4 py-4 bg-gray-100 text-gray-700 text-lg font-semibold rounded-lg hover:bg-gray-200 transition-all duration-300">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;