// import React, { useState, useEffect } from "react";
// import { Package, ChevronDown, ChevronUp } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import { getOrdersByUserApi } from "../../apis/Apis";
// import { toast } from "react-hot-toast";

// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedOrder, setExpandedOrder] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       setIsLoading(true);
//       try {
//         const res = await getOrdersByUserApi();
//         if (res.data.success && res.data.orders) {
//           setOrders(res.data.orders);
//         } else {
//           toast.error("Error Fetching Orders");
//         }
//       } catch (error) {
//         console.error("Error Fetching Orders:", error);
//         setError("Error fetching orders. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleTrackOrder = async (orderId) => {
//     try {
//       const response = await getOrdersByUserApi();
//       if (response.data.success) {
//         const updatedOrder = response.data.orders.find(
//           (order) => order._id === orderId
//         );
//         if (updatedOrder) {
//           setOrders(
//             orders.map((order) =>
//               order._id === orderId ? updatedOrder : order
//             )
//           );
//           toast.success("Order status updated successfully!");
//         }
//       }
//     } catch (error) {
//       console.error("Error tracking order:", error);
//       toast.error("Failed to track order. Please try again later.");
//     }
//   };

//   const toggleOrderExpansion = (orderId) => {
//     setExpandedOrder(expandedOrder === orderId ? null : orderId);
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
//         <motion.div
//           className="text-2xl font-bold text-blue-600"
//           animate={{ scale: [1, 1.1, 1] }}
//           transition={{ duration: 1, repeat: Infinity }}
//         >
//           Loading orders...
//         </motion.div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
//         <div className="text-2xl font-bold text-red-500">No Order Found</div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <motion.h1
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-4xl font-extrabold mb-12 text-blue-600 text-center"
//         >
//           My Delightful Orders
//         </motion.h1>
//         <div className="space-y-8">
//           {orders.map((order) => (
//             <motion.div
//               key={order._id}
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="bg-white rounded-lg shadow-lg overflow-hidden border border-blue-200"
//             >
//               <div
//                 className="p-6 cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors duration-300"
//                 onClick={() => toggleOrderExpansion(order._id)}
//               >
//                 <div className="flex justify-between items-center">
//                   <div className="flex items-center">
//                     <Package className="text-blue-500 mr-3" size={28} />
//                     <span className="text-2xl font-semibold text-gray-800">
//                       Order #{order._id.slice(-6)}
//                     </span>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="text-lg font-medium text-blue-500 mr-4">
//                       {order.status}
//                     </span>
//                     {expandedOrder === order._id ? (
//                       <ChevronUp size={24} />
//                     ) : (
//                       <ChevronDown size={24} />
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <AnimatePresence>
//                 {expandedOrder === order._id && (
//                   <motion.div
//                     initial={{ opacity: 0, height: 0 }}
//                     animate={{ opacity: 1, height: "auto" }}
//                     exit={{ opacity: 0, height: 0 }}
//                     transition={{ duration: 0.3 }}
//                     className="px-6 pb-6 bg-white"
//                   >
//                     <div className="mb-4">
//                       {order.carts.map((product) => (
//                         <div
//                           key={product.productId._id}
//                           className="flex items-center mb-4 p-3 bg-blue-50 rounded-lg"
//                         >
//                           <img
//                             src={`http://localhost:5000/products/${product.productId.productImage}`}
//                             alt={product.productId.productName || 'Product Image'}
//                             className="w-20 h-20 object-cover rounded-md mr-4 border border-blue-200"
//                           />
//                           <div>
//                             <div className="text-lg font-semibold text-gray-800">
//                               {product.productId.productName}
//                             </div>
//                             <div className="text-md text-gray-600">
//                               Quantity: {product.quantity}
//                             </div>
//                             <div className="text-md font-medium text-blue-600">
//                               $
//                               {(
//                                 product.productId.productPrice *
//                                 product.quantity
//                               ).toFixed(2)}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="flex justify-between items-center border-t border-blue-200 pt-4">
//                       <span className="text-xl font-bold text-gray-800">
//                         Total: $
//                         {order.carts
//                           .reduce(
//                             (total, product) =>
//                               total +
//                               product.productId.productPrice *
//                                 product.quantity,
//                             0
//                           )
//                           .toFixed(2)}
//                       </span>
//                       <button
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleTrackOrder(order._id);
//                         }}
//                         className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//                       >
//                         Track Order
//                       </button>
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default MyOrders;



import React, { useState, useEffect } from "react";
import { Package, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getOrdersByUserApi } from "../../apis/Apis";
import { toast } from "react-hot-toast";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await getOrdersByUserApi();
      if (res.data?.success && Array.isArray(res.data?.orders)) {
        // Filter out invalid orders
        const validOrders = res.data.orders.filter(order => 
          order?._id && 
          Array.isArray(order?.carts) && 
          order.carts.length > 0
        );
        setOrders(validOrders);
        if (validOrders.length === 0) {
          setError("No orders found");
        }
      } else {
        setError("No orders available");
      }
    } catch (error) {
      console.error("Error Fetching Orders:", error);
      setError("Error fetching orders. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrackOrder = async (orderId, e) => {
    e.stopPropagation(); // Prevent order expansion when clicking track button
    try {
      const response = await getOrdersByUserApi();
      if (response.data?.success) {
        const updatedOrder = response.data.orders.find(
          (order) => order._id === orderId
        );
        if (updatedOrder) {
          setOrders(prev => 
            prev.map((order) =>
              order._id === orderId ? updatedOrder : order
            )
          );
          toast.success("Order status updated");
        }
      }
    } catch (error) {
      console.error("Error tracking order:", error);
      toast.error("Failed to track order");
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getProductImage = (product) => {
    if (!product?.productId?.productImage) return '';
    
    if (Array.isArray(product.productId.productImage)) {
      return product.productId.productImage[0] || '';
    }
    return product.productId.productImage;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
        <motion.div
          className="text-2xl font-bold text-blue-600"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          Loading orders...
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <Package className="w-16 h-16 text-blue-500 mb-4" />
          <div className="text-2xl font-bold text-gray-800 mb-2">No Orders Found</div>
          <p className="text-gray-600">Start shopping to see your orders here!</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-extrabold mb-12 text-blue-600 text-center"
        >
          My Orders
        </motion.h1>
        
        <div className="space-y-8">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-blue-200"
            >
              {/* Order Header */}
              <div
                className="p-6 cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors duration-300"
                onClick={() => toggleOrderExpansion(order._id)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <Package className="text-blue-500" size={28} />
                    <div>
                      <span className="text-2xl font-semibold text-gray-800">
                        Order #{order._id.slice(-6)}
                      </span>
                      
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-blue-100 text-blue-800'}`}>
                      {order.status}
                    </span>
                    {expandedOrder === order._id ? (
                      <ChevronUp size={24} className="text-gray-600" />
                    ) : (
                      <ChevronDown size={24} className="text-gray-600" />
                    )}
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <AnimatePresence>
                {expandedOrder === order._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 bg-white"
                  >
                    <div className="space-y-4 mb-6">
                      {order.carts
                        .filter(item => item?.productId?._id)
                        .map(item => (
                          <div
                            key={`${order._id}-${item.productId._id}`}
                            className="flex items-center p-4 bg-blue-50 rounded-lg"
                          >
                            <div className="relative w-24 h-24">
                              <img
                                src={`http://localhost:5000/products/${getProductImage(item)}`}
                                alt={item.productId?.productName || 'Product'}
                                className="w-full h-full object-cover rounded-md border border-blue-200"
                              />
                              {Array.isArray(item.productId?.productImage) && 
                               item.productId.productImage.length > 1 && (
                                <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                  +{item.productId.productImage.length - 1}
                                </div>
                              )}
                            </div>

                            <div className="ml-6 flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="text-lg font-semibold text-gray-800">
                                    {item.productId?.productName || 'Product Name Unavailable'}
                                  </div>
                                  <div className="text-sm text-gray-600 mt-1">
                                    Quantity: {item.quantity || 0}
                                  </div>
                                  {item.size && (
                                    <span className="inline-block px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600 mt-1 mr-2">
                                      Size: {item.size}
                                    </span>
                                  )}
                                  {item.color && (
                                    <span className="inline-block px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600 mt-1">
                                      Color: {item.color}
                                    </span>
                                  )}
                                </div>
                                <div className="text-lg font-medium text-blue-600">
                                  Rs. {((item.productId?.productPrice || 0) * (item.quantity || 0)).toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="flex justify-between items-center border-t border-blue-200 pt-4">
                      <div>
                        <p className="text-sm text-gray-600">Delivery Address:</p>
                        <p className="text-gray-800">{order.street}</p>
                        <p className="text-gray-800">{order.city}, {order.state} {order.zipCode}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-800 mb-2">
                          Total: Rs. {(order.totalPrice || 0).toFixed(2)}
                        </div>
                        <button
                          onClick={(e) => handleTrackOrder(order._id, e)}
                          className="bg-blue-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                          Track Order
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyOrders;