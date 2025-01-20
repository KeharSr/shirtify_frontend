import React, { useEffect, useState } from "react";
import {
  placeOrderApi,
  initializeKhaltiPaymentApi,
  updateStatusApi,
} from "../../apis/Apis";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const PlaceOrder = () => {
  // Add custom styles for navbar positioning
  const navbarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: "white",
    borderBottom: "1px solid #eaeaea",
  };
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
    if (!product.productImage) return "";
    if (Array.isArray(product.productImage)) {
      return product.productImage[0];
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

        // After payment completion, update the order status
        const verifyResponse = await updateStatusApi({ orderId });
        if (verifyResponse.data.success) {
          toast.success("Payment completed and order updated successfully.");
          navigate("/payment-success"); // Redirect to a success page
        } else {
          toast.error("Failed to update order status.");
        }
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
        const orderId = response.data.order_id;
        if (orderId) {
          await handlePayment(orderId, total);
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
    <div className="min-h-screen bg-white">
      <div style={navbarStyle}>
        <Navbar />
      </div>
      <div className="max-w-7xl justify-center mx-auto p-96 md:p-8 lg:p-16 pt-28">
        <h1 className="text-3xl justify-center font-bold text-gray-900 mb-8">
          Complete Your T-Shirt Order
        </h1>
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="md:flex">
            {/* Delivery Information Form */}
            <div className="md:w-1/2 p-6 md:p-8 lg:p-12 border-r border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Shipping Details
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(formData).map(
                    ([key, value]) =>
                      key !== "deliveryFee" && (
                        <div
                          key={key}
                          className={
                            key === "street" || key === "email"
                              ? "md:col-span-2"
                              : ""
                          }
                        >
                          <label
                            htmlFor={key}
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            {key.charAt(0).toUpperCase() +
                              key.slice(1).replace(/[A-Z]/g, " $&")}
                          </label>
                          <input
                            id={key}
                            type={
                              key === "email"
                                ? "email"
                                : key === "phone"
                                ? "tel"
                                : "text"
                            }
                            name={key}
                            value={value}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            placeholder={`Enter your ${key.toLowerCase()}`}
                          />
                        </div>
                      )
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full mt-8 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 font-semibold"
                >
                  Proceed to Payment
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="md:w-1/2 bg-gray-50 p-6 md:p-8 lg:p-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Your T-Shirt Order
              </h2>
              <div className="space-y-4 max-h-[calc(100vh-400px)] overflow-y-auto pr-2">
                {cart.map((product, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-sm p-4 flex items-center hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="relative w-24 h-24 mr-4">
                      <img
                        src={`http://localhost:5000/products/${getProductImage(
                          product.productId
                        )}`}
                        alt={product.productId.productName}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {Array.isArray(product.productId.productImage) &&
                        product.productId.productImage.length > 1 && (
                          <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            {product.productId.productImage.length}
                          </div>
                        )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-800 text-lg">
                          {product.productId.productName}
                        </h3>
                        <span className="font-bold text-blue-600 text-lg">
                          Rs
                          {(
                            product.productId.productPrice * product.quantity
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                        <span className="px-2 py-1 bg-gray-100 rounded-full">
                          Qty: {product.quantity}
                        </span>
                        {product.size && (
                          <span className="px-2 py-1 bg-gray-100 rounded-full">
                            Size: {product.size}
                          </span>
                        )}
                        {product.color && (
                          <span className="px-2 py-1 bg-gray-100 rounded-full">
                            Color: {product.color}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Summary */}
              <div className="mt-8 space-y-3 bg-white p-6 rounded-xl shadow-sm">
                <div className="flex justify-between items-center text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">Rs {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    Rs {formData.deliveryFee.toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between items-center text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span>Rs {(subtotal + formData.deliveryFee).toFixed(2)}</span>
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
