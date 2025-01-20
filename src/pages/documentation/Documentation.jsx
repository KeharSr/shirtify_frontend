import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  ShoppingCart,
  Ruler,
  Mail,
  Phone,
  Shield,
  Truck,
  ArrowRight,
  Plus,
  Minus,
  MessagesSquare,
  RefreshCw
} from 'lucide-react';

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
      question: "How do I find my perfect t-shirt size?",
      answer: "Use our detailed size guide with measurements for chest, length, and shoulders. You can also check our fit finder tool - just input your height, weight, and preferred fit (slim/regular/oversized) for a personalized recommendation. Each product page includes model height and size information for reference."
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and digital wallets including Apple Pay, Google Pay, and Shop Pay. All transactions are secure and encrypted. For bulk orders, we also accept bank transfers."
    },
    {
      id: 3,
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also view real-time tracking updates in your account dashboard. Orders typically process within 24 hours and deliver in 3-5 business days. Express shipping options are available at checkout."
    },
    {
      id: 4,
      question: "What is your return policy?",
      answer: "We offer a hassle-free 30-day return policy. T-shirts must be unworn with original tags attached. For returns, use our easy return portal to generate a free shipping label. Once we receive your return, refunds are processed within 3-5 business days."
    }
  ];

  const quickLinks = [
    { icon: ShoppingCart, text: "Track Order", link: "#orders" },
    { icon: Ruler, text: "Size Guide", link: "#sizing" },
    { icon: RefreshCw, text: "Returns", link: "#returns" },
    { icon: Truck, text: "Shipping Info", link: "#shipping" },
    { icon: MessagesSquare, text: "Live Chat", link: "#support" },
    { icon: Shield, text: "Guarantee", link: "#guarantee" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How can we help you today?
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Find answers about your t-shirt order, sizing, and more
            </p>
            <div className="relative max-w-2xl mx-auto group">
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full px-6 py-4 rounded-xl text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pl-14 transition-all duration-300"
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-blue-500 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Grid */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickLinks.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center group"
            >
              <item.icon className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors duration-300">{item.text}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-100">
            <nav className="flex flex-wrap justify-center space-x-8 px-6" aria-label="Tabs">
              {['Getting Started', 'Size Guide', 'Orders'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
                  className={`py-4 px-4 inline-flex items-center border-b-2 font-medium text-sm transition-all duration-300 ${
                    activeTab === tab.toLowerCase().replace(' ', '-')
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab === 'Getting Started' && <BookOpen className="w-5 h-5 mr-2" />}
                  {tab === 'Size Guide' && <Ruler className="w-5 h-5 mr-2" />}
                  {tab === 'Orders' && <ShoppingCart className="w-5 h-5 mr-2" />}
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'getting-started' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Shirtify</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-300 cursor-pointer">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Start Guide</h3>
                      <div className="space-y-4">
                        {[
                          { step: "Browse Collection", desc: "Explore our latest designs" },
                          { step: "Find Your Size", desc: "Use our size guide for perfect fit" },
                          { step: "Easy Checkout", desc: "Secure payment & fast shipping" }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start group">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold mr-3 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                              {idx + 1}
                            </span>
                            <div>
                              <h4 className="font-medium text-gray-900">{item.step}</h4>
                              <p className="text-gray-600 text-sm">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Help?</h3>
                    <div className="space-y-4">
                      {[
                        { icon: Mail, text: "Email Support", desc: "24/7 response time" },
                        { icon: Phone, text: "Call Us", desc: "Mon-Fri, 9am-6pm" },
                        { icon: MessagesSquare, text: "Live Chat", desc: "Instant help" }
                      ].map((item, idx) => (
                        <button key={idx} className="w-full flex items-center p-3 rounded-lg hover:bg-white/50 transition-all duration-300 group">
                          <item.icon className="w-5 h-5 text-blue-600 mr-3" />
                          <div className="text-left">
                            <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                              {item.text}
                            </div>
                            <div className="text-sm text-gray-500">{item.desc}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FAQs Section */}
        <div className="max-w-3xl mx-auto mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Common Questions</h2>
          <p className="text-gray-600 text-center mb-8">Everything you need to know about our t-shirts</p>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-all duration-300"
                >
                  <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                  <span className="ml-6 flex-shrink-0">
                    {openFaqs.has(faq.id) ? (
                      <Minus className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Plus className="w-5 h-5 text-blue-600" />
                    )}
                  </span>
                </button>
                {openFaqs.has(faq.id) && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button className="text-sm px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-300">
                        Learn More
                      </button>
                      <button className="text-sm px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-300">
                        View Guide
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpDocumentation;