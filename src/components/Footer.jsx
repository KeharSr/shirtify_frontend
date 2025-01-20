import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Linkedin, CreditCard, Truck, Shield, Headphones } from 'lucide-react';
import FooterSection from './FooterSection';
import ContactInfo from './ContactInfo';

const Footer = () => {
  const quickLinks = [
    { name: 'Track Order', href: '/track-order' },
    { name: 'Return Policy', href: '/return-policy' },
    { name: 'Shipping Policy', href: '/shipping-policy' },
    { name: 'Gift Cards', href: '/gift-cards' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Contact Us', href: '/contact' }
  ];

  const accountLinks = [
    { name: 'Your Orders', href: '/myorder' },
    { name: 'Your Wishlist', href: '/favorites' },
    { name: 'Your Profile', href: '/profile' },
    { name: 'Payment Methods', href: '/payment-methods' },
    { name: 'Saved Addresses', href: '/addresses' },
    { name: 'Order History', href: '/order-history' }
  ];

  return (
    <footer className="bg-gray-50">
      {/* Features Section */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center space-x-4">
              <CreditCard className="w-8 h-8 text-red-500" />
              <div>
                <h4 className="font-semibold">Secure Payment</h4>
                <p className="text-sm text-gray-600">100% secure payments</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Truck className="w-8 h-8 text-red-500" />
              <div>
                <h4 className="font-semibold">Free Shipping</h4>
                <p className="text-sm text-gray-600">On orders over $100</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-red-500" />
              <div>
                <h4 className="font-semibold">Money Back</h4>
                <p className="text-sm text-gray-600">30 days guarantee</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Headphones className="w-8 h-8 text-red-500" />
              <div>
                <h4 className="font-semibold">24/7 Support</h4>
                <p className="text-sm text-gray-600">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <FooterSection title="About Shirtify">
            <div className="space-y-4">
              <p className="text-gray-600">
                Your one-stop destination for premium eyewear. We offer the latest trends in shortsleeves and longsleeves.
              </p>
              <div className="flex space-x-4">
                {[
                  { Icon: Facebook, href: 'https://facebook.com/shirtify' },
                  { Icon: Instagram, href: 'https://instagram.com/shirtify' },
                  { Icon: Twitter, href: 'https://twitter.com/shirtify' },
                  { Icon: Youtube, href: 'https://youtube.com/shirtify' },
                  { Icon: Linkedin, href: 'https://linkedin.com/company/shirtify' }
                ].map(({ Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </FooterSection>

          {/* Quick Links */}
          <FooterSection title="Quick Links">
            <ul className="space-y-2">
              {quickLinks.map(({ name, href }) => (
                <li key={name}>
                  <a href={href} className="text-gray-600 hover:text-red-500 transition-colors duration-200">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Account */}
          <FooterSection title="Your Account">
            <ul className="space-y-2">
              {accountLinks.map(({ name, href }) => (
                <li key={name}>
                  <a href={href} className="text-gray-600 hover:text-red-500 transition-colors duration-200">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Contact Info */}
          <FooterSection title="Contact Info">
            <ContactInfo />
          </FooterSection>
        </div>

        {/* Newsletter */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Subscribe to our Newsletter</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-red-500 text-white rounded-r-md hover:bg-red-600 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} Shirtify. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="/privacy" className="text-gray-600 hover:text-red-500 text-sm">Privacy Policy</a>
              <a href="/terms" className="text-gray-600 hover:text-red-500 text-sm">Terms of Service</a>
              <a href="/cookies" className="text-gray-600 hover:text-red-500 text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;