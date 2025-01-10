import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  ShoppingCart,
  CreditCard,
  Camera,
  Box,
  User,
  Mail,
  Phone,
  Clock,
  Shield,
  Truck,
  ArrowRight,
  Plus,
  Minus
} from 'lucide-react';
import Navbar from '../../components/Navbar';

const HelpDocumentation = () => {
  const [activeTab, setActiveTab] = useState('getting-started');
  const [openFaqs, setOpenFaqs] = useState(new Set());

  const toggleFaq = (id) => {
    const newOpenFaqs = new Set(openFaqs);
    if (newOpenFaqs.has(id)) {
      newOpenFaqs.delete(id);
    } else {
      newOpenFaqs.add(id);
    }
    setOpenFaqs(newOpenFaqs);
  };

  const faqs = [
    {
      id: 1,
      question: "How do I use the Virtual Try-On feature?",
      answer: "Our Virtual Try-On feature lets you see how eyewear looks on you in real-time. Simply click the 'Try On' button on any product page, allow camera access, and position yourself in frame. Our AR technology will automatically detect your face and show you how the glasses or sunglasses look on you. You can move your head to see different angles and even take screenshots to share with friends and family."
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and digital wallets including Apple Pay and Google Pay. All transactions are secure and encrypted. For prescription glasses, we also accept FSA and HSA cards. Payment is processed only after your order is verified by our optical team."
    },
    {
      id: 3,
      question: "How do I track my order?",
      answer: "Once your order is placed, you'll receive an order confirmation email. For prescription glasses, our optical team will review your prescription within 24 hours. After verification and processing, you'll receive a shipping confirmation with a tracking number. You can track your order at any time through your account dashboard or by clicking the tracking link in your email."
    },
    {
      id: 4,
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all eyewear. For non-prescription glasses and sunglasses, they must be unworn with original tags attached. For prescription glasses, we offer a 'Perfect Fit Guarantee' - if you're not completely satisfied, we'll remake your lenses or provide a full refund. Return shipping is free, and you can initiate returns through your account dashboard."
    },
    {
      id: 5,
      question: "Can I use my insurance or FSA/HSA?",
      answer: "Yes! We accept most major vision insurance plans including VSP, EyeMed, and Spectera. You can also use your FSA or HSA card for all prescription eyewear purchases. Simply upload your insurance information during checkout, and we'll help you maximize your benefits. For FSA/HSA, use your card as you would a regular credit card."
    },
    {
      id: 6,
      question: "How do I get my prescription filled correctly?",
      answer: "You can either upload a photo/scan of your current prescription during checkout, or we can contact your eye doctor directly. Our licensed opticians will verify your prescription and contact you if there are any questions. We recommend having had an eye exam within the last two years. For complex prescriptions, we may reach out to confirm certain measurements."
    },
    {
      id: 7,
      question: "What lens options do you offer?",
      answer: "We offer a wide range of lens options including single vision, bifocal, and progressive lenses. All lenses come with anti-scratch and UV protection coatings. Optional add-ons include anti-reflective coating, blue light filtering, photochromic (transitions), and polarized options for sunglasses. Our optical team can help recommend the best options for your needs."
    },
    {
      id: 8,
      question: "Do you offer adjustments and repairs?",
      answer: "Yes! We offer free adjustments at any of our physical locations. For minor repairs like nose pad replacement or temple tightening, visit any of our stores. For major repairs, contact our customer service team and we'll guide you through the warranty process. Most frames come with a 1-year warranty against manufacturing defects."
    }
  ];

  const quickLinks = [
    { icon: ShoppingCart, text: "Order Status", link: "#" },
    { icon: Truck, text: "Shipping Info", link: "#" },
    { icon: CreditCard, text: "Payment Options", link: "#" },
    { icon: Box, text: "Returns", link: "#" },
    { icon: Camera, text: "Virtual Try-On", link: "#" },
    { icon: Shield, text: "Security", link: "#" }
  ];

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How can we help you today?
            </h1>
            <p className="text-lg md:text-xl mb-8 text-indigo-100">
              Find answers, manage your account, and get the support you need
            </p>
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full px-6 py-4 rounded-full text-gray-800 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 pl-14"
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickLinks.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group"
            >
              <item.icon className="w-8 h-8 text-indigo-600 mb-3 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-gray-700 font-medium">{item.text}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('getting-started')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === 'getting-started'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Getting Started
              </button>
              <button
                onClick={() => setActiveTab('account')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === 'account'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <User className="w-5 h-5 mr-2" />
                Account & Orders
              </button>
              <button
                onClick={() => setActiveTab('virtual-tryon')}
                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
                  activeTab === 'virtual-tryon'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Camera className="w-5 h-5 mr-2" />
                Virtual Try-On
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'getting-started' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started Guide</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Quick Start Steps */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Quick Start Steps</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-semibold mr-3">1</span>
                        <div>
                          <h4 className="font-medium text-gray-900">Create an Account</h4>
                          <p className="text-gray-600 text-sm">Sign up with your email to get started</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-semibold mr-3">2</span>
                        <div>
                          <h4 className="font-medium text-gray-900">Browse Products</h4>
                          <p className="text-gray-600 text-sm">Explore our collection with smart filters</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 font-semibold mr-3">3</span>
                        <div>
                          <h4 className="font-medium text-gray-900">Try Virtual Fitting</h4>
                          <p className="text-gray-600 text-sm">Use our AR technology to see items on you</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video Tutorial */}
                  {/* <div className="bg-gray-100 rounded-lg p-4">
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-gray-200">
                      <div className="flex items-center justify-center h-full">
                        <Play className="w-12 h-12 text-gray-400" />
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">Watch our quick tutorial video</p>
                  </div> */}
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Management</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">Account Features</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center text-gray-700">
                        <User className="w-5 h-5 mr-2 text-indigo-600" />
                        Profile Management
                      </li>
                      <li className="flex items-center text-gray-700">
                        <ShoppingCart className="w-5 h-5 mr-2 text-indigo-600" />
                        Order History
                      </li>
                      <li className="flex items-center text-gray-700">
                        <CreditCard className="w-5 h-5 mr-2 text-indigo-600" />
                        Saved Payment Methods
                      </li>
                    </ul>
                  </div>
                  <div className="bg-indigo-50 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Need Help?</h3>
                    <div className="space-y-3">
                      <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-700">
                        <Mail className="w-5 h-5 mr-2" />
                        Contact Support
                      </a>
                      <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-700">
                        <Phone className="w-5 h-5 mr-2" />
                        Call Us
                      </a>
                      <a href="#" className="flex items-center text-indigo-600 hover:text-indigo-700">
                        <Clock className="w-5 h-5 mr-2" />
                        24/7 Live Chat
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'virtual-tryon' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Virtual Try-On Guide</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">How It Works</h3>
                    <div className="space-y-3">
                      <div className="p-4 bg-indigo-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Camera Setup</h4>
                        <p className="text-gray-600 text-sm">Ensure good lighting and follow camera prompts</p>
                      </div>
                      <div className="p-4 bg-indigo-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Real-Time Preview</h4>
                        <p className="text-gray-600 text-sm">See products on yourself instantly with AR</p>
                      </div>
                      <div className="p-4 bg-indigo-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Save & Share</h4>
                        <p className="text-gray-600 text-sm">Capture and share your virtual try-on looks</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Tips for Best Results</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2 text-indigo-600" />
                        Use in well-lit areas
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2 text-indigo-600" />
                        Face the camera directly
                      </li>
                      <li className="flex items-center">
                        <ArrowRight className="w-4 h-4 mr-2 text-indigo-600" />
                        Keep a neutral background
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="container mx-auto px-4 py-12 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-center mb-8">Find answers to common questions about our services and products</p>
          <div className="grid gap-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-all duration-300 group"
              >
                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                <span className="ml-6 flex-shrink-0">
                  {openFaqs.has(faq.id) ? (
                    <Minus className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-indigo-600" />
                  )}
                </span>
              </button>
              {openFaqs.has(faq.id) && (
                <div className="px-6 pb-4 animate-fadeIn">
                  <div className="prose prose-indigo max-w-none">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    {faq.id === 1 && (
                      <div className="mt-4 flex gap-2">
                        <button className="text-sm px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition-colors duration-200">
                          View Try-On Demo
                        </button>
                        <button className="text-sm px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition-colors duration-200">
                          Setup Guide
                        </button>
                      </div>
                    )}
                    {faq.id === 4 && (
                      <div className="mt-4 flex gap-2">
                        <button className="text-sm px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition-colors duration-200">
                          Return Policy Details
                        </button>
                        <button className="text-sm px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition-colors duration-200">
                          Start a Return
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            ))}
            </div>
            </div>
            </div>
            </div>
            </>
    );
}

export default HelpDocumentation;