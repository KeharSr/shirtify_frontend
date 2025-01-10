import React, { useEffect, useState } from "react";
import {
  placeOrderApi,
  initializeKhaltiPaymentApi,
  updateStatusApi,
} from "../../apis/Apis"; // Assuming you have these APIs
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const PlaceOrder = () => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const params = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    deliveryFee: 40.0,
  });

  useEffect(() => {
    const carts = JSON.parse(params.cart);
    if (params.cart) {
      setCart(JSON.parse(params.cart));
      setSubtotal(
        carts.reduce(
          (sum, item) => sum + item.productId.productPrice * item.quantity,
          0
        )
      );
    }
  }, [params]);

  const getProductImage = (product) => {
    if (!product.productImage) return '';
    
    // If product has multiple images and a selected color/size
    if (Array.isArray(product.productImage)) {
      return product.productImage[0]; // Return first image for now
    }
    return product.productImage;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateOrderData = () => {
    const {
      firstName,
      lastName,
      email,
      street,
      city,
      state,
      zipCode,
      country,
      phone,
    } = formData;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !street ||
      !city ||
      !state ||
      !zipCode ||
      !country ||
      !phone
    ) {
      toast.error("Please fill all the fields.");
      return false;
    }
    if (
      !cart.length ||
      cart.some(
        (product) =>
          !product.productId || !product.productId._id || product.quantity <= 0
      )
    ) {
      toast.error("No products added to the order or invalid product data.");
      return false;
    }
    return true;
  };

  const handlePayment = async (orderId, totalPrice) => {
    try {
      const paymentResponse = await initializeKhaltiPaymentApi({
        orderId,
        totalPrice,
        website_url: window.location.origin,
      });
      if (paymentResponse.data.success) {
        const paymentUrl = paymentResponse.data.payment.payment_url;
        window.location.href = paymentUrl;
      } else {
        toast.error("Failed to initialize payment. Please try again.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error(
        "Error processing payment: " +
          (error.response?.data?.message || error.message || "Unknown error")
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateOrderData()) return;

    const total = subtotal + formData.deliveryFee;
    const orderData = {
      carts: cart,
      totalPrice: total,
      name: formData.firstName + " " + formData.lastName,
      email: formData.email,
      street: formData.street,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
      phone: formData.phone,
      payment: false,
    };

    try {
      const response = await placeOrderApi(orderData);
      if (response.data.success) {
        toast.success(response.data.message);

        // Handle payment
        const orderId = response.data.order_id;
        if (orderId) {
          // Handle payment
          await handlePayment(orderId, total);

          // Update order status after payment initiation
          await updateStatusApi();
        } else {
          toast.error("Order ID not found in response.");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(
        "Error placing order: " +
          (error.response?.data?.message || error.message || "Unknown error")
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 p-4 md:p-8 lg:p-12"> {/* Added pt-20 for navbar spacing */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="md:flex">
            {/* Delivery Information Form */}
            <div className="md:w-1/2 p-6 md:p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Delivery Information
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(formData).map(([key, value]) =>
                    key !== "deliveryFee" && (
                      <div key={key} className={key === "street" || key === "email" ? "md:col-span-2" : ""}>
                        <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                          {key.charAt(0).toUpperCase() + key.slice(1).replace(/[A-Z]/g, " $&")}
                        </label>
                        <input
                          id={key}
                          type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                          name={key}
                          value={value}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder={`Enter your ${key.toLowerCase()}`}
                        />
                      </div>
                    )
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full mt-8 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-300"
                >
                  Place Order and Pay
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="md:w-1/2 bg-indigo-50 p-6 md:p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                {cart.map((product, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-4 flex items-center hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative w-20 h-20 mr-4">
                      <img
                        src={`http://localhost:5000/products/${getProductImage(product.productId)}`}
                        alt={product.productId.productName}
                        className="w-full h-full object-cover rounded-md"
                      />
                      {Array.isArray(product.productId.productImage) && 
                       product.productId.productImage.length > 1 && (
                        <div className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {product.productId.productImage.length}
                        </div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-gray-800">
                          {product.productId.productName}
                        </h3>
                        <span className="font-bold text-indigo-600">
                          ${(product.productId.productPrice * product.quantity).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>Qty: {product.quantity}</span>
                        {product.size && (
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                            Size: {product.size}
                          </span>
                        )}
                        {product.color && (
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                            Color: {product.color}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Price Summary */}
                <div className="mt-6 space-y-3">
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600">
                    <span>Delivery Fee</span>
                    <span className="font-semibold">${formData.deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between items-center text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span>${(subtotal + formData.deliveryFee).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;