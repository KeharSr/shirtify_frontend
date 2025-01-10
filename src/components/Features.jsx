import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Truck, RotateCcw, HeadphonesIcon } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Secure Shopping',
    description: 'Shop with confidence with our secure payment system'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Free shipping on orders over $100'
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30-day return policy for a full refund'
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    description: 'Round-the-clock customer service'
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 text-blue-600 rounded-xl">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;