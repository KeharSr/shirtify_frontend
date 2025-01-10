import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const FooterSection = ({ title, children }) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-gray-800 border-b border-red-200 pb-2">
      {title}
    </h3>
    {children}
  </div>
);

export default FooterSection;